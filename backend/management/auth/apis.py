from django.contrib.auth.models import User

from rest_framework import (
    serializers,
    status,
)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from management.api.mixins import ApiAuthMixin


class UserLoginApi(TokenObtainPairView):
    pass


class UserRefreshApi(TokenRefreshView):
    pass


class UserVerifyApi(TokenVerifyView):
    pass


class UserMeApi(ApiAuthMixin, APIView):
    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = [
                "id",
                "first_name",
                "is_active",
                # "is_admin",
            ]

    def get(self, request):
        instance = request.user

        serializer = self.OutputSerializer(instance=instance, many=False)
        data = serializer.data

        return Response(data=data, status=status.HTTP_200_OK)