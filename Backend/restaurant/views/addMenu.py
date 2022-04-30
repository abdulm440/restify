from socials.models.notification import Notification
from restaurant.models.restaurantModel import restaurant
from socials.models.restaurantFollowModel import restaurantFollow
from rest_framework.generics import CreateAPIView
from restaurant.models.menuItemModel import menuItem
from restaurant.serializers import PostCreateMenuItem
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers


class AddMenuItemView(CreateAPIView):
    queryset = menuItem.objects.all()
    serializer_class = PostCreateMenuItem
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
       
        x = serializer.validated_data['restaurant'].owner.id
      
        if int(self.request.user.id) == x:
            serializer.save()
            restaurant_ = restaurant.objects.get(pk=serializer.validated_data['restaurant'].id)
            
            for follower in restaurantFollow.objects.filter(restaurant=restaurant_):
                Notification.objects.create(intended_for = follower.user, 
        text = restaurant_.name + " has updated their menu", type="User"
        )
        else:
            raise serializers.ValidationError('Not your restaurant')
