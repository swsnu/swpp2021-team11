from flask import Flask, request  # 서버 구현을 위한 Flask 객체 import
from flask_restx import Api, Resource  # Api 구현을 위한 Api 객체 import
from flask_sqlalchemy import SQLAlchemy
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


@api.route('/language')
class languagePost(Resource):
    def post(self):
        return {'index': [182]}

@api.route('/similar/<int:alcohol_id>')
class similar(Resource):
    def get(self, alcohol_id):
        return {'index': [182]}

@api.route('/update/<int:user_id>/<int:alcohol_id>')
class update_user_info(Resource):
    def get(self, user_id, alcohol_id):
        return {'user_id': user_id}

@api.route('/rate/<int:user_id>/<int:rating>/<int:alcohol_id>')
class update_rating(Resource):
    def get(self, user_id, alcohol_id, rating):
        return {'user_id': user_id}

@api.route('/recommend/<int:user_id>')
class recommend(Resource):
    def get(self, user_id):
        return {'index': [{'id': 180}, {'id': 181}, {'id': 182}]}

@api.route('/test/<int:user_id>')
class setTest(Resource):
    def post(self, user_id):
        return {'user_id': user_id}

@api.route('/gettest/<int:user_id>')
class getTest(Resource):
    def get(self, user_id):
        return {'index': [{'id': 180}]}

@api.route('/copy/<int:from_id>/<int:to_id>')
class copyTest(Resource):
    def get(self, from_id, to_id):
        return {'user_id': to_id}

if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0', port=8081, use_reloader=False)