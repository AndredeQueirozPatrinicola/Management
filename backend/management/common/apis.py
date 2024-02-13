from django.core.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response

from management.api.mixins import ApiErrorMixin


def trigger_error():
    raise ValidationError("Error from service")


class TriggerErrorApi(ApiErrorMixin, APIView):
    """
    Since we have ApiErrorMixin,
    the API will fail with 400 Bad Request,
    instead of 500 Server Error
    """

    def get(self, request):
        trigger_error()
        return Response()