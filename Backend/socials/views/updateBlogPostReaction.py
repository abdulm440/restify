from socials.models.notification import Notification
from rest_framework.generics import CreateAPIView, UpdateAPIView, DestroyAPIView
from socials.models.blogpostReactionModel import BlogPostReaction
from socials.serializers import PostUpdateBlogPostReaction
from restaurant.models.blogPostModel import blogPost
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics, permissions, mixins

from rest_framework import status
from django.http import Http404

class CreateBlogReaction(CreateAPIView):
    queryset = blogPost.objects.all()
    serializer_class = PostUpdateBlogPostReaction
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        data = request.data
        data["user"] = self.request.user.id
        data["blog"] = kwargs['blog_id']
        if self.request.data.get("type"):
            data["type"] = self.request.data.get("type")
        else:
            return Response({"No reaction type specified"}, status=status.HTTP_400_BAD_REQUEST)
        if(not blogPost.objects.filter(pk=data["blog"])):
            return Response({"Blog post not found"}, status=status.HTTP_404_NOT_FOUND)
        
        if(BlogPostReaction.objects.filter(user=self.request.user.id, blog = kwargs['blog_id'])):
            return Response({"User has already reacted to this post"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        if data["type"] == "Like":
            Notification.objects.create(intended_for = blogPost.objects.get(pk=data["blog"]).restaurant.owner, text = self.request.user.first_name + " liked your blog post '"+blogPost.objects.get(pk=data["blog"]).title+"'" , type="Owner" )
           
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class UpdateBlogReaction(UpdateAPIView):
    queryset = BlogPostReaction.objects.all()
    serializer_class = PostUpdateBlogPostReaction
    permission_classes = [IsAuthenticated]

    def get_object(self):
        """
        Returns the object the view is displaying.
        You may want to override this if you need to provide non-standard
        queryset lookups.  Eg if objects are referenced using multiple
        keyword arguments in the url conf.
        """
        queryset = self.filter_queryset(self.get_queryset())
        
        

        if(len(blogPost.objects.filter(pk=self.kwargs['blog_id'])) == 0):
            raise Http404

        obj = queryset.filter(blog=self.kwargs['blog_id'],user=self.request.user).first()

        return obj

    def update(self, request, *args, **kwargs):
        partial = True
        
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if request.data.get("type") == "Like":
            Notification.objects.create(intended_for = instance.blog.restaurant.owner, text = self.request.user.first_name + " liked your blog post '"+instance.blog.title+"'" , type="Owner" )
         

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

class DeleteBlogReaction(DestroyAPIView):
    queryset = BlogPostReaction.objects.all()
    serializer_class = PostUpdateBlogPostReaction
    permission_classes = [IsAuthenticated]

    def get_object(self):
        """
        Returns the object the view is displaying.
        You may want to override this if you need to provide non-standard
        queryset lookups.  Eg if objects are referenced using multiple
        keyword arguments in the url conf.
        """
        queryset = self.filter_queryset(self.get_queryset())
        
        

        if(len(blogPost.objects.filter(pk=self.kwargs['blog_id'])) == 0):
            raise Http404

        obj = queryset.filter(blog=self.kwargs['blog_id'],user=self.request.user).first()

        return obj

    def delete(self, request, *args, **kwargs):
        query = self.queryset.filter(blog=kwargs['blog_id'],user=self.request.user)

        if(not blogPost.objects.filter(pk=kwargs['blog_id'])):
            return Response({"Blog not found"}, status=status.HTTP_404_NOT_FOUND)

        if(len(query) == 0):
            return Response({"User has not reacted to this restaurant"}, status=status.HTTP_400_BAD_REQUEST)

        

        return self.destroy(request, *args, **kwargs)


