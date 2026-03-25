from django.shortcuts import render, redirect

doacoes_lista = []

def home(request):
    return render(request, 'home.html', {
        'doacoes': doacoes_lista
    })

def cadastro_roupa(request):
    if request.method == 'POST':
        doacoes_lista.append({
            'nome': request.POST.get('nome'),
            'quantidade': request.POST.get('quantidade'),
            'localizacao': request.POST.get('localizacao'),
            'tipo': 'Roupa'
        })
        return redirect('home')

    return render(request, 'cadastro_roupa.html')

def cadastro_alimento(request):
    if request.method == 'POST':
        doacoes_lista.append({
            'nome': request.POST.get('nome'),
            'quantidade': request.POST.get('quantidade'),
            'localizacao': request.POST.get('localizacao'),
            'tipo': 'Alimento'
        })
        return redirect('home')

    return render(request, 'cadastro_alimento.html')

def selecao_tipo_doacao(request):
    return render(request, 'selecao_tipo_doacao.html')

def login_view(request):
    if request.method == 'POST':
        request.session['usuario'] = request.POST.get('email')
        return redirect('home')

    return render(request, 'login.html')

def cadastro_usuario(request):
    if request.method == 'POST':
        return redirect('login')

    return render(request, 'cadastro_usuario.html')