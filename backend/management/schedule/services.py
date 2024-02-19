from .models import Task

from django.db.models.query import QuerySet
from django.contrib.auth.models import User

def insert_task(
        name: str,
        description: str,
        user: User,
) -> QuerySet[Task]:
    """
        Insert One Task
    """
    task = Task(
        name=name,
        description=description,
        user=user
    )
    task.full_clean()
    task.save()
    return task