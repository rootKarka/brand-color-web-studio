from django.db import models
from common.models import BaseModel
from usuarios.models import Usuario
from zonas.models import Zona
from beneficiarios.models import BeneficiarioEvento
from django.core.validators import RegexValidator


class TipoEntrega(models.TextChoices):
    TITULAR = "TITULAR", "Titular"
    TERCERO = "TERCERO", "Tercero"


class EstadoEntrega(models.TextChoices):
    PENDIENTE = "PENDIENTE", "Pendiente"
    ENTREGADO = "ENTREGADO", "Entregado"
    RECHAZADO = "RECHAZADO", "Rechazado"


class EstadoAutorizacion(models.TextChoices):
    PENDIENTE = "PENDIENTE", "Pendiente"
    APROBADO = "APROBADO", "Aprobado"
    RECHAZADO = "RECHAZADO", "Rechazado"


class Entrega(BaseModel):
    beneficiario_evento = models.ForeignKey(
        BeneficiarioEvento,
        on_delete=models.CASCADE,
        related_name="entregas"
    )

    usuario = models.ForeignKey(
        Usuario,
        on_delete=models.PROTECT,
        related_name="entregas_registradas"
    )

    zona = models.ForeignKey(
        Zona,
        on_delete=models.PROTECT,
        related_name="entregas"
    )

    fecha_entrega = models.DateTimeField(auto_now_add=True)

    tipo_entrega = models.CharField(
        max_length=10,
        choices=TipoEntrega.choices,
        default=TipoEntrega.TITULAR
    )

    estado = models.CharField(
        max_length=15,
        choices=EstadoEntrega.choices,
        default=EstadoEntrega.PENDIENTE
    )

    observacion = models.TextField(
        blank=True,
        null=True
    )

    class Meta:
        db_table = "entrega"
        verbose_name = "Entrega"
        verbose_name_plural = "Entregas"
        ordering = ["-fecha_entrega"]

    def __str__(self):
        return f"Entrega #{self.id} - {self.beneficiario_evento}"


class EntregaTercero(BaseModel):
    entrega = models.OneToOneField(
        Entrega,
        on_delete=models.CASCADE,
        related_name="tercero"
    )

    dni_autorizado = models.CharField(
        max_length=8,
        validators=[
            RegexValidator(
                regex=r'^\d{8}$',
                message="El DNI debe tener exactamente 8 dígitos."
            )
        ]
    )

    nombre_autorizado = models.CharField(max_length=150)

    parentesco = models.CharField(max_length=50)

    estado = models.CharField(
        max_length=15,
        choices=EstadoAutorizacion.choices,
        default=EstadoAutorizacion.PENDIENTE
    )

    observacion = models.TextField(
        blank=True,
        null=True
    )

    autorizado_por = models.ForeignKey(
        Usuario,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="autorizaciones_entrega"
    )

    fecha_autorizacion = models.DateTimeField(
        null=True,
        blank=True
    )

    class Meta:
        db_table = "entrega_tercero"
        verbose_name = "Entrega a tercero"
        verbose_name_plural = "Entregas a terceros"

    def __str__(self):
        return self.nombre_autorizado