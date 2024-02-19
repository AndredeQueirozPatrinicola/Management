from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer, Serializer

from management.schedule import models

# from .selectors import (
#     get_all_tasks
# )

class TasksApi(APIView):
    # class InputSerializer(Serializer):

    def get(self, request):
        # tasks = get_all_tasks()
        # print(tasks)
        # print(models.Task.objects.all())
        return Response([
            {
                "id" : 1,
                "name": "Haircut",
                "group": 1,
                "description" : """Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. """
            },
            {
                "id" : 1,
                "name": "Therapy",
                "group": 1,
                "description" : """Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. """
            },
            {
                "id" : 1,
                "name": "College Work",
                "group": 1,
                "description" : """Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. """
            },
            {
                "id" : 1,
                "name": "Meeting",
                "group": 1,
                "description" : """Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. """
            },{
                "id" : 1,
                "name": "Soccer",
                "group": 1,
                "description" : """Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. """
            },
            {
                "id" : 1,
                "name": "English Class",
                "group": 1,
                "description" : """Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. """
            },
            {
                "id" : 1,
                "name": "Payment",
                "group": 1,
                "description" : """Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. """
            },
            {
                "id" : 1,
                "name": "Beer",
                "group": 1,
                "description" : """Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. """
            }
        ])