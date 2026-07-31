from rest_framework import status
from rest_framework.response import Response


class ApiResponse:
    """
    Clase utilitaria para estandarizar las respuestas de la API.
    """

    @staticmethod
    def ok(data=None, message=None):
        payload = {
            "success": True,
            "data": data,
        }

        if message:
            payload["message"] = message

        return Response(payload, status=status.HTTP_200_OK)

    @staticmethod
    def created(data=None, message=None):
        payload = {
            "success": True,
            "data": data,
        }

        if message:
            payload["message"] = message

        return Response(payload, status=status.HTTP_201_CREATED)

    @staticmethod
    def no_content():
        return Response(status=status.HTTP_204_NO_CONTENT)

    @staticmethod
    def bad_request(message):
        return Response(
            {
                "success": False,
                "message": message,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )