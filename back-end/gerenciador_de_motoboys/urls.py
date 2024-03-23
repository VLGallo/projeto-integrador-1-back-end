from django.urls import path
from .views import MotoboyView, MotoboysListView

urlpatterns = [
    path('motoboys/', MotoboysListView.as_view()),
    path('motoboys/add', MotoboyView.as_view()),
]