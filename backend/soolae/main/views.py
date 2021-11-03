from django.http import HttpResponse ,JsonResponse

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
