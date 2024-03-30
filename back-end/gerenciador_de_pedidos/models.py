from django.db import models
from gerenciador_de_produtos.models import Produto


class Pedido(models.Model):
    data_hora = models.DateTimeField()
    produtos = models.ManyToManyField(Produto)


    def __str__(self):
        return f"Pedido em {self.data_hora}"



