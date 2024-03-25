from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers

from management.auth.apis import ApiAuthMixin

from management.schedule import models

from .selectors import (
    get_all_tasks,
    get_task_by_id,
    get_users_groups,
    get_group_by_id
)

from .services import (
    insert_task,
    insert_group
)

class TasksApi(ApiAuthMixin, APIView):
    class TaskSerializer(serializers.Serializer):
        id = serializers.IntegerField(required=False)
        name = serializers.CharField()  
        date = serializers.DateField()
        time = serializers.TimeField()
        description = serializers.CharField()
        group = serializers.CharField(max_length=1)

    def get(self, request):
        tasks = get_all_tasks()
        serializer = self.TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = self.TaskSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            group = get_group_by_id(serializer.data["group"])
            insert_task(
                name=serializer.data['name'],
                description=serializer.data['description'],
                date=serializer.data['date'],
                time=serializer.data['time'],
                user=request.user,
                group=group
            )
            return Response(serializer.data)

    

class TaskApi(TasksApi):

    def get(self, request, pk):
        task = get_task_by_id(pk)
        if not task:
            return Response({"detail" : "Not found"}, status=404)
        serializer = self.TaskSerializer(task)
        return Response(serializer.data)


class GroupsApi(ApiAuthMixin, APIView):
    class GetGroupsApiSerializer(serializers.Serializer):
        id = serializers.IntegerField(required=False)
        group = serializers.CharField()

    class CreateGroupsApiSerializer(serializers.Serializer):
        group = serializers.CharField()

    def get(self, request):
        groups = get_users_groups(request.user)
        serializer = self.GetGroupsApiSerializer(groups, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = self.CreateGroupsApiSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            insert_group(
                name=serializer.data['group'],
                user=request.user
            )
            return Response(serializer.data)
