from rest_framework import viewsets
from django.db.models import Count, Q
from common.choices import RolUsuario

from .models import Zona
from .serializers import ZonaSerializer

class ZonaViewSet(viewsets.ModelViewSet):
    serializer_class = ZonaSerializer

    queryset = (
        Zona.objects
        .annotate(
            total_jefes=Count(
                "asignaciones_usuario",
                filter=Q(
                    asignaciones_usuario__is_active=True,
                    asignaciones_usuario__usuario__is_active=True,
                    asignaciones_usuario__usuario__rol=RolUsuario.JEFE_ANEXO,
                ),
                distinct=True,
            )
        )
        .order_by("-is_active", "nombre")
    )