from rest_framework.permissions import BasePermission

class IsSuperuser(BasePermission):
    """
    Permiso para permitir solo a los superadministradores realizar ciertas acciones.
    """

    def has_permission(self, request, view):
        # Solo permitir si el usuario es un superusuario
        return request.user and request.user.is_superuser

class IsOwnerOrReadOnly(BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # SAFE_METHODS are HTTP methods that do not modify objects (like GET, HEAD, OPTIONS)
        if request.method in ('GET', 'HEAD', 'OPTIONS'):
            return True

        # Instance must have an attribute named 'user'.
        return obj.user == request.user or request.user.is_superuser
