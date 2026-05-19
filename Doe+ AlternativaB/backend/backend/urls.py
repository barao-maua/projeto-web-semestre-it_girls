from django.contrib import admin
from django.urls import path, include  # <-- Não esqueça de adicionar o 'include' aqui!

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Aqui nós conectamos as rotas que você já criou!
    # Supondo que o nome da pasta do seu app seja 'doacoes':
    path('api/', include('doacoes.urls')), 
]