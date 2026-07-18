from rest_framework import viewsets

from .models import Zona
from .serializers import ZonaSerializer


class ZonaViewSet(viewsets.ModelViewSet):
    serializer_class = ZonaSerializer
    queryset = Zona.objects.filter(is_active=True)