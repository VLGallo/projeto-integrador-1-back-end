from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path("admin/", admin.site.urls),
    path('', include("gerenciador_de_motoboys.urls")),
    path('', include("gerenciador_de_funcionarios.urls")),
    path('', include("gerenciador_de_clientes.urls")),
    path('', include("gerenciador_de_produtos.urls")),
    path('', include("gerenciador_de_pedidos.urls")),
]
