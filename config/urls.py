from django.contrib import admin
from django.urls import path, include
from app.views import home ,cadastro_roupa,selecao_tipo_doacao
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'), 
    path("__reload__/", include("django_browser_reload.urls")),
    path('cadastrar-roupa/', cadastro_roupa, name='cadastro_roupa'),
    path('selecao-tipo-doacao/', selecao_tipo_doacao, name='selecao_tipo_doacao'),
]