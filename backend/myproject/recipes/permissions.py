from rest_framework.permissions import BasePermission

class IsSuperuser(BasePermission):
    """
    Permiso para solo permitir al superadministrador realizar ciertas acciones.
    """
    def has_permission(self, request, view):
        # Solo el superusuario puede realizar operaciones de escritura
        return request.user and request.user.is_superuser
