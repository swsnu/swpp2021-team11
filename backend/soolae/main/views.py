import json
import random   #Temporary
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed, response
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import get_user_model
from .models import Sool, SoolCategory, Review


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
        sool = Sool.objects.get(id = random.randrange(128, 254))
        result = {
            'id': sool.id,
            'name': sool.name,
            'price': sool.price,
            'image': str(sool.sool_image),
            'rating': sool.get_star_rating(),
        }
        return JsonResponse(result, status=200)
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
        return JsonResponse(result, status = 200, safe = False)
    return HttpResponseNotAllowed(['GET'])

def review_list(request):
    if request.method == 'GET':
        result = list(Review.objects.all().values())
        return JsonResponse(result, status = 200, safe = False)
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        new_review = Review(
            title = req_data['title'],
            content = req_data['content'],
            author = request.user,
            star_rating = req_data['rating'],
            sool = Sool.objects.get(id = req_data['id']),
            image = req_data['image']
        )
        print(req_data['image'])
        new_review.save()
        result = {
            'id': new_review.id,
            'title': new_review.title,
            'content': new_review.content,
            'author_id': new_review.author.id,
            'star_rating': new_review.star_rating,
            'sool_id': new_review.sool.id,
        }
        return JsonResponse(result, status = 201)
    return HttpResponseNotAllowed(['GET', 'POST'])

def review_detail(request, review_id):
    if request.method == 'GET':
        try:
            review = Review.objects.get(id = review_id)
        except Review.DoesNotExist:
            return HttpResponse(status = 404)
        result = {
                'id': review_id,
                'title': review.title,
                'content': review.content,
                'image': str(review.image),
                'author_id': review.author.id,
                'star_rating': review.star_rating,
                'sool_id': review.sool.id,
            }
        return JsonResponse(result, status = 200)
    if request.method == 'DELETE':
        Review.objects.filter(id = review_id).delete()
        return HttpResponse(status = 200)
    return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])
