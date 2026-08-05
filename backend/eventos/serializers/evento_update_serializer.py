from rest_framework import serializers

from eventos.models import Evento


class EventoUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer para actualizar eventos.
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

        inicio = attrs.get(
            "fecha_inicio",
            self.instance.fecha_inicio,
        )

        fin = attrs.get(
            "fecha_fin",
            self.instance.fecha_fin,
        )

        if fin < inicio:
            raise serializers.ValidationError({
                "fecha_fin": "La fecha fin no puede ser menor que la fecha inicio."
            })

        return attrs