from django.shortcuts import render
from django.http import HttpResponse
from transcendence.templatetags import custom_tags
from django.http import JsonResponse
import json

# Create your views here.
def pongCanvas(request):
    # Récupérer les données des joueurs
	players_raw = request.GET.get('players')
	# print("pong Players received:", players_raw)	
	# print("request:", request.GET.game)
	game = request.GET.get('game')
	return render(request, 'partials/pongCanvas.html', {'players': players_raw, 'game': game})

def breakoutCanvas(request):
	# Récupérer les données des joueurs
	players_raw = request.GET.get('players')
	game = request.GET.get('game')
	return render(request, 'partials/breakoutCanvas.html', {'players': players_raw, 'game': game})

def gameChoice(request):
	return render(request, 'partials/gameChoice.html')

def optionsPong(request):
	user = request.user
	friendsList = user.friends.all()
	return render(request, 'partials/options-pong.html', {'user': user, 'friendsList': friendsList})

def optionsBreakout(request):
	user = request.user
	friendsList = user.friends.all()
	return render(request, 'partials/options-breakout.html', {'user': user, 'friendsList': friendsList})

def bracket(request):
    # Récupérer les données des joueursplay
	
	players_raw = json.loads(request.GET.get('players'))
	list_bool = [False, False]
	players2 = []
	players3 = []
	
	print("game the big Game", request.GET.get('game'))
	game = request.GET.get('game')
	for players in players_raw:
		if players['win'] >= 1:
			players2.append(players)
		if players['win'] >= 2:
			players3.append(players)
	return render(request, 'partials/bracket.html', {"players": players_raw, "players2": players2, "players3": players3, "game": game})

def saveMatch(request):
	data = json.loads(request.body)
	print("data:", data)
	return JsonResponse(data)