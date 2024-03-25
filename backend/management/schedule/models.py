from django.db import models
from django.contrib.auth.models import User


class Groups(models.Model):
    group = models.CharField(max_length=20)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_group', default=None)

    def __str__(self):
        return f"{self.group}"


class Task(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField()
    date = models.DateField(default=None, null=True)
    time = models.TimeField(default=None, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_task')
    group = models.ForeignKey(Groups, on_delete=models.CASCADE, default=None, null=True)

    def __str__(self) -> str:
        return self.name
