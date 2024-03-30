from django.utils import timezone
from rest_framework import serializers
from gerenciador_de_produtos.serializers import ProdutoSerializer
from .models import Pedido

class PedidoSerializerResponse(serializers.ModelSerializer):
    produtos = serializers.SerializerMethodField()
    class Meta:
        model = Pedido
        fields = ['id', 'data_hora', 'produtos']
        read_only_fields = ['data_hora']

    def create(self, validated_data):
        validated_data['data_hora'] = timezone.now()
        return super().create(validated_data)

    def get_produtos(self, obj):
        produtos_queryset = obj.produtos.all()
        produtos_serializer = ProdutoSerializer(produtos_queryset, many=True)
        return produtos_serializer.data

class PedidoSerializerRequest(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = ['produtos']
        read_only_fields = ['data_hora']

    def create(self, validated_data):
        validated_data['data_hora'] = timezone.now()
        return super().create(validated_data)