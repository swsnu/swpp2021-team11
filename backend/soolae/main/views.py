# pylint: disable=unused-argument
import json
from django.http import HttpResponse ,JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.models import User


def user_profile(request, user_id = 0):
    try:
        user = User.objects.get(id = user_id)
    # pylint: disable=no-member
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
        return JsonResponse(result, status = 201, safe = False)
    return HttpResponse(status = 405)


@require_http_methods(['GET'])
def recommend(request):
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
