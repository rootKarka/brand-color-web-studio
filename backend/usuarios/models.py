from django.contrib.auth.models import AbstractUser
from django.db import models
from common.models import ActiveModel

from django.conf import settings
from common.models import BaseModel
from common.choices import RolUsuario


class Usuario(AbstractUser, BaseModel):
    dni = models.CharField(
        max_length=8,
        unique=True,
        verbose_name="DNI"
    )

    telefono = models.CharField(
        max_length=20,
        blank=True,
        verbose_name="Teléfono"
    )

    rol = models.CharField(
        max_length=20,
        choices=RolUsuario.choices,
        default=RolUsuario.JEFE_ANEXO,
        verbose_name="Rol"
    )

    zonas = models.ManyToManyField(
    "zonas.Zona",
    through="usuarios.UsuarioZona",
    related_name="usuarios",
    blank=True,
    )

    # Sobrescribimos los nombres para usar más espacio
    first_name = models.CharField(
        "Nombres",
        max_length=100
    )

    last_name = models.CharField(
        "Apellidos",
        max_length=100
    )

    class Meta:
        db_table = "usuarios"
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"
        ordering = ["first_name", "last_name"]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def nombre_completo(self):
      return self.get_full_name()
    

class UsuarioZona(ActiveModel):

    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="asignaciones_zona"
    )

    zona = models.ForeignKey(
        "zonas.Zona",
        on_delete=models.CASCADE,
        related_name="asignaciones_usuario"
    )

    class Meta:
        db_table = "usuario_zona"

        ordering = [
            "zona__nombre",
            "usuario__first_name",
        ]

        constraints = [
            models.UniqueConstraint(
                fields=["usuario", "zona"],
                name="unique_usuario_zona"
            )
        ]

    def __str__(self):
        return f"{self.usuario.get_full_name()} - {self.zona.nombre}"