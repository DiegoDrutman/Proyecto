from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.EmailField(unique=True)

class Project(models.Model):
    PROJECT_TYPES = [
        ('programming', 'Programming'),
        ('business', 'Business'),
        ('financial', 'Financial'),
        ('training', 'Training'),
        ('education', 'Education'),
        ('artistic', 'Artistic'),
    ]
    name = models.CharField(max_length=255, default='Unnamed Project')
    description = models.TextField(blank=True)
    type = models.CharField(max_length=50, choices=PROJECT_TYPES, default='programming')
    owner = models.ForeignKey(User, related_name='projects', on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objectives = models.TextField(blank=True, null=True)
    team_members = models.ManyToManyField(User, related_name='team_projects')

class Task(models.Model):
    project = models.ForeignKey(Project, related_name='tasks', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    completed = models.BooleanField(default=False)
    due_date = models.DateField(blank=True, null=True)
    assigned_to = models.ForeignKey(User, related_name='tasks', on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
