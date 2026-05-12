from django.contrib import admin
from .models import Doacao, Categoria


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    """
    Configuração do admin para Categoria
    """
    list_display = ('icone', 'nome', 'descricao')
    search_fields = ('nome',)


@admin.register(Doacao)
class DoacaoAdmin(admin.ModelAdmin):
    """
    Configuração do admin para Doação.
    Permite gerenciar todas as doações cadastradas.
    """
    list_display = ('titulo', 'doador_nome', 'categoria', 'status', 'cidade', 'estado', 'criado_em')
    list_filter = ('status', 'categoria', 'estado')        # Filtros laterais
    search_fields = ('titulo', 'doador_nome', 'cidade')    # Busca por texto
    list_editable = ('status',)                            # Editar status direto na lista
    readonly_fields = ('criado_em', 'atualizado_em')       # Campos somente leitura
    ordering = ('-criado_em',)

    fieldsets = (
        ('Informações da Doação', {
            'fields': ('titulo', 'descricao', 'categoria', 'status')
        }),
        ('Doador', {
            'fields': ('doador_nome', 'doador_email')
        }),
        ('Localização', {
            'fields': ('cidade', 'estado')
        }),
        ('Datas', {
            'fields': ('criado_em', 'atualizado_em'),
            'classes': ('collapse',)
        }),
    )
