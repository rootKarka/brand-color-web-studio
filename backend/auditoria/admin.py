from django.contrib import admin

from .models import Auditoria


@admin.register(Auditoria)
class AuditoriaAdmin(admin.ModelAdmin):

    list_display = (
        "usuario",
        "accion",
        "metodo_http",
        "endpoint",
        "ip",
        "created_at",
    )

    search_fields = (
        "usuario__username",
        "accion",
        "descripcion",
        "endpoint",
    )

    list_filter = (
        "accion",
        "metodo_http",
        "created_at",
    )

    ordering = (
        "-created_at",
    )

    readonly_fields = (
        "usuario",
        "accion",
        "descripcion",
        "metodo_http",
        "endpoint",
        "ip",
        "created_at",
        "updated_at",
    )