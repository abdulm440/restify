from django.db import models
from restaurant.models.restaurantModel import restaurant
from django.conf import settings
ReactionChoice = (('Like', 'LIKE'), ('Dislike', 'DISLIKE'))

class restaurantReaction(models.Model):
    type = models.CharField(max_length=7, choices=ReactionChoice)
    restaurant = models.ForeignKey(to=restaurant, null=False, blank=False, on_delete=models.CASCADE)
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL,null=False, on_delete=models.CASCADE) #related name, onDelete??
    date = models.DateTimeField(auto_now_add=True)

