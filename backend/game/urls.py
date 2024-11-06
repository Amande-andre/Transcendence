from django.urls import path
from . import views

app_name = 'game'

urlpatterns = [
    path('pongCanvas/', views.pongCanvas, name='pongCanvas'),
    path('breakoutCanvas/', views.breakoutCanvas, name='breakoutCanvas'),
    path('gameChoice/', views.gameChoice, name='gameChoice'),
    path('optionsPong/', views.optionsPong, name='optionsPong'),
    path('optionsBreakout/', views.optionsBreakout, name='optionsBreakout'),
]