from django.shortcuts import render
from rest_framework import generics

# Create your views here.

from .models import Student, Evaluation, Team
from .serializers import StudentSerializer, EvaluationSerializer, TeamSerializer

class ListStudent(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class DetailStudent(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class ListEvaluation(generics.ListCreateAPIView):
    queryset = Evaluation.objects.all()
    serializer_class = EvaluationSerializer

class DetailEvaluation(generics.RetrieveUpdateDestroyAPIView):
    queryset = Evaluation.objects.all()
    serializer_class = EvaluationSerializer

class ListTeam(generics.ListCreateAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class DetailTeam(generics.RetrieveUpdateDestroyAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer