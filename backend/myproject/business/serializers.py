from rest_framework import serializers
from .models import Business, Product
from django.contrib.auth import authenticate

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'offer_price', 'image', 'created_at']
        
class BusinessSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)  # Agregar esta línea

    class Meta:
        model = Business
        fields = [
            'id', 'username', 'password', 'email', 'name', 'description',
            'address', 'opening_hours', 'closing_hours', 'work_days', 'image', 
            'created_at', 'approved', 'products'
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
            approved=False  # El negocio debe ser aprobado manualmente
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
            business = authenticate(username=username, password=password)
            if business is None:
                raise serializers.ValidationError('Credenciales incorrectas. Por favor, inténtelo de nuevo.', code='authorization')
            if not business.approved:
                raise serializers.ValidationError('Tu cuenta no ha sido aprobada. Contacta al administrador.', code='authorization')
        else:
            raise serializers.ValidationError('Debe incluir "username" y "password".', code='authorization')

        attrs['business'] = business
        return attrs
