from django.urls import path
from .views import RegisterForm, LoginForm
from . import views

urlpatterns = [
    path('register/', RegisterForm.as_view(), name='registerForm'),
	path('login/', LoginForm.as_view(), name='loginForm'),
	# path('login/', LoginRender, name='login'),
	# path('register/', RegisterRender, name='register'),
	# path('logout/', Logout.as_view(), name='logout'),
	path('oauth2/login/', views.oauth2_login, name='oauth2_login'),
	path('oauth2/callback/', views.oauth2_callback, name='oauth2_callback'),
]
