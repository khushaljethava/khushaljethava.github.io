"""Generate blog header images for all 15 posts."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math
import os
import random

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "commons")
WIDTH, HEIGHT = 1200, 630

# Post data: (filename, title, icon_elements)
POSTS = [
    ("Building AI Agents with Python A Complete Guide.png",
     "Building AI Agents\nwith Python",
     "agent"),
    ("RAG with Python Build a Retrieval-Augmented Generation System.png",
     "RAG with Python",
     "rag"),
    ("AutoML with Python Automate Your Machine Learning Pipeline.png",
     "AutoML with Python",
     "automl"),
    ("Fine-Tuning Large Language Models with Python A Practical Guide.png",
     "Fine-Tuning LLMs\nwith Python",
     "finetune"),
    ("Sentiment Analysis with Python From Basics to Production.png",
     "Sentiment Analysis\nwith Python",
     "sentiment"),
    ("Multimodal AI with Python Working with Text Images and Audio.png",
     "Multimodal AI\nwith Python",
     "multimodal"),
    ("MLOps with Python Building Production ML Pipelines.png",
     "MLOps with Python",
     "mlops"),
    ("Object Detection with Python and YOLO A Hands-On Guide.png",
     "Object Detection\nwith YOLO",
     "yolo"),
    ("Python Web Scraping The Complete Guide for 2026.png",
     "Python Web Scraping",
     "scraping"),
    ("Building Recommendation Systems with Python from Scratch.png",
     "Recommendation\nSystems with Python",
     "recsys"),
    ("Time Series Forecasting with Python A Practical Guide.png",
     "Time Series\nForecasting",
     "timeseries"),
    ("Edge AI with Python Running Machine Learning on Edge Devices.png",
     "Edge AI\nwith Python",
     "edge"),
    ("Python Data Visualization with Matplotlib and Seaborn Complete Guide.png",
     "Data Visualization\nMatplotlib & Seaborn",
     "dataviz"),
    ("Fraud Detection with Machine Learning in Python.png",
     "Fraud Detection\nwith ML in Python",
     "fraud"),
    ("Explainable AI with Python Understanding Model Predictions with SHAP and LIME.png",
     "Explainable AI\nSHAP & LIME",
     "xai"),
]

# Color schemes for variety
PALETTES = [
    ((88, 28, 135), (124, 58, 237), (139, 92, 246)),    # Purple
    ((30, 58, 138), (59, 130, 246), (96, 165, 250)),     # Blue
    ((21, 94, 117), (6, 182, 212), (103, 232, 249)),     # Cyan
    ((91, 33, 182), (139, 92, 246), (167, 139, 250)),    # Violet
    ((30, 64, 175), (79, 70, 229), (129, 140, 248)),     # Indigo
]


def create_gradient(width, height, color1, color2, angle=30):
    """Create a gradient background with angle."""
    img = Image.new("RGB", (width, height))
    draw = ImageDraw.Draw(img)
    rad = math.radians(angle)
    cos_a, sin_a = math.cos(rad), math.sin(rad)

    for y in range(height):
        for x in range(0, width, 2):
            t = (x * cos_a + y * sin_a) / (width * cos_a + height * sin_a)
            t = max(0, min(1, t))
            r = int(color1[0] + (color2[0] - color1[0]) * t)
            g = int(color1[1] + (color2[1] - color1[1]) * t)
            b = int(color1[2] + (color2[2] - color1[2]) * t)
            draw.line([(x, y), (x + 1, y)], fill=(r, g, b))
    return img


def draw_decorative_elements(draw, width, height, accent_color, element_type):
    """Draw abstract decorative elements based on post topic."""
    # Common: floating circles/dots
    random.seed(hash(element_type))
    for _ in range(15):
        x = random.randint(0, width)
        y = random.randint(0, height)
        size = random.randint(5, 40)
        alpha_val = random.randint(20, 60)
        r, g, b = accent_color
        draw.ellipse([x, y, x + size, y + size],
                     fill=(min(r + 80, 255), min(g + 80, 255), min(b + 80, 255), alpha_val))

    # Grid pattern (subtle)
    for x in range(0, width, 60):
        draw.line([(x, 0), (x, height)], fill=(*accent_color, 15), width=1)
    for y in range(0, height, 60):
        draw.line([(0, y), (width, y)], fill=(*accent_color, 15), width=1)

    # Topic-specific shapes
    if element_type in ("agent", "automl", "mlops"):
        # Gear-like circles
        for i in range(3):
            cx = width - 200 + i * 60
            cy = 150 + i * 80
            r = 40 + i * 15
            draw.ellipse([cx - r, cy - r, cx + r, cy + r],
                         outline=(*accent_color, 80), width=3)
            draw.ellipse([cx - r + 10, cy - r + 10, cx + r - 10, cy + r - 10],
                         outline=(*accent_color, 50), width=2)

    elif element_type in ("rag", "finetune", "xai"):
        # Connected nodes
        nodes = [(width - 250, 120), (width - 150, 200), (width - 300, 280),
                 (width - 180, 350), (width - 100, 150)]
        for i, (x1, y1) in enumerate(nodes):
            for x2, y2 in nodes[i + 1:]:
                draw.line([(x1, y1), (x2, y2)], fill=(*accent_color, 40), width=2)
        for x, y in nodes:
            draw.ellipse([x - 8, y - 8, x + 8, y + 8], fill=(*accent_color, 120))

    elif element_type in ("sentiment", "dataviz", "timeseries"):
        # Chart-like lines
        points = []
        for i in range(8):
            x = width - 350 + i * 45
            y = 150 + random.randint(-50, 80)
            points.append((x, y))
        for i in range(len(points) - 1):
            draw.line([points[i], points[i + 1]], fill=(*accent_color, 100), width=3)
        for x, y in points:
            draw.ellipse([x - 5, y - 5, x + 5, y + 5], fill=(*accent_color, 150))

    elif element_type in ("yolo", "multimodal", "edge"):
        # Bounding box shapes
        for i in range(3):
            x = width - 320 + i * 80
            y = 100 + i * 60
            w, h = 80 + i * 10, 90 + i * 10
            draw.rectangle([x, y, x + w, y + h],
                           outline=(*accent_color, 80), width=2)

    elif element_type in ("scraping", "recsys", "fraud"):
        # Data flow arrows / blocks
        for i in range(4):
            x = width - 300 + i * 60
            y = 120 + i * 70
            draw.rounded_rectangle([x, y, x + 50, y + 30],
                                   radius=5, outline=(*accent_color, 90), width=2)
            if i < 3:
                draw.line([(x + 50, y + 15), (x + 60, y + 85)],
                          fill=(*accent_color, 60), width=2)


def draw_python_badge(draw, x, y, size=50):
    """Draw a small Python logo indicator."""
    # Simple Python-esque double-circle badge
    draw.rounded_rectangle([x, y, x + size * 2.5, y + size * 0.8],
                           radius=8, fill=(255, 255, 255, 40))
    draw.ellipse([x + 5, y + 5, x + size * 0.8 - 5, y + size * 0.8 - 5],
                 fill=(55, 118, 171, 180))
    draw.ellipse([x + size * 0.6, y + 5, x + size * 1.4, y + size * 0.8 - 5],
                 fill=(255, 212, 59, 180))


def generate_header(filename, title, element_type, palette_idx):
    """Generate a single blog header image."""
    dark, mid, light = PALETTES[palette_idx % len(PALETTES)]

    # Create gradient background
    img = create_gradient(WIDTH, HEIGHT, dark, mid, angle=25 + palette_idx * 5)

    # Convert to RGBA for transparency support
    img = img.convert("RGBA")
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Draw decorative elements
    draw_decorative_elements(draw, WIDTH, HEIGHT, light, element_type)

    # Draw Python badge
    draw_python_badge(draw, 80, HEIGHT - 80)

    # Add bottom dark gradient bar for text readability
    for y in range(HEIGHT - 250, HEIGHT):
        alpha = int(180 * (y - (HEIGHT - 250)) / 250)
        draw.line([(0, y), (WIDTH, y)], fill=(0, 0, 0, alpha))

    # Compose
    img = Image.alpha_composite(img, overlay)

    # Add text
    draw = ImageDraw.Draw(img)

    # Try to use a good font, fall back to default
    try:
        title_font = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 52)
        tag_font = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 20)
    except (IOError, OSError):
        try:
            title_font = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 52)
            tag_font = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 20)
        except (IOError, OSError):
            title_font = ImageFont.load_default()
            tag_font = ImageFont.load_default()

    # Draw title text with shadow
    text_x, text_y = 80, HEIGHT - 200
    lines = title.split("\n")
    for i, line in enumerate(lines):
        y_offset = text_y + i * 62
        # Shadow
        draw.text((text_x + 2, y_offset + 2), line, fill=(0, 0, 0, 180), font=title_font)
        # Main text
        draw.text((text_x, y_offset), line, fill=(255, 255, 255, 240), font=title_font)

    # Draw tag
    tag_y = text_y - 40
    draw.rounded_rectangle([text_x, tag_y, text_x + 90, tag_y + 28],
                           radius=4, fill=(*light, 200))
    draw.text((text_x + 12, tag_y + 3), "PYTHON", fill=(255, 255, 255), font=tag_font)

    # Convert back to RGB for PNG saving
    img = img.convert("RGB")

    filepath = os.path.join(OUTPUT_DIR, filename)
    img.save(filepath, "PNG", quality=95)
    print(f"Created: {filename}")


if __name__ == "__main__":
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    for i, (filename, title, etype) in enumerate(POSTS):
        generate_header(filename, title, etype, i)
    print(f"\nDone! Generated {len(POSTS)} images in {OUTPUT_DIR}")
