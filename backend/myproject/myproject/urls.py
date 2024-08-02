# project_name/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('recipes.urls')),  # Incluir las rutas de la app recipes
    path('api/auth/', include('rest_framework.urls', namespace='rest_framework')),  # Autenticación de DRF
    path('api/api-token-auth/', obtain_auth_token, name='api_token_auth'),  # Token de autenticación
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)  # Ruta para archivos de medios
