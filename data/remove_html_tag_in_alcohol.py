from main.models import *
import re


def removeHtml(src):
    src = re.sub('>\\[', '>\n[', src)
    src = re.sub('\\?<', '?\n<', src)
    return re.sub('(<([^>]+)>)', '', src)


for i in Sool.objects.all():
    i.content = removeHtml(i.content)
    i.save()
