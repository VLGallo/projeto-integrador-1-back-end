from rest_framework.exceptions import NotFound
from .models import Funcionario
from .serializers import FuncionarioSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

class FuncionarioView(APIView):
    def post(self, request):
        serializer = FuncionarioSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        response_data = FuncionarioSerializer(user).data

        return Response(data=response_data, status=status.HTTP_201_CREATED)

class FuncionarioListView(APIView):
    def get(self, request):
        funcionarios = Funcionario.objects.all()
        serializer = FuncionarioSerializer(funcionarios, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class FuncionarioDetailView(APIView):
    def get_object(self, pk):
        try:
            return Funcionario.objects.get(pk=pk)
        except Funcionario.DoesNotExist:
            raise NotFound("Funcionário não encontrado")

    def get(self, request, pk):
        funcionario = self.get_object(pk)
        serializer = FuncionarioSerializer(funcionario)
        return Response(serializer.data)

class FuncionarioUpdateView(APIView):
    def get_object(self, pk):
        try:
            return Funcionario.objects.get(pk=pk)
        except Funcionario.DoesNotExist:
            raise NotFound("Funcionário não encontrado")

    def put(self, request, pk):
        funcionario = self.get_object(pk)
        serializer = FuncionarioSerializer(funcionario, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class FuncionarioDeleteView(APIView):
    def get_object(self, pk):
        try:
            return Funcionario.objects.get(pk=pk)
        except Funcionario.DoesNotExist:
            raise NotFound("Funcionário não encontrado")

    def delete(self, request, pk):
        funcionario = self.get_object(pk)
        funcionario.delete()
        return Response(status=status.HTTP_202_ACCEPTED, data="Funcionário deletado com sucesso")
