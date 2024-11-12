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
	# get the hx-vals name listPlayer
	print(request)
	list_player = json.loads(request.GET.get('listPlayer', '[]'))
	# return render(request, 'partials/bracket.html', {'listPlayer': list_player})jjist_player = {"player1": {"name": "player1", "score": 0, "round": 0},
					# "player2": {"name": "player2", "score": 0, "round": 0},
					# "player3": {"name": "player3", "score": 0, "round": 0},} 
	print(list_player)
	return render(request, 'partials/bracket.html', {'listPlayer': list_player})