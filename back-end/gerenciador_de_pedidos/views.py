from rest_framework.exceptions import NotFound
from .models import Pedido
from .serializers import PedidoSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class PedidoView(APIView):
    def post(self, request):
        serializer = PedidoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        pedido = serializer.save()

        response_data = PedidoSerializer(pedido).data

        return Response(data=response_data, status=status.HTTP_201_CREATED)


class PedidoListView(APIView):
    def get(self, request):
        pedidos = Pedido.objects.all()
        serializer = PedidoSerializer(pedidos, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class PedidoDetailView(APIView):
    def get_object(self, pk):
        try:
            return Pedido.objects.get(pk=pk)
        except Pedido.DoesNotExist:
            raise NotFound("Pedido não encontrado")

    def get(self, request, pk):
        pedido = self.get_object(pk)
        serializer = PedidoSerializer(pedido)
        return Response(serializer.data)


class PedidoUpdateView(APIView):
    def get_object(self, pk):
        try:
            return Pedido.objects.get(pk=pk)
        except Pedido.DoesNotExist:
            raise NotFound("Pedido não encontrado")

    def put(self, request, pk):
        pedido = self.get_object(pk)
        serializer = PedidoSerializer(pedido, data=request.data)
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
