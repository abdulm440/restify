from django.db import models
from restaurant.models.blogPostModel import blogPost
from django.conf import settings

NotifChoices = (('Owner', 'OWNER'), ('User', 'USER'))

class Notification(models.Model):
    type = models.CharField(max_length=5, choices=NotifChoices)
    text = models.CharField(max_length=10000, blank=False, null=False)
    intended_for = models.ForeignKey(to=settings.AUTH_USER_MODEL,null=False, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)

