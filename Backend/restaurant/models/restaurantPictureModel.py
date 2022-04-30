from django.db import models
from restaurant.models.restaurantModel import restaurant


class restaurantPicture(models.Model):
    alt_code = models.CharField(max_length=20, blank=True, null=True)
    restaurant = models.ForeignKey(to=restaurant, on_delete=models.CASCADE)
    image = models.ImageField()
