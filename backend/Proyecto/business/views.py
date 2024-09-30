from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Business, Product, BusinessToken
from .serializers import BusinessSerializer, ProductSerializer
from django.db.models import Q
from .permissions import IsSuperuser
from rest_framework.parsers import MultiPartParser, FormParser
from django.conf import settings
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import serializers
import logging
from django.utils.crypto import get_random_string
from .utils import notify_admin_of_new_business

# Configuración básica del logger
logger = logging.getLogger(__name__)

### ProductViewSet ###
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer

    def perform_create(self, serializer):
        business_id = self.request.data.get('business')
        if business_id:
            try:
                business = Business.objects.get(id=business_id, approved=True)
                serializer.save(business=business)
            except Business.DoesNotExist:
                raise serializers.ValidationError({"business": "El negocio con el ID proporcionado no existe o no está aprobado."})
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


### BusinessViewSet ###
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
        business = serializer.save()  # Guardar el negocio
        notify_admin_of_new_business(business.id)  # Llamar a la función que envía el correo al admin

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated], url_path='me')
    def obtener_negocio_propio(self, request):
        business = request.user
        if not isinstance(business, Business):
            return Response({'detail': 'Este usuario no es un negocio.'}, status=status.HTTP_400_BAD_REQUEST)

        if not business.is_authenticated:
            return Response({'detail': 'Usuario no autenticado.'}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = self.get_serializer(business)
        return Response(serializer.data)
        
    @action(detail=True, methods=['post'], permission_classes=[IsSuperuser])
    def aprobar_negocio(self, request, pk=None):
        business = self.get_object()

        business.approved = True
        business.save()

        # Crear el token para el negocio
        token, _ = Token.objects.get_or_create(user=business)

        try:
            send_mail(
                'Negocio aprobado',
                f'¡Felicidades! Tu negocio {business.name} ha sido aprobado.',
                settings.DEFAULT_FROM_EMAIL,
                [business.email],
                fail_silently=False,
            )
        except Exception as e:
            logger.error(f"Error al enviar el correo: {e}")

        return Response({'status': 'Negocio aprobado.'}, status=status.HTTP_200_OK)


### CustomAuthToken ###
class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        logger.info("Autenticando negocio...")
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        logger.info(f"Usuario autenticado: {user}")

        if isinstance(user, Business):
            logger.info(f"Negocio autenticado: {user.username}")
            if user.approved:
                # Crear o recuperar el token para el negocio
                token, created = BusinessToken.objects.get_or_create(business=user)
                if created:
                    token.key = get_random_string(40)  # Generar un token único
                    token.save()
                return Response({
                    'token': token.key,
                    'user_id': user.pk,
                    'username': user.username
                })
            else:
                return Response({'error': 'El negocio aún no ha sido aprobado.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            logger.error("El usuario autenticado no es un negocio")
            return Response({'error': 'Credenciales incorrectas.'}, status=status.HTTP_400_BAD_REQUEST)
