from django.shortcuts import render
from django.http import HttpResponse
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
    # Récupérer les données des joueurs
	# players_raw = request.GET.get('players')
	players_raw = json.loads(request.GET.get('players'))
	print("bracket Players received:", players_raw)
	print("len players_raw:", len(players_raw))
	return render(request, 'partials/bracket.html', {"players": players_raw})
