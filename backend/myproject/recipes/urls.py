# recipes/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RecipeViewSet, UserProfileViewSet, CommentViewSet, RatingViewSet

# Crear un router para las vistas
router = DefaultRouter()
router.register(r'recipes', RecipeViewSet, basename='recipe')
router.register(r'profiles', UserProfileViewSet, basename='profile')
router.register(r'comments', CommentViewSet, basename='comment')
router.register(r'ratings', RatingViewSet, basename='rating')

urlpatterns = [
    path('', include(router.urls)),  # Incluir todas las rutas del router
]
