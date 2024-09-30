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
        logger.info(f"Intentando autenticar {username} en BusinessBackend")
        
        # Verificar si el username o password son None, en ese caso devolvemos None
        if not username or not password:
            logger.info("El username o la contraseña están vacíos")
            return None

        try:
            # Verificar si existe un negocio con el username dado
            business = Business.objects.get(username=username)
            
            # Si el negocio no está aprobado, no permitir autenticación
            if not business.approved:
                logger.info(f"El negocio {username} no está aprobado")
                return None
            
            # Verificar la contraseña
            if business.check_password(password):
                logger.info(f"Autenticación exitosa para {username} como negocio")
                return business
            else:
                logger.info(f"Contraseña incorrecta para {username}")
                return None
        except Business.DoesNotExist:
            # Si el username no corresponde a un negocio, no hacer nada
            logger.info(f"{username} no es un negocio, dejando que otros backends manejen la autenticación")
            return None

    def get_user(self, user_id):
        # Solo manejar usuarios del modelo Business
        try:
            return Business.objects.get(pk=user_id)
        except Business.DoesNotExist:
            return None
