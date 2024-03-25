from django.urls import path

from management.schedule.apis import TasksApi, TaskApi, GroupsApi

urlpatterns = [
    path('groups/', GroupsApi.as_view(), name='groups'),
    path('tasks/', TasksApi.as_view(), name='tasks'),
    path('tasks/<pk>/', TaskApi.as_view(), name='tasks'),
    # path('groups/<pk>/', GroupsApi.as_view(), name='tasks'),
]