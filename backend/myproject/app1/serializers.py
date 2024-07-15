from rest_framework import serializers
from .models import Project, Task, Collaboration

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class CollaborationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collaboration
        fields = '__all__'
