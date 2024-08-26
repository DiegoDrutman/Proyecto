from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from business.views import CustomAuthToken

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('business.urls')),  # Incluye las rutas del módulo business.urls
    path('api/auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/api-token-auth/', CustomAuthToken.as_view(), name='api_token_auth'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
