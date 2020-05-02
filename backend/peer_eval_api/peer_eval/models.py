from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
# Create your models here.

class Student(models.Model):
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    email = models.CharField(max_length=30) 
    password = models.CharField(max_length=30)

    def __str__(self):
        return self.email

class Evaluation(models.Model):
    evaluation_name = models.CharField(max_length=40, default='Test Eval')
    rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)], default=0,)
    comment = models.CharField(max_length=300, default='', blank=True)
    dueDate = models.DateField()
    completed = models.BooleanField(default=False)
    student = models.ForeignKey(Student, on_delete=models.CASCADE) #Student that needs to fill out evaluation

class Team(models.Model):
    teamName = models.ForeignKey(Evaluation, on_delete=models.CASCADE)
    member1 = models.CharField(max_length=30)
    member2 = models.CharField(max_length=30)
    member3 = models.CharField(max_length=30)


