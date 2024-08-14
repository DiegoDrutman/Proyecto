from rest_framework.permissions import BasePermission

class IsSuperuser(BasePermission):
    """
    Permiso para permitir solo a los superadministradores realizar ciertas acciones.
    """

    def has_permission(self, request, view):
        # Solo permitir si el usuario es un superusuario
        return request.user and request.user.is_superuser
