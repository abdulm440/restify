from rest_framework.generics import CreateAPIView, GenericAPIView, ListCreateAPIView
from restaurant.models.restaurantModel import restaurant
from restaurant.serializers import GetRestaurant, PostCreateRestaurant
from rest_framework.permissions import IsAuthenticated
from django.db import IntegrityError
from django.http import HttpResponseBadRequest
from rest_framework import serializers
from django.http import Http404

class AddRestaurantView(CreateAPIView):
    queryset = restaurant.objects.all()
    serializer_class = PostCreateRestaurant
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        x = restaurant.objects.filter(owner=self.request.user)
        if x:
            raise serializers.ValidationError('Owner already has a restaurant')
        try:
            serializer.save(owner=self.request.user)
        except IntegrityError:
            return HttpResponseBadRequest(status=400)

class GetUsersRestaurant(ListCreateAPIView):
    
    serializer_class = GetRestaurant
    permission_classes = [IsAuthenticated]
    pagination_class = None

    def get_queryset(self):
        obj = restaurant.objects.filter(owner=self.request.user)
        if(obj):
            return obj
        else:
            raise Http404

