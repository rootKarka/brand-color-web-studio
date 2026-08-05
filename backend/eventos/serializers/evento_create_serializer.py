from rest_framework import serializers

from eventos.models import Evento


class EventoCreateSerializer(serializers.ModelSerializer):
    """
    Serializer para crear eventos.
    """

    class Meta:
        model = Evento
        fields = (
            "nombre",
            "tipo",
            "descripcion",
            "fecha_inicio",
            "fecha_fin",
            "estado",
            "is_active",
        )

    def validate(self, attrs):

        if attrs["fecha_fin"] < attrs["fecha_inicio"]:
            raise serializers.ValidationError({
                "fecha_fin": "La fecha fin no puede ser menor que la fecha inicio."
            })

        return attrs