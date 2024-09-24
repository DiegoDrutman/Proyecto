from rest_framework.permissions import BasePermission

class IsSuperuser(BasePermission):
    """
    Permiso personalizado que permite solo a los superadministradores (superusuarios)
    realizar ciertas acciones, como la aprobación de negocios.
    """

    def has_permission(self, request, view):
        # Verificar si el usuario está autenticado y si es un superusuario
        return bool(request.user and request.user.is_authenticated and request.user.is_superuser)
