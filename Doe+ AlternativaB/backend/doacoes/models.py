from django.db import models

class Categoria(models.Model):
    """
    Categorias de doação (ex: Roupas, Alimentos, Eletrônicos)
    """
    nome = models.CharField(max_length=100)
    descricao = models.TextField(blank=True)
    icone = models.CharField(max_length=50, blank=True, default='')

    class Meta:
        verbose_name = 'Categoria'
        verbose_name_plural = 'Categorias'
        ordering = ['nome']

    def __str__(self):
        return self.nome


class Doacao(models.Model):
    """
    Recurso principal do projeto: uma doação de item(ns).
    """

    STATUS_CHOICES = [
        ('disponivel', 'Disponível'),
        ('reservado', 'Reservado'),
        ('entregue', 'Entregue'),
    ]

    titulo = models.CharField(max_length=200)
    descricao = models.TextField()
    categoria = models.ForeignKey(
        Categoria,
        on_delete=models.SET_NULL,
        null=True,
        related_name='doacoes'
    )
    doador_nome = models.CharField(max_length=150)
    doador_email = models.EmailField()
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='disponivel'
    )
    cidade = models.CharField(max_length=100)
    estado = models.CharField(max_length=2)  # ex: SP, MG, RJ
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Doação'
        verbose_name_plural = 'Doações'
        ordering = ['-criado_em']

    def __str__(self):
        return f"{self.titulo} ({self.doador_nome})"