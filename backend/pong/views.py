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
	else:
		return JsonResponse({'status': 'error', 'message': 'invalid method'})
