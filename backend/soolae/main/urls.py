from django.urls import path
from . import views

urlpatterns = [
    path("recommend/", views.recommend, name="recommend"),
    path("alcohol/<int:alcohol_id>/", views.alcohol),
]
