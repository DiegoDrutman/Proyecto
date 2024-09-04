from rest_framework import serializers
from .models import Business, Product, Location
from django.contrib.auth import authenticate

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'name', 'postal_code']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'offer_price', 'image', 'created_at']

class BusinessSerializer(serializers.ModelSerializer):
    location_id = serializers.PrimaryKeyRelatedField(
        queryset=Location.objects.all(),
        write_only=True
    )
    location = LocationSerializer(read_only=True)

    class Meta:
        model = Business
        fields = [
            'id', 'username', 'password', 'email', 'name', 'description',
            'address', 'location', 'location_id', 'created_at', 'approved'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'approved': {'read_only': True},
        }

    def create(self, validated_data):
        location = validated_data.pop('location_id')

        # Asegurarse de que 'location' es un número, no un objeto
        if isinstance(location, Location):
            location = location.id

        business = Business.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            name=validated_data.get('name', ''),
            description=validated_data.get('description', ''),
            address=validated_data.get('address', ''),
            location_id=location,  # Asegurarse de que location_id sea un número
        )
        business.set_password(validated_data['password'])
        business.save()
        return business

class BusinessAuthTokenSerializer(serializers.Serializer):
    username = serializers.CharField(label="Nombre de usuario")
    password = serializers.CharField(label="Contraseña", style={'input_type': 'password'}, trim_whitespace=False)

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        # Autenticar el negocio
        business = authenticate(username=username, password=password)

        if business is None:
            raise serializers.ValidationError('Credenciales incorrectas o cuenta no aprobada.', code='authorization')

        # Si todo está bien, añade el negocio a los atributos validados
        attrs['user'] = business
        return attrs
