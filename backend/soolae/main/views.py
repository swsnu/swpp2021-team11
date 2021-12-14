import json
import random  # Temporary
from functools import wraps
from django.http import (
    HttpResponse,
    JsonResponse,
    HttpResponseNotAllowed,
    HttpResponseBadRequest,
)
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import get_user_model
from .models import Sool, SoolCategory, Review


User = get_user_model()


def method_check(methods):
    """
    It checks request.method.
    Usage : @method_check(["GET", "POST"])
    """

    def return_check_method(func):
        @wraps(func)
        def inner(*args, **kwargs):
            if args[0].method not in methods:
                return HttpResponseNotAllowed(methods)
            return func(*args, **kwargs)

        return inner

    return return_check_method

def add_author_name(reviews):
    for r in reviews:
        r["author_name"] = User.objects.get(id=r["author_id"]).username
    return reviews

@csrf_exempt
@method_check(["POST"])
def signup(request):
    req_data = json.loads(request.body.decode())
    username = req_data["username"]
    email = req_data["email"]
    password = req_data["password"]
    user = User.objects.create_user(username, password=password)
    login(request, user)
    result = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "reviews": add_author_name(list(Review.objects.filter(author=user.id).values())),
    }
    return JsonResponse(result, status=201)


@csrf_exempt
@method_check(["POST"])
def signin(request):
    req_data = json.loads(request.body.decode())
    username = req_data["username"]
    password = req_data["password"]
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        result = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "reviews": add_author_name(list(Review.objects.filter(author=user.id).values())),
        }
        return JsonResponse(result, status=200)
    return HttpResponse(status=401)


@method_check(["GET"])
def signout(request):
    if request.user.is_authenticated:
        logout(request)
        return HttpResponse(status=204)
    return HttpResponse(status=401)

@method_check(["GET"])
def check_login(request):
    if request.user.is_authenticated:
        return HttpResponse(True, status=200)
    return HttpResponse(False, status=200)

@method_check(["GET"])
def user_info(request, user_id=0):
    # Check user exists.
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return HttpResponse(status=404)

    result = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "reviews": add_author_name(list(Review.objects.filter(author=user.id).values())),
    }
    return JsonResponse(result, status=200, safe=False)

@method_check(["GET", "PUT"])
def profile(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    user = User.objects.get(id=request.user.id)

    if request.method == "PUT":
        try:
            req_data = json.loads(request.body.decode())
            user.username = req_data["username"]
            user.email = req_data["email"]
            user.save()
        except (KeyError, json.JSONDecodeError):
            return HttpResponseBadRequest()

    result = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "reviews": add_author_name(list(Review.objects.filter(author=user.id).values())),
    }

    if request.method == "GET":
        return JsonResponse(result, status=200, safe=False)
    return JsonResponse(result, status=201, safe=False)


@method_check(["GET"])
def alcohol(request):
    alcohol_list = list(Sool.objects.all().values("id", "name", "rating"))
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
        "alcohol_list": list(finded_category.sool.values("id", "name")),
    }
    return JsonResponse(
        responses, safe=False, json_dumps_params={"ensure_ascii": False}
    )


@method_check(["GET"])
def test(request):
    ######
    # Generate some recommendations
    ######
    sool = Sool.objects.first()
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
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    if request.method == "GET":
        result = add_author_name(list(
            Review.objects.all().values("id", "title", "content", "star_rating", "author_id")
        ))
        return JsonResponse(result, status=200, safe=False)

    if request.method == "POST":
        try:
            req_data = request.POST
            alcohol_review = Sool.objects.get(id=req_data["sool_id"])
            if 'image' in request.FILES.keys():
                image = request.FILES['image']
            else:
                image = None
            new_review = Review(
                title=req_data["title"],
                content=req_data["content"],
                author=request.user,
                star_rating=req_data["rating"],
                sool=alcohol_review,
                image=image,
            )
        except (Sool.DoesNotExist, KeyError, json.JSONDecodeError):
            return HttpResponseBadRequest()

        new_review.save()
        alcohol_review.update_star_rating()
        result = add_author_name(Review.objects.filter(id=new_review.id).values())[0]
    return JsonResponse(result, status=201)


@method_check(["GET", "DELETE"])
def review_detail(request, review_id):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    if request.method == "GET":
        query = Review.objects.filter(id=review_id)
        if not query.exists():
            return HttpResponse(status=404)
        review = add_author_name(query.values())[0]

        is_authorized = False
        #check request user's authorization
        if request.user.id == review['author_id']:
            is_authorized = True

        result = {
            "review": review,
            "is_authorized": is_authorized
        }

        return JsonResponse(result, status=200)

    if request.method == "DELETE":
        Review.objects.filter(id=review_id).delete()
    return HttpResponse(status=200)
