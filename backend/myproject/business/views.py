from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Business, Product
from .serializers import BusinessSerializer, ProductSerializer, BusinessAuthTokenSerializer
from django.db.models import Q
from .permissions import IsSuperuser
from django.middleware.csrf import get_token
from django.http import JsonResponse
from .utils import notify_admin_of_new_business
from rest_framework.views import APIView

def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})

class BusinessViewSet(viewsets.ModelViewSet):
    queryset = Business.objects.all().order_by('-created_at')
    serializer_class = BusinessSerializer

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            permission_classes = [permissions.IsAuthenticated, IsSuperuser]
        elif self.action == 'create':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = super().get_queryset()
        search_term = self.request.query_params.get('search', None)  # type: ignore
        if search_term:
            queryset = queryset.filter(
                Q(name__icontains=search_term) |
                Q(description__icontains=search_term)
            )
        return queryset.filter(approved=True)

    def perform_create(self, serializer):
        business = serializer.save(approved=False)
        notify_admin_of_new_business(business.id)

    @action(detail=True, methods=['post'], permission_classes=[IsSuperuser], url_path='approve', url_name='approve')
    def approve_business(self, request, pk=None):
        try:
            business = self.get_object()
            business.approved = True
            business.save()
            # Agrega esto para confirmar la aprobación
            print(f"Negocio {business.name} aprobado con éxito. Estado: {business.approved}")
            return Response({'detail': 'Negocio aprobado exitosamente.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [permissions.IsAuthenticated, IsSuperuser]
        else:
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = super().get_queryset()
        business_id = self.request.query_params.get('business', None)  # type: ignore
        if business_id:
            queryset = queryset.filter(business_id=business_id)
        return queryset

    def perform_create(self, serializer):
        serializer.save()

# Custom authentication logic for businesses without using Django's built-in token system.
class CustomAuthToken(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = BusinessAuthTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})  # type: ignore
        if serializer.is_valid():  # type: ignore
            business = serializer.validated_data['business']  # type: ignore
            if not business.approved:
                return Response({"detail": "El negocio aún no ha sido aprobado."}, status=status.HTTP_400_BAD_REQUEST)

            # Create a simple token-like system (or use JWT or another mechanism if preferred)
            token = f"business-{business.pk}-{business.username}"
            return Response({
                'token': token,
                'business_id': business.pk,
                'name': business.name
            })
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
