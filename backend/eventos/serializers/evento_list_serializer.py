from rest_framework import serializers

from eventos.models import Evento


class EventoListSerializer(serializers.ModelSerializer):
    """
    Serializer para listar eventos.
    """

    class Meta:
        model = Evento
        fields = (
            "id",
            "nombre",
            "tipo",
            "estado",
            "fecha_inicio",
            "fecha_fin",
            "is_active",
        )