import asyncio
import aiohttp
import json

BASE_LINK = "https://api.sooldamhwa.com/product/"
json_data = {}
with open("./alcohols.json", 'r', encoding='UTF-8') as f:
    json_data = json.load(f)

async def fetch_detail_alcohols(product_id):
    async with aiohttp.ClientSession() as session:
        async with session.get(BASE_LINK+str(product_id)) as res:
            pathname = './detail_alcohol_data/'+str(product_id)+'.json'
            with open(pathname, "w", encoding='UTF-8') as f:
                json.dump(await res.json(), f, ensure_ascii=False)

tasks = [fetch_detail_alcohols(alcohol['id']) for alcohol in json_data["result"]["rows"]]

loop = asyncio.get_event_loop()
loop.run_until_complete(asyncio.wait(tasks))
loop.close()
