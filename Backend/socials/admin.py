from django.contrib import admin
from socials.models.notification import Notification
from socials.models.blogpostReactionModel import BlogPostReaction
from socials.models.restaurantFollowModel import restaurantFollow
from socials.models.restaurantReactionModel import restaurantReaction

# Register your models here.
admin.site.register(BlogPostReaction)
admin.site.register(restaurantFollow)
admin.site.register(restaurantReaction)
admin.site.register(Notification)
