from django.contrib.auth.backends import ModelBackend
from .models import Business

class BusinessBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            business = Business.objects.get(username=username)
            if business.check_password(password):
                return business
        except Business.DoesNotExist:
            return None
