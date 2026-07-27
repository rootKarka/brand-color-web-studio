from rest_framework import serializers

from .jefe_list_serializer import JefeListSerializer


class JefeCreateResponseSerializer(serializers.Serializer):
    """
    Serializer de respuesta para la creación de un Jefe de Anexo.
    """

    message = serializers.CharField()
    password_temporal = serializers.CharField()
    usuario = JefeListSerializer()