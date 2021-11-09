import json
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed, response
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import get_user_model
from .models import Sool, SoolCategory

User = get_user_model()


@csrf_exempt
def signup(request):
    if request.method == "POST":
        req_data = json.loads(request.body.decode())
        username = req_data["username"]
        password = req_data["password"]
        user = User.objects.create_user(username, password=password)
        login(request, user)
        return HttpResponse(status=201)
    return HttpResponseNotAllowed(["POST"])


@csrf_exempt
def signin(request):
    if request.method == "POST":
        req_data = json.loads(request.body.decode())
        username = req_data["username"]
        password = req_data["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse(status=204)
        return HttpResponse(status=401)
    return HttpResponseNotAllowed(["POST"])


def signout(request):
    if request.method == "GET":
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status=204)
        return HttpResponse(status=401)
    return HttpResponseNotAllowed(["GET"])


def user_profile(request, user_id=0):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == "GET":
        result = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
        }
        return JsonResponse(result, status=200, safe=False)
    if request.method == "PUT":
        req_data = json.loads(request.body.decode())
        user.email = req_data["email"]
        user.save()
        result = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
        }
        return JsonResponse(result, status=201, safe=False)
    return HttpResponseNotAllowed(["GET", "PUT"])


def alcohol_info(request, alcohol_id):
    if request.method == "GET":
        result = Sool.objects.filter(id=alcohol_id).values()
        return JsonResponse(
            result[0], status=200, safe=False, json_dumps_params={"ensure_ascii": False}
        )
    return HttpResponseNotAllowed(["GET"])


def alcohol(request):
    if request.method == "GET":
        alcohol_list = list(Sool.objects.all().values())
        return JsonResponse(
            alcohol_list, safe=False, json_dumps_params={"ensure_ascii": False}
        )
    return HttpResponseNotAllowed(["GET"])


def category_list(request):
    if request.method == "GET":
        category_lists = list(SoolCategory.objects.all().values())
        response_list = []
        for i in category_lists:
            response_list.append({"id": i["id"], "name": i["name"]})
        return JsonResponse(
            response_list, safe=False, json_dumps_params={"ensure_ascii": False}
        )
    return HttpResponseNotAllowed(["GET"])


def category(request, category_id):
    if request.method == "GET":
        finded_category = SoolCategory.objects.get(id=category_id)
        responses = {"id": finded_category.id, "name": finded_category.name}
        return JsonResponse(
            responses, safe=False, json_dumps_params={"ensure_ascii": False}
        )
    return HttpResponseNotAllowed(["GET"])


def category_alcohol(request, category_id):
    if request.method == "GET":
        response_list = list(SoolCategory.objects.get(id=category_id).sool.values())
        return JsonResponse(
            response_list,
            status=200,
            safe=False,
            json_dumps_params={"ensure_ascii": False},
        )
    return HttpResponseNotAllowed(["GET"])


def test(request):
    if request.method == "GET":
        ######
        # Generate some recommendations
        ######
        result = [
            {"id": 1, "name": "makgeoli1"},
            {"id": 3, "name": "wine1"},
            {"id": 6, "name": "soju1"},
        ]
        return JsonResponse(result, status=200, safe=False)
    return HttpResponseNotAllowed(["GET"])


def recommend(request):
    if request.method == "GET":
        ######
        # Generate some recommendations
        ######
        result = [
            {"id": 1, "name": "makgeoli"},
            {"id": 3, "name": "wine"},
            {"id": 6, "name": "soju"},
        ]
        return JsonResponse(result, status=200, safe=False)
    return HttpResponseNotAllowed(["GET"])
