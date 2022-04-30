from rest_framework.generics import RetrieveAPIView, ListAPIView
from restaurant.models.restaurantModel import restaurant
from restaurant.models.menuItemModel import menuItem
from socials.models.notification import Notification
from user.models import Comment
from socials.serializers import NotificationSerializer, PostCreateRestaurantComment
from django.db.models import Prefetch
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated

class NotificationsView(ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Notification.objects.filter(intended_for=self.request.user)
        
        return queryset