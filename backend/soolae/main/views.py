# pylint: disable=unused-argument
from django.http import HttpResponse ,JsonResponse
from django.views.decorators.http import require_http_methods

@require_http_methods(["GET"])
def recommend(request):
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
