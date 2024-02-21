from .models import Task

from django.db.models.query import QuerySet
from django.contrib.auth.models import User

def insert_task(
        name: str,
        description: str,
        user: User,
        group: int
) -> Task:
    """
        Insert One Task and return the instance
    """
    task = Task(
        name=name,
        description=description,
        user=user,
        group=group
    )
    task.full_clean()
    task.save()
    return task