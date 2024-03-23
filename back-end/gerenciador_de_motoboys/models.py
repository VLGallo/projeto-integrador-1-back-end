from django.db import models

# Create your models here.
class Motoboy(models.Model):
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=200)
    telefone = models.CharField(max_length=30)
    placa = models.CharField(max_length=20)

    def __str__(self):
        return self.nome