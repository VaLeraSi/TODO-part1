from rest_framework.serializers import HyperlinkedModelSerializer
from .models import User


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        # extra_kwargs = {
        #     'url': {'view_name': 'users', 'lookup_field': 'username'},
        #     'users': {'lookup_field': 'username'}
        # }
