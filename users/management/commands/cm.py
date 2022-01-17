from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from users.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        User.objects.create_superuser('lera', 'lera@mail.ru', '123')
        User.objects.create_user(username='JarWinter', first_name='Jared', last_name='Leto',
                                 email='ageless@mail.ru', password='1234')

