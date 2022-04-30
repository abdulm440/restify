from rest_framework.generics import RetrieveAPIView, ListAPIView
from restaurant.models.restaurantModel import restaurant
from restaurant.models.menuItemModel import menuItem
from user.models import Comment
from socials.serializers import PostCreateRestaurantComment
from django.db.models import Prefetch
from django_filters.rest_framework import DjangoFilterBackend

class ListCommentsView(ListAPIView):
    serializer_class = PostCreateRestaurantComment

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['restaurant']

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Comment.objects.all()
        keyword = self.request.query_params.get('keyword')
        menu_items_queryset = menuItem.objects.all()
        if keyword:
            keyword = keyword.lower()
            menus = menu_items_queryset.filter(name__icontains=keyword).values('restaurant')
            queryset =  queryset.filter(name__icontains=keyword) | queryset.filter(address__icontains=keyword) | queryset.filter(pk__in=menus)
        return queryset