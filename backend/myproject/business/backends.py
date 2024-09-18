# business/backends.py
from django.contrib.auth.backends import ModelBackend
from .models import Business
import logging

# Configuración básica del logger
logger = logging.getLogger(__name__)

class BusinessBackend(ModelBackend):
    """
    Este backend autentica un negocio en lugar de un CustomerUser.
    """
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            logger.info(f"Autenticando negocio: {username}")
            business = Business.objects.get(username=username)
            
            if not business.approved:
                logger.info(f"El negocio {username} no está aprobado")
                return None
            
            if business.check_password(password):
                logger.info(f"Autenticación exitosa para {username}")
                return business
            else:
                logger.info(f"Contraseña incorrecta para {username}")
                return None
        except Business.DoesNotExist:
            logger.error(f"Negocio con username {username} no existe")
            return None

    def get_user(self, user_id):
        try:
            return Business.objects.get(pk=user_id)
        except Business.DoesNotExist:
            return None