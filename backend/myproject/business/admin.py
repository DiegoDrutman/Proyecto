from django.contrib import admin
from .models import Business, Product

@admin.register(Business)
class BusinessAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'opening_hours', 'closing_hours', 'approved')
    search_fields = ['name', 'email']
    list_filter = ('approved', 'opening_hours', 'closing_hours')
    ordering = ('-created_at',)

    def get_queryset(self, request):
        """
        Sobrescribe el queryset para excluir a los superusuarios de la lista de negocios.
        """
        qs = super().get_queryset(request)
        return qs.filter(is_superuser=False)  # Excluir superusuarios

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'business', 'price', 'offer_price', 'created_at')
    search_fields = ('name', 'business__name')
    list_filter = ('created_at', 'price')
    ordering = ('-created_at',)
