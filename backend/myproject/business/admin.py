from django.contrib import admin
from .models import Business, Product

@admin.register(Business)
class BusinessAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'operating_hours', 'approved')  # Mostrar el campo 'approved'
    search_fields = ('name', 'category')  # Permitir búsqueda por nombre y categoría
    list_filter = ('category', 'operating_hours', 'approved')  # Filtros por categoría, horarios y aprobación
    actions = ['approve_businesses']  # Acción personalizada para aprobar negocios

    def approve_businesses(self, request, queryset):
        """Aprobar negocios seleccionados."""
        queryset.update(approved=True)
        self.message_user(request, "Los negocios seleccionados han sido aprobados exitosamente.")
    approve_businesses.short_description = "Aprobar negocios seleccionados"

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'business')  # Mostrar nombre, precio y negocio
    search_fields = ('name', 'business__name')  # Permitir búsqueda por nombre del producto y del negocio
    list_filter = ('business', 'price')  # Filtros por negocio y precio
