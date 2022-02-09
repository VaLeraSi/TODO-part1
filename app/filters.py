from django_filters import rest_framework as filters, DateFromToRangeFilter
from app.models import Project, TODO


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class TODOFilter(filters.FilterSet):

    project__name = filters.CharFilter(lookup_expr='contains')
    body = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = TODO
        fields = ['project__name', 'body']