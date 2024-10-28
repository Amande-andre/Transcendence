from django.urls import path
from . import views

app_name = 'game'

urlpatterns = [
    path('breakout/', views.breakout, name='breakout'),
    path('pong/', views.pong, name='pong'),
]