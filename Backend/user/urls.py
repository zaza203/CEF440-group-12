from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AdminViewSet, LecturerViewSet, StudentViewSet, UserViewSet

router = DefaultRouter()
router.register(r'admins', AdminViewSet)
router.register(r'lecturers', LecturerViewSet)
router.register(r'students', StudentViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
