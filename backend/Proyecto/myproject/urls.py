from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from business.views import CustomAuthToken

urlpatterns = [
    path('admin/', admin.site.urls),  # Rutas del panel de administración
    path('api/', include('business.urls')),  # Incluye las rutas del módulo business
    path('api/auth/', include('rest_framework.urls', namespace='rest_framework')),  # Autenticación estándar de DRF
    path('api/api-token-auth/', CustomAuthToken.as_view(), name='api_token_auth'),  # Autenticación para superusuarios
]

# Sirve archivos media cuando DEBUG está activado (solo en desarrollo)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
