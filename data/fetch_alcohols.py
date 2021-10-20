import asyncio
import aiohttp
import json

BASE_LINK = "https://api.sooldamhwa.com/product?list_type=shopping&order=id"

async def fetch_alcohols():
    async with aiohttp.ClientSession() as session:
        async with session.get(BASE_LINK) as res:
            pathname = './alcohols.json'
            with open(pathname, "w", encoding='UTF-8') as f:
                json.dump(await res.json(), f, ensure_ascii=False)


tasks = [fetch_alcohols()]

loop = asyncio.get_event_loop()
loop.run_until_complete(asyncio.wait(tasks))
loop.close()
