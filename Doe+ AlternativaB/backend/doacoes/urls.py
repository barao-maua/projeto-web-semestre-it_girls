from django.urls import path
from . import views

urlpatterns = [
    # Categorias
    path('categorias/', views.CategoriaListView.as_view(), name='categoria-list'),

    # Doações: listar e criar
    path('doacoes/', views.DoacaoListCreateView.as_view(), name='doacao-list-create'),

    # Doações: detalhar, editar, deletar
    path('doacoes/<int:pk>/', views.DoacaoDetailView.as_view(), name='doacao-detail'),

    # Estatísticas para o dashboard
    path('estatisticas/', views.EstatisticasView.as_view(), name='estatisticas'),
]