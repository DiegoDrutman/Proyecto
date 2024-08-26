from django.contrib import admin
from .models import Business, Product, CustomerUser

@admin.register(Business)
class BusinessAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'opening_hours', 'closing_hours', 'approved')
    search_fields = ['name', 'email']
    list_filter = ('approved', 'opening_hours', 'closing_hours')
    ordering = ('-created_at',)

@admin.register(CustomerUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'is_staff', 'is_superuser', 'last_login')
    search_fields = ['username']
    list_filter = ('is_staff', 'is_superuser')
    ordering = ('-last_login',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'business', 'price', 'offer_price', 'created_at')
    search_fields = ('name', 'business__name')
    list_filter = ('created_at', 'price')
    ordering = ('-created_at',)
