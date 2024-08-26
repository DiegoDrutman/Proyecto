from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from .models import Business, Product
from .serializers import BusinessSerializer, ProductSerializer, BusinessAuthTokenSerializer
from django.db.models import Q
from .permissions import IsSuperuser
from django.middleware.csrf import get_token
from django.http import JsonResponse
from rest_framework.views import APIView
import uuid
from django.core.mail import send_mail

def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})

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
        print("Datos recibidos:", self.request.data)
        address = self.request.data.get('address')
        if not address:
            raise ValueError("La dirección es obligatoria.")
        
        business = serializer.save()

        send_mail(
            'Nuevo negocio registrado',
            f'El negocio {business.name} ha sido registrado y está pendiente de aprobación.',
            'diego.drutman@gmail.com',
            ['diego.drutman@gmail.com'],
            fail_silently=False,
        )

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated], url_path='me')
    def get_own_business(self, request):
        print("Accediendo a get_own_business")

        if not request.user.is_authenticated:
            print("Usuario no autenticado")
            return Response({'detail': 'Usuario no autenticado.'}, status=status.HTTP_401_UNAUTHORIZED)

        token = request.headers.get('Authorization', '').split('Token ')[-1]
        print(f"Token recibido: {token}")
        print(f"Usuario autenticado: {request.user.username}")

        try:
            # Verifica si el token en la base de datos coincide
            business = Business.objects.get(token=token)
            print(f"Business encontrado: {business.name}, Token almacenado: {business.token}")

            if business.username == request.user.username:
                print("El token coincide con el usuario autenticado.")
                serializer = self.get_serializer(business)
                return Response(serializer.data)
            else:
                print(f"El token no coincide. Username del negocio: {business.username}, Username del usuario autenticado: {request.user.username}")
                return Response({'detail': 'El token no coincide con el usuario autenticado.'}, status=status.HTTP_401_UNAUTHORIZED)
        
        except Business.DoesNotExist:
            print(f"Negocio no encontrado para el token: {token}")
            return Response({'detail': 'Negocio no encontrado para el token proporcionado.'}, status=status.HTTP_404_NOT_FOUND)



    @action(detail=True, methods=['post'], permission_classes=[IsSuperuser], url_path='approve', url_name='approve')
    def approve_business(self, request, pk=None):
        try:
            business = self.get_object()
            business.approved = True
            business.save()
            print(f"Negocio {business.name} aprobado con éxito. Estado: {business.approved}")
            send_mail(
                'Negocio Aprobado',
                f'Tu negocio {business.name} ha sido aprobado.',
                'webmaster@example.com',
                [business.email],
                fail_silently=False,
            )
            return Response({'detail': 'Negocio aprobado exitosamente.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class CustomAuthToken(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = BusinessAuthTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid():
            business = serializer.validated_data['business']
            if not business.approved:
                return Response({"detail": "El negocio aún no ha sido aprobado."}, status=status.HTTP_400_BAD_REQUEST)

            # Crear un token personalizado (ej: UUID)
            token = str(uuid.uuid4())
            business.token = token
            business.save()

            # Log del token generado y del negocio
            print(f"Token generado: {token} para el negocio: {business.username}")

            return Response({
                'token': token,
                'business_id': business.pk,
                'name': business.name
            })
        else:
            print(f"Error en la autenticación: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LocationViewSet(viewsets.ViewSet):
    def list(self, request):
        search_term = request.query_params.get('search', None)
        if search_term:
            queryset = Business.objects.filter(
                Q(address__icontains=search_term)
            ).values_list('address', flat=True).distinct()[:3]
        else:
            queryset = Business.objects.values_list('address', flat=True).distinct()[:3]
        return Response(queryset)
