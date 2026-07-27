import secrets
import string

from django.db import transaction

from common.choices import RolUsuario
from usuarios.models import Usuario


class JefeService:
    """
    Servicio encargado de la lógica de negocio de los Jefes de Anexo.
    """

    @staticmethod
    @transaction.atomic
    def crear_jefe(validated_data: dict) -> Usuario:
        """
        Crea un nuevo jefe de anexo junto con sus zonas asignadas.

        Args:
            validated_data: Datos validados por el serializer.

        Returns:
            Usuario: Usuario creado.
        """

        # Extraemos las zonas
        zonas = validated_data.pop("zonas")

        # Generamos una contraseña temporal
        password_temporal = JefeService._generar_password()

        # Creamos el usuario
        usuario = Usuario(
            username=validated_data["dni"],
            rol=RolUsuario.JEFE_ANEXO,
            **validated_data,
        )

        # Ciframos la contraseña
        usuario.set_password(password_temporal)

        usuario.save()

        # Asignamos las zonas
        usuario.zonas.set(zonas)

        return {
            "usuario": usuario,
            "password_temporal": password_temporal,
        }

    @staticmethod
    @transaction.atomic
    def actualizar_jefe(
        usuario: Usuario,
        validated_data: dict,
    ) -> Usuario:
        """
        Actualiza la información de un Jefe de Anexo.
        """

        zonas = validated_data.pop("zonas", None)

        # Actualizamos los campos del usuario
        for campo, valor in validated_data.items():
            setattr(usuario, campo, valor)

        # Si cambia el DNI, también cambia el username
        usuario.username = usuario.dni

        usuario.save()

        # Actualizamos las zonas únicamente si fueron enviadas
        if zonas is not None:
            usuario.zonas.set(zonas)

        return usuario

    @staticmethod
    def _generar_password(longitud: int = 10) -> str:
        """
        Genera una contraseña temporal segura.
        """

        caracteres = string.ascii_letters + string.digits

        return "".join(
            secrets.choice(caracteres)
            for _ in range(longitud)
        )