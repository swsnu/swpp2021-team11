from django.urls import path
from . import views

urlpatterns = (
    path('user/<int:user_id>/', views.user_profile, name = 'user_profile'),
    path('alcohol/<int:alcohol_id>/', views.alcohol_info, name = 'alcohol_info'),
    path('test/', views.test, name = 'test'),
    path('recommend/', views.recommend, name = 'recommend'),
)
