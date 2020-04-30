from django.test import TestCase
from .models import Student, NumericEvaluation, OpenEndedEvaluation

# Create your tests here.

class StudentModelTest(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        Student.objects.create(firstName='first first name')
        Student.objects.create(lastName='first last name')
        Student.objects.create(userName='first user name')
        Student.objects.create(password='first password')

    def test_firstName_content(self):
        student = Student.objects.get(id=1)
        expected_object_name = f'{student.firstName}'
        self.assertEquals(expected_object_name, 'first first name')
    
    def test_lastName_content(self):
        student = Student.objects.get(id=2)
        expected_object_name = f'{student.lastName}'
        self.assertEquals(expected_object_name, 'first last name')

    def test_userName_content(self):
        student = Student.objects.get(id=3)
        expected_object_name = f'{student.userName}'
        self.assertEquals(expected_object_name, 'first user name')

    def test_password_content(self):
        student = Student.objects.get(id=4)
        expected_object_name = f'{student.password}'
        self.assertEquals(expected_object_name, 'first password')