from app.models import Project

link_object = Project.objects.create(hyper_link="https://github.com/VaLeraSi/TODO-part1 / charfield-django-models/")
link_object.save()
