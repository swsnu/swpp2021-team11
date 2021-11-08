# pylint: disable=unused-argument
from django.core.exceptions import MultipleObjectsReturned
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Sool


@require_http_methods(["GET"])
def recommend(request):
    result = [
        {"id": 1, "name": "makgeoli"},
        {"id": 3, "name": "wine"},
        {"id": 6, "name": "soju"},
    ]
    return JsonResponse(result, status=200, safe=False)


@require_http_methods(["GET"])
def alcohol(request, alcohol_id):
    try:
        alcohol_object = Sool.objects.get(id=alcohol_id)
        alcohol_dict = {
            "id": alcohol_id,
            "name": alcohol_object.name,
            "price": alcohol_object.price,
            "alcohol_content": alcohol_object.alcohol_content,
            "alcohol_image": alcohol_object.sool_image.url,
        }
        return JsonResponse(alcohol_dict, status=200)
    except (Sool.DoesNotExist, MultipleObjectsReturned):
        return HttpResponse(status=404)
