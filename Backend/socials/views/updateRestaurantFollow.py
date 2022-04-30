from socials.models.notification import Notification
from rest_framework.generics import CreateAPIView, DestroyAPIView
from socials.models.restaurantFollowModel import restaurantFollow
from socials.serializers import RestaurantFollow
from restaurant.models.restaurantModel import restaurant
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404

class CreateRestaurantFollowView(CreateAPIView):
    queryset = restaurantFollow.objects.all()
    serializer_class = RestaurantFollow
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        data = request.data
        data["user"] = self.request.user.id
        data["restaurant"] = kwargs['rest_id']
        data["type"] = "Follow"
        if(not restaurant.objects.filter(pk=data["restaurant"])):
            return Response({"Restaurant not found"}, status=status.HTTP_404_NOT_FOUND)
        
        if(restaurantFollow.objects.filter(user=self.request.user.id, restaurant = kwargs['rest_id'])):
            return Response({"User is already following this restaurant"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        Notification.objects.create(intended_for = restaurant.objects.get(pk=data["restaurant"]).owner, 
        text = self.request.user.first_name + " has started following your restaurant.", type="Owner"
        )
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class DeleteRestaurantFollowView(DestroyAPIView):
    queryset = restaurantFollow.objects.all()
    serializer_class = RestaurantFollow
    permission_classes = [IsAuthenticated]

    def get_object(self):
        """
        Returns the object the view is displaying.
        You may want to override this if you need to provide non-standard
        queryset lookups.  Eg if objectFs are referenced using multiple
        keyword arguments in the url conf.F
        """
        queryset = self.filter_queryset(self.get_queryset())
        
        if(len(restaurant.objects.filter(pk=self.kwargs['rest_id'])) == 0):
            raise Http404

        obj = queryset.filter(restaurant=self.kwargs['rest_id'],user=self.request.user).first()

        return obj

    def delete(self, request, *args, **kwargs):
        query = self.queryset.filter(restaurant=kwargs['rest_id'],user=self.request.user)

        if(not restaurant.objects.filter(pk=kwargs['rest_id'])):
            return Response({"Restaurant not found"}, status=status.HTTP_404_NOT_FOUND)

        if(len(query) == 0):
            return Response({"User is not following this restaurant"}, status=status.HTTP_400_BAD_REQUEST)

        

        return self.destroy(request, *args, **kwargs)


