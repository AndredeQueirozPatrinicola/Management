from django.contrib import admin

from .models import Task

class TaskAdmin(admin.ModelAdmin):
    list_display = ("id",
        "name",
        "group",
        "description")
    search_fields = ("id",
        "name",
        "group",
        "description")



admin.site.register(Task, TaskAdmin)
