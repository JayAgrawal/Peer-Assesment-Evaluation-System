from django.contrib import admin
from .models import Student, NumericEvaluation, OpenEndedEvaluation
# Register your models here.

admin.site.register(Student)
admin.site.register(NumericEvaluation)
admin.site.register(OpenEndedEvaluation)

