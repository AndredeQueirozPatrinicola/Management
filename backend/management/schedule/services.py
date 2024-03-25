from .models import Task, Groups

from django.contrib.auth.models import User


def insert_group(
        name: str,
        user: Groups
) -> Groups:
    group = Groups(
        name=name,
        user=user
    )
    group.full_clean()
    group.save()
    return group


def insert_task(
        name: str,
        description: str,
        date: str,
        time:str,
        user: User,
        group: int
) -> Task:
    """
        Insert One Task and return the instance
    """
    task = Task(
        name=name,
        description=description,
        date=date,
        time=time,
        user=user,
        group=group
    )
    task.full_clean()
    task.save()
    return task