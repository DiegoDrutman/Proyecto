from rest_framework import viewsets
from .models import Project, Task, Collaboration
from .serializers import ProjectSerializer, TaskSerializer, CollaborationSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class CollaborationViewSet(viewsets.ModelViewSet):
    queryset = Collaboration.objects.all()
    serializer_class = CollaborationSerializer
