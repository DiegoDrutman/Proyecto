from django.contrib import admin
from .models import Recipe

@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ('name', 'preparation_time')  # Muestra estos campos en la lista de recetas
    search_fields = ('name',)  # Agrega un campo de búsqueda para el nombre
    list_filter = ('preparation_time',)  # Agrega filtros por tiempo de preparación