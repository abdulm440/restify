from rest_framework.generics import DestroyAPIView
from restaurant.models.blogPostModel import blogPost
from restaurant.serializers import PostDeleteBlogPost
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponseBadRequest
from rest_framework import serializers

class deleteBlogPostView(DestroyAPIView):
    queryset = blogPost.objects.all()
    serializer_class = PostDeleteBlogPost
    lookup_field = 'id'
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
       
        x = blogPost.objects.get(id=kwargs['id']).restaurant.owner.id
        if self.request.user.id == x:
            return self.destroy(request,*args,**kwargs)
        raise serializers.ValidationError('Not your restaurant')
