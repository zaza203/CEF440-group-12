from django.db import models
from user.models import Student
from session.models import Session

class Attendance(models.Model):
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    students = models.ManyToManyField(Student)

    def __str__(self):
        return f"Attendance for {self.session}"
