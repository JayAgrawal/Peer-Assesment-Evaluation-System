from rest_framework import serializers
from .models import Student, NumericEvaluation, OpenEndedEvaluation

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'firstName',
            'lastName',
            'userName',
            'password',
        )
        model = Student

class NumericEvaluationSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'prompt',
            'response',
        )
        model = NumericEvaluation

class OpenEndedEvaluationSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'prompt',
            'response',
        )
        model = OpenEndedEvaluation

