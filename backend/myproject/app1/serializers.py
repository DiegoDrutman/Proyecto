from rest_framework import serializers
from .models import Project, Task, Collaboration

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'project', 'title', 'description', 'completed', 'due_date', 'created_at', 'updated_at']

class ProjectSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'user', 'title', 'description', 'start_date', 'end_date', 'created_at', 'updated_at', 'tasks']

class CollaborationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collaboration
        fields = ['id', 'project', 'user', 'role', 'joined_at']
