from rest_framework import serializers
from app.models import Project, TODO


class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class TODOSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TODO
        fields = '__all__'
