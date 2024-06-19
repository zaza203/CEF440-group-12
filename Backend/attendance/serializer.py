from rest_framework import serializers
from user.models import Student
from session.models import Session
from .models import Attendance

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['student_id', 'email', 'unique_id_for_fingerprint']  # Adjust fields as per your Student model

class AttendanceSerializer(serializers.ModelSerializer):
    session = serializers.PrimaryKeyRelatedField(queryset=Session.objects.all())
    students = StudentSerializer(many=True)

    class Meta:
        model = Attendance
        fields = ['id', 'session', 'students']

    def create(self, validated_data):
        students_data = validated_data.pop('students')
        session = validated_data.pop('session')

        attendance = Attendance.objects.create(session=session, **validated_data)

        for student_data in students_data:
            student, created = Student.objects.get_or_create(**student_data)
            attendance.students.add(student)

        return attendance

    def update(self, instance, validated_data):
        instance.session = validated_data.get('session', instance.session)
        instance.save()

        # Update students if needed
        if 'students' in validated_data:
            instance.students.clear()
            students_data = validated_data.pop('students')
            for student_data in students_data:
                student, created = Student.objects.get_or_create(**student_data)
                instance.students.add(student)

        return instance
