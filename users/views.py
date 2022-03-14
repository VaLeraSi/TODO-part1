from rest_framework.renderers import JSONRenderer, AdminRenderer

from REST.permissions import UserCategoryPermission
from .models import User
from .serializers import UserModelSerializer, UserAccessModelSerializer
from rest_framework import mixins, viewsets


class UserCustomViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                        mixins.UpdateModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()
    # serializer_class = UserModelSerializer
    renderer_classes = [JSONRenderer, AdminRenderer]
    permission_classes = (UserCategoryPermission,)

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UserAccessModelSerializer
        else:
            return UserModelSerializer


