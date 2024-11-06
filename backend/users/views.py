from django.views.generic import CreateView, FormView
from .form import CustomCreationForm
from .models import User
from django.contrib.auth import login
from .form import CustomAuthenticationForm
from django.shortcuts import render
from django.urls import reverse_lazy
from django.shortcuts import redirect
from django.contrib.auth import logout
from django.http import HttpResponse
from django.template.response import TemplateResponse


# Create your views here.
class RegisterForm(CreateView):
    template_name = 'form.html'
    form_class = CustomCreationForm

    def form_invalid(self, form):
        # En cas d'erreur de validation, on ne renvoie rien
        if self.request.headers.get('HX-Request'):
            return TemplateResponse(self.request, self.template_name, {'form': form})
        return super().form_invalid(form)

    def form_valid(self, form):
        form.save()
        user = form.instance
        login(self.request, user)
        if self.request.headers.get('HX-Request'):
            response = TemplateResponse(self.request, 'home.html', {})
            # Ajouter un en-tête HTMX pour effacer le formulaire
            response['HX-Reswap'] = 'delete'
            response['HX-Refresh'] = 'true'  # Ceci va recharger la page entière
            return response
        return super().form_valid(form)

class LoginForm(FormView):
    template_name = 'form.html'
    form_class = CustomAuthenticationForm

    def form_invalid(self, form):
        if self.request.headers.get('HX-Request'):
            return TemplateResponse(self.request, self.template_name, {'form': form}, {'msg': "Nom d'utilisateur ou mot de passe incorrect"})
        return super().form_invalid(form)

    def form_valid(self, form):
        user = form.get_user()
        login(self.request, user)
        if self.request.headers.get('HX-Request'):
            response = TemplateResponse(self.request, 'home.html', {})
            # Ajouter un en-tête HTMX pour effacer le formulaire
            response['HX-Reswap'] = 'delete'
            response['HX-Refresh'] = 'true'  # Ceci va recharger la page entière
            return response
        return super().form_valid(form)

def checkUsername(request):
    username = request.POST.get('username')
    if User.objects.filter(username=username).exists():
         return HttpResponse('<div id="username-check" class="form-text" style="color:red">this username is already taken</div>')
    else:
         return HttpResponse('<div id="username-check" class="form-text" style="color:green">this username is available</div>')

def logout_view(request):
    logout(request)
    return redirect('home') 

def Home(request):
	return render(request, 'home.html')