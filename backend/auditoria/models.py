from django.conf import settings
from django.db import models

from common.models import BaseModel


class Auditoria(BaseModel):
    """
    Registro de acciones realizadas por los usuarios del sistema.
    """

    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="auditorias",
        help_text="Usuario que realizó la acción."
    )

    accion = models.CharField(
        max_length=100,
        help_text="Acción realizada."
    )

    descripcion = models.TextField(
        blank=True,
        help_text="Descripción detallada de la acción."
    )

    metodo_http = models.CharField(
        max_length=10,
        blank=True,
        help_text="Método HTTP utilizado."
    )

    endpoint = models.CharField(
        max_length=255,
        blank=True,
        help_text="Ruta de la API consumida."
    )

    ip = models.GenericIPAddressField(
        null=True,
        blank=True,
        help_text="Dirección IP desde donde se realizó la acción."
    )

    class Meta:
        db_table = "auditoria"
        verbose_name = "Auditoría"
        verbose_name_plural = "Auditorías"
        ordering = ["-created_at"]

    def __str__(self):
        usuario = self.usuario.username if self.usuario else "Sistema"
        return f"{usuario} - {self.accion}"