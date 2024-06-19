from django.db import models

from django.db import models
from users.models import Lecturer

class Session(models.Model):
    lecturer = models.ForeignKey(Lecturer, on_delete=models.CASCADE)
    date = models.DateField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    def __str__(self):
        return f"session by {self.lecturer.email} on {self.date}"