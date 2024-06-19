from django.db import models
from users.models import Student
from sessions.models import Session

class Attendance(models.Model):
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    students = models.ManyToManyField(Student)

    def __str__(self):
        return f"Attendance for {self.session}"
