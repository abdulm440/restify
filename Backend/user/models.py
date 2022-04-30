from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.conf import settings
from restaurant.models.restaurantModel import restaurant
from user.userManager import CustomUserManager

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField( unique=True, blank=False, null=False)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    avatar = models.ImageField()
    phone_number= models.CharField(max_length=50)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

class Comment(models.Model):
    title = models.CharField(max_length=1000)
    content = models.CharField(max_length=1000000)
    owner = models.ForeignKey(to=settings.AUTH_USER_MODEL, null=False, on_delete=models.CASCADE)
    restaurant = models.ForeignKey(to=restaurant, null=False, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=10000)