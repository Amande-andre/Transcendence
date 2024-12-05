from django.views.generic import CreateView, View, FormView
from .form import CustomCreationForm
from .models import User
from django.contrib.auth import login
from .form import CustomAuthenticationForm
from django.shortcuts import render
from django.urls import reverse_lazy
from django.shortcuts import redirect
from game import views
from django.contrib.auth import logout

# OAUTH2 login
from django.shortcuts import redirect
from django.conf import settings
import requests
#import logging
# ##


# Create your views here.
class RegisterForm(CreateView):

	template_name = 'register.html'
	success_url = reverse_lazy('home')
	form_class = CustomCreationForm

	def form_valid(self, form):
		form.save()
		user = form.instance
		login(self.request, user)
		print(f"User {user.username} is authenticated: {user.is_authenticated}")
		return redirect('home')

class LoginForm(FormView):
    template_name = 'login.html'
    form_class = CustomAuthenticationForm
    success_url = reverse_lazy('home')

    def form_valid(self, form):
        # Authentifie l'utilisateur au lieu de le créer
        user = form.get_user()
        login(self.request, user)
        return redirect('home')

def logout_view(request):
    logout(request)
    return redirect('home') 

def Home(request):
	return render(request, 'home.html')

#####################################################################

# OAUTH2 login
#logger = logging.getLogger(__name__)

def oauth2_login(request):
    client_id = settings.OA_UID
    redirect_uri = settings.OA_REDIR
    response_type = 'code'
    scope = 'public'
    authorization_url = f"https://api.intra.42.fr/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type={response_type}&scope={scope}"
    return redirect(authorization_url)

def oauth2_callback(request):
    print('callback!!!')
    code = request.GET.get('code')

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

    if response.status_code == 200 and 'access_token' in token_data:
        access_token = token_data['access_token']
        
        # Fetch user info from OAuth2 provider
        user_info_url = 'https://api.intra.42.fr/v2/me'
        headers = {'Authorization': f'Bearer {access_token}'}
        user_info_response = requests.get(user_info_url, headers=headers)
        user_info = user_info_response.json()

        # Check if user exists
        username = '42_' + user_info['login']
        email = user_info['email']

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            # Create new user
            user = User.objects.create_user(username=username, email=email)
            user.save()

        # Log the user in
        login(request, user)

        # Redirect to profile or home page
        return redirect('home')  # Change 'profile' to your desired URL name
    else:
        # Authentication failed
        return redirect('users:login')
# ##