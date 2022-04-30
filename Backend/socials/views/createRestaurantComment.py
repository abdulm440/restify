from socials.models.notification import Notification
from rest_framework.generics import CreateAPIView
from user.models import Comment
from restaurant.models.restaurantModel import restaurant
from socials.serializers import PostCreateRestaurantComment
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

class CreateRestaurantCommentView(CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = PostCreateRestaurantComment
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        data = request.data
        data["owner"] = self.request.user.id
        data["restaurant"] = kwargs['rest_id']
        data["name"] = self.request.user.first_name
        if(not restaurant.objects.filter(pk=data["restaurant"])):
            return Response({"Restaurant not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        Notification.objects.create(intended_for = restaurant.objects.get(pk=data["restaurant"]).owner, 
        text = self.request.user.first_name + " commented on your restaurant.", type="Owner"
        )
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)