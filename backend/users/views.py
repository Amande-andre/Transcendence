from django.shortcuts import render
from django.views.generic import CreateView, View, FormView
from .form import CustomCreationForm
from .models import User
from django.contrib.auth import login
from .form import CustomAuthenticationForm
from django.http import JsonResponse
from django.template.loader import render_to_string


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

# def RegisterRender(request):
#    form = CustomCreationForm()
#    return render(request, 'register.html', {'form': form})

# def LoginRender(request):
#    form = CustomAuthenticationForm()
#    return render(request, 'login.html', {'form': form})