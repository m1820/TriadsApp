#!/usr/bin/env python3
import json
import re
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent.resolve()
RESOURCES_DIR = SCRIPT_DIR / "resources"
OUTPUT_FILE = SCRIPT_DIR / "data.js"

if not RESOURCES_DIR.exists():
    print(f"Error: Cannot find 'resources' folder")
    exit(1)

IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif", ".svg"}

PRIORITY = ["roots", "overview", "main"]

def subfolder_priority(p):
    for i, word in enumerate(PRIORITY):
        if word in p.name.lower():
            return i
    return 999

def clean_name(raw):
    name = raw.replace('_', ' ').replace('-', ' ')
    name = re.sub(r'\b([A-G])#\b', r'\1♯', name)
    name = re.sub(r'\b([A-G])b\b', r'\1♭', name)
    name = name.strip()
    if name and not name.isupper():
        name = name.title()
    return name

def numeric_order(f):
    m = re.search(r'^(\d+)', f.stem)
    return int(m.group(1)) if m else 9999

def generate_data_js():
    shapes = []

    for folder_path in sorted(p for p in RESOURCES_DIR.iterdir() if p.is_dir()):
        shape_title = clean_name(folder_path.name)

        subfolders = [p for p in folder_path.iterdir() if p.is_dir()]
        subfolders.sort(key=lambda x: (subfolder_priority(x), x.name.lower()))

        submenus = []
        for sub_path  in subfolders:
            submenu_title = clean_name(sub_path.name.replace('_', ' '))

            images = [f for f in sub_path.iterdir() if f.suffix.lower() in IMAGE_EXTENSIONS]
            images.sort(key=numeric_order)
            image_paths = [f"resources/{folder_path.name}/{sub_path.name}/{img.name}" for img in images]

            # === NEW: Read songs.txt if exists ===
            songs = []
            songs_file = sub_path / "songs.txt"
            if songs_file.is_file():
                try:
                    lines = songs_file.read_text(encoding="utf-8").strip().splitlines()
                    i = 0
                    while i < len(lines):
                        line = lines[i].strip()
                        if line and not line.startswith("http"):
                            title = re.sub(r'^\d+[\.\)\s-]*\s*', '', line).strip()   # removes 1. 1) 1- 1  etc.
                            i += 1
                            if i < len(lines) and lines[i].strip().startswith("http"):
                                url = lines[i].strip()
                                songs.append({"title": title, "url": url})
                                i += 1
                            else:
                                # fallback: no URL, skip
                                i += 1
                        else:
                            i += 1
                except:
                    pass  # ignore malformed songs.txt

            submenu_data = {
            "name": submenu_title,
            "images": image_paths
            }
            if songs:
                submenu_data["songs"] = songs

            # Keep submenu even if it has no images — as long as it has songs!
            if image_paths or songs:
                submenus.append(submenu_data)

        if submenus:
            shapes.append({
                "name": shape_title,
                "submenus": submenus
            })

    content = f"const SHAPES_DATA = {json.dumps(shapes, indent=2)};\n\n"
    content += "// GoodFor.txt loader\n"
    content += "async function loadGoodFor(n){const m={\n"
    for s in shapes:
        orig = next(p.name for p in RESOURCES_DIR.iterdir() if p.is_dir() and clean_name(p.name)==s["name"])
        content += f'"{s["name"]}":"{orig}",\n'
    content += "};const f=m[n];if(!f)return\"No description\";try{const r=await fetch(`resources/${f}/GoodFor.txt`);if(r.ok)return await r.text()}catch{}return\"No description\"}\n"
    content += "window.loadGoodFor=loadGoodFor;"

    OUTPUT_FILE.write_text(content, encoding="utf-8")
    total = sum(len(sub["images"]) for s in shapes for sub in s["submenus"])
    print(f"data.js generated — no app.js changes needed!")
    print(f"  {len(shapes)} shapes • {total} images • clean captions via your existing app.js")

if __name__ == "__main__":
    generate_data_js()