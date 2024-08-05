from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from .models import Recipe, UserProfile, Comment, Rating
from .serializers import RecipeSerializer, UserProfileSerializer, CommentSerializer, RatingSerializer
from django.db import IntegrityError
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all().order_by('-created_at')
    serializer_class = RecipeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(detail=True, methods=['post'], authentication_classes=[SessionAuthentication, BasicAuthentication])
    def favorite(self, request, pk=None):
        recipe = self.get_object()
        if recipe.is_favorited.filter(id=request.user.id).exists():
            recipe.is_favorited.remove(request.user)
            return Response({'status': 'unfavorited'}, status=status.HTTP_200_OK)
        else:
            recipe.is_favorited.add(request.user)
            return Response({'status': 'favorited'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], authentication_classes=[SessionAuthentication, BasicAuthentication])
    def rate(self, request, pk=None):
        recipe = self.get_object()
        rating_value = request.data.get('rating')
        if rating_value and 1 <= rating_value <= 5:
            rating, created = Rating.objects.get_or_create(user=request.user, recipe=recipe)
            rating.rating = rating_value
            rating.save()
            return Response({'status': 'rated'}, status=status.HTTP_200_OK)
        return Response({'status': 'bad request'}, status=status.HTTP_400_BAD_REQUEST)

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]  # Requiere autenticación para obtener el perfil

    # Acción personalizada para obtener el perfil del usuario autenticado
    @action(detail=False, methods=['get'], url_path='me', url_name='me')
    def get_me(self, request):
        try:
            profile = UserProfile.objects.get(user=request.user)
            serializer = self.get_serializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({'detail': 'User profile not found.'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'], permission_classes=[permissions.AllowAny])
    def create_user_profile(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        if not username or not email or not password:
            return Response({'detail': 'Por favor, provee todos los campos requeridos.'}, status=status.HTTP_400_BAD_REQUEST)

        # Verificar si el usuario ya existe
        if User.objects.filter(username=username).exists():
            return Response({'detail': 'El nombre de usuario ya existe.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'detail': 'El correo electrónico ya existe.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Crear el usuario
            user = User.objects.create_user(username=username, email=email, password=password)

            # Crear el perfil del usuario solo si no existe
            profile, created = UserProfile.objects.get_or_create(user=user)

            if created:
                serializer = self.get_serializer(profile)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response({'detail': 'User profile already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        except IntegrityError as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
