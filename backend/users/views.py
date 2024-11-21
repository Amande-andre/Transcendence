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
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
from django.core.files.base import ContentFile
import os


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

def profile(request):
    return render(request, 'profile.html')

def updatePseudo(request):
	if request.method == "POST":
		new_Username = request.POST.get("pseudo")
	if new_Username:
		if not new_Username.isalnum():
			return HttpResponse('<div class="form-text" style="color:red">Le nom d’utilisateur ne doit contenir que des lettres et des chiffres.</div>')
		if User.objects.filter(username=new_Username).exists():
			return HttpResponse('<div id="username-check" class="form-text" style="color:red">this username is already taken</div>')
		if 5 <= len(new_Username) <= 20:
			request.user.username = new_Username
			request.user.save()
			return HttpResponse('<div class="form-text" style="color:green">username mis à jour</div>')
		else:
			return HttpResponse('<div class="form-text" style="color:red">Le username doit faire 5 caractères min.</div>')
	return HttpResponse('<div class="form-text" style="color:red">Veuillez entrer un username</div>')



@login_required
@csrf_exempt
def updateImage(request):
    if request.method == "POST" and request.FILES.get("image"):
        new_image = request.FILES["image"]

        # Validation de l'image
        if new_image.size > 5 * 1024 * 1024:
            return HttpResponse('<div class="form-text" style="color:red">Image trop volumineuse</div>', status=400)
        
        allowed_types = ['image/jpeg', 'image/png', 'image/gif']
        if new_image.content_type not in allowed_types:
            return HttpResponse('<div class="form-text" style="color:red">Type de fichier non autorisé</div>', status=400)
        
        # Générer un nom de fichier unique
        ext = os.path.splitext(new_image.name)[1]
        filename = f"profile_{request.user.id}{ext}"
        
        # Supprimer l'ancienne photo si elle existe
        if request.user.profilePhoto:
            request.user.profilePhoto.delete()
        
        # Sauvegarder la nouvelle photo
        request.user.profilePhoto.save(filename, new_image)
        request.user.save()
        
        # Retourne un fragment HTML contenant l'image mise à jour
        return HttpResponse(f'''
            <img id="profileImage" 
                 src="{request.user.profilePhoto.url}" 
                 alt="Image de profil">
        ''', content_type='text/html')
    
    return HttpResponse('<div class="form-text" style="color:red">Veuillez entrer une image</div>', status=400)
