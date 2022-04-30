from rest_framework.generics import UpdateAPIView
from restaurant.models.restaurantModel import restaurant
from restaurant.serializers import PostUpdateRestaurant
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponseBadRequest
from rest_framework import serializers

class UpdateRestaurantView(UpdateAPIView):
    queryset = restaurant.objects.all()
    serializer_class = PostUpdateRestaurant
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def patch(self, request,*args, **kwargs):
       
        x = restaurant.objects.get(id=kwargs['id'])
        if x.owner.id != self.request.user.id:
            raise serializers.ValidationError('Not your restaurant')
        return self.partial_update(request,*args,**kwargs)

