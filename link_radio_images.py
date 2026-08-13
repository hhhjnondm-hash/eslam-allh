#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script to link radio stations with reciter images based on name matching
"""
import json
import os
import sys

# Set UTF-8 encoding for Windows console
if sys.platform == "win32":
    import codecs
    sys.stdout = codecs.getwriter("utf-8")(sys.stdout.buffer, "strict")
    sys.stderr = codecs.getwriter("utf-8")(sys.stderr.buffer, "strict")

# Read radio.json
with open("D:/rafeq/www.islameyat.site/data/radio.json", "r", encoding="utf-8") as f:
    radio_data = json.load(f)

# Read mashaykh.json to get image mappings
with open("D:/rafeq/www.islameyat.site/data/mashaykh.json", "r", encoding="utf-8") as f:
    mashaykh_data = json.load(f)

# Create name to image mapping (remove "شيخ" prefix for matching)
name_to_image = {}
for reciter in mashaykh_data["reciters"]:
    # Store multiple variations of the name
    full_name = reciter["name"]
    name_without_prefix = full_name.replace("شيخ ", "").strip()
    name_to_image[full_name] = reciter["img"]
    name_to_image[name_without_prefix] = reciter["img"]

# List available images
img_dir = "D:/rafeq/www.islameyat.site/data/img"
available_images = set(os.listdir(img_dir))

# Common reciter names mapping for radio stations
radio_name_mapping = {
    "إبراهيم الأخضر": "إبراهيم الأخضر",
    "أبو بكر الشاطري": "أبو بكر الشاطري",
    "أحمد العجمي": "أحمد بن علي العجمي",
    "أحمد الحواشي": None,  # Not in our list
    "أحمد صابر": None,  # Not in our list
    "أحمد نعينع": None,  # Not in our list
    "أكرم العلاقمي": "أكرم العلاقمي",
    "إدريس أبكر": None,  # Not in our list
    "الزين محمد أحمد": None,  # Not in our list
    "القارئ ياسين": None,  # Not in our list
    "العيون الكوشي": None,  # Not in our list
    "توفيق الصايغ": None,  # Not in our list
    "جمال شاكر عبدالله": None,  # Not in our list
    "خالد القحطاني": "خالد القحطاني",
    "خالد عبدالكافي": None,  # Not in our list
    "خليفة الطنجي": None,  # Not in our list
    "سعد الغامدي": "سعد الغامدي",
    "سعود الشريم": "سعود الشريم",
    "سهل ياسين": None,  # Not in our list
    "زكي داغستاني": None,  # Not in our list
    "سيد رمضان": None,  # Not in our list
    "شيرازاد طاهر": None,  # Not in our list
    "صابر عبدالحكم": None,  # Not in our list
    "صلاح البدير": None,  # Not in our list
    "صلاح الهاشم": None,  # Not in our list
    "صلاح بخاطر": "صلاح بو خاطر",
    "عادل ريان": "عادل ريان",
    "عبدالباري الثبيتي": None,  # Not in our list
    "عبدالباري محمد": None,  # Not in our list
    "عبدالباسط عبدالصمد": "عبدالباسط عبدالصمد",
    "عبدالرحمن السديس": None,  # Not in our list
    "عبدالعزيز الأحمد": None,  # Not in our list
    "عبدالله المطرود": None,  # Not in our list
    "عبدالله بصفر": None,  # Not in our list
    "عبدالله خياط": None,  # Not in our list
    "عبدالله عواد الجهني": "عبدالله عواد الجهني",
    "عبدالرشيد صوفي خلف": None,  # Not in our list
    "عبدالرشيد صوفي أسوسي": None,  # Not in our list
    "عبدالمحسن الحارثي": None,  # Not in our list
    "عبدالمحسن القاسم": None,  # Not in our list
    "عبدالمحسن العبيكان": None,  # Not in our list
    "هادي أحمد كناكري": None,  # Not in our list
    "هاشم رسول علي محمد": None,  # Not in our list
    "هاني الرفاعي": None,  # Not in our list
    "هشام الحكيم": None,  # Not in our list
    "فارس عباد": "فارس عباد",
    "فؤاد عبدالمجيد": None,  # Not in our list
    "فرج الله حمود": None,  # Not in our list
    "فضل محمد صالح": None,  # Not in our list
    "فضل بن عايض": None,  # Not in our list
    "قاسم عبدالله": None,  # Not in our list
    "ماهر المعيقلي": "ماهر المعيقلي",
    "محمود علي البنا": "محمود علي البنا",
    "محمود خليل الحصري": "محمود خليل الحصري",
    "مشاري العفاسي": "مشاري العفاسي",
    "ياسر سلامة": "ياسر سلامة",
    "حاتم فريد الواعر": "حاتم فريد الواعر",
    "إبراهيم الجرمي": "إبراهيم الجرمي",
    "محمود الرفاعي": "محمود الرفاعي",
    "جمعان العصيمي": "جمعان العصيمي",
    "الفاتح محمد الزبير": "الفاتح محمد الزبير",
    "رعد محمد الكردي": "رعد محمد الكردي",
    "عبدالرحمن العوسي": "عبدالرحمن العوسي",
    "عبدالرحمن الماجد": "عبدالرحمن الماجد",
    "منصور السالمي": "منصور السالمي",
    "أحمد النفيس": "أحمد النفيس",
    "عبدالله كامل": "عبدالله كامل",
    "بيشه واقادر الكردي": "بيشه واقادر الكردي",
    "عبدالإله بن عون": "عبدالإله بن عون",
    "نورين محمد صديق": "نورين محمد صديق",
    "خالد كريم محمدي": None,  # Not in our list
    "حسن صالح": "حسن صالح",
    "عبدالرحمن الشحات": "عبدالرحمن الشحات",
    "هشام الهراز": "هشام الهراز",
    "عادل الكلباني": "عادل الكلباني",
    "بندر بليله": "بندر بليله",
}

# Update radio stations with local images
updated_count = 0
for radio in radio_data["radios"]:
    radio_name = radio["name"].replace("إذاعة ", "").strip()
    
    # Try to find matching image
    if radio_name in radio_name_mapping:
        mapped_name = radio_name_mapping[radio_name]
        if mapped_name and mapped_name in name_to_image:
            img_path = name_to_image[mapped_name]
            # Check if image file exists
            filename = img_path.split("/")[-1]
            if filename in available_images:
                radio["img"] = img_path
                updated_count += 1
                print(f"Updated: {radio_name} -> {filename}")
            else:
                print(f"Image not found: {filename}")
        else:
            print(f"No image available for: {radio_name}")
    else:
        # Try direct match with reciter names
        if radio_name in name_to_image:
            img_path = name_to_image[radio_name]
            filename = img_path.split("/")[-1]
            if filename in available_images:
                radio["img"] = img_path
                updated_count += 1
                print(f"Updated: {radio_name} -> {filename}")
            else:
                print(f"Image not found: {filename}")
        else:
            # Use default image for unmatched stations
            radio["img"] = "./data/img/shaikh-abubakr-as-shatery.webP"
            print(f"Using default image for: {radio_name}")

# Save updated radio.json
with open("D:/rafeq/www.islameyat.site/data/radio.json", "w", encoding="utf-8") as f:
    json.dump(radio_data, f, ensure_ascii=False, indent=2)

print(f"\nRadio images updated successfully! Total updated: {updated_count}")
