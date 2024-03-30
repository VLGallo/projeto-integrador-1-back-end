from rest_framework import serializers

from gerenciador_de_funcionarios.models import Funcionario
from gerenciador_de_funcionarios.serializers import FuncionarioSerializer
from .models import Motoboy


class MotoboySerializerRequest(serializers.ModelSerializer):
    funcionario = serializers.IntegerField(write_only=True)

    class Meta:
        model = Motoboy
        fields = ['id', 'nome', 'telefone', 'placa', 'funcionario']

    def create(self, validated_data):
        funcionario = validated_data.pop('funcionario')
        funcionario = Funcionario.objects.get(pk=funcionario)  # Busca o usuário pelo ID
        validated_data['funcionario'] = funcionario
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Não permitir a atualização do cadastrante
        validated_data.pop('funcionario', None)
        return super().update(instance, validated_data)



class MotoboySerializerResponse(serializers.ModelSerializer):
    funcionarios = serializers.SerializerMethodField()

    class Meta:
        model = Motoboy
        fields = ['id', 'nome', 'telefone', 'placa', 'funcionarios']


    def get_funcionario(self, obj):
        funcionarios_queryset = obj.funcionarios.all()
        funcionarios_serializer = FuncionarioSerializer(funcionarios_queryset, many=True)
        return funcionarios_serializer.data


