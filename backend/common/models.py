from django.db import models


class BaseModel(models.Model):
    """
    Modelo base con auditoría de fechas.
    """

    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Fecha de creación"
    )

    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Última actualización"
    )

    class Meta:
        abstract = True


class ActiveModel(BaseModel):
    """
    Modelo base para entidades que pueden activarse/desactivarse.
    """

    is_active = models.BooleanField(
        default=True,
        verbose_name="Activo"
    )

    class Meta:
        abstract = True

    def activar(self):
        self.is_active = True
        self.save(update_fields=["is_active"])

    def desactivar(self):
        self.is_active = False
        self.save(update_fields=["is_active"])