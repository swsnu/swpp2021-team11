import json
from django.http import HttpResponse ,JsonResponse
from django.contrib.auth import get_user_model
from .models import Sool

User = get_user_model()

def alcohol_info(request, alcohol_id = 0):
    if request.method == 'GET':
        result = Sool.objects.filter(id = alcohol_id).values()
        return JsonResponse(result, status = 200)
    return HttpResponse(status = 405)

def user_profile(request, user_id = 0):
    try:
        user = User.objects.get(id = user_id)
    except User.DoesNotExist:
        return HttpResponse(status = 404)
    if request.method == 'GET':
        result = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
        }
        return JsonResponse(result, status = 200, safe = False)
    if request.method == 'PUT':
        req_data = json.loads(request.body.decode())
        user.email = req_data['email']
        user.save()
        result = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
        }
        return JsonResponse(result, status = 201, safe = False)
    return HttpResponse(status = 405)

def test(request):
    if request.method == 'GET':
        ######
        #Generate some recommendations
        ######
        result = [
            {
                'id': 1,
                'name': 'makgeoli1'
            },
            {
                'id': 3,
                'name': 'wine1'
            },
            {
                'id': 6,
                'name': 'soju1'
            }
        ]
        return JsonResponse(result, status = 200, safe = False)
    return HttpResponse(status = 405)

def recommend(request):
    if request.method == 'GET':
        ######
        #Generate some recommendations
        ######
        result = [
            {
                'id': 1,
                'name': 'makgeoli'
            },
            {
                'id': 3,
                'name': 'wine'
            },
            {
                'id': 6,
                'name': 'soju'
            }
        ]
        return JsonResponse(result, status = 200, safe = False)
    return HttpResponse(status = 405)
