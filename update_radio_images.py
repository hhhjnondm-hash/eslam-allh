#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script to update radio.json with local images
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

# Create name to image mapping
name_to_image = {}
for reciter in mashaykh_data["reciters"]:
    # Remove "شيخ" prefix if exists for matching
    name = reciter["name"].replace("شيخ ", "").strip()
    name_to_image[name] = reciter["img"]

# List available images
img_dir = "D:/rafeq/www.islameyat.site/data/img"
available_images = set(os.listdir(img_dir))

# Update radio stations with local images
for radio in radio_data["radios"]:
    radio_name = radio["name"].replace("إذاعة ", "").replace("شيخ ", "").strip()
    
    # Try to find matching image
    if radio_name in name_to_image:
        img_path = name_to_image[radio_name]
        # Check if image file exists
        filename = img_path.split("/")[-1]
        if filename in available_images:
            radio["img"] = img_path
            print(f"Updated: {radio_name} -> {filename}")
        else:
            print(f"Image not found: {filename}")
    else:
        print(f"No match found for: {radio_name}")

# Save updated radio.json
with open("D:/rafeq/www.islameyat.site/data/radio.json", "w", encoding="utf-8") as f:
    json.dump(radio_data, f, ensure_ascii=False, indent=2)

print("\nRadio images updated successfully!")
