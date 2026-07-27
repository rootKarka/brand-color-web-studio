from rest_framework import serializers

from usuarios.models import Usuario

from .jefe_create_serializer import JefeCreateSerializer


class JefeUpdateSerializer(JefeCreateSerializer):
    """
    Serializer utilizado para actualizar un Jefe de Anexo.
    """

    class Meta(JefeCreateSerializer.Meta):
        model = Usuario

    def validate_dni(self, value):
        """
        Permite conservar el mismo DNI del usuario que se está editando,
        pero impide que exista duplicado con otro usuario.
        """

        usuario = self.instance

        if (
            Usuario.objects
            .exclude(pk=usuario.pk)
            .filter(dni=value)
            .exists()
        ):
            raise serializers.ValidationError(
                "Ya existe un usuario con ese DNI."
            )

        return value