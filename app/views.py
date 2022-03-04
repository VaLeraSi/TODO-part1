from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet
from app.models import Project, TODO
from app.serializers import ProjectSerializer, TODOSerializer, TODOSerializerBase
from rest_framework.pagination import LimitOffsetPagination
from .filters import ProjectFilter, TODOFilter
from rest_framework.response import Response
from rest_framework import permissions


class ProjectPagination(LimitOffsetPagination):
    default_limit = 10


class TODOPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectViewSet(ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = ProjectPagination
    filterset_class = ProjectFilter


class TODOViewSet(ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = TODO.objects.all()
    serializer_class = TODOSerializer
    pagination_class = TODOPagination
    filterset_class = TODOFilter

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance)
    #     instance.is_active = False if instance.is_active else True
    #     instance.save()
    #     return Response(serializer.data)
    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return TODOSerializer
        return TODOSerializerBase
