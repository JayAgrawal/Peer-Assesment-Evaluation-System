# Generated by Django 3.0.5 on 2020-05-05 18:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('peer_eval', '0012_auto_20200503_1509'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='email',
            field=models.CharField(max_length=30, unique=True),
        ),
    ]
