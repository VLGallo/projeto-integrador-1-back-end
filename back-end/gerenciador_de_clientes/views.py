from rest_framework.exceptions import NotFound
from .models import GerenciadorDeClientes
from .serializers import GerenciadorDeClientesSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

class GerenciadorDeClientesCreateView(APIView):
    def post(self, request):
        serializer = GerenciadorDeClientesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GerenciadorDeClientesListView(APIView):
    def get(self, request):
        clients = GerenciadorDeClientes.objects.all()
        serializer = GerenciadorDeClientesSerializer(clients, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

class GerenciadorDeClientesDetailView(APIView):
    def get_object(self, pk):
        try:
            return GerenciadorDeClientes.objects.get(pk=pk)
        except GerenciadorDeClientes.DoesNotExist:
            raise NotFound("Cliente não encontrado")

    def get(self, request, pk):
        client = self.get_object(pk)
        serializer = GerenciadorDeClientesSerializer(client)
        return Response(serializer.data)

class GerenciadorDeClientesUpdateView(APIView):
    def get_object(self, pk):
        try:
            return GerenciadorDeClientes.objects.get(pk=pk)
        except GerenciadorDeClientes.DoesNotExist:
            raise NotFound("Cliente não encontrado")

    def put(self, request, pk):
        client = self.get_object(pk)
        serializer = GerenciadorDeClientesSerializer(client, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class GerenciadorDeClientesDeleteView(APIView):
    def get_object(self, pk):
        try:
            return GerenciadorDeClientes.objects.get(pk=pk)
        except GerenciadorDeClientes.DoesNotExist:
            raise NotFound("Cliente não encontrado")

    def delete(self, request, pk):
        client = self.get_object(pk)
        client.delete()
        return Response(status=status.HTTP_202_ACCEPTED, data="Cliente deletado com sucesso")
