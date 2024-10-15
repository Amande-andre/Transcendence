from django.views.generic import CreateView, View, FormView
from .form import CustomCreationForm
from .models import User
from django.contrib.auth import login
from .form import CustomAuthenticationForm
from django.shortcuts import render
from django.urls import reverse_lazy
from django.shortcuts import redirect


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