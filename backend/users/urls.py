from django.urls import path
from .views import RegisterForm, LoginForm
from . import views
from django.contrib.auth.views import LogoutView
from django.conf import settings
from django.conf.urls.static import static
from .views import update_online_status

app_name = 'users'

urlpatterns = [
    path('register/', RegisterForm.as_view(), name='register'),
	path('login/', LoginForm.as_view(), name='login'),
 	path('logout/', views.logout_view, name='logout'),
	path('checkUsername/', views.checkUsername, name='checkUsername'),
 	path('profile/', views.profile, name='profile'),
	path('updatePseudo/', views.updatePseudo, name='updatePseudo'),
	path('updateImage/', views.updateImage, name='updateImage'),
	path('addFriend/', views.addFriend, name='addFriend'),
 	path('update_status/<str:status>/', update_online_status, name='update_status'),
  	path('oauth2/login/', views.oauth2_login, name='oauth2_login'),
	path('oauth2/callback/', views.oauth2_callback, name='oauth2_callback'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
