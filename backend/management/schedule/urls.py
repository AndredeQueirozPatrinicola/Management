from django.urls import path

from management.schedule.apis import TasksApi, TaskApi

urlpatterns = [
    path('', TasksApi.as_view(), name='tasks'),
    path('<pk>/', TaskApi.as_view(), name='tasks'),
]