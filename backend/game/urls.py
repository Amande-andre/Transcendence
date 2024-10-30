from django.urls import path
from . import views

app_name = 'game'

urlpatterns = [
    path('gameCanvas/', views.gameCanvas, name='gameCanvas'),
    path('gameChoice/', views.gameChoice, name='gameChoice'),
    path('optionsPong/', views.optionsPong, name='optionsPong'),
    path('optionsBreakout/', views.optionsBreakout, name='optionsBreakout'),
]