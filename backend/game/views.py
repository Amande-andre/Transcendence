from django.shortcuts import render

# Create your views here.

def pong(request):
	game = 'pong'
	return render(request, 'game.html', {'game': game})

def breakout(request):
	game = 'breakout'
	return render(request, 'game.html', {'game': game})