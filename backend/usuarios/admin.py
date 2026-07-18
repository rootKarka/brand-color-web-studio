from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Usuario, UsuarioZona


class UsuarioZonaInline(admin.TabularInline):
    model = UsuarioZona
    extra = 1
    autocomplete_fields = ["zona"]


@admin.register(Usuario)
class UsuarioAdmin(UserAdmin):

    inlines = [UsuarioZonaInline]

    list_display = (
        "username",
        "first_name",
        "last_name",
        "dni",
        "rol",
        "is_active",
    )

    list_filter = (
        "rol",
        "is_active",
        "is_staff",
    )

    search_fields = (
        "username",
        "dni",
        "first_name",
        "last_name",
        "email",
    )

    ordering = (
        "first_name",
        "last_name",
    )

    fieldsets = (
        ("Credenciales", {
            "fields": (
                "username",
                "password",
            )
        }),

        ("Información personal", {
            "fields": (
                "first_name",
                "last_name",
                "dni",
                "email",
                "telefono",
            )
        }),

        ("Permisos", {
            "fields": (
                "rol",
                "is_active",
                "is_staff",
                "is_superuser",
                "groups",
                "user_permissions",
            )
        }),

        ("Fechas", {
            "fields": (
                "last_login",
                "date_joined",
                "updated_at",
            )
        }),
    )

    readonly_fields = (
        "date_joined",
        "last_login",
        "updated_at",
    )