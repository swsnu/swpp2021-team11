from django.urls import path
from . import views

urlpatterns = {
    path('user/<int:user_id>/', views.user_profile, name = 'user_profile'),
    path('recommend/', views.recommend, name = 'recommend'),
}
