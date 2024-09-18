from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def json_get(request):
	if request.method == 'GET':
		return JsonResponse({'pong': 'pong'})
# Create your views here.