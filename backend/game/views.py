from django.shortcuts import render
from django.http import HttpResponse
import json

# Create your views here.

def pongCanvas(request):
	return render(request, 'partials/pongCanvas.html')

def breakoutCanvas(request):
	return render(request, 'partials/breakoutCanvas.html')

def gameChoice(request):
	return render(request, 'partials/gameChoice.html')

def optionsPong(request):
	return render(request, 'partials/options-pong.html')

def optionsBreakout(request):
	return render(request, 'partials/options-breakout.html')

def bracket(request):
    # Récupérer les données des joueurs
	print(request.GET)
	players_raw = request.GET.getlist('players')
	
	player_data = [json.loads(player) for player in players_raw]
    # Pour debug/vérification
	print("Players received:", player_data)
    # Maintenant players_data est une liste d'objets avec name, score, et round
    # Par exemple: [{"name": "John", "score": 0, "round": 0}, ...]
	context = {
        'players': player_data,
    }
	return render(request, 'partials/bracket.html', context)