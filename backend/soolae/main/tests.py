# pylint: disable=line-too-long
import json
from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from .models import Review, Sool, TasteStandard, SoolMaker, SoolMaterial, SoolTag, SoolCategory, SoolDistinction, Anju

User = get_user_model()

class MainTestCase(TestCase):
    def setUp(self):
        User.objects.create_user(username = 'test_user', password = 'test_password', email = 'test_email')
        TasteStandard.objects.create(name = 'test_tasteStandard')
        SoolMaterial.objects.create(name = 'test_soolMaterial', material_image = '')
        SoolTag.objects.create(name = 'test_soolTag')
        SoolCategory.objects.create(name = 'test_soolCategory')
        SoolDistinction.objects.create(name = 'test_soolDistinction')
        Anju.objects.create(name = 'test_anju', anju_image = '')
        SoolMaker.objects.create(
            name = 'test_soolMaker',
            ceo_name = "",
            email = "",
            phone_number = "",
            address = "",
            registration_number = "",
            report_number = "",
            maker_image = "",
        )
        Sool.objects.create(
            name = 'test_sool',
            price = 10000,
            sool_image = "",
            alcohol_content = 0,
            expire_info = "",
            storage_note = "",
            taste_note = "",
            anju_note = "",
            content = "",
            subtext = "",
            sweet = 0,
            weight = 0,
            carbonic = 0,
            plain = 0,
            acidity = 0,
            body = 0,
            tannin = 0,
            nutty = 0,
            richness = 0,
            spicy = 0,
            bitter = 0,
            flavor = 0,
            sool_category_id = 1,
            sool_distinction_id = 1,
            sool_maker_id = 1,
            taste_standard_id = 1,
            rating = 3,
        )

    def test_http_response_not_allowed(self):
        client = Client()
        response = client.get('/api/signup/')
        self.assertEqual(response.status_code, 405)
        response = self.client.get('/api/signin/')
        self.assertEqual(response.status_code, 405)
        response = self.client.post('/api/signout/')
        self.assertEqual(response.status_code, 405)
        response = self.client.post('/api/user/1/')
        self.assertEqual(response.status_code, 405)
        response = self.client.post('/api/alcohol/')
        self.assertEqual(response.status_code, 405)
        response = self.client.post('/api/alcohol/1/')
        self.assertEqual(response.status_code, 405)
        response = self.client.post('/api/category/')
        self.assertEqual(response.status_code, 405)
        response = self.client.post('/api/category/1/')
        self.assertEqual(response.status_code, 405)
        response = self.client.post('/api/test/')
        self.assertEqual(response.status_code, 405)
        response = self.client.post('/api/recommend/')
        self.assertEqual(response.status_code, 405)
        response = self.client.put('/api/review/')
        self.assertEqual(response.status_code, 405)
        response = self.client.post('/api/review/1/')
        self.assertEqual(response.status_code, 405)

    def test_signin(self):
        client1 = Client()
        response = client1.post('/api/signin/',
            json.dumps({'username': 'test_user', 'password': 'test_password'}),
            content_type = 'application/json')
        self.assertEqual(response.status_code, 204)
        client2 = Client()
        response = client2.post('/api/signin/',
            json.dumps({'username': 'test_user', 'password': 'wrong_password'}),
            content_type = 'application/json')
        self.assertEqual(response.status_code, 401)

    def test_signout(self):
        client1 = Client()
        client1.post('/api/signin/',
            json.dumps({'username': 'test_user', 'password': 'test_password'}),
            content_type = 'application/json')
        response = client1.get('/api/signout/')
        self.assertEqual(response.status_code, 204)
        client2 = Client()
        response = client2.get('/api/signout/')
        self.assertEqual(response.status_code, 401)

    def test_get_user(self):
        client = Client()
        response = client.get('/api/user/2/')
        self.assertEqual(response.status_code, 404)
        response = client.get('/api/user/1/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content.decode()),
            {'id': 1, 'username': 'test_user', 'email': 'test_email', 'reviews': []})

    def test_put_user(self):
        client = Client()
        response = client.put('/api/user/1/',
            json.dumps({'username': 'test_user2', 'email': 'test_email2'}),
            content_type = 'application/json')
        self.assertEqual(response.status_code, 401)
        client.post('/api/signin/',
            json.dumps({'username': 'test_user', 'password': 'test_password'}),
            content_type = 'application/json')
        response = client.put('/api/user/1/')
        self.assertEqual(response.status_code, 400)
        response = client.put('/api/user/1/',
            json.dumps({'username': 'test_user2', 'email': 'test_email2'}),
            content_type = 'application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(json.loads(response.content.decode()),
            {'id': 1, 'username': 'test_user2', 'email': 'test_email2', 'reviews': []})

    def test_alcohol(self):
        client = Client()
        response = client.get('/api/alcohol/')
        self.assertEqual(json.loads(response.content.decode()),
            [{'id': 1, 'name': 'test_sool', 'rating': 3}])

    def test_test(self):
        client = Client()
        response = client.get('/api/test/')
        self.assertEqual(response.status_code, 200)

    def test_recommend(self):
        client = Client()
        response = client.get('/api/recommend/')
        self.assertEqual(response.status_code, 200)

    def test_post_review(self):
        client = Client()
        response = client.post('/api/review/')
        self.assertEqual(response.status_code, 401)
        client.post('/api/signin/',
            json.dumps({'username': 'test_user', 'password': 'test_password'}),
            content_type = 'application/json')
        response = client.post('/api/review/',
            json.dumps({'sool_id': 1, 'title': 'test_title', 'content': 'test_content', 'rating': 3, 'image': ''}),
            content_type = 'application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(json.loads(response.content.decode()),
            {'id': 1, 'sool_id': 1, 'title': 'test_title', 'content': 'test_content', 'image': '', 'star_rating': 3, 'author_id': 1})

    def test_get_review_list(self):
        client = Client()
        client.post('/api/signin/',
            json.dumps({'username': 'test_user', 'password': 'test_password'}),
            content_type = 'application/json')
        client.post('/api/review/',
            json.dumps({'sool_id': 1, 'title': 'test_title', 'content': 'test_content', 'rating': 3, 'image': ''}),
            content_type = 'application/json')
        response = client.get('/api/review/')
        self.assertEqual(json.loads(response.content.decode()),
            [{'id': 1, 'title': 'test_title', 'content': 'test_content', 'star_rating': 3, 'author_id': 1}])

    def test_get_review(self):
        client = Client()
        client.post('/api/signin/',
            json.dumps({'username': 'test_user', 'password': 'test_password'}),
            content_type = 'application/json')
        client.post('/api/review/',
            json.dumps({'sool_id': 1, 'title': 'test_title', 'content': 'test_content', 'rating': 3, 'image': ''}),
            content_type = 'application/json')
        response = client.get('/api/review/1/')
        self.assertEqual(json.loads(response.content.decode()),
            {'id': 1, 'sool_id': 1, 'title': 'test_title', 'content': 'test_content', 'image': '','star_rating': 3, 'author_id': 1})
