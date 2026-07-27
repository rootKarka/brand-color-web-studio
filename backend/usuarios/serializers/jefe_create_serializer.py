from rest_framework import serializers

from usuarios.models import Usuario
from zonas.models import Zona


class JefeCreateSerializer(serializers.ModelSerializer):
    """
    Serializer utilizado para crear un Jefe de Anexo.
    """

    zonas = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Zona.objects.filter(is_active=True),
    )

    class Meta:
        model = Usuario

        fields = (
            "first_name",
            "last_name",
            "dni",
            "telefono",
            "zonas",
        )