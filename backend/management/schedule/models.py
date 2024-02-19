from django.db import models
from django.contrib.auth.models import User


class Task(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        app_label = 'management.schedule'