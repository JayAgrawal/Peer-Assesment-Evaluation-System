from rest_framework import serializers
from .models import Student, Evaluation, Team

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'firstName',
            'lastName',
            'email',
            'password',
        )
        model = Student

class EvaluationSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'evaluation_name',
            'rating',
            'comment',
            'dueDate',
            'completed',
            'student',

        )
        model = Evaluation

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'teamName',
            'member1',
            'member2',
            'member3',
        )
        model = Team

