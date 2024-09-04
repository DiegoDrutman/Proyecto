from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class Location(models.Model):
    name = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=10)

    def __str__(self):
        return self.name

class CustomerUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El correo electrónico debe ser proporcionado')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class CustomerUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = CustomerUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

class BusinessManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('El nombre de usuario debe ser proporcionado')
        business = self.model(username=username, **extra_fields)
        business.set_password(password)
        business.save(using=self._db)
        return business

    def create_superuser(self, username, password=None, **extra_fields):
        raise NotImplementedError("El modelo Business no debería crear superusuarios")

class Business(AbstractBaseUser):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    address = models.CharField(max_length=255, blank=True)
    location = models.ForeignKey(Location, related_name='businesses', on_delete=models.CASCADE)
    approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = BusinessManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.name or self.username

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
