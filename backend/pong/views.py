<<<<<<< HEAD
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from pong.models import User
import json

@csrf_exempt
def json_login(request):
	if request.method == 'POST':
		try:
			data = json.loads(request.body)
			if data['username'] not in User.objects.values_list('username', flat=True) or data['password'] != User.objects.get(username=data['username']).password:
				return JsonResponse({'status': 'error', 'message': 'user or password incorrect'})
		except json.JSONDecodeError:
			return JsonResponse({'status': 'error', 'message': 'invalid json'})
		return JsonResponse({'status': 'success', 'message': 'user connected', 'data': data})
=======
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def json_get(request):
	if request.method == 'GET':
		return JsonResponse({'pong': 'pong'})
	
@csrf_exempt
def json_post(request):
	if request.method == 'POST':
		try:
			data = json.loads(request.body)
			response = {'status': 'success', 'received_data': data}
		except json.JSONDecodeError:
			response = {'status': 'error', 'message': 'invalid json'}
		return JsonResponse(response)
>>>>>>> origin/franck
	else:
		return JsonResponse({'status': 'error', 'message': 'invalid method'})
	
@csrf_exempt
<<<<<<< HEAD
def json_register(request):
	if request.method == 'POST':
		try:
			data = json.loads(request.body)
			if data['username'] in User.objects.values_list('username', flat=True):
				return JsonResponse({'status': 'error', 'message': 'user already exists'})
			User.objects.create(username=data['username'], password=data['password'])
		except json.JSONDecodeError:
			return JsonResponse({'status': 'error', 'message': 'invalid json'})
		return JsonResponse({'status': 'success', 'message': 'user created', 'data': data})
	else:
		return JsonResponse({'status': 'error', 'message': 'invalid method'})
=======
def create_user(request):
	if request.method == 'POST':
		data = json.loads(request.body)
		username = data['username']
		password = data['password']
		return JsonResponse({'status': 'success', 'message': 'user created)'})
	else:
		return JsonResponse({'status': 'error', 'message': 'invalid method'})
# Create your views here.
>>>>>>> origin/franck
