from django.urls import path
from .views import RegisterForm, LoginForm
from . import views
from django.contrib.auth.views import LogoutView

app_name = 'users'

urlpatterns = [
    path('register/', RegisterForm.as_view(), name='register'),
	path('login/', LoginForm.as_view(), name='login'),
 	path('logout/', views.logout_view, name='logout'),
	path('checkUsername/', views.checkUsername, name='checkUsername'),
]
