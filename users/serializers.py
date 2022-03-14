from rest_framework.serializers import HyperlinkedModelSerializer
from .models import User


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'irst_name', 'last_name', 'email')

class UserSerializerWithFullName(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'first_name', 'last_name', 'email', 'is_staff', 'is_superuser')

    def to_representation(self, instance):
        """Overriding the to_representation method for is_staff and is_superuser output"""
        my_representation = super().to_representation(instance)
        my_representation['is_staff'] = '+++' if my_representation['is_staff'] else '-'
        my_representation['is_superuser'] = '+++' if my_representation['is_superuser'] else '-'
        return my_representation
