from django.urls import path, include

urlpatterns = [
    path("auth/", include(("management.auth.urls", "authentication"))),
    path("common/", include(("management.common.urls", "common"))),
    path("", include(("management.schedule.urls", "schedule")))
]