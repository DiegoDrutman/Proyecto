from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from .models import Business, Product, Location, Zone
from .serializers import BusinessSerializer, ProductSerializer, BusinessAuthTokenSerializer
from django.db.models import Q
from .permissions import IsSuperuser
from django.middleware.csrf import get_token
from django.http import JsonResponse
from rest_framework.views import APIView
from django.core.mail import send_mail
from rest_framework.parsers import MultiPartParser, FormParser
from django.conf import settings
from rest_framework.authtoken.models import Token
from .serializers import LocationSerializer, ZoneSerializer

class LocationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class ZoneViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Zone.objects.all()
    serializer_class = ZoneSerializer

def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsSuperuser]
        else:
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = super().get_queryset()
        business_id = self.request.query_params.get('business', None)
        if business_id:
            queryset = queryset.filter(business_id=business_id)
        return queryset

    def perform_create(self, serializer):
        business_id = self.request.data.get('business')
        if business_id:
            business = Business.objects.get(id=business_id)
            serializer.save(business=business)
        else:
            raise ValueError("business_id no está presente en los datos proporcionados.")

class BusinessViewSet(viewsets.ModelViewSet):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            permission_classes = [IsAuthenticated, IsSuperuser]
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
        address = self.request.data.get('address')
        if not address:
            raise ValueError("La dirección es obligatoria.")
        
        business = serializer.save()

        # Enviar correo de registro de negocio
        send_mail(
            'Nuevo negocio registrado',
            f'El negocio {business.name} ha sido registrado y está pendiente de aprobación.',
            settings.DEFAULT_FROM_EMAIL,
            [settings.ADMIN_EMAIL],
            fail_silently=False,
        )

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated], url_path='me')
    def obtener_negocio_propio(self, request):
        try:
            business = request.user
            if not business.is_authenticated:
                return Response({'detail': 'Usuario no autenticado.'}, status=status.HTTP_401_UNAUTHORIZED)

            serializer = self.get_serializer(business)
            return Response(serializer.data)
        
        except Business.DoesNotExist:
            return Response({'detail': 'Negocio no encontrado para el usuario autenticado.'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], permission_classes=[IsSuperuser])
    def aprobar_negocio(self, request, pk=None):
        try:
            business = self.get_object()
            business.approved = True
            business.save()

            # Enviar correo al negocio
            send_mail(
                'Negocio aprobado',
                f'¡Felicidades! Tu negocio {business.name} ha sido aprobado.',
                settings.DEFAULT_FROM_EMAIL,
                [business.email],
                fail_silently=False,
            )

            return Response({'status': 'Negocio aprobado.'}, status=status.HTTP_200_OK)
        
        except Business.DoesNotExist:
            return Response({'detail': 'Negocio no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

class CustomAuthToken(APIView):
    def post(self, request, *args, **kwargs):
        serializer = BusinessAuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        business = serializer.validated_data['business']
        token, created = Token.objects.get_or_create(user=business)
        return Response({
            'token': token.key,
            'business': BusinessSerializer(business).data
        })

class LocationViewSet(viewsets.ReadOnlyModelViewSet):
    # Ajusta queryset y permisos si es necesario
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class ZoneViewSet(viewsets.ReadOnlyModelViewSet):
    # Ajusta queryset y permisos si es necesario
    queryset = Zone.objects.all()
    serializer_class = ZoneSerializer
