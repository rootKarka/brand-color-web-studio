from rest_framework import serializers
from .models import Zona

class ZonaSerializer(serializers.ModelSerializer):

    total_jefes = serializers.IntegerField(
        read_only=True
    )

    class Meta:
        model = Zona
        fields = "__all__"