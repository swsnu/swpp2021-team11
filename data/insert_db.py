import json
import os
from main.models import *
import decimal

dir_path = "../../data/detail_alcohol_data/"
file_list = os.listdir(dir_path)

def stripDict(field, src):
    '''
    field : [(source key, destination key)]
    src: source
    return: dictionary
    '''
    res = {}
    try:
        for s, d in field:
            if (s in src) and src[s]:
                res[d] = src[s]
    except:
        pass 
    return res


for i in file_list:
    if i[-5:] != '.json':
        continue
    file_path = dir_path + i
    with open(file_path, "r") as json_file:
        json_data = json.load(json_file)
        material_list = []
        try:
            if json_data['result']['sool']['materials'] is not list:
                raise
            material_list = json_data['result']['sool']['materials']
        except:
            pass
        for j in material_list:
            try:
                if not SoolMaterial.objects.filter(name=j['name']).exists():
                    m = SoolMaterial(name=j['name'])
                    m.save()
            except:
                pass
        category_name = ""
        try:
            category_name = json_data['result']['sool']['sool_category']['name']
            if not SoolCategory.objects.filter(name=category_name).exists():
                SoolCategory(name=category_name).save()
        except:
            pass
        fields = [('name', 'name'), ('official_name', 'official_name'), \
        ('ceo_name', 'ceo_name'), ('email', 'email'), ('phone_number', 'phone_number'), \
        ('address', 'address'), ('registration_number', 'registration_number'), \
        ('report_number', 'report_number'), ('maker_image', 'maker_image')]
        try:
            maker = stripDict(fields, json_data['result']['maker'])
            if not SoolMaker.objects.filter(name=maker['name']).exists():
                SoolMaker(**maker).save()
        except:
            pass
        try:
            tag_list = json_data['result']['tag_string'].split('\n')
            for j in tag_list:
                if not SoolTag.objects.filter(name=j).exists():
                    SoolTag(name=j).save()
        except:
            pass
        try:
            anju_list = json_data['result']['sool']['foods']
            for j in anju_list:
                if not Anju.objects.filter(name=j).exists():
                    Anju(name=j).save()
        except:
            pass
        try:
            distinction = json_data['result']['sool']['sool_distinction']
            if not SoolDistinction.objects.filter(name=distinction).exists():
                SoolDistinction(name=distinction).save()
        except:
            pass
        try:
            taste = json_data['result']['sool']['taste_standard']
            if not TasteStandard.objects.filter(name=taste).exists():
                TasteStandard(name=taste).save()
        except:
            pass

for i in file_list:
    if i[-5:] != '.json':
        continue
    file_path = dir_path + i
    with open(file_path, "r") as json_file:
        json_data = json.load(json_file)
        sool_fields = [('expire_info', 'expire_info') \
        , ('storage_note', 'storage_note') \
        , ('taste_note', 'taste_note') \
        , ('anju_note', 'anju_note') \
        , ('sweet', 'sweet') \
        , ('weight', 'weight') \
        , ('carbonic', 'carbonic') \
        , ('plain', 'plain') \
        , ('acidity', 'acidity') \
        , ('body', 'body') \
        , ('tannin', 'tannin') \
        , ('nutty', 'nutty') \
        , ('richness', 'richness') \
        , ('spicy', 'spicy') \
        , ('bitter', 'bitter') \
        , ('flavor', 'flavor')] 
        result_fields = [('name', 'name') \
        , ('origin_price', 'price') \
        , ('real_name', 'long_name') \
        , ('subtext', 'subtext') \
        , ('content', 'content')] 
        try:
            soolDict = stripDict(result_fields, json_data['result'])
            soolDict.update(stripDict(sool_fields, json_data['result']['sool']))
            soolDict['star_rating'] = decimal.Decimal(json_data['result']['star_rating'])
            soolDict['alcohol_content'] = decimal.Decimal(json_data['result']['sool']['alcohol_content'])
            name=json_data['result']['sool'].get('taste_standard')
            if name:
                soolDict['taste_standard'] = TasteStandard.objects.get(name=name)
            try:
                name=json_data['result']['sool']['sool_category']['name']
                if name:
                    soolDict['sool_category'] = SoolCategory.objects.get(name=name)
            except:
                pass
            name=json_data['result']['sool'].get('sool_distinction')
            if name:
                soolDict['sool_distinction'] = SoolDistinction.objects.get(name=name)
            name=json_data['result']['maker'].get('name')
            if name:
                soolDict['sool_maker'] = SoolMaker.objects.get(name=name)
            soolObj = Sool(**soolDict)
            soolObj.save()
            try:
                tag_list = json_data['result']['tag_string'].split('\n')
                for j in tag_list:
                    soolObj.sool_tag.add(SoolTag.objects.get(name=j))
            except:
                pass
            try:
                anju_list = json_data['result']['sool']['foods']
                for j in anju_list:
                    soolObj.anju.add(Anju.objects.get(name=j))
            except:
                pass
            try:
                material_list = json_data['result']['sool']['materials']
                for j in material_list:
                    soolObj.sool_material.add(SoolMaterial.objects.get(name=j))
            except:
                pass
        except Exception as e:
            pass
