from django.shortcuts import render

def home(request):
    return render(request, 'home.html')
def cadastro_roupa(request):
    return render(request, 'cadastro_roupa.html')
def selecao_tipo_doacao(request):
    return render(request, 'selecao_tipo_doacao.html')
def cadastro_roupa(request):
    return render(request, 'cadastro_roupa.html')