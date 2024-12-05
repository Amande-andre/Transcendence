from django.shortcuts import render
from django.http import JsonResponse
from game.models import Match
from django.utils.translation import gettext as _  # Import pour les traductions
import json

# Create your views here.
def pongCanvas(request):
    # Récupérer les données des joueurs
	print("request.GET:", request.GET)
	players_raw = request.GET.get('players')
	game = request.GET.get('game')
	print("game:", game)
	return render(request, 'partials/canvas.html', {'players': players_raw, 'game': game})

def breakoutCanvas(request):
	# Récupérer les données des joueurs
	print("request.GET:", request.GET)
	players_raw = request.GET.get('players')
	game = request.GET.get('game')
	print("game:", game)
	return render(request, 'partials/canvas.html', {'players': players_raw, 'game': game})

def gameChoice(request):
	return render(request, 'partials/gameChoice.html')

def optionsPong(request):
	user = request.user
	friendsList = user.friends.all()
	return render(request, 'partials/options-pong.html', {
		'user': user, 
		'friendsList': friendsList,
		'message': _('Select your options for Pong')  # Exemple de message traduisible
	})

def optionsBreakout(request):
	user = request.user
	friendsList = user.friends.all()
	return render(request, 'partials/options-breakout.html', {
		'user': user, 
		'friendsList': friendsList,
		'message': _('Select your options for Breakout')  # Exemple de message traduisible
	})



def bracket(request):
	# Récupérer les données des joueurs
	players_raw = json.loads(request.GET.get('players'))
	list_bool = [False, False]
	players2 = []
	players3 = []
	
	game = request.GET.get('game')
	i = 0
	for players in players_raw:
		players['score'][3] = i // 2
		if players['win'] >= 1:
			players2.append(players)
		if players['win'] >= 2:
			players3.append(players)
		i += 1
	return render(request, 'partials/bracket.html', {
		"players": players_raw, 
		"players2": players2, 
		"players3": players3, 
		"game": game,
		'title': _('Bracket View'),  # Exemple de traduction
	})

def saveMatch(request):
	try:
		data = json.loads(request.body)
	except json.JSONDecodeError:
		return JsonResponse({'error': 'Invalid JSON'}, status=400)
	
	user = request.user
	if user.username != data['player1'] and user.username != data['player2']:
		return JsonResponse({'error': 'You are not one of the players'}, status=400)

	friendList = user.friends.all()
	
	try:
		if user.username == data['player1'] and data['score1'] > data['score2']:
			color = "victoire"
			user.win += 1
		elif user.username == data['player2'] and data['score2'] > data['score1']:
			color = "victoire"
			user.win += 1
		else:
			color = "defaite"
			user.lose += 1
		user.gamePlayed += 1
		user.save()
		newMatch = Match.objects.create(player1=data['player1'], score1=data['score1'], player2=data['player2'], score2=data['score2'], user=user, dateTime=data['dateTime'], color=color)
		newMatch.save()
		print("user match:", user.match_set.all())
		for friend in friendList:
			if friend.username == data['player1'] or friend.username == data['player2']:
				newMatchFriend = Match.objects.create(player1=data['player1'], score1=data['score1'], player2=data['player2'], score2=data['score2'], user=friend, dateTime=data['dateTime'], color=color)
				newMatchFriend.save()
	except KeyError as e:
		return JsonResponse({'error': f'Missing field: {e}'}, status=400)
	
	return JsonResponse(data)
	data = json.loads(request.body)
	print("data:", data)
	return JsonResponse(data)
