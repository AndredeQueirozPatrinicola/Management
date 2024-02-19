from django.urls import path, include

urlpatterns = [
    path("auth/", include(("management.auth.urls", "authentication"))),
    path("common/", include(("management.common.urls", "common"))),
    path("tasks/", include(("management.schedule.urls", "schedule")))
]