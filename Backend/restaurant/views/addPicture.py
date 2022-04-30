from rest_framework.generics import CreateAPIView
from restaurant.models.restaurantPictureModel import restaurantPicture
from restaurant.serializers import PostCreatePicture
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers

class AddPictureView(CreateAPIView):
    queryset = restaurantPicture.objects.all()
    serializer_class = PostCreatePicture
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        print(serializer)
        serializer.save()

    def perform_create(self, serializer):
        print(self.request.user.id)
        x = serializer.validated_data['restaurant'].owner.id
        print(x)
        if int(self.request.user.id) == x:
            serializer.save()
        else:
            raise serializers.ValidationError('Not your restaurant')
