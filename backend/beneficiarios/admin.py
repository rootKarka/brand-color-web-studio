from django.contrib import admin

from .models import (
    Beneficiario,
    BeneficiarioEvento
)


@admin.register(Beneficiario)
class BeneficiarioAdmin(admin.ModelAdmin):

    list_display = (
        "codigo_trabajador",
        "nombre_completo",
        "dni",
        "area",
        "cargo",
        "is_active",
    )

    search_fields = (
        "codigo_trabajador",
        "dni",
        "nombres",
        "apellidos",
    )

    list_filter = (
        "area",
        "cargo",
        "is_active",
    )


@admin.register(BeneficiarioEvento)
class BeneficiarioEventoAdmin(admin.ModelAdmin):

    list_display = (
        "beneficiario",
        "evento",
        "elegible",
        "created_at",
    )

    search_fields = (
        "beneficiario__nombres",
        "beneficiario__apellidos",
        "evento__nombre",
    )

    list_filter = (
        "evento",
        "elegible",
    )