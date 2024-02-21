from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers

from management.auth.apis import ApiAuthMixin

from management.schedule import models

from .selectors import (
    get_all_tasks,
    get_task_by_id
)

from .services import (
    insert_task
)

class TasksApi(ApiAuthMixin, APIView):
    class TaskSerializer(serializers.Serializer):
        id = serializers.IntegerField(required=False)
        name = serializers.CharField()
        description = serializers.CharField()
        group = serializers.CharField(max_length=1)

    def get(self, request):
        tasks = get_all_tasks()
        serializer = self.TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = self.TaskSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            insert_task(
                name=serializer.data['name'],
                description=serializer.data['description'],
                user=request.user,
                group=serializer.data["group"]
            )
            return Response(serializer.data)
        return Response(serializer.errors, status=404)
    

class TaskApi(TasksApi):

    def get(self, request, pk):
        task = get_task_by_id(pk)
        if not task:
            return Response({"detail" : "Not found"}, status=404)
        serializer = self.TaskSerializer(task)
        return Response(serializer.data)
