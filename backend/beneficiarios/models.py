from django.db import models

from common.models import ActiveModel
from common.models import BaseModel



class Beneficiario(ActiveModel):
    """
    Trabajador beneficiario de un evento.
    """

    dni = models.CharField(
        max_length=8,
        unique=True
    )

    codigo_trabajador = models.CharField(
        max_length=20,
        unique=True
    )

    nombres = models.CharField(
        max_length=100
    )

    apellidos = models.CharField(
        max_length=100
    )

    area = models.ForeignKey(
        "catalogos.Area",
        on_delete=models.PROTECT,
        related_name="beneficiarios"
    )

    cargo = models.ForeignKey(
        "catalogos.Cargo",
        on_delete=models.PROTECT,
        related_name="beneficiarios"
    )

    antiguedad = models.PositiveIntegerField()

    class Meta:
        db_table = "beneficiarios"
        verbose_name = "Beneficiario"
        verbose_name_plural = "Beneficiarios"
        ordering = [
            "apellidos",
            "nombres",
        ]

    def __str__(self):
        return f"{self.apellidos}, {self.nombres}"

    @property
    def nombre_completo(self):
        return f"{self.nombres} {self.apellidos}"
    




class BeneficiarioEvento(BaseModel):
    """
    Relación entre un beneficiario y un evento.
    """

    beneficiario = models.ForeignKey(
        Beneficiario,
        on_delete=models.CASCADE,
        related_name="eventos"
    )

    evento = models.ForeignKey(
        "eventos.Evento",
        on_delete=models.CASCADE,
        related_name="beneficiarios"
    )

    elegible = models.BooleanField(
        default=True
    )

    class Meta:
        db_table = "beneficiario_evento"

        verbose_name = "Beneficiario del Evento"

        verbose_name_plural = "Beneficiarios por Evento"

        constraints = [
            models.UniqueConstraint(
                fields=[
                    "beneficiario",
                    "evento"
                ],
                name="unique_beneficiario_evento"
            )
        ]

    def __str__(self):
        return f"{self.beneficiario.nombre_completo} - {self.evento.nombre}"