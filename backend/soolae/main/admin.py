from django.contrib import admin
from .models import *

modelList = [SoolMaterial, SoolMaker, SoolTag, SoolCategory, TasteStandard, Anju, Sool]
for i in modelList:
    admin.site.register(i)

# Register your models here.
