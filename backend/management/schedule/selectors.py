from .models import Task, Groups

from django.db.models.query import QuerySet


def get_all_groups() -> QuerySet[Groups]:
    """
        Get all saved groups
    """
    return Groups.objects.all() 


def get_users_groups(pk: int) -> QuerySet[Groups]:
    """
        Return all groups related to an User
    """
    return Groups.objects.filter(user=pk)


def get_group_by_id(pk: int) -> Groups | None:
    """
        Return group by id or None
    """
    try:
        return Groups.objects.get(pk=pk)
    except Groups.DoesNotExist:
        return None

def get_all_tasks() -> QuerySet[Task]:
    """
        Get all saved tasks
    """
    return Task.objects.all()


def get_task_by_id(pk: int) -> Task | None:
    """
        Get an int and returns a Task instance or None
    """
    try:
        return Task.objects.get(id=pk)
    except Task.DoesNotExist:
        return None
