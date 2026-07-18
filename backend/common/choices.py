from django.db import models


class RolUsuario(models.TextChoices):
    ADMIN = "ADMIN", "Administrador"
    JEFE_ANEXO = "JEFE_ANEXO", "Jefe de Anexo"


class EstadoEvento(models.TextChoices):
    ACTIVO = "ACTIVO", "Activo"
    CERRADO = "CERRADO", "Cerrado"


class TipoEvento(models.TextChoices):
    AZUCAR = "AZUCAR", "Azúcar"
    CANASTA = "CANASTA", "Canasta"
    JUGUETES = "JUGUETES", "Juguetes"


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