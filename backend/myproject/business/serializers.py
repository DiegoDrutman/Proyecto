from rest_framework import serializers
from .models import Business, Product, Location
from django.contrib.auth import authenticate
from .models import Location

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
            'address', 'opening_hours', 'closing_hours', 'work_days', 'logo',
            'location', 'location_id', 'created_at', 'approved'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'approved': {'read_only': True},
        }

    def create(self, validated_data):
        location = validated_data.pop('location_id', None)
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
            location_id=location
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
        business = authenticate(username=username, password=password)

        if business is None:
            raise serializers.ValidationError('Credenciales incorrectas.', code='authorization')
        if not business.approved:
            raise serializers.ValidationError('Tu cuenta no ha sido aprobada. Contacta al administrador.', code='authorization')

        attrs['user'] = business
        return attrs
