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

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserProfile
        fields = '__all__'

    def create(self, validated_data):
        user_data = validated_data.pop('user')

        # Validar duplicados antes de crear
        if User.objects.filter(username=user_data['username']).exists():
            raise serializers.ValidationError({"username": "Este nombre de usuario ya está en uso."})
        if User.objects.filter(email=user_data['email']).exists():
            raise serializers.ValidationError({"email": "Este correo electrónico ya está en uso."})

        user = User.objects.create_user(**user_data)
        profile = UserProfile.objects.create(user=user, **validated_data)
        return profile
    
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
