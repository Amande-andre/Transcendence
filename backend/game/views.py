from django.shortcuts import render

# Create your views here.

def gameCanvas(request):
	print(request.GET)
	game = request.GET.get('game')
	return render(request, 'partials/game.html', {'game': game})

def gameChoice(request):
	return render(request, 'partials/gameChoice.html')

def optionsPong(request):
	return render(request, 'partials/options-pong.html')

def optionsBreakout(request):
	return render(request, 'partials/options-breakout.html')