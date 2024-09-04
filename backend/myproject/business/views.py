from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from .models import Business, Product, Location
from .serializers import BusinessSerializer, ProductSerializer
from django.db.models import Q
from .permissions import IsSuperuser
from django.middleware.csrf import get_token
from django.http import JsonResponse
from rest_framework.views import APIView
from django.core.mail import send_mail
from rest_framework.parsers import MultiPartParser, FormParser
from django.conf import settings
from rest_framework.authtoken.models import Token
from .serializers import LocationSerializer
from rest_framework.authtoken.views import ObtainAuthToken

def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer

    def perform_create(self, serializer):
        business_id = self.request.data.get('business')
        if business_id:
            try:
                business = Business.objects.get(id=business_id)
                serializer.save(business=business)
            except Business.DoesNotExist:
                raise serializers.ValidationError({"business": "El negocio con el ID proporcionado no existe."})
        else:
            raise serializers.ValidationError({"business": "El ID del negocio no está presente en los datos proporcionados."})

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = super().get_queryset()
        business_id = self.request.query_params.get('business', None)
        if business_id:
            queryset = queryset.filter(business_id=business_id)
        return queryset

class BusinessViewSet(viewsets.ModelViewSet):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            permission_classes = [permissions.IsAuthenticated, IsSuperuser]
        elif self.action == 'create':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = super().get_queryset()
        search_term = self.request.query_params.get('search', None)
        location = self.request.query_params.get('location', None)
        postal_code = self.request.query_params.get('postal_code', None)

        if search_term:
            queryset = queryset.filter(
                Q(name__icontains=search_term) |
                Q(description__icontains=search_term)
            )
        
        if location:
            queryset = queryset.filter(address__icontains=location)
        
        if postal_code:
            queryset = queryset.filter(address__icontains=postal_code)

        return queryset.filter(approved=True)

    def perform_create(self, serializer):
        business = serializer.save()

        # Enviar correo de confirmación
        send_mail(
            subject='Registro de negocio exitoso',
            message=f'Tu negocio {business.name} ha sido registrado con éxito y está pendiente de aprobación.',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[business.email],
            fail_silently=False,
        )

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated], url_path='me')
    def obtener_negocio_propio(self, request):
        business = request.user
        if not business.is_authenticated:
            return Response({'detail': 'Usuario no autenticado.'}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = self.get_serializer(business)
        return Response(serializer.data)
    
    # Crear el token cuando se aprueba el negocio
    @action(detail=True, methods=['post'], permission_classes=[IsSuperuser])
    def aprobar_negocio(self, request, pk=None):
        business = self.get_object()
        business.approved = True
        business.save()

        # Crear el token para el negocio
        token, _ = Token.objects.get_or_create(user=business)
        
        send_mail(
            'Negocio aprobado',
            f'¡Felicidades! Tu negocio {business.name} ha sido aprobado.',
            settings.DEFAULT_FROM_EMAIL,
            [business.email],
            fail_silently=False,
        )

        return Response({'status': 'Negocio aprobado.'}, status=status.HTTP_200_OK)

class CustomAuthToken(APIView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        business = serializer.validated_data['user']

        # Aquí es donde ocurre el problema
        if isinstance(business, Business):
            # Aquí se debe manejar un caso donde el business pueda tener su propio token.
            # Token personalizado o lógica adecuada
            token, created = BusinessToken.objects.get_or_create(business=business)
            return Response({
                'token': token.token,
                'user_id': business.pk,
                'username': business.username
            })
        else:
            return Response({'error': 'Credenciales incorrectas o negocio no aprobado.'}, status=400)
        
class LocationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
