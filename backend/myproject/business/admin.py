from django.contrib import admin
from .models import Business, Product, CustomerUser

@admin.register(Business)
class BusinessAdmin(admin.ModelAdmin):
    list_display = ('name', 'opening_hours', 'closing_hours', 'approved')
    search_fields = ['name']
    list_filter = ( 'opening_hours', 'closing_hours', 'approved')

@admin.register(CustomerUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'is_staff', 'is_superuser')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'business')  # Mostrar nombre, precio y negocio
    search_fields = ('name', 'business__name')  # Permitir búsqueda por nombre del producto y del negocio
    list_filter = ('business', 'price')  # Filtros por negocio y precio
