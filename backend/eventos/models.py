from django.db import models

from common.models import ActiveModel
from common.choices import (
    TipoEvento,
    EstadoEvento
)


class Evento(ActiveModel):
    """
    Representa un evento de entrega
    (Azúcar, Canasta, Juguetes, etc.).
    """

    nombre = models.CharField(
        max_length=150,
        unique=True,
        help_text="Nombre del evento."
    )

    tipo = models.CharField(
        max_length=20,
        choices=TipoEvento.choices,
        default=TipoEvento.CANASTA
    )

    descripcion = models.TextField(
        blank=True
    )

    fecha_inicio = models.DateField()

    fecha_fin = models.DateField()

    estado = models.CharField(
        max_length=20,
        choices=EstadoEvento.choices,
        default=EstadoEvento.ACTIVO
    )

    class Meta:
        db_table = "eventos"
        verbose_name = "Evento"
        verbose_name_plural = "Eventos"
        ordering = ["-fecha_inicio"]

    def __str__(self):
        return self.nombre