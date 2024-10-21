from django.views.generic import CreateView, View, FormView
from .form import CustomCreationForm
from .models import User
from django.contrib.auth import login
from .form import CustomAuthenticationForm
from django.http import JsonResponse
from django.shortcuts import render

# OAUTH2 login
from django.shortcuts import redirect
from django.conf import settings
import requests
import logging
# ##


# Create your views here.
class RegisterForm(CreateView):

	model = User
	template_name = 'register.html'
	success_url = '/'
	template_name_suffix = ''
	form_class = CustomCreationForm

	def form_valid(self, form):
		print("Form is valid")
		form.save()
		login(self.request, form.instance)
		if self.request.htmx:
			return JsonResponse({'success': True, 'redirect': self.get_success_url()})
		return super().form_valid(form)

class LoginForm(FormView):
    template_name = 'login.html'
    form_class = CustomAuthenticationForm
    success_url = '/'

    def form_valid(self, form):
        # Authentifie l'utilisateur au lieu de le créer
        user = form.get_user()
        login(self.request, user)
        return super().form_valid(form)

class Logout(View):
	pass

def Home(request):
	return render(request, 'home.html')
# def RegisterRender(request):
#    form = CustomCreationForm()
#    return render(request, 'register.html', {'form': form})

# def LoginRender(request):
#    form = CustomAuthenticationForm()
#    return render(request, 'login.html', {'form': form})

#####################################################################

# OAUTH2 login
logger = logging.getLogger(__name__)

def oauth2_login(request):
    client_id = settings.OA_UID
    redirect_uri = settings.OA_REDIR
    response_type = 'code'
    scope = 'public'
    authorization_url = f"https://api.intra.42.fr/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type={response_type}&scope={scope}"
    return redirect(authorization_url)

def oauth2_callback(request):
    code = request.GET.get('code')

    if code:
#    if not code:
        return render(request, 'error.html', {'error': 'No code provided'})

    client_id = settings.OA_UID
    client_secret = settings.OA_SECRET
    redirect_uri = settings.OA_REDIR
    token_url = 'https://api.intra.42.fr/oauth/token'
    
    data = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': redirect_uri,
        'client_id': client_id,
        'client_secret': client_secret,
    }
    
    response = requests.post(token_url, data=data)
    token_data = response.json()

    logger.debug("Status Code: %s", response.status_code)
    logger.debug("Response Content: %s", response.content)

    # Handle the token data (e.g., save it to the session, create a user, etc.)
    
    return redirect(settings.OA_REDIR)
# ##