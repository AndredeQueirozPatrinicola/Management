from django.urls import path

from management.schedule.apis import TasksApi

urlpatterns = [
    path('', TasksApi.as_view(), name='tasks')
]