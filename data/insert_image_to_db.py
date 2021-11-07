import json
import os
from main.models import *
import decimal
from django.core.files import File

f = open("../../data/alcohols.json", "r")
json_data = json.load(f)


def getID(s):
    for i in json_data["result"]["rows"]:
        if i["name"] == s:
            return str(i["id"])
    return None


for i in Sool.objects.all().iterator():
    id = getID(i.name)
    if id is None:
        continue
    f = open(f"../../data/image/{id}.jpg", "rb")
    myfile = File(f)
    i.sool_image.save(f"{id}.jpg", myfile)
    i.save()
