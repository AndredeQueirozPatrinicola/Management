from django.urls import path

from .apis import TasksApi

urlpatterns = [
    path('', TasksApi.as_view(), name='tasks')
]