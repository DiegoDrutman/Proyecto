from django.contrib.auth.backends import ModelBackend
from .models import Business
import logging

# Configuración básica del logger
logger = logging.getLogger(__name__)

class BusinessBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            # Intentar obtener el negocio con el nombre de usuario proporcionado
            business = Business.objects.get(username=username)
            
            # Verificar si el negocio está aprobado
            if not business.approved:
                logger.warning(f"Intento de inicio de sesión para un negocio no aprobado: {username}")
                return None  # No permitir inicio de sesión si el negocio no está aprobado
            
            if password and business.check_password(password):
                return business
            else:
                logger.warning("Contraseña incorrecta o no proporcionada.")
                return None
        
        except Business.DoesNotExist:
            logger.warning(f"Negocio no encontrado: {username}")
            return None
