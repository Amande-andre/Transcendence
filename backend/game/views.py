from django.shortcuts import render

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