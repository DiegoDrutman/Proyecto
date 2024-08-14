from django.core.mail import send_mail
from django.conf import settings
from .models import Business

def notify_admin_of_new_business(business_id):
    try:
        business = Business.objects.get(id=business_id)
        subject = f'Nuevo Negocio Pendiente de Aprobación: {business.name}'
        message = f'El negocio "{business.name}" está pendiente de aprobación. Revisa los detalles en el panel de administración.'
        email_from = settings.DEFAULT_FROM_EMAIL
        recipient_list = [settings.ADMIN_EMAIL]  # Utiliza el correo del administrador definido en settings
        send_mail(subject, message, email_from, recipient_list)
    except Business.DoesNotExist:
        pass
