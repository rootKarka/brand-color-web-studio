from django.contrib import admin
from .models import Entrega, EntregaTercero


@admin.register(Entrega)
class EntregaAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "beneficiario_evento",
        "usuario",
        "zona",
        "tipo_entrega",
        "estado",
        "fecha_entrega",
    )

    list_filter = (
        "estado",
        "tipo_entrega",
        "zona",
    )

    search_fields = (
        "beneficiario_evento__id",
        "usuario__username",
    )


@admin.register(EntregaTercero)
class EntregaTerceroAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "entrega",
        "nombre_autorizado",
        "dni_autorizado",
        "estado",
    )

    list_filter = (
        "estado",
    )

    search_fields = (
        "nombre_autorizado",
        "dni_autorizado",
    )