from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserProfileViewSet, BusinessViewSet, ProductViewSet, get_csrf_token  # Asegúrate de importar ProductViewSet

router = DefaultRouter()
router.register(r'profiles', UserProfileViewSet, basename='profile')
router.register(r'businesses', BusinessViewSet, basename='business')
router.register(r'products', ProductViewSet, basename='product')  # Registra el ProductViewSet

urlpatterns = [
    path('', include(router.urls)),  # Incluye todas las rutas del router
    path('get_csrf_token/', get_csrf_token, name='get_csrf_token'),
]
