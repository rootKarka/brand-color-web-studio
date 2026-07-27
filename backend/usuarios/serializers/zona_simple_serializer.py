from rest_framework import serializers

from zonas.models import Zona


class ZonaSimpleSerializer(serializers.ModelSerializer):
    """
    Serializer simplificado de Zona.
    Se utiliza cuando una zona forma parte de otro recurso.
    """

    class Meta:
        model = Zona
        fields = (
            "id",
            "nombre",
        )