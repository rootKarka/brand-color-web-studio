from django.db import models

from common.models import ActiveModel


class Zona(ActiveModel):

    nombre = models.CharField(
        max_length=100,
        unique=True
    )

    descripcion = models.TextField(
        blank=True,
        null=True
    )

    class Meta:
        db_table = "zonas"
        verbose_name = "Zona"
        verbose_name_plural = "Zonas"
        ordering = ["nombre"]

    def __str__(self):
        return self.nombre