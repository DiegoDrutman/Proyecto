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
        fields = [
            'id', 'username', 'password', 'email', 'name', 'description',
            'address', 'opening_hours', 'closing_hours', 'work_days', 'image', 
            'created_at', 'approved'
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        business = Business(
            username=validated_data['username'],
            email=validated_data['email'],
            name=validated_data['name'],
            description=validated_data['description'],
            address=validated_data['address'],
            opening_hours=validated_data['opening_hours'],
            closing_hours=validated_data['closing_hours'],
            work_days=validated_data['work_days'],
            image=validated_data.get('image', None),  # Logo opcional
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
