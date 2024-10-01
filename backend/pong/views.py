# views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from .models import User
import json

@csrf_exempt
def json_login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            
            user = authenticate(request, username=username, password=password)
            
            if user is not None:
                return JsonResponse({
                    'status': 'success',
                    'message': 'user connected',
                    'data': {
                        'username': user.username,
                        'id': user.id
                    }
                })
            else:
                return JsonResponse({
                    'status': 'error',
                    'message': 'invalid credentials'
                })
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'invalid json'})
    return JsonResponse({'status': 'error', 'message': 'invalid method'})

@csrf_exempt
def json_register(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            
            if User.objects.filter(username=username).exists():
                return JsonResponse({
                    'status': 'error',
                    'message': 'user already exists'
                })
            
            user = User.objects.create_user(username=username, password=password)
            
            return JsonResponse({
                'status': 'success',
                'message': 'user created',
                'data': {
                    'username': user.username,
                    'id': user.id
                }
            })
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'invalid json'})
    return JsonResponse({'status': 'error', 'message': 'invalid method'})