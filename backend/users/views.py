from django.utils.translation import gettext as _  # Import pour les traductions
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
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
from django.http import JsonResponse
from django.http import HttpResponse
import os
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from django.contrib.auth.signals import user_logged_in, user_logged_out
from django.shortcuts import redirect
from django.conf import settings
import requests
import logging

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
        user.isOnline = True
        user.save()
        response = redirect(self.success_url)
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
        user.isOnline = True
        user.save()
        response = redirect(self.success_url)
        return response


def checkUsername(request):
    username = request.POST.get('username', '').strip()
    if not username:
        return HttpResponse('<div id="username-check" class="form-text"></div>')
    errors = []

    if len(username) < 5:
        errors.append(_("The username must be at least 5 characters long."))
    if len(username) > 15:
        errors.append(_("The username must not exceed 15 characters."))

    try:
        RegexValidator(r'^[a-zA-Z0-9]+$', message=_("The username can only contain letters and numbers."))(username)
    except ValidationError as e:
        errors.extend(e.messages)

    if User.objects.filter(username=username).exists():
        errors.append(_("This username is already taken."))

    if errors:
        return HttpResponse(f'<div id="username-check" class="form-text" style="color:red">{"<br>".join(errors)}</div>')
    else:
        return HttpResponse('<div id="username-check" class="form-text" style="color:green">' + _("This username is available.") + '</div>')


def logout_view(request):
    request.user.isOnline = False
    request.user.save()
    logout(request)
    return redirect('home')


def Home(request):
    return render(request, 'home.html')


def profile(request):
    User_matchs = request.user.match_set.all()
    friendsList = request.user.friends.all()
    return render(request, 'profile.html', {
        'User_matchs': User_matchs,
        'friendsList': friendsList,
        'user': request.user
    })


def updatePseudo(request):
    if request.method == "POST":
        new_Username = request.POST.get("pseudo", "").strip()
        context = {"username": new_Username, "error": "", "success": False}

        if not new_Username:
            context["error"] = _("Required.")
        elif not new_Username.isalnum():
            context["error"] = _("Invalid characters.")
        elif User.objects.filter(username=new_Username).exists():
            context["error"] = _("Already taken.")
        elif len(new_Username) < 5 or len(new_Username) > 15:
            context["error"] = _("5-15 characters.")
        else:
            request.user.username = new_Username
            request.user.save()
            context["success"] = True
            context["username"] = new_Username

        return render(request, "update_pseudo_fragment.html", context)


@login_required
@csrf_exempt
def updateImage(request):
    if request.method == "POST" and request.FILES.get("image"):
        new_image = request.FILES["image"]

        if new_image.size > 5 * 1024 * 1024:
            return HttpResponse('<div class="form-text" style="color:red">' + _("Image too large") + '</div>', status=400)

        allowed_types = ['image/jpeg', 'image/png', 'image/gif']
        if new_image.content_type not in allowed_types:
            return HttpResponse('<div class="form-text" style="color:red">' + _("Unsupported file type") + '</div>', status=400)

        ext = os.path.splitext(new_image.name)[1]
        filename = f"profile_{request.user.id}{ext}"

        if request.user.profilePhoto and request.user.profilePhoto.path:
            if os.path.exists(request.user.profilePhoto.path):
                os.remove(request.user.profilePhoto.path)

        request.user.profilePhoto.save(filename, new_image)
        request.user.save()

        return HttpResponse(f'''
            <img id="profileImage" 
                 src="{request.user.profilePhoto.url}" 
                 alt="{_("Profile image")}">
        ''', content_type='text/html')

    return HttpResponse('<div class="form-text" style="color:red">' + _("Please upload a valid image.") + '</div>', status=400)


def addFriend(request):
    search = request.POST.get('friend')
    if search == '':
        return render(request, 'partials/addFriendState.html', {'message': _('Add a friend!')})
    if User.objects.filter(username=search).exists() and search != request.user.username:
        friend = User.objects.get(username=search)
        request.user.friends.add(friend)
        return render(request, 'partials/addFriendState.html', {'message': f'{friend.username} ' + _('added!')})
    else:
        return render(request, 'partials/addFriendState.html', {'message': _('User not found!')})


@login_required
def update_online_status(request, status):
    if status not in ['true', 'false']:
        return JsonResponse({'error': _('Invalid status')}, status=400)

    isOnline = True if status == 'true' else False
    request.user.isOnline = isOnline
    request.user.save()
    return JsonResponse({'success': True, 'isOnline': isOnline})



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