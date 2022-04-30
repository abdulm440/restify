from rest_framework.generics import DestroyAPIView
from restaurant.models.restaurantPictureModel import restaurantPicture
from restaurant.serializers import PostDeletePicture
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers

class DeletePictureView(DestroyAPIView):
    queryset = restaurantPicture.objects.all()
    serializer_class = PostDeletePicture
    lookup_field = 'id'
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
       
        x = restaurantPicture.objects.get(id=kwargs['id']).restaurant.owner.id
        if self.request.user.id == x:
            return self.destroy(request,*args,**kwargs)
        raise serializers.ValidationError('Not your restaurant')
