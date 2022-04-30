from socials.models.notification import Notification
from rest_framework import serializers
from socials.models.restaurantFollowModel import restaurantFollow
from socials.models.restaurantReactionModel import restaurantReaction
from socials.models.blogpostReactionModel import BlogPostReaction
from restaurant.models.restaurantModel import restaurant
from user.models import Comment

class RestaurantFollow(serializers.ModelSerializer):

    class Meta:
        model = restaurantFollow
        fields = [
            'type',
            'restaurant',
            'user',
            'date'
        ]
class RestaurantReact(serializers.ModelSerializer):

    class Meta:
        model = restaurantReaction
        fields = [
            'type',
            'restaurant',
            'user',
            'date'
        ]
class PostUpdateBlogPostReaction(serializers.ModelSerializer):

    class Meta:
        model = BlogPostReaction
        fields = [
            'type',
            'blog',
            'user',
            'date'
        ]

class NotificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notification
        fields ="__all__"

class PostCreateRestaurantComment(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = "__all__"
        def save(self):
            comment = Comment(title=self.validated_data['title'],
            content=self.validated_data['content'], 
            owner=self.request.user, 
            restaurant=restaurant.objects.get(id=self.validated_data['restaurant']),
            name=self.request.user.first_name)