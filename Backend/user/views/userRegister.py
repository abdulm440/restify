from rest_framework import generics, permissions, mixins
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from user.serializers import UserSerializer, RegisterSerializer, UpdateSerializer
from user.models import CustomUser as User
#Register API
class RegisterApi(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    def post(self, request, *args,  **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user,    context=self.get_serializer_context()).data,
            "message": "User Created Successfully.  Now perform Login to get your token",
        })

class UpdateApi(generics.GenericAPIView, mixins.UpdateModelMixin):
    '''
    You just need to provide the field which is to be modified.
    '''
    queryset = User.objects.all()
    serializer_class = UpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, *args, **kwargs):
        print(args, kwargs)
        return self.partial_update(request,id= self.request.user, *args, **kwargs)

    def get_object(self, queryset=None):
            obj = self.request.user
            return obj

class UserViewSet(ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, queryset=None):
            obj = self.request.user
            return obj