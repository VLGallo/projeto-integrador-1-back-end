from django.urls import path
from .views import PedidoView, PedidoListView, PedidoDetailView, PedidoUpdateView, PedidoDeleteView, \
    PedidoAssignMotoboyView

urlpatterns = [
    path('pedido', PedidoListView.as_view()),
    path('pedido/add', PedidoView.as_view()),
    path('pedido/<int:pk>', PedidoDetailView.as_view()),
    path('pedido/update/<int:pk>', PedidoUpdateView.as_view()),
    path('pedido/delete/<int:pk>', PedidoDeleteView.as_view()),
    path('pedido/<int:pk>/atribuir-motoboy/<int:motoboy_id>', PedidoAssignMotoboyView.as_view())
]
