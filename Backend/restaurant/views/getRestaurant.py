from rest_framework.generics import RetrieveAPIView, ListAPIView
from restaurant.models.restaurantModel import restaurant
from restaurant.models.menuItemModel import menuItem
from restaurant.serializers import GetRestaurant, GetRestaurantDetails
from django.db.models import Prefetch, Count


class GetRestaurantView(RetrieveAPIView):
    queryset = restaurant.objects.all()
    serializer_class = GetRestaurantDetails
    lookup_field = 'id'

class ListRestaurantsView(ListAPIView):
    serializer_class = GetRestaurant

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = restaurant.objects.all()
        keyword = self.request.query_params.get('keyword')
        menu_items_queryset = menuItem.objects.all()
        if keyword:
            keyword = keyword.lower()
            menus = menu_items_queryset.filter(name__icontains=keyword).values('restaurant')
            queryset =  queryset.filter(name__icontains=keyword) | queryset.filter(address__icontains=keyword) | queryset.filter(pk__in=menus)
        
        queryset = queryset.annotate(followers_count=Count('restaurantfollow'))
        queryset = queryset.order_by('-followers_count')
        return queryset
