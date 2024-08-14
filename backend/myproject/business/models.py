from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import AbstractBaseUser
from django.db import models

class Business(AbstractBaseUser):
    name = models.CharField(max_length=255)
    username = models.CharField(max_length=255, unique=True)  # Campo de nombre de usuario
    password = models.CharField(max_length=255)  # Campo de contraseña
    description = models.TextField()
    category = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    operating_hours = models.CharField(max_length=255)
    image = models.ImageField(upload_to='businesses/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    approved = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.name

    def set_password(self, raw_password):
        self.password = make_password(raw_password)
        self.save()

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)


class Product(models.Model):
    business = models.ForeignKey(Business, related_name='products', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    offer_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)  # Nuevo campo para ofertas

    def __str__(self):
        return self.name
