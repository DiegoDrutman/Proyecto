from rest_framework import serializers
from .models import Business, Product
from django.contrib.auth import authenticate
from .models import Location, Zone

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'name', 'postal_code']

class ZoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zone
        fields = ['id', 'name', 'location']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'offer_price', 'image', 'created_at']

class BusinessSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Business
        fields = [
            'id', 'username', 'password', 'email', 'name', 'description',
            'address', 'opening_hours', 'closing_hours', 'work_days', 'logo',
            'created_at', 'approved', 'products'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'approved': {'read_only': True},  # Para evitar que el usuario modifique este campo directamente
        }

    def create(self, validated_data):
        business = Business(
            username=validated_data['username'],
            email=validated_data['email'],
            name=validated_data.get('name', ''),
            description=validated_data.get('description', ''),
            address=validated_data.get('address', ''),
            opening_hours=validated_data.get('opening_hours', ''),
            closing_hours=validated_data.get('closing_hours', ''),
            work_days=validated_data.get('work_days', ''),
            logo=validated_data.get('logo', None),
        )
        business.set_password(validated_data['password'])
        business.save()
        return business

    def validate_address(self, value):
        if not value:
            raise serializers.ValidationError("La dirección no puede estar vacía.")
        return value

class BusinessAuthTokenSerializer(serializers.Serializer):
    username = serializers.CharField(label="Nombre de usuario")
    password = serializers.CharField(label="Contraseña", style={'input_type': 'password'}, trim_whitespace=False)

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        
        print(f"Autenticando: {username}")  # Añade esto para verificar el username
        
        if username and password:
            # Autenticar al negocio
            business = authenticate(username=username, password=password)
            
            if business is None:
                raise serializers.ValidationError('Credenciales incorrectas. Por favor, inténtelo de nuevo.', code='authorization')
            if not business.approved:
                raise serializers.ValidationError('Tu cuenta no ha sido aprobada. Contacta al administrador.', code='authorization')
        else:
            raise serializers.ValidationError('Debe incluir "username" y "password".', code='authorization')

        attrs['business'] = business
        return attrs