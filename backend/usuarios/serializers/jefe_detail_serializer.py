from rest_framework import serializers

from usuarios.models import Usuario

from .jefe_list_serializer import JefeListSerializer

class JefeDetailSerializer(JefeListSerializer):
    """
    Serializer utilizado para obtener el detalle de un jefe de Anexo
    """
    username = serializers.CharField(read_only=True)
    email = serializers.EmailField(read_only=True)

    class Meta(JefeListSerializer.Meta):
        model = Usuario

        fields = JefeListSerializer.Meta.fields + (
            "username",
            "email",
            "date_joined",
        )