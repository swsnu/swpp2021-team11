from django.contrib import admin
from .models import (
    SoolMaterial,
    SoolMaker,
    SoolTag,
    SoolCategory,
    TasteStandard,
    Anju,
    Sool,
    Review
)

modelList = [SoolMaterial, SoolMaker, SoolTag, SoolCategory, TasteStandard, Anju, Sool, Review]
for i in modelList:
    admin.site.register(i)

# Register your models here.
