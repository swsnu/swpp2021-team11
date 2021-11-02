import asyncio
import aiohttp
from bs4 import BeautifulSoup
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

async def download_product_images(session, product, path):
  response = await get_product_content(session, product['channelNo'], product['productNo'], product['originalProductNo'])
  bs = BeautifulSoup(response['mobileRenderContent'], 'html.parser')
  urls = [img.get('data-src', '') for img in bs.find_all('img')]
  Path(path).mkdir(parents=True, exist_ok=True)
  tasks = [asyncio.ensure_future(download(session=session, url=url, path=f"{path}/{str(uuid.uuid4())}")) for url in urls if url != '']
  await asyncio.gather(*tasks)

tasks = [fetch_detail_alcohols(alcohol['id']) for alcohol in json_data["result"]["rows"]]

loop = asyncio.get_event_loop()
loop.run_until_complete(asyncio.wait(tasks))
loop.close()
