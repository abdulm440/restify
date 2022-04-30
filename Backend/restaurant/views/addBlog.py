from socials.models.notification import Notification
from socials.models.restaurantFollowModel import restaurantFollow
from rest_framework.generics import CreateAPIView
from restaurant.models.blogPostModel import blogPost
from restaurant.models.restaurantModel import restaurant
from restaurant.serializers import PostCreateBlogPost
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers

class AddBlogPostView(CreateAPIView):
    queryset = blogPost.objects.all()
    serializer_class = PostCreateBlogPost
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
       
        x = serializer.validated_data['restaurant'].owner.id
        if self.request.user.id == x:
            serializer.save()
            restaurant_ = restaurant.objects.get(pk=serializer.validated_data['restaurant'].id)
            
            for follower in restaurantFollow.objects.filter(restaurant=restaurant_):
                Notification.objects.create(intended_for = follower.user, 
        text = restaurant_.name + " has added a new blog post '" + serializer.validated_data['title'] + "'", type="User"
        )
        else:
            raise serializers.ValidationError('Not your restaurant')
