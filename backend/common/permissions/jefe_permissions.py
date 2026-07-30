from .base_permissions import IsAdministrador


class PuedeGestionarJefes(IsAdministrador):
    """
    Permiso para gestionar Jefes de Anexo.
    """

    pass