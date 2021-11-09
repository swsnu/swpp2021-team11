from django.urls import path
from . import views

urlpatterns = (
    path('signup/', views.signup, name = 'signup'),
    path('signin/', views.signin, name = 'signin'),
    path('signout/', views.signout, name = 'signout'),
    path('user/<int:user_id>/', views.user_profile, name = 'user_profile'),
    path('alcohol/<int:alcohol_id>/', views.alcohol_info, name = 'alcohol_info'),
    path('test/', views.test, name = 'test'),
    path('recommend/', views.recommend, name = 'recommend'),
    path('review/', views.review_list, name = 'review_list'),
    path('review/<int:review_id>/', views.review_detail, name = 'review_detail')
)
