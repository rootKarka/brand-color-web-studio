from rest_framework.viewsets import ModelViewSet

from rest_framework.decorators import action
from rest_framework.response import Response

from common.choices import TipoEvento

from common.responses import ApiResponse

from eventos.models import Evento
from eventos.serializers import (
    EventoListSerializer,
    EventoDetailSerializer,
    EventoCreateSerializer,
    EventoUpdateSerializer,
)
from eventos.services import EventoService


class EventoViewSet(ModelViewSet):
    """
    ViewSet para la gestión de eventos.
    """

    http_method_names = [
        "get",
        "post",
        "patch",
    ]

    queryset = (
        Evento.objects
        .all()
        .order_by("-fecha_inicio")
    )

    def get_serializer_class(self):

        if self.action == "create":
            return EventoCreateSerializer

        if self.action == "retrieve":
            return EventoDetailSerializer

        if self.action in ["update", "partial_update"]:
            return EventoUpdateSerializer

        return EventoListSerializer

    def list(self, request, *args, **kwargs):

        queryset = self.filter_queryset(
            self.get_queryset()
        )

        serializer = self.get_serializer(
            queryset,
            many=True,
        )

        return ApiResponse.ok(
            serializer.data
        )

    def retrieve(self, request, *args, **kwargs):

        evento = self.get_object()

        serializer = self.get_serializer(
            evento
        )

        return ApiResponse.ok(
            serializer.data
        )

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        evento = EventoService.crear_evento(
            serializer.validated_data
        )

        response = EventoDetailSerializer(
            evento,
            context=self.get_serializer_context(),
        )

        return ApiResponse.created(
            response.data,
            message="Evento creado correctamente."
        )

    def partial_update(
        self,
        request,
        *args,
        **kwargs,
    ):

        evento = self.get_object()

        serializer = self.get_serializer(
            evento,
            data=request.data,
            partial=True,
        )

        serializer.is_valid(
            raise_exception=True
        )

        evento = EventoService.actualizar_evento(
            evento,
            serializer.validated_data,
        )

        response = EventoDetailSerializer(
            evento,
            context=self.get_serializer_context(),
        )

        return ApiResponse.ok(
            response.data,
            message="Evento actualizado correctamente."
        )