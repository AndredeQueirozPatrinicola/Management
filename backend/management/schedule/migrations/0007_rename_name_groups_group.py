# Generated by Django 4.2.7 on 2024-03-06 11:40

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("schedule", "0006_groups_user_alter_task_user"),
    ]

    operations = [
        migrations.RenameField(
            model_name="groups",
            old_name="name",
            new_name="group",
        ),
    ]
