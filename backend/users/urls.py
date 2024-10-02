from django.urls import path
from django.contrib.auth import views
from .views import RegisterForm, LoginForm

urlpatterns = [
    path("registerForm/", RegisterForm.as_view(), name="registerForm"),
	path("loginForm/", LoginForm.as_view(), name="loginForm"),
	# path("login/", views.Login(), name="login"),
	# path("register/", views.Register(), name="register"),
	# path("logout/", Logout.as_view(), name="logout"),


]
