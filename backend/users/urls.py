from django.urls import path
from .views import RegisterForm, LoginForm

urlpatterns = [
    path("register/", RegisterForm.as_view(), name="registerForm"),
	path("login/", LoginForm.as_view(), name="loginForm"),
	
	# path("login/", LoginRender, name="login"),
	# path("register/", RegisterRender, name="register"),
	# path("logout/", Logout.as_view(), name="logout"),
]