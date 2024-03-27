from rest_framework import serializers
from .models import GerenciadorDeClientes

class GerenciadorDeClientesSerializer(serializers.ModelSerializer):
    class Meta:
        model = GerenciadorDeClientes
        fields = ['id', 'nome', 'telefone', 'endereco', 'email']
