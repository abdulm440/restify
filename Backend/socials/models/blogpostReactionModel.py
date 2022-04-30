from django.db import models
from restaurant.models.blogPostModel import blogPost
from django.conf import settings

ReactionChoice = (('Like', 'LIKE'), ('Dislike', 'DISLIKE'))

class BlogPostReaction(models.Model):
    type = models.CharField(max_length=7, choices=ReactionChoice)
    blog = models.ForeignKey(to=blogPost, null=False, blank=False, on_delete=models.CASCADE)
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL,null=False, on_delete=models.CASCADE)  #related name, onDelete??
    date = models.DateTimeField(auto_now_add=True)

