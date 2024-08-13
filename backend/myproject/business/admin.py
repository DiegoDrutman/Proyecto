from django.contrib import admin
from .models import Business, Product

@admin.register(Business)
class BusinessAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'operating_hours')  # Muestra estos campos en la lista de negocios
    search_fields = ('name', 'category')  # Agrega un campo de búsqueda para el nombre y la categoría
    list_filter = ('category', 'operating_hours')  # Agrega filtros por categoría y horario de operación

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'business')  # Muestra estos campos en la lista de productos
    search_fields = ('name', 'business__name')  # Permite buscar productos por nombre y nombre del negocio
    list_filter = ('business', 'price')  # Agrega filtros por negocio y precio
