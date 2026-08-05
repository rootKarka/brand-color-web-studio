from rest_framework import serializers

from eventos.models import Evento


class EventoDetailSerializer(serializers.ModelSerializer):
    """
    Serializer de detalle de un evento.
    """

    class Meta:
        model = Evento
        fields = (
            "id",
            "nombre",
            "tipo",
            "descripcion",
            "fecha_inicio",
            "fecha_fin",
            "estado",
            "is_active",
            "created_at",
            "updated_at",
        )