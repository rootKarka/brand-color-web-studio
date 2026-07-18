from django.db import models

from common.models import ActiveModel


class Area(ActiveModel):
    """
    Área de trabajo dentro de Casa Grande.
    """

    nombre = models.CharField(
        max_length=100,
        unique=True,
        help_text="Nombre del área."
    )

    descripcion = models.TextField(
        blank=True
    )

    class Meta:
        db_table = "areas"
        verbose_name = "Área"
        verbose_name_plural = "Áreas"
        ordering = ["nombre"]

    def __str__(self):
        return self.nombre


class Cargo(ActiveModel):
    """
    Cargo desempeñado por un trabajador.
    """

    nombre = models.CharField(
        max_length=100,
        unique=True,
        help_text="Nombre del cargo."
    )

    descripcion = models.TextField(
        blank=True
    )

    class Meta:
        db_table = "cargos"
        verbose_name = "Cargo"
        verbose_name_plural = "Cargos"
        ordering = ["nombre"]

    def __str__(self):
        return self.nombre