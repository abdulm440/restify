from restaurant.models.restaurantModel import restaurant
from socials.models.restaurantFollowModel import restaurantFollow
from rest_framework.generics import ListAPIView
from restaurant.models.blogPostModel import blogPost
from restaurant.serializers import PostCreateBlogPost
from rest_framework.permissions import IsAuthenticated


class ListFeedView(ListAPIView):
    queryset = blogPost.objects.all()
    serializer_class = PostCreateBlogPost
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = blogPost.objects.filter(restaurant__in=restaurantFollow.objects.filter(user=self.request.user).values('restaurant'))
        queryset = queryset.order_by('-date')
        return queryset
