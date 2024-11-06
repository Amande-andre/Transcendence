from django.views.generic import CreateView, View, FormView
from .form import CustomCreationForm
from .models import User
from django.contrib.auth import login
from .form import CustomAuthenticationForm
from django.shortcuts import render
from django.urls import reverse_lazy
from django.shortcuts import redirect
from game import views


# Create your views here.
class RegisterForm(CreateView):

	template_name = 'register.html'
	form_class = CustomCreationForm

	def form_valid(self, form):
		form.save()
		user = form.instance
		login(self.request, user)
		return render(self.request, 'home.html')

class LoginForm(FormView):
    template_name = 'login.html'
    form_class = CustomAuthenticationForm

    def form_valid(self, form):
        # Authentifie l'utilisateur au lieu de le créer
        user = form.get_user()
        login(self.request, user)
        return render(self.request, 'home.html')

class Logout(View):
	pass

def Home(request):
	return render(request, 'home.html')