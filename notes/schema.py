import graphene
from graphene_django import DjangoObjectType

from app.models import Project, TODO
from users.models import User


class UserType(DjangoObjectType):
    """Type for User description"""

    class Meta:
        model = User
        fields = '__all__'


class ProjectType(DjangoObjectType):
    """Type for Project description"""

    class Meta:
        model = Project
        fields = '__all__'


class ToDoType(DjangoObjectType):
    """Type for ToDos description"""

    class Meta:
        model = TODO
        fields = '__all__'


class Query(graphene.ObjectType):
    """Type for query"""
    all_todos = graphene.List(ToDoType)
    all_projects = graphene.List(ProjectType)

    get_project_by_id = graphene.Field(ProjectType, pr_id=graphene.Int(required=True))
    filter_todos_by_project_name = graphene.List(ToDoType, name=graphene.String(required=False))
    filter_todos_by_isactive = graphene.List(ToDoType, bool_value=graphene.Boolean())
    filter_projects_by_user = graphene.List(ProjectType, username=graphene.String(required=True))

    def resolve_all_todos(root, info):
        return TODO.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_get_project_by_id(root, info, pr_id):
        """Function for get project by its id"""
        try:
            return Project.objects.get(id=pr_id)
        except Project.DoesNotExist:
            return None

    def resolve_filter_todos_by_project_name(root, info, name=None):
        """Function for view all todos that some project includes"""
        todos = TODO.objects.all()
        if name:
            todos = todos.filter(project__name=name)
        return todos

    def resolve_filter_todos_by_isactive(root, info, bool_value):
        """Function for get only active todos (or only not active)"""
        todos = TODO.objects.filter(is_active=bool_value)
        return todos

    def resolve_filter_projects_by_user(root, info, username):
        """Function for get all projects in which some user participates (requires a username or part of it)"""
        try:
            return Project.objects.filter(users__username__contains=username)
        except Project.DoesNotExist:
            return None


class ToDoMutation(graphene.Mutation):
    """Todos model mutation"""

    class Arguments:
        condition = graphene.Boolean()
        td_id = graphene.ID()

    todo = graphene.Field(ToDoType)

    @classmethod
    def mutate(cls, root, info, condition, td_id):
        """Changes todos condition (active/not active)"""
        todo = TODO.objects.get(pk=td_id)
        todo.is_active = condition
        todo.save()
        return ToDoMutation(todo=todo)


class Mutation(graphene.ObjectType):
    update_todo = ToDoMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
