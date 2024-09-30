from rest_framework import serializers
from .models import Business, Product, Location
from django.contrib.auth import authenticate

# Serializador para la ubicación
class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'name', 'postal_code']

# Serializador para los productos
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'offer_price', 'image', 'created_at']

# Serializador para el negocio
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
            'approved': {'read_only': True},  # El campo 'approved' no debe ser modificado por el negocio
        }

    # Método para crear el negocio
    def create(self, validated_data):
        location_id = validated_data.pop('location_id', None)

        try:
            # Crear el negocio con los datos proporcionados
            business = Business.objects.create(
                username=validated_data['username'],
                email=validated_data.get('email', ''),
                name=validated_data.get('name', ''),
                description=validated_data.get('description', ''),
                address=validated_data.get('address', ''),
                location_id=location_id,
            )
            # Asignar y encriptar la contraseña
            business.set_password(validated_data['password'])
            business.save()
            return business
        except Exception as e:
            raise serializers.ValidationError(f"Error al crear el negocio: {str(e)}")

class BusinessAuthTokenSerializer(serializers.Serializer):
    username = serializers.CharField(label="Nombre de usuario")
    password = serializers.CharField(label="Contraseña", style={'input_type': 'password'}, trim_whitespace=False)

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        # Autenticar el negocio
        business = authenticate(username=username, password=password)

        if business is None:
            raise serializers.ValidationError('Credenciales incorrectas o la cuenta no está aprobada.', code='authorization')

        # Verificar si el negocio está aprobado
        if not business.approved: # type: ignore
            raise serializers.ValidationError('La cuenta aún no ha sido aprobada por el administrador.', code='authorization')

        # Añadir el negocio autenticado al contexto de validación
        attrs['user'] = business
        return attrs
