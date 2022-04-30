from rest_framework.generics import DestroyAPIView
from restaurant.models.menuItemModel import menuItem
from restaurant.serializers import PostCreateMenuItem
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponseBadRequest
from rest_framework import serializers

class deleteMenuItemView(DestroyAPIView):
    queryset = menuItem.objects.all()
    serializer_class = PostCreateMenuItem
    lookup_field = 'id'
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
       
        x = menuItem.objects.get(id=kwargs['id']).restaurant.owner.id
        if self.request.user.id == x:
            return self.destroy(request,*args,**kwargs)
        raise serializers.ValidationError('Not your restaurant')