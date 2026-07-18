from django.contrib import admin

from .models import Area, Cargo


@admin.register(Area)
class AreaAdmin(admin.ModelAdmin):

    list_display = (
        "nombre",
        "is_active",
    )

    search_fields = (
        "nombre",
    )

    list_filter = (
        "is_active",
    )


@admin.register(Cargo)
class CargoAdmin(admin.ModelAdmin):

    list_display = (
        "nombre",
        "is_active",
    )

    search_fields = (
        "nombre",
    )

    list_filter = (
        "is_active",
    )