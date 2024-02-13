from django.urls import path

from .apis import UserLoginApi, UserRefreshApi, UserVerifyApi, UserMeApi


urlpatterns = [
    path("login/", UserLoginApi.as_view(), name="login"),
    path("refresh/", UserRefreshApi.as_view(), name="refresh"),
    path("verify/", UserVerifyApi.as_view(), name="verify"),
    path("me/", UserMeApi.as_view(), name="me"),
]