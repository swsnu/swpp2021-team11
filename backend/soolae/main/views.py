import json
import requests
import random
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
from .models import Sool, SoolCategory, Review, UserProfile


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

    profile, created = Profile.objects.get_or_create(user=user)

    result = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "reviews": add_author_name(list(Review.objects.filter(author=user.id).values())),
        "favorite_sool": list(user.profile.favorite_sool.all().values("id", "name", "sool_image"))
    }
    return JsonResponse(result, status=200, safe=False)

@method_check(["GET", "PUT"])
def profile(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    user = User.objects.get(id=request.user.id)
    profile, created = UserProfile.objects.get_or_create(user = user)
    if request.method == "PUT":
        try:
            req_data = json.loads(request.body.decode())
            if "username" in req_data.keys():
                user.username = req_data["username"]
            if "email" in req_data.keys():
                user.email = req_data["email"]
            if "favorite_sool" in req_data.keys():
                id = req_data["favorite_sool"]
                favorites = list(user.profile.favorite_sool.all().values("id"))
                print(list(map((lambda sool: sool["id"]), favorites)))
                if id in list(map((lambda sool: sool["id"]), favorites)):
                    user.profile.favorite_sool.remove(Sool.objects.get(id=id))
                else:
                    user.profile.favorite_sool.add(Sool.objects.get(id=id))
            user.save()
        except (KeyError, json.JSONDecodeError):
            return HttpResponseBadRequest()
    result = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "reviews": add_author_name(list(Review.objects.filter(author=user.id).values())),
        "favorite_sool": list(user.profile.favorite_sool.all().values("id", "name", "sool_image"))
    }

    if request.method == "GET":
        return JsonResponse(result, status=200, safe=False)
    return JsonResponse(result, status=201, safe=False)


@method_check(["GET"])
def alcohol(request):
    alcohol_list = list(Sool.objects.all().values("id", "name", "rating", "sool_image"))
    return JsonResponse(
        alcohol_list, safe=False, json_dumps_params={"ensure_ascii": False}
    )


@method_check(["GET"])
def alcohol_info(request, alcohol_id):
    sool = Sool.objects.get(id=alcohol_id)
    sool.update_star_rating()
    sool.save()
    result = list(Sool.objects.filter(id=alcohol_id).values())[0]
    sool = Sool.objects.get(id=alcohol_id)
    result['sool_review'] = add_author_name(list(Review.objects.filter(sool=sool).values()))

    return JsonResponse(
        result, status=200, json_dumps_params={"ensure_ascii": False}
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
        "alcohol_list": list(finded_category.sool.values("id", "name", "sool_image")),
    }
    return JsonResponse(
        responses, safe=False, json_dumps_params={"ensure_ascii": False}
    )


@method_check(["POST"])
def test(request):
    try:
        req_data = json.loads(request.body.decode())
        test_result = req_data['test_result']
    except (KeyError, json.JSONDecodeError):
        return HttpResponseBadRequest()
    url = "http://api.fkr.kr:8001/language"
    result = requests.get(url, data = {"string": test_result}, timeout=5)
    return JsonResponse(result["index"], safe=False, status=200)


@method_check(["GET"])
def recommend(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
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


@method_check(["GET"])
def getid(request):
    if request.user.is_authenticated:
        x = request.user.id
    else:
        x = -1
    return JsonResponse({'id': x}, status=200, safe=False)
