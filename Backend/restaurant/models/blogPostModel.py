from django.db import models
from restaurant.models.restaurantModel import restaurant


class blogPost(models.Model):
    title = models.CharField(max_length=20, null=False, blank=False)
    short_description = models.CharField(max_length=50, null=False, blank=False)
    restaurant = models.ForeignKey(to=restaurant, on_delete=models.CASCADE, null=True)
    content = models.TextField()
    date = models.DateTimeField(auto_now_add=True, null=True)

