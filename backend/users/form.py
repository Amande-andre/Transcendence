from django.contrib.auth.forms import UserCreationForm
from .models import User
from django import forms
from django.contrib.auth.forms import AuthenticationForm

class CustomCreationForm(UserCreationForm):

    username = forms.CharField(
        max_length=30, 
        required=True, 
        widget=forms.TextInput(attrs={
            'placeholder': 'Username', 
            'class': 'register-input form-control mb-3',
            'style': 'width: 50%; Actor, sans-serif";'
        })
    )
    password1 = forms.CharField(
        max_length=30, 
        required=True, 
        widget=forms.PasswordInput(attrs={
            'placeholder': 'Password', 
            'class': 'register-input form-control mb-3',
            'style': 'width: 50%; Actor, sans-serif";'
        })
    )
    password2 = forms.CharField(
        max_length=30, 
        required=True, 
        widget=forms.PasswordInput(attrs={
            'placeholder': 'Confirm Password', 
            'class': 'register-input form-control mb-3',
            'style': 'width: 50%; Actor, sans-serif";'
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
            'style': 'width: 50%; Actor, sans-serif";'
        })
    )
    password = forms.CharField(
        max_length=30, 
        required=True, 
        widget=forms.PasswordInput(attrs={
            'placeholder': 'Password', 
            'class': 'register-input form-control mb-3',
            'style': 'width: 50%; Actor, sans-serif";'
        })
    )
