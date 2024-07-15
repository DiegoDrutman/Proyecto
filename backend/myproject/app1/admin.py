from django.contrib import admin
from .models import Project, Task, Collaboration

admin.site.register(Project)
admin.site.register(Task)
admin.site.register(Collaboration)
