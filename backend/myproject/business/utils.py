from django.core.mail import send_mail
from django.conf import settings
from .models import Business
import logging

# Configuración del logger
logger = logging.getLogger(__name__)

def notify_admin_of_new_business(business_id):
    try:
        # Recupera el negocio por ID
        business = Business.objects.get(id=business_id)
        subject = f'Nuevo Negocio Pendiente de Aprobación: {business.name}'
        message = f'El negocio "{business.name}" está pendiente de aprobación. Revisa los detalles en el panel de administración.'
        email_from = settings.DEFAULT_FROM_EMAIL
        recipient_list = [settings.ADMIN_EMAIL]  # Utiliza el correo del administrador definido en settings
        
        # Envía el correo electrónico
        send_mail(subject, message, email_from, recipient_list)
    except Business.DoesNotExist:
        # Registro en caso de que el negocio no exista
        logger.error(f'Business with id {business_id} does not exist.')
    except Exception as e:
        # Registro de otros errores durante el envío del correo electrónico
        logger.error(f'Error sending email notification: {e}')
