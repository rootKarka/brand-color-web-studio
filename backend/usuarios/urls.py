from rest_framework.routers import DefaultRouter

from usuarios.views.jefe_viewset import JefeViewSet

router = DefaultRouter()

router.register(
    "jefes",
    JefeViewSet,
    basename="jefes",
)

urlpatterns = router.urls