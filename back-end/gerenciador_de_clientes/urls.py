from django.urls import path
from .views import GerenciadorDeClientesListView, GerenciadorDeClientesDetailView, GerenciadorDeClientesCreateView, GerenciadorDeClientesUpdateView, GerenciadorDeClientesDeleteView

urlpatterns = [
    path('cliente/', GerenciadorDeClientesListView.as_view()),
    path('cliente/add/', GerenciadorDeClientesCreateView.as_view()),
    path('cliente/<int:pk>/', GerenciadorDeClientesDetailView.as_view()),
    path('cliente/update/<int:pk>/', GerenciadorDeClientesUpdateView.as_view()),
    path('cliente/delete/<int:pk>/', GerenciadorDeClientesDeleteView.as_view()),
]
