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
from django.http import JsonResponse
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
import os
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError


# Create your views here.
class RegisterForm(CreateView):
    template_name = 'form.html'
    form_class = CustomCreationForm
    success_url = reverse_lazy('home')

    def form_invalid(self, form):
        return super().form_invalid(form)

    def form_valid(self, form):
        form.save()
        user = form.instance
        login(self.request, user)
        response = redirect(self.success_url)
        response['HX-Location'] = self.success_url
        return response

class LoginForm(FormView):
    template_name = 'form.html'
    form_class = CustomAuthenticationForm
    success_url = reverse_lazy('home')

    def form_invalid(self, form):
        return super().form_invalid(form)

    def form_valid(self, form):
        user = form.get_user()
        login(self.request, user)
        response = redirect(self.success_url)
        response['HX-Location'] = self.success_url
        return response


def checkUsername(request):
    username = request.POST.get('username', '').strip()
    if not username:
        return HttpResponse('<div id="username-check" class="form-text"></div>')
    errors = []

    # Vérifie min_length et max_length
    if len(username) < 5:
        errors.append("Le nom d'utilisateur doit contenir au moins 5 caractères.")
    if len(username) > 15:
        errors.append("Le nom d'utilisateur ne doit pas dépasser 15 caractères.")

    # Vérifie lettres et chiffres uniquement
    try:
        RegexValidator(r'^[a-zA-Z0-9]+$', message="Le nom d'utilisateur ne peut contenir que des lettres et des chiffres.")(username)
    except ValidationError as e:
        errors.extend(e.messages)

    # Vérifie si le username est déjà pris
    if User.objects.filter(username=username).exists():
        errors.append("Ce nom d'utilisateur est déjà pris.")

    # Retourne les erreurs ou un message de succès
    if errors:
        return HttpResponse(f'<div id="username-check" class="form-text" style="color:red">{"<br>".join(errors)}</div>')
    else:
        return HttpResponse('<div id="username-check" class="form-text" style="color:green">Ce nom d\'utilisateur est disponible.</div>')
def logout_view(request):
    logout(request)
    return redirect('home') 

def Home(request):
	return render(request, 'home.html')

def profile(request):
    for i in range(100):
        newMatch = Match(User=request.user, player1="moi", player2="lui", score1=3, score2=0)
        newMatch.save()
    User_matchs = request.user.match_set.all()
    return render(request, 'profile.html', {'User_matchs': User_matchs})

from django.shortcuts import render

def updatePseudo(request):
    if request.method == "POST":
        new_Username = request.POST.get("pseudo", "").strip()
        context = {"username": new_Username, "error": "", "success": False}

        # Gestion des erreurs
        if not new_Username:
            context["error"] = "Required."
        elif not new_Username.isalnum():
            context["error"] = "Invalid characters."
        elif User.objects.filter(username=new_Username).exists():
            context["error"] = "Already taken."
        elif len(new_Username) < 5 or len(new_Username) > 15:
            context["error"] = "5-15 chars."
        else:
            # Succès : Mise à jour du pseudo
            request.user.username = new_Username
            request.user.save()
            context["success"] = True
            context["username"] = new_Username

        # Toujours retourner le fragment HTML
        return render(request, "update_pseudo_fragment.html", context)



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
        
        # Supprimer l'ancienne photo uniquement si l'image soumise est valide
        if request.user.profilePhoto and request.user.profilePhoto.path:
            if os.path.exists(request.user.profilePhoto.path):
                os.remove(request.user.profilePhoto.path)
        
        # Sauvegarder la nouvelle photo
        request.user.profilePhoto.save(filename, new_image)
        request.user.save()
        
        # Retourne un fragment HTML contenant l'image mise à jour
        return HttpResponse(f'''
            <img id="profileImage" 
                 src="{request.user.profilePhoto.url}" 
                 alt="Image de profil">
        ''', content_type='text/html')
    # Si aucun fichier n'est soumis ou méthode non POST
    return HttpResponse('<div class="form-text" style="color:red">Veuillez entrer une image valide</div>', status=400)

def addFriend(request):
    search = request.POST.get('friend')  # Récupérer la valeur de la recherche
    if search == '':
        return render(request, 'partials/addFriendState.html', {'message': 'Ajoutez un ami !'})
    if User.objects.filter(username=search).exists():
        friend = User.objects.get(username=search)
        print("function addFriend")
        print("request.user:", request.user)
        print("friend:", friend)
        request.user.friends.add(friend)
        print("request.user.friends:", request.user.friends.all())
        return render(request, 'partials/addFriendState.html', {'message': f'{friend.username} ajouté !'})
    else:
        return render(request, 'partials/addFriendState.html', {'message': 'Utilisateur non trouvé !'})
