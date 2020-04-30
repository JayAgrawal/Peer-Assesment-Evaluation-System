from django.urls import path 
from . import views

urlpatterns = [
    path('Student/', views.ListStudent.as_view()),
    path('Student/<int:pk>/', views.DetailStudent.as_view()),

    path('NumericEval/', views.ListNumericEvaluation.as_view()),
    path('NumericEval/<int:pk>/', views.DetailNumericEvaluation.as_view()),

    path('OpenEval/', views.ListOpenEndedEvaluation.as_view()),
    path('OpenEval/<int:pk>/', views.DetailOpenEndedEvaluation.as_view()),

]