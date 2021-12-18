from nlp import LangToVec
from data import Database
from flask import Flask, request  # 서버 구현을 위한 Flask 객체 import
from flask_restx import Api, Resource  # Api 구현을 위한 Api 객체 import
from flask_sqlalchemy import SQLAlchemy
import torch
import random
import pickle
from flask_cors import CORS

app = Flask(__name__)  # Flask 객체 선언, 파라미터로 어플리케이션 패키지의 이름을 넣어줌.
CORS(app)
api = Api(app)  # Flask 객체에 Api 객체 등록

app.config['SECRET_KEY'] = 'this is my secret key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
 
database = SQLAlchemy(app)
class User(database.Model):
    __table_name__ = 'user'

    id = database.Column(database.Integer, primary_key = True)
    sweet = database.Column(database.Float, default=0.0)
    weight = database.Column(database.Float, default=0.0)
    carbonic = database.Column(database.Float, default=0.0)
    plain = database.Column(database.Float, default=0.0)
    acidity = database.Column(database.Float, default=0.0)
    body = database.Column(database.Float, default=0.0)
    tannin = database.Column(database.Float, default=0.0)
    nutty = database.Column(database.Float, default=0.0)
    richness = database.Column(database.Float, default=0.0)
    spicy = database.Column(database.Float, default=0.0)
    bitter = database.Column(database.Float, default=0.0)
    flavor = database.Column(database.Float, default=0.0)

nlp = LangToVec()
db = Database()
testDb = []

questions = ["당신이 선호하는 맛은?", "오늘은 어떤 술이 필요하신가요?", "지금 당신의 기분은 어떤가요?", "당신이 가장 좋아하는 계절은?", "가장 좋아하는 색은?"]

answers = [[
    "처지는 텐션은 단맛으로 올려야...", 
    "약간 씁쓸한게 우리 삶 아닐까?", 
    "차라리 새콤하고 상쾌한 신맛이 나을거야. "
],
[
    "가볍게 혼자 마실 술", 
    "친구들과 떠들며 즐겁게 마실 술", 
    "분위기 잡고 마실 술"
], 
[
    "오늘 날씨 만큼이나 기분도 울적한데...", 
    "이렇게나 즐겁고 기쁜 날", 
    "그렇게 슬프지는 않은데 어딘가 지친다..."
], 
[
    "화사한 봄이 좋다!", 
    "정열적인 여름이 나는 좋다!", 
    "선선하고 차분한 가을이 좋다!", 
    "밝고 차가운 겨울이 좋다!"
], 
[
    "즐겁고 평화로운 노란색", 
    "마음까지 편안해지는 초록색", 
    "신비롭고 우아한 파란색"
]]

 
with open("test.pickle","rb") as fr:
    test_data = pickle.load(fr)


def db_to_torch(u):
    l = []
    l.append(u.sweet)
    l.append(u.weight)
    l.append(u.carbonic)
    l.append(u.plain)
    l.append(u.acidity)
    l.append(u.body)
    l.append(u.tannin)
    l.append(u.nutty)
    l.append(u.richness)
    l.append(u.spicy)
    l.append(u.bitter)
    l.append(u.flavor)
    return torch.tensor(l)

def torch_to_db(u, t):
    u.sweet = t[0].item()
    u.weight = t[1].item()
    u.carbonic = t[2].item()
    u.plain = t[3].item()
    u.acidity = t[4].item()
    u.body = t[5].item()
    u.tannin = t[6].item()
    u.nutty = t[7].item()
    u.richness = t[8].item()
    u.spicy = t[9].item()
    u.bitter = t[10].item()
    u.flavor = t[11].item()
    return u

def get_infer(s):
    r = nlp.infer(s)
    return db.topK(r, 3)

@api.route('/hello')  # 데코레이터 이용, '/hello' 경로에 클래스 등록
class HelloWorld(Resource):
    def get(self):  # GET 요청시 리턴 값에 해당 하는 dict를 JSON 형태로 반환
        return {"hello": "world!"}

@api.route('/language')
class languagePost(Resource):
    def post(self):
        global nlp
        global db
        s = request.json.get('string')
        if s is not None:
            r = nlp.infer(s)
            idxs = db.topK(r, 3)
            r = r.tolist()
            return {'index': idxs, 'vec': r}

@api.route('/similar/<int:alcohol_id>')
class similar(Resource):
    def get(self, alcohol_id):
        global db
        r = db.similar(alcohol_id, 3)
        return {'index': r}

@api.route('/update/<int:user_id>/<int:alcohol_id>')
class update_user_info(Resource):
    def get(self, user_id, alcohol_id):
        global database
        global db
        dbr = User.query.filter_by(id = user_id)
        if dbr.count() == 0:
            u = User(id = user_id)
            database.session.add(u)
            database.session.commit()
        u = User.query.get(user_id)

        user_info = db_to_torch(u)
        alcohol_info = db.alcohol_id_to_tensor(alcohol_id)
        rho = 5 * (torch.dot(user_info, alcohol_info) + 2)
        user_info = (rho * user_info  + alcohol_info) / (rho + 1)
        torch_to_db(u, user_info)
        database.session.commit()
        return {'user_id': user_id}

@api.route('/rate/<int:user_id>/<int:rating>/<int:alcohol_id>')
class update_rating(Resource):
    def get(self, user_id, alcohol_id, rating):
        global database
        global db
        dbr = User.query.filter_by(id = user_id)
        if dbr.count() == 0:
            u = User(id = user_id)
            database.session.add(u)
            database.session.commit()
        u = User.query.get(user_id)

        user_info = db_to_torch(u)
        alcohol_info = db.alcohol_id_to_tensor(alcohol_id)
        rho = 4 * (rating - 2.5) if rating > 2.5 else 3 * (2.5 - rating)
        if rating < 2.5:
            alcohol_info = -alcohol_info
        user_info = (user_info  + rho * alcohol_info) / (rho + 1)
        torch_to_db(u, user_info)
        database.session.commit()
        return {'user_id': user_id}

@api.route('/recommend/<int:user_id>')
class recommend(Resource):
    def get(self, user_id):
        global database
        global db
        dbr = User.query.filter_by(id = user_id)
        if dbr.count() == 0:
            u = User(id = user_id)
            database.session.add(u)
            database.session.commit()
        u = User.query.get(user_id)

        user_info = db_to_torch(u)
        r = db.sim(user_info, random.randrange(3, 6))
        res = []
        for i in r:
            res.append({'id' : i})
        return {'index': res}

@api.route('/test/<int:user_id>')
class setTest(Resource):
    def post(self, user_id):
        global database
        global db
        global test_data
        global testDb
        s = request.json.get('answer')
        dbr = User.query.filter_by(id = user_id)
        if dbr.count() == 0:
            u = User(id = user_id)
            database.session.add(u)
            database.session.commit()
        u = User.query.get(user_id)

        user_info = db_to_torch(u)
        for idx, sel in enumerate(s):
            if idx != 5:
                break;
            alcohol_info = torch.tensor(test_data[idx][sel][1])
            rho = 3 + idx / 3
            user_info = (rho * user_info  + alcohol_info) / (rho + 1)
            torch_to_db(u, user_info)
        print(s)
        testDb.append( (user_id, s[5], s[6]) )
        database.session.commit()
        return {'user_id': user_id}

@api.route('/gettest/<int:user_id>')
class getTest(Resource):
    def get(self, user_id):
        global database
        global db
        global testDb
        dbr = User.query.filter_by(id = user_id)
        if dbr.count() == 0:
            u = User(id = user_id)
            database.session.add(u)
            database.session.commit()
        u = User.query.get(user_id)

        user_info = db_to_torch(u)
        r = db.sim(user_info, 120)
        res = []
        priceOption = 2
        degreeOption = 5
        for i in testDb:
            if user_id == i[0]:
                priceOption = i[2]
                degreeOption = i[1]
                break
        testDb = []

        for i in r:
            rr = db.rawData(i)
            if priceOption == 0 :
                if int(rr['price']) <= 6000:
                    res.append(rr)
            elif priceOption == 1:
                if int(rr['price']) <= 15000:
                    res.append(rr)
            else:
                res.append(rr)
        res2 = []
        for rr in res:
            if degreeOption == 0 :
                if rr['alcohol_content'] <= 10:
                    res2.append(rr)
            elif degreeOption == 1:
                if 10 <= rr['alcohol_content'] <= 15:
                    res2.append(rr)
            elif degreeOption == 2:
                if 15 <= rr['alcohol_content'] <= 25:
                    res2.append(rr)
            elif degreeOption == 3:
                if rr['alcohol_content'] >= 25:
                    res2.append(rr)
            else:
                res2.append(rr) 
        res = []
        for i in res2:
            res.append({'id' : rr['id']})
        return {'index': [{'id' : res2[0]['id']}]}

@api.route('/copy/<int:from_id>/<int:to_id>')
class copyTest(Resource):
    def get(self, from_id, to_id):
        global database
        global db
        global test_data

        fromdb = User.query.filter_by(id = from_id)
        todb = User.query.filter_by(id = to_id)
        if fromdb.count() != 0 and todb.count() == 0:
            fromu = User.query.get(from_id)
            tou = User(id = to_id)
            database.session.add(tou)
            user_info = db_to_torch(fromu)
            torch_to_db(tou, user_info)
            database.session.commit()
        return {'user_id': to_id}

if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0', port=8081, use_reloader=False)