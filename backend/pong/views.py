from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from pong.models import User
import json

@csrf_exempt
def json_get(request):
	if request.method == 'GET':
		return JsonResponse({'pong': 'pong'})
	
@csrf_exempt
def json_register(request):
	if request.method == 'POST':
		try:
			data = json.loads(request.body)
			if data['username'] in User.objects.values_list('username', flat=True):
				return JsonResponse({'status': 'error', 'message': 'user already exists'})
			User.objects.create(username=data['username'], password=data['password'])
			response = {'status': 'success', 'received_data': data}
		except json.JSONDecodeError:
			response = {'status': 'error', 'message': 'invalid json'}
		return JsonResponse(response)
	else:
		return JsonResponse({'status': 'error', 'message': 'invalid method'})
