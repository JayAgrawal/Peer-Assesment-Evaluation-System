from django.db import models

# Create your models here.

class Student(models.Model):
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    userName = models.CharField(max_length=30)
    password = models.CharField(max_length=30)

    def __str__(self):
        return self.userName

class NumericEvaluation(models.Model):
    responseOptions = [
        (1, 'Strongly Disagree'),
        (2, 'Disagree'),
        (3, 'Neutral'),
        (4, 'Agree'),
        (5, 'Strongly Agree'),
        ]

    prompt = models.CharField(max_length=200)
    response = models.IntegerField(max_length=1, choices=responseOptions,default=1,)

class OpenEndedEvaluation(models.Model):
    prompt = models.CharField(max_length=200)
    response = models.CharField(max_length=300)


