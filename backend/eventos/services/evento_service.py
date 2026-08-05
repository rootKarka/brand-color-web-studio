from django.db import transaction

from eventos.models import Evento


class EventoService:
    """
    Servicio encargado de la lógica de negocio de los eventos.
    """

    @staticmethod
    @transaction.atomic
    def crear_evento(validated_data: dict) -> Evento:
        """
        Crea un nuevo evento.

        Args:
            validated_data: Datos validados por el serializer.

        Returns:
            Evento creado.
        """

        evento = Evento.objects.create(
            **validated_data
        )

        return evento

    @staticmethod
    @transaction.atomic
    def actualizar_evento(
        evento: Evento,
        validated_data: dict,
    ) -> Evento:
        """
        Actualiza un evento existente.

        Args:
            evento: Instancia del evento.
            validated_data: Datos validados.

        Returns:
            Evento actualizado.
        """

        for campo, valor in validated_data.items():
            setattr(evento, campo, valor)

        evento.save()

        return evento