# business/utils.py

from django.core.mail import send_mail
from django.conf import settings

def notify_admin_of_new_business(business_id):
    subject = 'Nuevo negocio pendiente de aprobación'
    message = f'Un nuevo negocio con ID {business_id} ha sido creado y está pendiente de aprobación.'
    admin_email = settings.DEFAULT_ADMIN_EMAIL  # Asegúrate de definir esto en tu configuración
    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [admin_email])
