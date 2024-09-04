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
                logger.info(f"Intento de inicio de sesión para un negocio no aprobado: {username}")
                return None  # No permitir inicio de sesión si el negocio no está aprobado
            
            # Verificar si la contraseña es correcta
            if business.check_password(password):
                return business
            else:
                logger.warning(f"Contraseña incorrecta para el negocio: {username}")
                return None
        
        except Business.DoesNotExist:
            logger.error(f"Negocio no encontrado: {username}")
            return None
