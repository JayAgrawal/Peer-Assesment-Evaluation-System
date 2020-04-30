from django.shortcuts import render
from rest_framework import generics

# Create your views here.

from .models import Student, NumericEvaluation, OpenEndedEvaluation
from .serializers import StudentSerializer, NumericEvaluationSerializer, OpenEndedEvaluationSerializer

class ListStudent(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class DetailStudent(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class ListNumericEvaluation(generics.ListCreateAPIView):
    queryset = NumericEvaluation.objects.all()
    serializer_class = NumericEvaluationSerializer

class DetailNumericEvaluation(generics.RetrieveUpdateDestroyAPIView):
    queryset = NumericEvaluation.objects.all()
    serializer_class = NumericEvaluationSerializer

class ListOpenEndedEvaluation(generics.ListCreateAPIView):
    queryset = OpenEndedEvaluation.objects.all()
    serializer_class = OpenEndedEvaluationSerializer

class DetailOpenEndedEvaluation(generics.RetrieveUpdateDestroyAPIView):
    queryset = OpenEndedEvaluation.objects.all()
    serializer_class = OpenEndedEvaluationSerializer