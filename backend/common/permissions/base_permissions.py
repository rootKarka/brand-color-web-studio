from rest_framework.permissions import BasePermission
from common.choices import RolUsuario

class IsAdministrador(BasePermission):
    """
    Permite el acceso únicamente a usuarios con rol Administrador.
    """

    message = "No tienes permisos para realizar esta acción."

    def has_permission(self, request, view):

        usuario = request.user

        return (
        usuario.is_authenticated
        and usuario.rol == RolUsuario.ADMINISTRADOR
        )