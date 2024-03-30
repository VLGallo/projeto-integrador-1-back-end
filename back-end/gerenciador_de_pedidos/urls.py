from django.urls import path
from .views import PedidoView, PedidoListView, PedidoDetailView, PedidoUpdateView, PedidoDeleteView

urlpatterns = [
    path('pedido', PedidoListView.as_view()),
    path('pedido/add', PedidoView.as_view()),
    path('pedido/<int:pk>', PedidoDetailView.as_view()),
    path('pedido/update/<int:pk>', PedidoUpdateView.as_view()),
    path('pedido/delete/<int:pk>', PedidoDeleteView.as_view()),
]
