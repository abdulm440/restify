# from django.contrib import admin
from django.urls import path

from rest_framework_simplejwt import views as jwt_views
from user.views.userRegister import RegisterApi, UpdateApi, UserViewSet

app_name = 'user'
urlpatterns = [
    path('login/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterApi.as_view()),
    path('update/', UpdateApi.as_view(), name='user_update'),
    path('get/', UserViewSet.as_view({'get': 'retrieve'}), name='get_user')
]
