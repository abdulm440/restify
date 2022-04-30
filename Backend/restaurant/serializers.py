from socials.models.blogpostReactionModel import BlogPostReaction
from socials.models.restaurantFollowModel import restaurantFollow
from socials.serializers import PostCreateRestaurantComment
from rest_framework import serializers

from restaurant.models.blogPostModel import blogPost
from restaurant.models.menuItemModel import menuItem
from restaurant.models.restaurantModel import restaurant
from socials.models.restaurantReactionModel import restaurantReaction
from user.models import Comment

from django.http import HttpResponseBadRequest

from restaurant.models.restaurantPictureModel import restaurantPicture



class PostCreateRestaurant(serializers.ModelSerializer):
    class Meta:
        model = restaurant
        fields = "__all__"
        def save(self):
            restaurant = restaurant(name=self.validated_data['name'],
                                    address=self.validated_data['address'],
                                    postalCode=self.validated_data['postalCode'],
                                    phoneNumber=self.validated_data['phoneNumber'],
                                    logo=self.validated_data['logo'],
                                    type=self.validated_data['type'],
                                    owner=self.context['request'].user)

class PostUpdateRestaurant(serializers.ModelSerializer):
    class Meta:
        model = restaurant
        fields = "__all__"
        def save(self):
            restaurant = restaurant(name=self.validated_data['name'],
                                    address=self.validated_data['address'],
                                    postalCode=self.validated_data['postalCode'],
                                    phoneNumber=self.validated_data['phoneNumber'],
                                    logo=self.validated_data['logo'],
                                    type=self.validated_data['type'],
                                    owner=self.context['request'].user)

class GetRestaurant(serializers.ModelSerializer):
    class Meta:
        model = restaurant
        fields = "__all__"

class GetRestaurantDetails(serializers.ModelSerializer):
    menu = serializers.SerializerMethodField('get_menu')
    likes_count = serializers.SerializerMethodField('get_likes')
    dislikes_count = serializers.SerializerMethodField('get_dislikes')
    followers_count = serializers.SerializerMethodField('get_followers')
    comments = serializers.SerializerMethodField('get_comments')
    blog_posts = serializers.SerializerMethodField('get_blogs')
    follow_status = serializers.SerializerMethodField('get_follow_status')
    like_status = serializers.SerializerMethodField('get_like_status')
    images = serializers.SerializerMethodField('get_images')


    def get_follow_status(self, id):
        if self.context['request'].user.is_authenticated:
            is_follow = restaurantFollow.objects.filter(restaurant=id, user=self.context['request'].user)
            if(len(is_follow) > 0):
                return is_follow.first().type
            else:
                return "None"
        return "None"

    def get_like_status(self, id):
        if self.context['request'].user.is_authenticated:
            is_follow = restaurantReaction.objects.filter(restaurant=id, user=self.context['request'].user)
            if(len(is_follow) > 0):
                return is_follow.first().type
            else:
                return "None"
        return "None"

    def get_menu(self, id):
        menu_items = menuItem.objects.filter(restaurant=id)
       
        return PostCreateMenuItem(menu_items, many=True).data

    def get_images(self, id):
        images = restaurantPicture.objects.filter(restaurant=id)
        return PostCreatePicture(images, many=True).data

    def get_likes(self, id):
        likes_count = restaurantReaction.objects.filter(restaurant=id, type="Like").count()
        return likes_count

    def get_followers(self, id):
        followers = restaurantFollow.objects.filter(restaurant=id).count()
        return followers

    def get_dislikes(self, id):
        dislikes_count = restaurantReaction.objects.filter(restaurant=id, type="Dislike").count()
        return dislikes_count

    def get_comments(self, id):
        comments = Comment.objects.filter(restaurant=id)
        return PostCreateRestaurantComment(comments, many=True).data

    def get_blogs(self, id):
        get_blogs = blogPost.objects.filter(restaurant=id)
        return PostCreateBlogPost(get_blogs, context={'request': self.context['request']}, many=True).data
        
    class Meta:
        model = restaurant
        fields = ["id","name", "address", "postalCode","phoneNumber", "logo","description", "type", "owner", "menu", "likes_count", "dislikes_count", "followers_count", "comments", "blog_posts", "follow_status", "like_status", "images"]

class PostCreateBlogPost(serializers.ModelSerializer):
    like_status = serializers.SerializerMethodField('get_like_status')
    likes_count = serializers.SerializerMethodField('get_likes')
    dislikes_count = serializers.SerializerMethodField('get_dislikes')
    name = serializers.SerializerMethodField('get_rest_name')


    def get_like_status(self, id):
        if self.context['request'].user.is_authenticated:
            is_follow = BlogPostReaction.objects.filter(blog=id, user=self.context['request'].user)
            if(len(is_follow) > 0):
                return is_follow.first().type
            else:
                return "None"
        return "None"
    def get_likes(self, id):
        likes_count = BlogPostReaction.objects.filter(blog=id, type="Like").count()
        return likes_count
    def get_dislikes(self, id):
        likes_count = BlogPostReaction.objects.filter(blog=id, type="Dislike").count()
        return likes_count
    def get_rest_name(self, id):
        name = id.restaurant.name
        return name
    class Meta:
        model = blogPost
        fields = ["id", "title", "short_description", "content", "date", "restaurant", 'like_status', "likes_count", "dislikes_count", "name"]
        def save(self):

            x = restaurant.objects.get(id=self.validated_data['id'])
            blogPost = blogPost(title=self.validated_data['title'],
                                    restaurant=restaurant.objects.get(id=self.validated_data['restaurant']),
                                    short_description=self.validated_data['short_description'],
                                    content=self.validated_data['content'])


class PostCreatePicture(serializers.ModelSerializer):
    class Meta:
        model = restaurantPicture
        fields = "__all__"
        def save(self):
            restaurantPicture = restaurantPicture(alt_code=self.validated_data['alt_code'],
                                restaurant=restaurant.objects.get(id=self.validated_data['restaurant']),
                                image=self.validated_data['image'])


class PostDeletePicture(serializers.ModelSerializer):

    class Meta:
        model = restaurantPicture


class PostCreateMenuItem(serializers.ModelSerializer):

    class Meta:
        model = menuItem
        fields = "__all__"

        def save(self):
            menuItem = menuItem(name=self.validated_data['name'],
                                    restaurant=restaurant.objects.get(id=self.validated_data['id']),
                                    description=self.validated_data['description'],
                                    price=self.validated_data['price'],
                                    type=self.validated_data['type'])

class PostUpdateMenuItem(serializers.ModelSerializer):

    class Meta:
        model = menuItem
        fields = "__all__"

        def save(self):
            menuItem = menuItem(name=self.validated_data['name'],
                                restaurant=restaurant.objects.get(id=self.validated_data['id']),
                                description=self.validated_data['description'],
                                price=self.validated_data['price'],
                                type=self.validated_data['type'])

class PostDeleteBlogPost(serializers.ModelSerializer):
    class Meta:
        model = blogPost
