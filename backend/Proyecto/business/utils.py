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
        message = (
            f'El negocio "{business.name}" (ID: {business.id}) está pendiente de aprobación.\n\n' # type: ignore
            f'Revisa los detalles en el panel de administración:\n\n'
            f'Nombre: {business.name}\n'
            f'Correo: {business.email}\n'
            f'Dirección: {business.address}\n'
            f'Fecha de registro: {business.created_at.strftime("%Y-%m-%d %H:%M:%S")}\n'
        )
        email_from = settings.DEFAULT_FROM_EMAIL
        recipient_list = [settings.ADMIN_EMAIL]  # Usa el correo del administrador definido en settings
        
        # Envía el correo electrónico
        send_mail(subject, message, email_from, recipient_list)
        logger.info(f'Correo enviado al administrador para la aprobación del negocio {business.name}.')

    except Business.DoesNotExist:
        # Registro en caso de que el negocio no exista
        logger.error(f'El negocio con ID {business_id} no existe.')
    
    except Exception as e:
        # Registro de otros errores durante el envío del correo electrónico
        logger.error(f'Error al enviar la notificación por correo: {e}')
 