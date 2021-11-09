from django.urls import path
from . import views

urlpatterns = (
    path('signup/', views.signup, name = 'signup'),
    path('signin/', views.signin, name = 'signin'),
    path('signout/', views.signout, name = 'signout'),
    path('user/<int:user_id>/', views.user_profile, name = 'user_profile'),
    path('alcohol/', views.alcohol, name="alcohol_list"),
    path('alcohol/<int:alcohol_id>/', views.alcohol_info, name = 'alcohol_info'),
    path('test/', views.test, name = 'test'),
    path('recommend/', views.recommend, name = 'recommend'),
    path('category/', views.category_list, name = "category_list"),
    path('category/<int:category_id>/', views.category, name = "category"),
    path('category/alcohol/<int:category_id>/', views.category_alcohol, name = 'category_alcohol'),
)
