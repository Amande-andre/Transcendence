from django.contrib.auth.forms import UserCreationForm
from .models import User
from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.core.validators import RegexValidator

class CustomCreationForm(UserCreationForm):
    username = forms.CharField(
        max_length=30,
        min_length=5,
        required=True,
        validators=[
            RegexValidator(
                regex=r'^[a-zA-Z0-9]+$',
                message="Le nom d'utilisateur ne peut contenir que des lettres et des chiffres."
            )
        ],
        widget=forms.TextInput(attrs={
            'placeholder': 'Username', 
            'class': 'register-input form-control mb-3',  # Classe Bootstrap uniforme
            'style': 'width: 100%; font-size: 1rem;',  # Taille de police standardisée
            'hx-post': '/checkUsername/',
            'hx-target': '#username-check',
            'hx-trigger': 'keyup changed delay:500ms'
        })
    )
    password1 = forms.CharField(
        max_length=30, 
        required=True, 
        widget=forms.PasswordInput(attrs={
            'placeholder': 'Password', 
            'class': 'register-input form-control mb-3',
            'style': 'width: 100%; font-size: 1rem;',  # Taille de police standardisée
        })
    )
    password2 = forms.CharField(
        max_length=30, 
        required=True, 
        widget=forms.PasswordInput(attrs={
            'placeholder': 'Confirm Password', 
            'class': 'register-input form-control mb-3',
            'style': 'width: 100%; font-size: 1rem;',  # Taille de police standardisée
        })
    )

    class Meta:
        model = User
        fields = ["username", "password1", "password2"]

class CustomAuthenticationForm(AuthenticationForm):
    username = forms.CharField(
        max_length=30, 
        required=True, 
        widget=forms.TextInput(attrs={
            'placeholder': 'Username', 
            'class': 'register-input form-control mb-3',
            'style': 'width: 100%; Actor, sans-serif; font-size: 1rem;";'
        })
    )
    password = forms.CharField(
        max_length=30, 
        required=True, 
        widget=forms.PasswordInput(attrs={
            'placeholder': 'Password', 
            'class': 'register-input form-control mb-3',
            'style': 'width: 100%; Actor, sans-serif; font-size: 1rem;";'
        })
    )