from .models import Task

from django.db.models.query import QuerySet

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
