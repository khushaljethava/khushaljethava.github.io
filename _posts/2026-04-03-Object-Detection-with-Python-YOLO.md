---
title: "Object Detection with Python and YOLO: A Hands-On Guide"
description: Learn object detection using YOLOv8 with Python. This hands-on guide covers installing ultralytics, running inference on images and video, training custom YOLO models, evaluating performance, and deploying detection models in production.
date: 2026-04-03 12:00:00 +0800
categories: [Python]
tags: [python, computer-vision, yolo]
image:
  path: "/commons/Object Detection with Python and YOLO A Hands-On Guide.png"
  alt: "Object detection pipeline using YOLOv8 with Python showing bounding box predictions on images and video frames"
---

## What Is Object Detection?

Object detection identifies and locates objects within images or video frames. Unlike image classification, which assigns a single label to an entire image, object detection draws bounding boxes around each object and classifies them individually. A single frame might contain three cars, two pedestrians, and a traffic light — object detection finds all of them.

YOLO (You Only Look Once) is the most widely used object detection architecture. It processes the entire image in a single forward pass through the neural network, making it fast enough for real-time applications. YOLOv8, developed by Ultralytics, is the latest iteration with improved accuracy and a clean Python API.

## Installing Ultralytics

```python
pip install ultralytics
```

Verify the installation:

```python
from ultralytics import YOLO
import torch

print(f"Ultralytics installed successfully")
print(f"CUDA available: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"GPU: {torch.cuda.get_device_name(0)}")
```

YOLOv8 comes in multiple sizes. Larger models are more accurate but slower:

| Model   | Parameters | mAP (COCO) | Speed (ms) |
|---------|-----------|------------|------------|
| YOLOv8n | 3.2M      | 37.3       | 1.2        |
| YOLOv8s | 11.2M     | 44.9       | 2.1        |
| YOLOv8m | 25.9M     | 50.2       | 4.7        |
| YOLOv8l | 43.7M     | 52.9       | 7.1        |
| YOLOv8x | 68.2M     | 53.9       | 10.6       |

For most applications, start with YOLOv8s or YOLOv8m as a balance between speed and accuracy.

## Running Inference on Images

Load a pretrained model and run detection on an image:

```python
from ultralytics import YOLO

# Load a pretrained model (downloads automatically on first use)
model = YOLO("yolov8m.pt")

# Run inference on a single image
results = model("street_scene.jpg")

# Process results
for result in results:
    boxes = result.boxes
    for box in boxes:
        # Bounding box coordinates
        x1, y1, x2, y2 = box.xyxy[0].tolist()
        # Confidence score
        confidence = box.conf[0].item()
        # Class ID and name
        class_id = int(box.cls[0].item())
        class_name = model.names[class_id]

        print(f"{class_name}: {confidence:.2f} at [{x1:.0f}, {y1:.0f}, {x2:.0f}, {y2:.0f}]")
```

Save annotated images with bounding boxes drawn:

```python
results = model("street_scene.jpg", save=True)
# Saved to runs/detect/predict/
```

Run detection on multiple images at once:

```python
from pathlib import Path

image_dir = Path("test_images/")
image_files = list(image_dir.glob("*.jpg")) + list(image_dir.glob("*.png"))

results = model(image_files, save=True, conf=0.5)

for result in results:
    print(f"Image: {result.path}")
    print(f"  Detections: {len(result.boxes)}")
    for box in result.boxes:
        class_name = model.names[int(box.cls[0].item())]
        conf = box.conf[0].item()
        print(f"  - {class_name}: {conf:.2f}")
```

## Running Inference on Video

Process video files frame by frame:

```python
from ultralytics import YOLO

model = YOLO("yolov8m.pt")

# Process a video file (saves annotated output automatically)
results = model("traffic.mp4", save=True, stream=True)

for frame_idx, result in enumerate(results):
    detections = []
    for box in result.boxes:
        class_name = model.names[int(box.cls[0].item())]
        confidence = box.conf[0].item()
        detections.append(f"{class_name}:{confidence:.2f}")

    if frame_idx % 30 == 0:  # Print every 30th frame
        print(f"Frame {frame_idx}: {', '.join(detections)}")
```

For real-time webcam detection:

```python
import cv2
from ultralytics import YOLO

model = YOLO("yolov8s.pt")  # Use smaller model for real-time
cap = cv2.VideoCapture(0)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    results = model(frame, verbose=False)
    annotated_frame = results[0].plot()

    cv2.imshow("YOLOv8 Detection", annotated_frame)
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()
```

## Filtering and Counting Detections

Filter detections by class and confidence:

```python
from ultralytics import YOLO
from collections import Counter

model = YOLO("yolov8m.pt")
results = model("parking_lot.jpg")

# Count objects by class
class_counts = Counter()
for box in results[0].boxes:
    class_name = model.names[int(box.cls[0].item())]
    confidence = box.conf[0].item()
    if confidence > 0.5:  # Only count high-confidence detections
        class_counts[class_name] += 1

print("Object counts:")
for name, count in class_counts.most_common():
    print(f"  {name}: {count}")

# Filter to specific classes only
target_classes = ["car", "truck", "bus"]
target_class_ids = [k for k, v in model.names.items() if v in target_classes]

results = model("parking_lot.jpg", classes=target_class_ids)
print(f"Vehicles detected: {len(results[0].boxes)}")
```

## Training a Custom YOLO Model

Pretrained YOLO models detect 80 common object categories from the COCO dataset. For specialized applications — detecting defects on a manufacturing line, identifying specific animal species, or reading custom labels — you need to train on your own data.

### Preparing Your Dataset

YOLO expects data in a specific format. Each image has a corresponding text file with one line per object:

```text
# Format: class_id center_x center_y width height (all normalized 0-1)
0 0.45 0.32 0.12 0.08
1 0.72 0.65 0.15 0.20
```

Organize your dataset like this:

```text
dataset/
├── train/
│   ├── images/
│   │   ├── img001.jpg
│   │   └── img002.jpg
│   └── labels/
│       ├── img001.txt
│       └── img002.txt
├── val/
│   ├── images/
│   └── labels/
└── data.yaml
```

Create the dataset configuration file:

```yaml
# data.yaml
path: ./dataset
train: train/images
val: val/images

names:
  0: hardhat
  1: no_hardhat
  2: vest
  3: no_vest
```

### Writing a Label Conversion Script

If your annotations are in a different format (like COCO JSON), convert them:

```python
import json
from pathlib import Path

def coco_to_yolo(coco_json_path: str, output_dir: str, image_width: int, image_height: int):
    """Convert COCO format annotations to YOLO format."""
    with open(coco_json_path) as f:
        coco = json.load(f)

    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    # Build image ID to filename mapping
    image_map = {img["id"]: img["file_name"] for img in coco["images"]}
    image_sizes = {img["id"]: (img["width"], img["height"]) for img in coco["images"]}

    # Group annotations by image
    annotations_by_image = {}
    for ann in coco["annotations"]:
        img_id = ann["image_id"]
        if img_id not in annotations_by_image:
            annotations_by_image[img_id] = []
        annotations_by_image[img_id].append(ann)

    for img_id, annotations in annotations_by_image.items():
        filename = image_map[img_id]
        w, h = image_sizes[img_id]
        label_file = output_path / (Path(filename).stem + ".txt")

        lines = []
        for ann in annotations:
            bbox = ann["bbox"]  # COCO format: [x, y, width, height] in pixels
            class_id = ann["category_id"]

            # Convert to YOLO format: center_x, center_y, width, height (normalized)
            cx = (bbox[0] + bbox[2] / 2) / w
            cy = (bbox[1] + bbox[3] / 2) / h
            bw = bbox[2] / w
            bh = bbox[3] / h

            lines.append(f"{class_id} {cx:.6f} {cy:.6f} {bw:.6f} {bh:.6f}")

        label_file.write_text("\n".join(lines))

    print(f"Converted {len(annotations_by_image)} images to YOLO format")

coco_to_yolo("annotations.json", "dataset/train/labels", 640, 480)
```

### Training the Model

```python
from ultralytics import YOLO

# Start with a pretrained model for transfer learning
model = YOLO("yolov8m.pt")

# Train on your custom dataset
results = model.train(
    data="dataset/data.yaml",
    epochs=100,
    imgsz=640,
    batch=16,
    patience=20,       # Early stopping patience
    save=True,
    device=0,           # GPU device (use "cpu" if no GPU)
    workers=8,
    name="safety_gear_detector",
    # Augmentation settings
    hsv_h=0.015,
    hsv_s=0.7,
    hsv_v=0.4,
    degrees=10.0,
    translate=0.1,
    scale=0.5,
    flipud=0.0,
    fliplr=0.5,
    mosaic=1.0,
)
```

Training produces results in `runs/detect/safety_gear_detector/` including:

- `weights/best.pt` — Best model weights
- `weights/last.pt` — Final epoch weights
- `results.csv` — Metrics for each epoch
- Confusion matrix, PR curve, and sample predictions

### Using the Trained Model

```python
# Load your custom trained model
model = YOLO("runs/detect/safety_gear_detector/weights/best.pt")

# Run inference
results = model("construction_site.jpg", conf=0.5)

for box in results[0].boxes:
    class_name = model.names[int(box.cls[0].item())]
    conf = box.conf[0].item()
    print(f"{class_name}: {conf:.2f}")
```

## Evaluating Model Performance

Run validation on your test set:

```python
from ultralytics import YOLO

model = YOLO("runs/detect/safety_gear_detector/weights/best.pt")

metrics = model.val(data="dataset/data.yaml")

print(f"mAP50: {metrics.box.map50:.4f}")
print(f"mAP50-95: {metrics.box.map:.4f}")
print(f"Precision: {metrics.box.mp:.4f}")
print(f"Recall: {metrics.box.mr:.4f}")

# Per-class metrics
for i, name in model.names.items():
    print(f"  {name}: mAP50={metrics.box.maps[i]:.4f}")
```

Understanding the key metrics:

- **mAP50** — Mean Average Precision at IoU threshold 0.50. Good for general detection accuracy.
- **mAP50-95** — Average mAP across IoU thresholds from 0.50 to 0.95. Stricter metric that rewards precise bounding boxes.
- **Precision** — Of all detections the model made, what fraction were correct.
- **Recall** — Of all actual objects, what fraction did the model find.

Visualize predictions alongside ground truth:

```python
import cv2
import numpy as np
from pathlib import Path

def visualize_predictions(image_path: str, model, conf_threshold: float = 0.5):
    """Draw predictions on an image with class names and confidence."""
    results = model(image_path, conf=conf_threshold)
    annotated = results[0].plot()

    # Add detection count overlay
    count = len(results[0].boxes)
    cv2.putText(
        annotated, f"Detections: {count}", (10, 30),
        cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2
    )

    output_path = f"annotated_{Path(image_path).name}"
    cv2.imwrite(output_path, annotated)
    return output_path

model = YOLO("runs/detect/safety_gear_detector/weights/best.pt")
visualize_predictions("test_image.jpg", model)
```

## Exporting for Deployment

Export models to optimized formats for production:

```python
from ultralytics import YOLO

model = YOLO("runs/detect/safety_gear_detector/weights/best.pt")

# Export to ONNX (works anywhere, good performance)
model.export(format="onnx", imgsz=640, simplify=True)

# Export to TensorRT (NVIDIA GPUs, fastest inference)
model.export(format="engine", imgsz=640, half=True)

# Export to CoreML (Apple devices)
model.export(format="coreml", imgsz=640)

# Export to TFLite (mobile and edge devices)
model.export(format="tflite", imgsz=640)
```

Run inference with the exported ONNX model:

```python
# Using the ONNX model
onnx_model = YOLO("runs/detect/safety_gear_detector/weights/best.onnx")
results = onnx_model("test_image.jpg")
```

## Building a Detection API

Serve your model as a REST API:

```python
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from ultralytics import YOLO
from PIL import Image
import io
import tempfile

app = FastAPI(title="Object Detection API")
model = YOLO("runs/detect/safety_gear_detector/weights/best.pt")

@app.post("/detect")
async def detect_objects(
    file: UploadFile = File(...),
    confidence: float = 0.5
):
    """Detect objects in an uploaded image."""
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))

    # Save to temp file for YOLO
    with tempfile.NamedTemporaryFile(suffix=".jpg", delete=False) as tmp:
        image.save(tmp.name)
        results = model(tmp.name, conf=confidence)

    detections = []
    for box in results[0].boxes:
        detections.append({
            "class": model.names[int(box.cls[0].item())],
            "confidence": round(box.conf[0].item(), 3),
            "bbox": {
                "x1": round(box.xyxy[0][0].item(), 1),
                "y1": round(box.xyxy[0][1].item(), 1),
                "x2": round(box.xyxy[0][2].item(), 1),
                "y2": round(box.xyxy[0][3].item(), 1),
            }
        })

    return JSONResponse({
        "detections": detections,
        "count": len(detections),
        "image_size": {"width": image.width, "height": image.height}
    })

@app.get("/classes")
def get_classes():
    """List available detection classes."""
    return {"classes": model.names}
```

Test the API:

```python
import requests

with open("test_image.jpg", "rb") as f:
    response = requests.post(
        "http://localhost:8000/detect",
        files={"file": f},
        params={"confidence": 0.5}
    )

data = response.json()
print(f"Found {data['count']} objects:")
for det in data["detections"]:
    print(f"  {det['class']}: {det['confidence']}")
```

## Performance Tips

**Use half precision on GPUs.** FP16 inference is nearly 2x faster with minimal accuracy loss:

```python
model = YOLO("yolov8m.pt")
results = model("image.jpg", half=True)
```

**Batch processing.** Process multiple images together for better GPU utilization:

```python
results = model(["img1.jpg", "img2.jpg", "img3.jpg"], batch=3)
```

**Choose the right model size.** For real-time video on edge devices, use YOLOv8n or YOLOv8s. For batch processing where accuracy matters more than speed, use YOLOv8l or YOLOv8x.

**Resize inputs.** Processing 640x640 images is the default and works well for most cases. Going larger (1280) improves detection of small objects but quadruples compute time.

## Summary

YOLOv8 with the Ultralytics library makes object detection accessible in just a few lines of Python. The key workflow is:

1. Start with a pretrained model for quick results on common objects
2. Prepare a labeled dataset in YOLO format for custom detection tasks
3. Fine-tune using transfer learning from a pretrained checkpoint
4. Evaluate with mAP, precision, and recall metrics
5. Export to ONNX, TensorRT, or TFLite for production deployment
6. Serve behind an API for integration with other systems

The pretrained COCO models handle 80 object categories out of the box. For anything else, you need a few hundred labeled images and a few hours of training time to get a working custom detector.
