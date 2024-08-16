from rest_framework import serializers
from .models import Business, Product
from django.contrib.auth import authenticate

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

class BusinessAuthTokenSerializer(serializers.Serializer):
    username = serializers.CharField(label="Username")
    password = serializers.CharField(label="Password", style={'input_type': 'password'}, trim_whitespace=False)

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            business = Business.objects.filter(username=username, approved=True).first()
            if business is None or not business.check_password(password):
                raise serializers.ValidationError('Unable to log in with provided credentials.', code='authorization')
        else:
            raise serializers.ValidationError('Must include "username" and "password".', code='authorization')

        attrs['business'] = business
        return attrs
