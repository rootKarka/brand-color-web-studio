from django.contrib import admin

from .models import Zona
from usuarios.models import UsuarioZona


class UsuarioZonaInline(admin.TabularInline):
    model = UsuarioZona
    extra = 1
    autocomplete_fields = ["usuario"]


@admin.register(Zona)
class ZonaAdmin(admin.ModelAdmin):

    inlines = [UsuarioZonaInline]

    list_display = (
        "nombre",
        "is_active",
        "created_at",
    )

    search_fields = (
        "nombre",
    )

    list_filter = (
        "is_active",
    )

    ordering = (
        "nombre",
    )