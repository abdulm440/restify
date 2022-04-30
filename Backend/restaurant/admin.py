from django.contrib import admin
from restaurant.models.restaurantPictureModel import restaurantPicture
from restaurant.models.menuItemModel import menuItem
from restaurant.models.restaurantModel import restaurant
from restaurant.models.blogPostModel import blogPost

admin.site.register(restaurant)
admin.site.register(blogPost)
admin.site.register(menuItem)
admin.site.register(restaurantPicture)
