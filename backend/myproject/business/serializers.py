from rest_framework import serializers
from .models import Business, Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'offer_price', 'image', 'created_at']

class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = ['id', 'username', 'password', 'name', 'description', 'category', 'address', 'operating_hours', 'image', 'created_at', 'approved']

    def create(self, validated_data):
        business = Business(
            username=validated_data['username'],
            name=validated_data['name'],
            description=validated_data['description'],
            category=validated_data['category'],
            address=validated_data['address'],
            operating_hours=validated_data['operating_hours'],
            approved=False
        )
        business.set_password(validated_data['password'])
        business.save()
        return business
