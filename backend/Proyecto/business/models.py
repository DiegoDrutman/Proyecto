from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# Modelo para las ubicaciones
class Location(models.Model):
    name = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=10)

    def __str__(self):
        return self.name

# Manager para el superusuario
class CustomerUserManager(BaseUserManager):
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('El superusuario debe tener is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('El superusuario debe tener is_superuser=True.')

        return self.model(email=email, **extra_fields)
    
# Modelo para el superusuario
class CustomerUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    # Agrega related_name a los campos groups y user_permissions
    groups = models.ManyToManyField(Group, related_name='customeruser_groups')
    user_permissions = models.ManyToManyField(Permission, related_name='customeruser_user_permissions')

    objects = CustomerUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

# Manager para el modelo Business
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

# Modelo para los negocios
class Business(AbstractBaseUser):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True, blank=True)  # El email puede ser opcional
    name = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    address = models.CharField(max_length=255, blank=True)
    location = models.ForeignKey(Location, related_name='businesses', on_delete=models.CASCADE)
    approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = BusinessManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []  # No se necesita requerir otros campos para la autenticación

    def __str__(self):
        return self.name or self.username


# Modelo para los productos
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

class BusinessToken(models.Model):
    business = models.OneToOneField(Business, on_delete=models.CASCADE, related_name='auth_token')
    key = models.CharField(max_length=40, unique=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.key