from rest_framework import serializers
from .models import User, Admin, Lecturer, Student

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'is_admin', 'is_lecturer', 'is_student']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class AdminSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Admin
        fields = ['user']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_admin(**user_data)
        admin = Admin.objects.create(user=user)
        return admin

class LecturerSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Lecturer
        fields = ['user']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_lecturer(**user_data)
        lecturer = Lecturer.objects.create(user=user)
        return lecturer

class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Student
        fields = ['user', 'student_id', 'fingerprint_data']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        student = User.objects.create_student(**user_data, **validated_data)
        return student
