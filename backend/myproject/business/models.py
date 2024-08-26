from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission

# Manager para CustomerUser
class CustomerUserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('El nombre de usuario debe ser proporcionado')
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError('El superusuario debe tener is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('El superusuario debe tener is_superuser=True.')
        return self.create_user(username, password, **extra_fields)

# Modelo de usuario para superadministradores
class CustomerUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    objects = CustomerUserManager()

    def __str__(self):
        return self.username

    def set_password(self, raw_password):
        self.password = make_password(raw_password)
        self.save()

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    groups = models.ManyToManyField(
        Group,
        related_name='customeruser_groups',
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customeruser_permissions',
        blank=True
    )

# Manager para Business
class BusinessManager(BaseUserManager):
    def create_business(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('El nombre de usuario debe ser proporcionado')
        business = self.model(username=username, **extra_fields)
        business.set_password(password)
        business.save(using=self._db)
        return business

# Modelo de negocio
class Business(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=255, blank=True)
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    description = models.TextField(blank=True)
    address = models.CharField(max_length=255, blank=True)
    opening_hours = models.CharField(max_length=255, blank=True)
    closing_hours = models.CharField(max_length=255, blank=True)
    work_days = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to='businesses/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    approved = models.BooleanField(default=False)
    token = models.CharField(max_length=255, blank=True, null=True)  # Campo para almacenar el token personalizado

    objects = BusinessManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.name or self.username

    def set_password(self, raw_password):
        self.password = make_password(raw_password)
        self.save()
        print(f"Contraseña establecida para el negocio: {self.username}")

    def save(self, *args, **kwargs):
        print(f"Guardando negocio: {self.username}, Token: {self.token}")
        super().save(*args, **kwargs)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    groups = models.ManyToManyField(
        Group,
        related_name='business_groups',
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='business_permissions',
        blank=True
    )

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
