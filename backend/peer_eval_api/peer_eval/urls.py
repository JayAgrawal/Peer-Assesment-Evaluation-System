from django.urls import path 
from . import views

urlpatterns = [
    path('Student/', views.ListStudent.as_view()),
    path('Student/<int:pk>/', views.DetailStudent.as_view()),

    path('Evaluation/', views.ListEvaluation.as_view()),
    path('Evaluation/<int:pk>/', views.DetailEvaluation.as_view()),

    path('Team/', views.ListTeam.as_view()),
    path('Team/<int:pk>/', views.DetailTeam.as_view()),

]