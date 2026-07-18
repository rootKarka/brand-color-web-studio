from django.contrib import admin

from .models import Evento


@admin.register(Evento)
class EventoAdmin(admin.ModelAdmin):

    list_display = (
        "nombre",
        "tipo",
        "estado",
        "fecha_inicio",
        "fecha_fin",
        "is_active",
    )

    search_fields = (
        "nombre",
    )

    list_filter = (
        "tipo",
        "estado",
        "is_active",
    )

    ordering = (
        "-fecha_inicio",
    )