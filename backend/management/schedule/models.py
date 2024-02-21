from django.db import models
from django.contrib.auth.models import User


class Task(models.Model):
    GROUPS = (
        ("0", "College"),
        ("1", "Work"),
        ("2", "Bills"),
        ("3", "Other")
    )

    name = models.CharField(max_length=120)
    description = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.CharField(max_length=1, choices=GROUPS)
