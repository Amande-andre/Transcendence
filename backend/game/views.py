from django.shortcuts import render
from django.http import HttpResponse
from transcendence.templatetags import custom_tags
import json

# Create your views here.
def pongCanvas(request):
    # Récupérer les données des joueurs
	players_raw = request.GET.get('players')
	print("pong Players received:", players_raw)
	return render(request, 'partials/pongCanvas.html', {'players': players_raw})

def breakoutCanvas(request):
	return render(request, 'partials/breakoutCanvas.html')

def gameChoice(request):
	return render(request, 'partials/gameChoice.html')

def optionsPong(request):
	return render(request, 'partials/options-pong.html')

def optionsBreakout(request):
	return render(request, 'partials/options-breakout.html')

def bracket(request):
    # Récupérer les données des joueursplay
	print("bracket request.GET:", request.GET)
	players_raw = json.loads(request.GET.get('players'))
	print("bracket Players received:", players_raw)
	print("len players_raw:", len(players_raw))
	list_bool = [False, False]
	players2 = []
	players3 = []
	
	for players in players_raw:
		if players['win'] >= 1:
			player2.append(players)
		if players['win'] >= 2:
			player3.append(players)
	return render(request, 'partials/bracket.html', {"players": players_raw, "players2": players2, "players3": players3})