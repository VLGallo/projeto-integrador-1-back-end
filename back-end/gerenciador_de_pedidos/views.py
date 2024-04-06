from gerenciador_de_clientes.models import Cliente
from gerenciador_de_clientes.serializers import ClienteSerializer
from .models import Pedido
from .serializers import PedidoSerializerRequest, PedidoSerializerResponse
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.views import APIView


class PedidoView(APIView):
    def post(self, request):
        serializer = PedidoSerializerRequest(data=request.data)
        serializer.is_valid(raise_exception=True)

        cliente_id = request.data.get('cliente', None)
        pedido = serializer.save(cliente_id=cliente_id)

        response_data = PedidoSerializerResponse(pedido).data

        return Response(data=response_data, status=status.HTTP_201_CREATED)


class PedidoListView(APIView):
    def get(self, request):
        pedidos = Pedido.objects.all()
        serializer = PedidoSerializerResponse(pedidos, many=True)
        pedidos_data = serializer.data

        for pedido in pedidos_data:
            cliente_id = pedido['cliente']
            try:
                cliente = Cliente.objects.get(pk=cliente_id)
                pedido['cliente'] = ClienteSerializer(cliente).data
            except Cliente.DoesNotExist:
                pedido['cliente'] = None

            total = sum(float(produto['preco']) for produto in pedido['produtos'])
            pedido['total'] = total

        return Response(data=pedidos_data, status=status.HTTP_200_OK)


class PedidoDetailView(APIView):
    def get_object(self, pk):
        try:
            return Pedido.objects.get(pk=pk)
        except Pedido.DoesNotExist:
            raise NotFound("Pedido não encontrado")

    def get(self, request, pk):
        pedido = self.get_object(pk)
        serializer = PedidoSerializerResponse(pedido)

        total = round(sum(produto.preco for produto in pedido.produtos.all()), 2)
        data = serializer.data
        data['total'] = total

        cliente_id = pedido.cliente.pk
        cliente = Cliente.objects.get(pk=cliente_id)
        cliente_data = ClienteSerializer(cliente).data
        serializer.data['cliente'] = cliente_data

        return Response(data=data)


class PedidoUpdateView(APIView):
    def get_object(self, pk):
        try:
            return Pedido.objects.get(pk=pk)
        except Pedido.DoesNotExist:
            raise NotFound("Pedido não encontrado")

    def put(self, request, pk):
        pedido = self.get_object(pk)
        serializer = PedidoSerializerResponse(pedido, data=request.data, partial=True)
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
