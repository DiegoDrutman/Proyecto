from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    joined_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} Profile'

class Recipe(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    ingredients = models.JSONField()  # Usando JSONField para ingredientes
    steps = models.JSONField(null=True, blank=True)  # Campo para los pasos de preparación
    preparation_time = models.IntegerField()
    image = models.ImageField(upload_to='recipes/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)  # Campo para la fecha de creación

    def __str__(self):
        return self.name