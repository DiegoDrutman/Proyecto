from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BusinessViewSet, ProductViewSet, LocationViewSet, get_csrf_token

# Configuración del enrutador para registrar los viewsets
router = DefaultRouter()
router.register(r'businesses', BusinessViewSet, basename='business')
router.register(r'products', ProductViewSet, basename='product')
router.register(r'locations', LocationViewSet, basename='location')

urlpatterns = [
    path('', include(router.urls)),  # Incluye todas las URL generadas por el enrutador
    path('get_csrf_token/', get_csrf_token, name='get_csrf_token'),  # Ruta para obtener el token CSRF
    path('business/me/', BusinessViewSet.as_view({'get': 'get_own_business'}), name='business-me')
]
