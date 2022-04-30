from socials.models.notification import Notification
from socials.models.restaurantFollowModel import restaurantFollow
from rest_framework.generics import UpdateAPIView

from restaurant.models.menuItemModel import menuItem
from restaurant.serializers import PostUpdateMenuItem
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers

class UpdateMenuItems(UpdateAPIView):
    queryset = menuItem.objects.all()
    serializer_class = PostUpdateMenuItem
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def patch(self, request,*args, **kwargs):
        
        x = menuItem.objects.get(id=kwargs['id']).restaurant
        if x.owner.id != self.request.user.id:
            raise serializers.ValidationError('Not your restaurant')
        else:
             restaurant_ = menuItem.objects.get(id=kwargs['id']).restaurant
             for follower in restaurantFollow.objects.filter(restaurant=restaurant_): 
                Notification.objects.create(intended_for = follower.user, text = restaurant_.name + " has updated their menu", type="User" )
            
                
        return self.partial_update(request,*args,**kwargs)
