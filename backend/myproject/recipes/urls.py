from django.urls import path, include
from .views import get_csrf_token
from rest_framework.routers import DefaultRouter
from .views import UserProfileViewSet, RecipeViewSet  # Importa el RecipeViewSet

router = DefaultRouter()
router.register(r'profiles', UserProfileViewSet, basename='profile')
router.register(r'recipes', RecipeViewSet, basename='recipe')  # Registra el RecipeViewSet

urlpatterns = [
    path('', include(router.urls)),
    path('api/get_csrf_token/', get_csrf_token, name='get_csrf_token'),
]
