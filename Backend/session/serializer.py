from rest_framework import serializers
from .models import Session
from user.models import Lecturer

class LecturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecturer
        fields = ['email']

class SessionSerializer(serializers.ModelSerializer):
    lecturer = LecturerSerializer()

    class Meta:
        model = Session
        fields = ['id', 'lecturer', 'date', 'start_time', 'end_time']

    def create(self, validated_data):
        lecturer_data = validated_data.pop('lecturer')
        lecturer, created = Lecturer.objects.get_or_create(**lecturer_data)
        session = Session.objects.create(lecturer=lecturer, **validated_data)
        return session

    def update(self, instance, validated_data):
        lecturer_data = validated_data.pop('lecturer')
        instance.date = validated_data.get('date', instance.date)
        instance.start_time = validated_data.get('start_time', instance.start_time)
        instance.end_time = validated_data.get('end_time', instance.end_time)

        lecturer, created = Lecturer.objects.get_or_create(**lecturer_data)
        instance.lecturer = lecturer

        instance.save()
        return instance
