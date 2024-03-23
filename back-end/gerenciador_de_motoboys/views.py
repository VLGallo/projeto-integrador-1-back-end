from rest_framework.exceptions import NotFound

from gerenciador_de_motoboys.models import Motoboy
from gerenciador_de_motoboys.serializers import MotoboySerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class MotoboyView(APIView):
    def post(self, request):
        serializer = MotoboySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        response_data = MotoboySerializer(user).data

        return Response(data=response_data, status=status.HTTP_201_CREATED)

class MotoboyListView(APIView):
    def get(self, request):
        companies = Motoboy.objects.all()
        serializer = MotoboySerializer(companies, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class MotoboyDetailView(APIView):
    def get_object(self, pk):
        try:
            return Motoboy.objects.get(pk=pk)
        except Motoboy.DoesNotExist:
            raise NotFound("Motoboy não encontrado")

    def get(self, request, pk):
        motoboy = self.get_object(pk)
        serializer = MotoboySerializer(motoboy)
        return Response(serializer.data)

class MotoboyUpdateView(APIView):
    def get_object(self, pk):
        try:
            return Motoboy.objects.get(pk=pk)
        except Motoboy.DoesNotExist:
            raise NotFound("Motoboy não encontrado")

    def put(self, request, pk):
        motoboy = self.get_object(pk)
        serializer = MotoboySerializer(motoboy, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class MotoboyDeleteView(APIView):
    def get_object(self, pk):
        try:
            return Motoboy.objects.get(pk=pk)
        except Motoboy.DoesNotExist:
            raise NotFound("Motoboy não encontrado")

    def delete(self, request, pk):
        motoboy = self.get_object(pk)
        motoboy.delete()
        return Response(status=status.HTTP_202_ACCEPTED, data="Motoboy deletado com sucesso")