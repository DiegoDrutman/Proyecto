from rest_framework import serializers
from .models import Recipe, UserProfile, Comment, Rating
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        # Create the user with validated data
        user = User.objects.create_user(**validated_data)
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email')
        extra_kwargs = {
            'password': {'write_only': True}  # No devolver la contraseña en la respuesta
        }

# Serializador para el modelo UserProfile
class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()  # Anidar el serializador de User para manejar los datos de usuario

    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'avatar', 'bio', 'joined_date']

    def create(self, validated_data):
        # Extraer datos de usuario del perfil
        user_data = validated_data.pop('user')

        # Validar duplicados antes de crear el usuario
        if User.objects.filter(username=user_data['username']).exists():
            raise serializers.ValidationError({"username": "Este nombre de usuario ya está en uso."})
        if User.objects.filter(email=user_data['email']).exists():
            raise serializers.ValidationError({"email": "Este correo electrónico ya está en uso."})

        # Crear usuario
        user = User.objects.create_user(**user_data)

        # Crear perfil de usuario
        profile = UserProfile.objects.create(user=user, **validated_data)
        return profile

    def update(self, instance, validated_data):
        # Permitir la actualización de los campos de usuario
        user_data = validated_data.pop('user', None)

        # Actualizar los datos de usuario
        if user_data:
            user = instance.user
            user.username = user_data.get('username', user.username)
            user.email = user_data.get('email', user.email)
            user.save()

        # Actualizar los datos de perfil
        instance.avatar = validated_data.get('avatar', instance.avatar)
        instance.bio = validated_data.get('bio', instance.bio)
        instance.save()

        return instance
    
class RecipeSerializer(serializers.ModelSerializer):
    comments = serializers.StringRelatedField(many=True, read_only=True)
    ratings = serializers.StringRelatedField(many=True, read_only=True)
    is_favorited = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Recipe
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'
