import json

json_data = {}
id = 1

with open("./alcohols.json", 'r', encoding='UTF-8') as f:
    json_data = json.load(f)


def parsing_data(product_id, id):
    pathname = './alcohols/'+str(id)+'.json'
    with open("./detail_alcohol_data/"+str(product_id)+'.json') as f:
        json_detail_data = json.load(f)
        parsing_json = {}
        try:
            parsing_json['name'] = json_detail_data['result']['real_name']
            parsing_json['category_id'] = json_detail_data['result']['sool']['sool_category_id']
            parsing_json['content'] = json_detail_data['result']['content']
            parsing_json['price'] = json_detail_data['result']['origin_price']
            parsing_json['maker'] = json_detail_data['result']['maker']['name']
            parsing_json['alcohol_content'] = json_detail_data['result']['sool']['alcohol_content']
            parsing_json['volumes'] = json_detail_data['result']['sool']['volumes']
        except:
            print(product_id)
        with open(pathname, "w", encoding='UTF-8') as f1:
            json.dump(parsing_json, f1, ensure_ascii=False)            
id = 1
for alcohol in json_data["result"]["rows"]:
    parsing_data(alcohol['id'], id)
    id+=1