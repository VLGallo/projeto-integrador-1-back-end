from django.db import models

class Pedido(models.Model):
    data_hora = models.DateTimeField()
    produtos = models.JSONField()
    total = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Pedido em {self.data_hora} - Total: R${self.total}"
