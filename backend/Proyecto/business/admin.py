from django.contrib import admin
from .models import Business, Product

@admin.register(Business)
class BusinessAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'address', 'approved')
    search_fields = ['name', 'email']
    list_filter = ('approved', 'location')

    # Solo el superadmin debería poder realizar la acción de aprobar negocios
    actions = ['approve_businesses']

    def approve_businesses(self, request, queryset):
        """
        Acción personalizada para aprobar negocios seleccionados.
        Solo disponible para el superadmin.
        """
        if request.user.is_superuser:
            updated_count = queryset.update(approved=True)
            self.message_user(request, f'{updated_count} negocios han sido aprobados.')
        else:
            self.message_user(request, 'Solo el superadmin puede aprobar negocios.', level='error')
    
    approve_businesses.short_description = 'Aprobar negocios seleccionados'


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'business', 'price', 'offer_price')
    search_fields = ('name', 'business__name')
    list_filter = ('price', 'business')  # Asegúrate de que 'list_filter' es un iterable
