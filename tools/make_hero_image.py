#!/usr/bin/env python3
"""Generate a branded gradient hero image (1080x600) with a title, matching site style.

Usage: python3 tools/make_hero_image.py "Post Title" "output name.webp" "#0f172a" "#2563eb"
"""
import sys
import textwrap
from PIL import Image, ImageDraw, ImageFont

W, H = 1080, 600
FONT_PATH = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"


def hex2rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def gradient(c1, c2):
    img = Image.new("RGB", (W, H), c1)
    draw = ImageDraw.Draw(img)
    for y in range(H):
        t = y / H
        r = int(c1[0] + (c2[0] - c1[0]) * t)
        g = int(c1[1] + (c2[1] - c1[1]) * t)
        b = int(c1[2] + (c2[2] - c1[2]) * t)
        draw.line([(0, y), (W, y)], fill=(r, g, b))
    return img, draw


def make_hero(title, out_path, c1="#0f172a", c2="#2563eb"):
    img, draw = gradient(hex2rgb(c1), hex2rgb(c2))

    font = ImageFont.truetype(FONT_PATH, 56)
    lines = textwrap.wrap(title, width=22)[:4]
    line_h = 68
    total_h = line_h * len(lines)
    y = (H - total_h) // 2

    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font)
        w = bbox[2] - bbox[0]
        draw.text(((W - w) / 2 + 3, y + 3), line, font=font, fill=(0, 0, 0, 80))
        draw.text(((W - w) / 2, y), line, font=font, fill="white")
        y += line_h

    img.save(out_path, "WEBP", quality=88)
    print(f"wrote {out_path}")


if __name__ == "__main__":
    title, out_path = sys.argv[1], sys.argv[2]
    c1 = sys.argv[3] if len(sys.argv) > 3 else "#0f172a"
    c2 = sys.argv[4] if len(sys.argv) > 4 else "#2563eb"
    make_hero(title, out_path, c1, c2)
