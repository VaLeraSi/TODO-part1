from rest_framework import serializers
from app.models import Project, TODO
from users.serializers import UserModelSerializer


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class TODOSerializer(serializers.ModelSerializer):
    user = UserModelSerializer()

    class Meta:
        model = TODO
        fields = '__all__'
