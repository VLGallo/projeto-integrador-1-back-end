from django.utils import timezone
from rest_framework import serializers
from gerenciador_de_produtos.serializers import ProdutoSerializer
from .models import Pedido, Funcionario

class PedidoSerializerResponse(serializers.ModelSerializer):
    produtos = serializers.SerializerMethodField()
    cliente = serializers.PrimaryKeyRelatedField(read_only=True)
    funcionario = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Pedido
        fields = ['id', 'data_hora', 'produtos', 'cliente', 'funcionario']
        read_only_fields = ['data_hora']

    def create(self, validated_data):
        validated_data['data_hora'] = timezone.now()
        return super().create(validated_data)

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
        read_only_fields = ['data_hora']

    def validate_funcionario(self, value):
        if value is None:
            raise serializers.ValidationError("O campo 'funcionario' é obrigatório.")
        return value

    def create(self, validated_data):
        validated_data['data_hora'] = timezone.now()
        return super().create(validated_data)