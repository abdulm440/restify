# from django.contrib import admin
from django.urls import path
from restaurant.views.deleteMenu import deleteMenuItemView

from restaurant.views.addBlog import AddBlogPostView
from restaurant.views.addMenu import AddMenuItemView
from restaurant.views.addPicture import AddPictureView
from restaurant.views.addRestaurant import AddRestaurantView, GetUsersRestaurant
from restaurant.views.deleteBlog import deleteBlogPostView
from restaurant.views.deletePicture import DeletePictureView
from restaurant.views.getBlog import GetBlogPostView
from restaurant.views.getRestaurant import ListRestaurantsView
from restaurant.views.getRestaurant import GetRestaurantView
from restaurant.views.updateMenu import UpdateMenuItems
from restaurant.views.updateRestaurant import UpdateRestaurantView

app_name = 'restaurant'
urlpatterns = [
     # path('admin/', admin.site.urls),
     path('add/', AddRestaurantView.as_view(), name="addRestaurant"),
     path('addBlog/', AddBlogPostView.as_view(), name="addBlogPost"),
     path('addMenuItem/', AddMenuItemView.as_view(), name="addMenuItem"),
     path('updateMenuItem/<id>/', UpdateMenuItems.as_view(), name="updateMenuItems"),
     path('deleteBlog/<id>/', deleteBlogPostView.as_view(), name="deleteBlogPost"),
     path('deleteMenuItem/<id>/', deleteMenuItemView.as_view(), name="deleteMenuItem"),
     path('update/<id>/', UpdateRestaurantView.as_view(), name="updateRestaurant"),
     path('getRestaurant/<id>/', GetRestaurantView.as_view(),name="getRestaurant"),
     path('list/', ListRestaurantsView.as_view(),name="search"),
     path('getBlogPost/<id>/', GetBlogPostView.as_view(),name="getBlogPost"),
     path('addPicture/', AddPictureView.as_view(), name="addPicture"),
     path('deletePicture/<id>/', DeletePictureView.as_view(), name="deletePicture"),
     path('user/', GetUsersRestaurant.as_view(), name="getUserRest"),

]
