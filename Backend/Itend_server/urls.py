from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('sessions/' , include('session.urls')),
    path('attendance/' , include('attendance.urls')),
]
