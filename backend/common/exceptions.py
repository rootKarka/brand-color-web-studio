from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status


def custom_exception_handler(exc, context):
    """
    Estandariza todas las respuestas de error de DRF.
    """

    response = exception_handler(exc, context)

    if response is None:
        return Response(
            {
                "success": False,
                "message": "Ha ocurrido un error interno.",
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    message = "Ocurrió un error."

    if isinstance(response.data, dict):

        # Errores tipo:
        # {"dni": ["Ya existe..."]}
        # {"username": ["Ya existe..."]}
        # {"detail": "..."}
        for key, value in response.data.items():

            if isinstance(value, list) and value:
                message = value[0]
                break

            if isinstance(value, str):
                message = value
                break

    return Response(
        {
            "success": False,
            "message": message,
            "errors": response.data,
        },
        status=response.status_code,
    )