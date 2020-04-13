from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name="home"),
    path('signup/', views.signup_view, name="signup"),
    path('sent/', views.activation_sent_view, name="activation_sent"),
    path('activate/<slug:uidb64>/<slug:token>/', views.activate, name = 'activate'),
    path('change/', views.change_password, name='password_chage'),
    path('studentview/', views.student_view, name='studentview'),
    path('instructorview/', views.instructor_view, name='instructorview'),

]
