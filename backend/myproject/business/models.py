from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    joined_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} Profile'

class Business(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    operating_hours = models.CharField(max_length=255)
    image = models.ImageField(upload_to='businesses/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    approved = models.BooleanField(default=False)  # Nuevo campo para aprobación

    def __str__(self):
        return self.name

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
