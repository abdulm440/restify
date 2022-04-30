from django.db import models
from restaurant.models.restaurantModel import restaurant
from django.conf import settings
ReactionChoice = (('Follow', 'FOLLOW'), ('Unfollow', 'UNFOLLOW'))

class restaurantFollow(models.Model):
    type = models.CharField(max_length=8, choices=ReactionChoice)
    restaurant = models.ForeignKey(to=restaurant, null=False, blank=False, on_delete=models.CASCADE)
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL,null=False, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)

