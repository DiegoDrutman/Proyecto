from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
import uuid

class BusinessManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('El nombre de usuario debe ser proporcionado')
        if extra_fields.get('email') is None:
            raise ValueError('El correo electrónico debe ser proporcionado')
        business = self.model(username=username, **extra_fields)
        business.set_password(password)
        business.save(using=self._db)
        return business

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('El superusuario debe tener is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('El superusuario debe tener is_superuser=True.')

        return self.create_user(username, password, **extra_fields)

class Business(AbstractBaseUser):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    name = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    address = models.CharField(max_length=255, blank=True)
    opening_hours = models.CharField(max_length=255, blank=True)
    closing_hours = models.CharField(max_length=255, blank=True)
    work_days = models.CharField(max_length=255, blank=True)
    logo = models.ImageField(upload_to='business_logos/', blank=True, null=True)
    approved = models.BooleanField(default=False)
    token = models.CharField(max_length=36, blank=True, null=True, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = BusinessManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def set_password(self, raw_password):
        self.password = make_password(raw_password)
        self.save()

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def __str__(self):
        return self.name or self.username

# Modelo de producto
class Product(models.Model):
    business = models.ForeignKey(Business, related_name='products', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    offer_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)  # Campo para ofertas

    def __str__(self):
        return self.name

class Location(models.Model):
    name = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=10)

    def __str__(self):
        return self.name

class Zone(models.Model):
    name = models.CharField(max_length=255)
    location = models.ForeignKey(Location, related_name='zones', on_delete=models.CASCADE)

    def __str__(self):
        return self.name