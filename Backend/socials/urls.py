from django.urls import path
from socials.views.notificationsList import NotificationsView
from socials.views.updateRestaurantFollow import CreateRestaurantFollowView, DeleteRestaurantFollowView
from socials.views.updateRestaurantReaction import CreateRestaurantReaction, UpdateRestaurantReaction, DeleteRestaurantReaction
from socials.views.updateBlogPostReaction import CreateBlogReaction, DeleteBlogReaction, UpdateBlogReaction
from socials.views.createRestaurantComment import CreateRestaurantCommentView
from socials.views.listFeed import ListFeedView
from socials.views.listComments import ListCommentsView

app_name = 'socials'
urlpatterns = [
    path('<rest_id>/like_or_dislike/', CreateRestaurantReaction.as_view(), name="create_rest_react"),
    path('<rest_id>/update_like_or_dislike/', UpdateRestaurantReaction.as_view(), name="create_rest_react"),
    path('<rest_id>/delete_like_or_dislike/', DeleteRestaurantReaction.as_view(), name="delete_rest_react"),
    path('<rest_id>/follow/', CreateRestaurantFollowView.as_view(), name="createRestaurantFollow"),
    path('<rest_id>/unfollow/', DeleteRestaurantFollowView.as_view(), name="deleteRestaurantFollow"),
    path('feed/', ListFeedView.as_view(), name="listFeedView"),
    path('blog/<blog_id>/like_or_dislike/', CreateBlogReaction.as_view(), name="create_blog_react"),
    path('blog/<blog_id>/update_like_or_dislike/', UpdateBlogReaction.as_view(), name="update_blog_react"),
    path('blog/<blog_id>/delete_like_or_dislike/', DeleteBlogReaction.as_view(), name="delete_blog_react"),
    path('<rest_id>/comment/', CreateRestaurantCommentView.as_view(), name="createRestaurantComment"),
    path('comments/list/', ListCommentsView.as_view(), name="list_comments"),
    path('notifs/', NotificationsView.as_view(), name="list_notifs")
]
