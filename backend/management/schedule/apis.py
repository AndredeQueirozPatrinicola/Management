from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers

from management.auth.apis import ApiAuthMixin

from management.schedule import models

from .selectors import (
    get_all_tasks
)

from .services import (
    insert_task
)

class TasksApi(ApiAuthMixin, APIView):
    class TaskSerializer(serializers.Serializer):
        id = serializers.IntegerField(required=False)
        name = serializers.CharField()
        description = serializers.CharField()

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
                user=request.user
            )
            return Response(serializer.data)
        return Response(serializer.errors, status=404)