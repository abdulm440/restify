from django.db import models
from restaurant.models.restaurantModel import restaurant


class menuItem(models.Model):
    restaurant = models.ForeignKey(to=restaurant, on_delete=models.CASCADE)
    name = models.CharField(max_length=2000, null=False, blank=False)
    description = models.CharField(max_length=3000, null=False, blank=False)
    price = models.DecimalField(decimal_places=2, null=False, blank=False,
                                max_digits=10)
    type = models.CharField(max_length=15, choices=[("BV", "BEVERAGE"),
                                                   ("AP", "APPETIZERS"),
                                                   ("FD", "FEATURED DISHES"),
                                                   ("RD", "REGULAR DISHES")])

