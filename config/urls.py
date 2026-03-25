from django.contrib import admin
from django.urls import path, include
from app.views import (
    home,
    cadastro_roupa,
    cadastro_alimento,
    cadastro_usuario,
    login_view,
    selecao_tipo_doacao
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path("__reload__/", include("django_browser_reload.urls")),
    path('cadastrar-roupa/', cadastro_roupa, name='cadastro_roupa'),
    path('cadastro-alimento/', cadastro_alimento, name='cadastro_alimento'),
    path('selecao-tipo-doacao/', selecao_tipo_doacao, name='selecao_tipo_doacao'),
    path('login/', login_view, name='login'),
    path('cadastro-usuario/', cadastro_usuario, name='cadastro_usuario'),
]