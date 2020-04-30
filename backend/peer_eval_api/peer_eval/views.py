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