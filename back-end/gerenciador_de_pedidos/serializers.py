from datetime import datetime
from rest_framework import serializers
from gerenciador_de_produtos.serializers import ProdutoSerializer
from .models import Pedido

from django.utils import timezone

class PedidoSerializerResponse(serializers.ModelSerializer):
    produtos = serializers.SerializerMethodField()
    cliente = serializers.PrimaryKeyRelatedField(read_only=True)
    funcionario = serializers.PrimaryKeyRelatedField(read_only=True)
    motoboy = serializers.PrimaryKeyRelatedField(read_only=True)
    data_hora_finalizacao = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Pedido
        fields = ['id', 'data_hora_inicio', 'data_hora_finalizacao', 'produtos', 'cliente', 'funcionario', 'motoboy']

    def validate_funcionario(self, value):
        if value is None:
            raise serializers.ValidationError("O campo 'funcionario' é obrigatório.")
        return value

    def get_produtos(self, obj):
        produtos_queryset = obj.produtos.all()
        produtos_serializer = ProdutoSerializer(produtos_queryset, many=True)
        return produtos_serializer.data

class PedidoSerializerRequest(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = ['produtos', 'cliente', 'funcionario']

    def validate_funcionario(self, value):
        if value is None:
            raise serializers.ValidationError("O campo 'funcionario' é obrigatório.")
        return value

    def create(self, validated_data):
        validated_data['data_hora_inicio'] = timezone.now()
        return super().create(validated_data)