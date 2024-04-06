from django.db import models
from gerenciador_de_clientes.models import Cliente
from gerenciador_de_produtos.models import Produto


class Pedido(models.Model):
    data_hora = models.DateTimeField()
    produtos = models.ManyToManyField(Produto)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"Pedido em {self.data_hora} para {self.cliente}"