from rest_framework import serializers
from .models import Doacao, Categoria


class CategoriaSerializer(serializers.ModelSerializer):
    """
    Serializa os dados da Categoria para JSON
    """
    class Meta:
        model = Categoria
        fields = ['id', 'nome', 'descricao', 'icone']


class DoacaoSerializer(serializers.ModelSerializer):
    """
    Serializa os dados da Doação para JSON.
    Inclui o nome da categoria junto (read-only) para facilitar no frontend.
    """
    categoria_nome = serializers.CharField(source='categoria.nome', read_only=True)
    categoria_icone = serializers.CharField(source='categoria.icone', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Doacao
        fields = [
            'id',
            'titulo',
            'descricao',
            'categoria',
            'categoria_nome',
            'categoria_icone',
            'doador_nome',
            'doador_email',
            'status',
            'status_display',
            'cidade',
            'estado',
            'criado_em',
            'atualizado_em',
        ]
        # criado_em e atualizado_em são preenchidos automaticamente
        read_only_fields = ['criado_em', 'atualizado_em']