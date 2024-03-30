from django.db.models import Prefetch
from rest_framework.exceptions import NotFound

from gerenciador_de_produtos.models import Produto
from .models import Pedido
from .serializers import PedidoSerializerRequest, PedidoSerializerResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class PedidoView(APIView):
    def post(self, request):
        serializer = PedidoSerializerRequest(data=request.data)
        serializer.is_valid(raise_exception=True)
        pedido = serializer.save()

        response_data = PedidoSerializerResponse(pedido).data

        return Response(data=response_data, status=status.HTTP_201_CREATED)


class PedidoListView(APIView):
    def get(self, request):
        pedidos = Pedido.objects.all()
        serializer = PedidoSerializerResponse(pedidos, many=True)

        print(serializer.data)

        for pedido in serializer.data:
            total = sum(float(produto['preco']) for produto in pedido['produtos'])
            pedido['total'] = total

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class PedidoDetailView(APIView):
    def get_object(self, pk):
        try:
            return Pedido.objects.get(pk=pk)
        except Pedido.DoesNotExist:
            raise NotFound("Pedido não encontrado")

    def get(self, request, pk):
        pedido = self.get_object(pk)
        serializer = PedidoSerializerResponse(pedido)

        total = sum(produto.preco for produto in pedido.produtos.all())
        data = serializer.data
        data['total'] = total

        return Response(data=data)


class PedidoUpdateView(APIView):
    def get_object(self, pk):
        try:
            return Pedido.objects.get(pk=pk)
        except Pedido.DoesNotExist:
            raise NotFound("Pedido não encontrado")

    def put(self, request, pk):
        pedido = self.get_object(pk)
        serializer = PedidoSerializerResponse(pedido, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class PedidoDeleteView(APIView):
    def get_object(self, pk):
        try:
            return Pedido.objects.get(pk=pk)
        except Pedido.DoesNotExist:
            raise NotFound("Pedido não encontrado")

    def delete(self, request, pk):
        pedido = self.get_object(pk)
        pedido.delete()
        return Response(status=status.HTTP_202_ACCEPTED, data="Pedido deletado com sucesso")
