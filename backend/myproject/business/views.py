from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import UserProfile, Business, Product
from .serializers import UserProfileSerializer, BusinessSerializer, ProductSerializer
from django.db.models import Q
from django.contrib.auth.models import User
from django.db import IntegrityError
from .permissions import IsSuperuser, IsOwnerOrReadOnly
from django.middleware.csrf import get_token
from django.http import JsonResponse
from .utils import notify_admin_of_new_business

def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['post'], permission_classes=[permissions.AllowAny])
    def create_user_profile(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        if not username or not email or not password:
            return Response({'detail': 'Por favor, provee todos los campos requeridos.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'detail': 'El nombre de usuario ya existe.'}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(email=email).exists():
            return Response({'detail': 'El correo electrónico ya existe.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.create_user(username=username, email=email, password=password)
            profile, created = UserProfile.objects.get_or_create(user=user)
            if created:
                serializer = self.get_serializer(profile)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response({'detail': 'User profile already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        except IntegrityError as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated], url_path='me', url_name='me')
    def get_me(self, request):
        try:
            profile = UserProfile.objects.get(user=request.user)
            serializer = self.get_serializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({'detail': 'User profile not found.'}, status=status.HTTP_404_NOT_FOUND)

class BusinessViewSet(viewsets.ModelViewSet):
    queryset = Business.objects.all().order_by('-created_at')
    serializer_class = BusinessSerializer

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            # Permitir que solo los superadministradores y los dueños del negocio puedan modificar o eliminar su negocio
            permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly | IsSuperuser]
        elif self.action == 'create':
            # Permitir que cualquier usuario autenticado cree un negocio, pero no será aprobado automáticamente
            permission_classes = [permissions.IsAuthenticated]
        else:
            # Permitir que todos los usuarios puedan ver los negocios
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = super().get_queryset()
        search_term = self.request.query_params.get('search', None)
        if search_term:
            queryset = queryset.filter(
                Q(name__icontains=search_term) |
                Q(description__icontains=search_term)
            )
        return queryset.filter(approved=True)  # Mostrar solo negocios aprobados

    def perform_create(self, serializer):
        # Marcar el negocio como no aprobado al ser creado
        business = serializer.save(approved=False)
        # Notificar al administrador sobre el nuevo negocio pendiente
        notify_admin_of_new_business(business.id)

    @action(detail=True, methods=['post'], permission_classes=[IsSuperuser], url_path='approve', url_name='approve')
    def approve_business(self, request, pk=None):
        try:
            business = self.get_object()
            business.approved = True
            business.save()
            return Response({'detail': 'Negocio aprobado exitosamente.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer

    def get_permissions(self):
        # Solo permitir que el superadministrador o el dueño del negocio puedan crear, actualizar o eliminar productos
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly | IsSuperuser]
        else:
            # Permitir que todos los usuarios puedan ver los productos
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = super().get_queryset()
        business_id = self.request.query_params.get('business', None)
        if business_id:
            queryset = queryset.filter(business_id=business_id)
        return queryset

    def perform_create(self, serializer):
        serializer.save()
