from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    # path('session/' , include('session.urls')),
    # path('attendance/' , include('attendance.urls')),
    path('user/', include('user.urls')),
]
