from django.db import models
from users.models import User
from django.utils import timezone


class Project(models.Model):
    name = models.CharField(max_length=64, unique=True)
    hyper_link = models.URLField(max_length=200)
    users = models.ManyToManyField(User)


class TODO(models.Model):
    project = models.OneToOneField(Project, on_delete=models.CASCADE)
    text = models.CharField(max_length=200)
    created = models.DateField(default=timezone.now().strftime("%Y-%m-%d"))
    updated = models.DateField(default=timezone.now().strftime("%Y-%m-%d"))
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
