from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BusinessViewSet, ProductViewSet, CustomAuthToken, get_csrf_token

router = DefaultRouter()
router.register(r'businesses', BusinessViewSet, basename='business')
router.register(r'products', ProductViewSet, basename='product')

urlpatterns = [
    path('', include(router.urls)),
    path('get_csrf_token/', get_csrf_token, name='get_csrf_token'),
    path('api-token-auth-business/', CustomAuthToken.as_view(), name='api_token_auth_business'),  # Ruta separada para negocios
]
