from django.contrib import admin
from .models import Business, Product

@admin.register(Business)
class BusinessAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'address', 'approved')  # Añadido 'approved'
    search_fields = ['name', 'email']
    list_filter = ('approved', 'location')  # Puedes filtrar por 'approved' y 'location'

    # Acción personalizada para aprobar negocios
    actions = ['approve_businesses']

    def approve_businesses(self, request, queryset):
        """
        Acción personalizada para aprobar negocios seleccionados.
        """
        updated_count = queryset.update(approved=True)
        self.message_user(request, f'{updated_count} negocios han sido aprobados.')
    
    approve_businesses.short_description = 'Aprobar negocios seleccionados'


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'business', 'price', 'offer_price')
    search_fields = ('name', 'business__name')
    list_filter = ('price', 'business')  # Asegúrate de que 'list_filter' es un iterable

