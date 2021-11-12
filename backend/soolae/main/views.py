import json
import random  # Temporary
from django.http import (
    HttpResponse,
    JsonResponse,
    HttpResponseNotAllowed,
    HttpResponseBadRequest,
)
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import get_user_model
from .models import Sool, SoolCategory, Review
from functools import wraps

User = get_user_model()


def method_check(x):
    """
    It checks request.method.
    Usage : @method_check(["GET", "POST"])
    """

    def return_check_method(f):
        @wraps(f)
        def inner(*args, **kwargs):
            if args[0].method not in x:
                return HttpResponseNotAllowed(x)
            return f(*args, **kwargs)

        return inner

    return return_check_method


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


@method_check(["GET"])
def signout(request):
    if request.user.is_authenticated:
        logout(request)
        return HttpResponse(status=204)
    return HttpResponse(status=401)


@method_check(["GET", "PUT"])
def user_profile(request, user_id=0):
    # Check user exists.
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return HttpResponse(status=404)

    # Modify user object.
    if request.method == "PUT":
        try:
            req_data = json.loads(request.body.decode())
            user.email = req_data["email"]
            user.save()
        except (KeyError, json.JSONDecodeError):
            return HttpResponseBadRequest()

    result = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
    }

    if request.method == "GET":
        return JsonResponse(result, status=200, safe=False)
    return JsonResponse(result, status=201, safe=False)


@method_check(["GET"])
def alcohol(request):
    alcohol_list = Sool.objects.all().values("id", "name", "rating")
    return JsonResponse(
        alcohol_list, safe=False, json_dumps_params={"ensure_ascii": False}
    )


@method_check(["GET"])
def alcohol_info(request, alcohol_id):
    try:
        result = Sool.objects.filter(id=alcohol_id).values()
    except Sool.DoesNotExist:
        return HttpResponse(status=404)

    return JsonResponse(
        result[0], status=200, safe=False, json_dumps_params={"ensure_ascii": False}
    )


@method_check(["GET"])
def category_list(request):
    category_lists = list(SoolCategory.objects.all().values("id", "name"))
    return JsonResponse(
        category_lists, safe=False, json_dumps_params={"ensure_ascii": False}
    )


@method_check(["GET"])
def category(request, category_id):
    finded_category = SoolCategory.objects.get(id=category_id)
    responses = {
        "id": finded_category.id,
        "name": finded_category.name,
        "alcohol_list": finded_category.sool.values("id"),
    }
    return JsonResponse(
        responses, safe=False, json_dumps_params={"ensure_ascii": False}
    )


@method_check(["GET"])
def test(request):
    ######
    # Generate some recommendations
    ######
    sool = Sool.objects.get(id=random.randrange(128, 254))
    result = {"id": sool.id}
    return JsonResponse(result, status=200)


@method_check(["GET"])
def recommend(request):
    ######
    # Generate some recommendations
    ######
    result = [
        {"id": random.randrange(128, 254)},
        {"id": random.randrange(128, 254)},
        {"id": random.randrange(128, 254)},
    ]
    return JsonResponse(result, status=200, safe=False)


@method_check(["GET", "POST"])
def review_list(request):
    if request.method == "GET":
        result = list(Review.objects.all().values("id"))
        return JsonResponse(result, status=200, safe=False)

    if request.method == "POST":
        try:
            req_data = json.loads(request.body.decode())
            new_review = Review(
                title=req_data["title"],
                content=req_data["content"],
                author=request.user,
                star_rating=req_data["rating"],
                sool=Sool.objects.get(id=req_data["id"]),
                image=req_data["image"],
            )
        except (Sool.DoesNotExist, KeyError, json.JSONDecodeError):
            return HttpResponseBadRequest()

        new_review.save()
        result = Review.objects.filter(id=new_review).values()[0]
        return JsonResponse(result, status=201)


@method_check(["GET", "DELETE"])
def review_detail(request, review_id):
    if request.method == "GET":
        query = Review.objects.filter(id=review_id)
        if not query.exists():
            return HttpResponse(status=404)
        review = query.values()[0]

        return JsonResponse(review, status=200)

    if request.method == "DELETE":
        Review.objects.filter(id=review_id).delete()
        return HttpResponse(status=200)
