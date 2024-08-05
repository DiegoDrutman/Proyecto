from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class UserProfile(models.Model):
    # Relación uno a uno con el modelo de usuario predeterminado de Django
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    
    # Campo opcional para almacenar un avatar de usuario
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    
    # Campo opcional para una breve biografía del usuario
    bio = models.TextField(blank=True, null=True)
    
    # Fecha de creación del perfil, se establece automáticamente al crear una instancia
    joined_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} Profile'
    
class Recipe(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    ingredients = models.TextField()
    instructions = models.TextField()
    image = models.ImageField(upload_to='recipe_images/', blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_favorited = models.ManyToManyField(User, related_name='favorite_recipes', blank=True)

    def __str__(self):
        return self.title

# Modelo de Comentarios
class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment by {self.user.username} on {self.recipe.title}'

# Modelo de Calificaciones
class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ratings')
    rating = models.IntegerField()  # 1-5 rating
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Rating {self.rating} by {self.user.username} on {self.recipe.title}'

# Historial de Actividades del Usuario
class UserActivity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    action = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f'Activity by {self.user.username}: {self.action}'
