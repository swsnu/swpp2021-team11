import urllib.request
import json

BASE_LINK = "https://api.sooldamhwa.com/product/"
json_data = {}
with open("./alcohols.json", 'r', encoding='UTF-8') as f:
    json_data = json.load(f)

def download_product_images(product_id, image_url):
    pathname = './image/'+str(product_id)+'.jpg'
    urllib.request.urlretrieve(image_url, pathname)

for alcohol in json_data["result"]["rows"]:
    download_product_images(alcohol['id'], alcohol['thumbnail'])