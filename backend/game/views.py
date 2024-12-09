from django.shortcuts import render
from django.http import JsonResponse
from game.models import Match
from django.utils.translation import gettext as _  # Import pour les traductions
import json
from django.contrib.auth.decorators import login_required
from django.contrib.auth.decorators import permission_required
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
def pongCanvas(request):
    # Récupérer les données des joueurs
	if not request.headers.get('HX-Request'):
		return render(request, '403.html', status=403)
	players_raw = request.GET.get('players')
	game = request.GET.get('game')
	print("game:", game)
	return render(request, 'partials/canvas.html', {'players': players_raw, 'game': game})

def breakoutCanvas(request):
	# Récupérer les données des joueurs
	if not request.headers.get('HX-Request'):
		return render(request, '403.html', status=403)
	players_raw = request.GET.get('players')
	game = request.GET.get('game')
	print("game:", game)
	print("map", request.GET.get('map'))
	return render(request, 'partials/canvas.html', {'players': players_raw, 'game': game})

@login_required
def gameChoice(request):
	return render(request, 'partials/gameChoice.html')

@login_required
def optionsPong(request):
    user = request.user
    friendsList = user.friends.all()
    print("yoyoyo")
    if request.headers.get('HX-Request'):
        return render(request, 'partials/options-pong.html', {
		'user': user, 
		'friendsList': friendsList,
		'message': _('Select your options for Pong')
	    })
    else:
        return render(request, 'optionsGameNotPartial.html', {
            'game': 'pong',
            'user': request.user,
            'friendsList': request.user.friends.all(),
            'message': _('Select your options for Pong')
            })

@login_required
def optionsBreakout(request):
    user = request.user
    friendsList = user.friends.all()
    print("yoyoyo")
    if request.headers.get('HX-Request'):
        return render(request, 'partials/options-breakout.html', {
			'user': user, 
			'friendsList': friendsList,
			'message': _('Select your options for Breakout')  # Exemple de message traduisible
        })
    else:
        return render(request, 'optionsGameNotPartial.html', {
            'game': 'pong',
            'user': request.user,
            'friendsList': request.user.friends.all(),
            'message': _('Select your options for Pong')
            })




def bracket(request):
	# Récupérer les données des joueurs
	if request.method == 'GET':
		players_raw = json.loads(request.GET.get('players'))
		players2 = []
		players3 = []
		players4 = []
		
		game = request.GET.get('game')
		print("map", map)
		for players in players_raw:
			if players['win'] >= 1:
				players2.append(players)
			if players['win'] >= 2:
				players3.append(players)
			if players['win'] >= 3:
				players4.append(players)
		return render(request, 'partials/bracket.html', {
			"players": players_raw, 
			"players2": players2, 
			"players3": players3,
            "players4": players4,
			"game": game,
			'title': _('Bracket View'),  # Exemple de traduction
		})
	else:
		return render(request, '403.html', status=403)

def saveMatch(request):
	if request.method == "POST":
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
				# print("user", user)
				color = "victoire"
				user.win += 1
				user.bounce += data['bounce1']
				user.bonus += data['bonus1']
				user.score += data['score1']
			elif user.username == data['player2'] and data['score2'] > data['score1']:
				# print("user", user)
				color = "victoire"
				user.win += 1
				user.bounce += data['bounce2']
				user.bonus += data['bonus2']
				user.score += data['score2']
			elif user.username == data['player1'] and data['score1'] < data['score2']:
				# print("user", user)
				color = "defaite"
				user.lose += 1
				user.bounce += data['bounce1']
				user.bonus += data['bonus1']
				user.score += data['score1']
			else:
				# print("user", user)
				color = "defaite"
				user.lose += 1
				user.bounce += data['bounce2']
				user.bonus += data['bonus2']
				user.score += data['score2']
			user.gamePlayed += 1
			user.save()
			newMatch = Match.objects.create(player1=data['player1'], score1=data['score1'], player2=data['player2'], score2=data['score2'], user=user, dateTime=data['dateTime'], color=color)
			newMatch.save()
			# print("user match:", user.match_set.all())
			for friend in friendList:
				if friend.username == data['player1'] or friend.username == data['player2']:
					friendscolor = "defaite" if color == "victoire" else "victoire"
					newMatchFriend = Match.objects.create(player1=data['player1'], score1=data['score1'], player2=data['player2'], score2=data['score2'], user=friend, dateTime=data['dateTime'], color=friendscolor)
					newMatchFriend.save()
		except KeyError as e:
			return JsonResponse({'error': f'Missing field: {e}'}, status=400)
		return JsonResponse(data)
	else:
		return render(request, "403.html", status=403)

