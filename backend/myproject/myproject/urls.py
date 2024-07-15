from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('app1.urls')),  # Asegúrate de que esto apunta al archivo urls.py de tu aplicación
]
