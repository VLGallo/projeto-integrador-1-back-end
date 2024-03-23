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


class MotoboysListView(APIView):
    def get(self, request):
        companies = Motoboy.objects.all()
        serializer = MotoboySerializer(companies, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)