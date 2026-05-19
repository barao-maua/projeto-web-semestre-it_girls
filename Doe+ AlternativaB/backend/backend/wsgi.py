import os
from django.core.wsgi import get_wsgi_application

# Aqui dizemos para o Django onde encontrar as configurações (backend.settings)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

application = get_wsgi_application()