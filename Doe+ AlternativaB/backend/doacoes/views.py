from rest_framework import generics, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Doacao, Categoria
from .serializers import DoacaoSerializer, CategoriaSerializer


class CategoriaListView(generics.ListAPIView):
    """
    GET /api/categorias/
    Lista todas as categorias disponíveis.
    """
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer


class DoacaoListCreateView(generics.ListCreateAPIView):
    """
    GET  /api/doacoes/        → Lista todas as doações
    POST /api/doacoes/        → Cria uma nova doação
    
    Suporta filtro por status: /api/doacoes/?status=disponivel
    """
    queryset = Doacao.objects.all().select_related('categoria')
    serializer_class = DoacaoSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['titulo', 'descricao', 'doador_nome', 'cidade']

    def get_queryset(self):
        """
        Filtra por status se o parâmetro ?status= for passado na URL.
        Exemplo: /api/doacoes/?status=disponivel
        """
        queryset = super().get_queryset()
        status = self.request.query_params.get('status')
        if status:
            queryset = queryset.filter(status=status)
        return queryset


class DoacaoDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET    /api/doacoes/<id>/   → Detalhe de uma doação
    PUT    /api/doacoes/<id>/   → Atualiza uma doação (todos os campos)
    PATCH  /api/doacoes/<id>/   → Atualiza parcialmente (ex: só o status)
    DELETE /api/doacoes/<id>/   → Remove a doação
    """
    queryset = Doacao.objects.all().select_related('categoria')
    serializer_class = DoacaoSerializer


class EstatisticasView(APIView):
    """
    GET /api/estatisticas/
    Retorna um resumo das doações para o dashboard do frontend.
    """
    def get(self, request):
        total = Doacao.objects.count()
        disponiveis = Doacao.objects.filter(status='disponivel').count()
        reservadas = Doacao.objects.filter(status='reservado').count()
        entregues = Doacao.objects.filter(status='entregue').count()

        return Response({
            'total': total,
            'disponiveis': disponiveis,
            'reservadas': reservadas,
            'entregues': entregues,
        })