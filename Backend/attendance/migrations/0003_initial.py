# Generated by Django 5.0.1 on 2024-06-19 12:09

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('attendance', '0002_initial'),
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='attendance',
            name='students',
            field=models.ManyToManyField(to='user.student'),
        ),
    ]
