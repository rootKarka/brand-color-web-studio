from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from common.choices import RolUsuario
from usuarios.models import Usuario
from usuarios.serializers import (
    JefeCreateSerializer,
    JefeDetailSerializer,
    JefeCreateResponseSerializer,
    JefeListSerializer,
    JefeUpdateSerializer,
)
from usuarios.services import JefeService


class JefeViewSet(ModelViewSet):
    """
    ViewSet para la gestión de Jefes de Anexo.
    """

    http_method_names = ["get", "post", "patch",]

    def get_queryset(self):
        return (
            Usuario.objects
            .filter(rol=RolUsuario.JEFE_ANEXO)
            .prefetch_related("zonas")
            .order_by("first_name", "last_name")
        )

    def get_serializer_class(self):

        if self.action == "create":
            return JefeCreateSerializer

        if self.action == "retrieve":
            return JefeDetailSerializer

        if self.action in ["update", "partial_update"]:
            return JefeUpdateSerializer

        return JefeListSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        resultado = JefeService.crear_jefe(serializer.validated_data)

        response = JefeCreateResponseSerializer(
            {
                "message": "Jefe de Anexo creado correctamente.",
                "password_temporal": resultado["password_temporal"],
                "usuario": resultado["usuario"],
            },
            context=self.get_serializer_context(),
        )

        return Response(
            response.data,
            status=status.HTTP_201_CREATED,
        )

    def partial_update(self, request, *args, **kwargs):
        """
        Actualiza parcialmente un Jefe de Anexo.
        """

        usuario = self.get_object()

        serializer = self.get_serializer(
            usuario,
            data=request.data,
            partial=True,
        )

        serializer.is_valid(raise_exception=True)

        usuario = JefeService.actualizar_jefe(
            usuario,
            serializer.validated_data,
        )

        response = JefeDetailSerializer(
            usuario,
            context=self.get_serializer_context(),
        )

        return Response(
            response.data,
            status=status.HTTP_200_OK,
        )

    def get_serializer_class(self):

        if self.action == "create":
            return JefeCreateSerializer

        if self.action == "retrieve":
            return JefeDetailSerializer

        return JefeListSerializer

    def get_serializer_class(self):

        if self.action == "create":
            return JefeCreateSerializer

        if self.action == "retrieve":
            return JefeDetailSerializer

        if self.action in ["update", "partial_update"]:
            return JefeUpdateSerializer

        return JefeListSerializer