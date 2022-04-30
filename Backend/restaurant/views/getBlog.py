from rest_framework.generics import RetrieveAPIView

from restaurant.models.blogPostModel import blogPost
from restaurant.serializers import PostCreateBlogPost


class GetBlogPostView(RetrieveAPIView):
    queryset = blogPost.objects.all()
    serializer_class = PostCreateBlogPost
    lookup_field = 'id'

