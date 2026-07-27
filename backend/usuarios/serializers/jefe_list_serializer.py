from rest_framework import serializers

from usuarios.models import Usuario

from .zona_simple_serializer import ZonaSimpleSerializer


class JefeListSerializer(serializers.ModelSerializer):
    """
    Serializer utilizado para listar los jefes de anexo.
    """

    nombre_completo = serializers.CharField(read_only=True)
    zonas = ZonaSimpleSerializer(many=True, read_only=True)

    class Meta:
        model = Usuario

        fields = (
            "id",
            "nombre_completo",
            "dni",
            "telefono",
            "zonas",
            "is_active",
            "last_login",
        )