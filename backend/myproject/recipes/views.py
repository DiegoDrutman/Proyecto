# recipes/views.py

from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Recipe, UserProfile, Comment, Rating
from .serializers import RecipeSerializer, UserProfileSerializer, CommentSerializer, RatingSerializer

class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all().order_by('-created_at')
    serializer_class = RecipeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(detail=True, methods=['post'])
    def favorite(self, request, pk=None):
        recipe = self.get_object()
        if recipe.is_favorited.filter(id=request.user.id).exists():
            recipe.is_favorited.remove(request.user)
            return Response({'status': 'unfavorited'}, status=status.HTTP_200_OK)
        else:
            recipe.is_favorited.add(request.user)
            return Response({'status': 'favorited'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def rate(self, request, pk=None):
        recipe = self.get_object()
        rating_value = request.data.get('rating')
        if rating_value and 1 <= rating_value <= 5:
            rating, created = Rating.objects.get_or_create(user=request.user, recipe=recipe)
            rating.rating = rating_value
            rating.save()
            return Response({'status': 'rated'}, status=status.HTTP_200_OK)
        return Response({'status': 'bad request'}, status=status.HTTP_400_BAD_REQUEST)

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
