---
title: "Edge AI with Python: Running Machine Learning on Edge Devices"
description: Learn how to deploy machine learning models on edge devices with Python using TensorFlow Lite, ONNX Runtime, and model quantization. Covers Raspberry Pi deployment, optimization techniques, and real-time inference.
date: 2026-04-07 12:00:00 +0800
categories: [Python]
tags: [python, ai, edge-ai, iot]
image:
  path: "/commons/Edge AI with Python Running Machine Learning on Edge Devices.webp"
  alt: "Edge AI deployment pipeline showing TensorFlow Lite and ONNX Runtime model optimization for Raspberry Pi and IoT devices"
---

## What Is Edge AI?

Edge AI runs machine learning models directly on devices like Raspberry Pi, smartphones, and IoT sensors instead of sending data to a cloud server. The benefits: lower latency, offline capability, and data privacy.

```python
# Cloud inference: 200-500ms round trip
response = requests.post("https://api.example.com/predict", json=data)

# Edge inference: 10-50ms locally
prediction = local_model.predict(data)
```

The tradeoff is model size. A 7B parameter model won't fit on a Raspberry Pi. Edge AI is about making smaller models that run fast on limited hardware. For example, running [object detection with YOLO](/posts/Object-Detection-with-Python-YOLO/) in real time requires careful model optimization for edge deployment.

When I deployed a YOLO-based barcode detection model to warehouse scanning devices at Codiste, edge inference was the only viable option — the devices had intermittent network connectivity and needed sub-100ms response times. Converting from a full YOLOv8s to a quantized TFLite model reduced our model size from 22MB to under 6MB while keeping detection accuracy above 95%.

## Installation

```bash
pip install tensorflow tflite-runtime onnxruntime numpy pillow
```

## Converting Models to TensorFlow Lite

TensorFlow Lite is Google's framework for mobile and edge deployment.

### Basic Conversion

```python
import tensorflow as tf
import numpy as np

# Train a simple model
model = tf.keras.Sequential([
    tf.keras.layers.Dense(128, activation="relu", input_shape=(10,)),
    tf.keras.layers.Dense(64, activation="relu"),
    tf.keras.layers.Dense(3, activation="softmax")
])
model.compile(optimizer="adam", loss="sparse_categorical_crossentropy")

# Generate dummy training data
X_train = np.random.randn(1000, 10).astype(np.float32)
y_train = np.random.randint(0, 3, 1000)
model.fit(X_train, y_train, epochs=5, verbose=0)

# Convert to TFLite
converter = tf.lite.TFLiteConverter.from_keras_model(model)
tflite_model = converter.convert()

# Save
with open("model.tflite", "wb") as f:
    f.write(tflite_model)

print(f"Original model: {model.count_params()} parameters")
print(f"TFLite model size: {len(tflite_model) / 1024:.1f} KB")
```

### Running TFLite Inference

```python
import numpy as np
import tflite_runtime.interpreter as tflite

# Load model
interpreter = tflite.Interpreter(model_path="model.tflite")
interpreter.allocate_tensors()

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Prepare input
input_data = np.random.randn(1, 10).astype(np.float32)
interpreter.set_tensor(input_details[0]["index"], input_data)

# Run inference
interpreter.invoke()

# Get output
output = interpreter.get_tensor(output_details[0]["index"])
predicted_class = np.argmax(output[0])
confidence = output[0][predicted_class]
print(f"Predicted class: {predicted_class}, Confidence: {confidence:.4f}")
```

## Model Quantization

Quantization reduces model size and speeds up inference by converting 32-bit floats to 8-bit integers.

### Post-Training Quantization

```python
import tensorflow as tf
import numpy as np

# Load your trained Keras model
model = tf.keras.models.load_model("my_model.h5")

# Dynamic range quantization (simplest)
converter = tf.lite.TFLiteConverter.from_keras_model(model)
converter.optimizations = [tf.lite.Optimize.DEFAULT]
quantized_model = converter.convert()

with open("model_quantized.tflite", "wb") as f:
    f.write(quantized_model)

# Full integer quantization (smallest, fastest)
def representative_dataset():
    for _ in range(100):
        yield [np.random.randn(1, 10).astype(np.float32)]

converter = tf.lite.TFLiteConverter.from_keras_model(model)
converter.optimizations = [tf.lite.Optimize.DEFAULT]
converter.representative_dataset = representative_dataset
converter.target_spec.supported_ops = [tf.lite.OpsSet.TFLITE_BUILTINS_INT8]
converter.inference_input_type = tf.int8
converter.inference_output_type = tf.int8

int8_model = converter.convert()

with open("model_int8.tflite", "wb") as f:
    f.write(int8_model)
```

Size comparison:

```python
import os

sizes = {
    "Original (.h5)": os.path.getsize("my_model.h5"),
    "TFLite (float32)": os.path.getsize("model.tflite"),
    "TFLite (dynamic)": os.path.getsize("model_quantized.tflite"),
    "TFLite (int8)": os.path.getsize("model_int8.tflite"),
}

for name, size in sizes.items():
    print(f"{name}: {size / 1024:.1f} KB")
```

Typical reduction: float32 → int8 gives a 4x size reduction and 2-3x speedup with minimal accuracy loss (usually < 1%). These quantization techniques are also relevant when [fine-tuning LLMs](/posts/Fine-Tuning-LLMs-with-Python/) for deployment on consumer hardware.

A lesson I learned from deploying quantized models in production is to always validate accuracy on your specific dataset after quantization, not just on a generic benchmark. We once shipped an int8 model for image segmentation that performed great on standard test images but failed on low-contrast inputs that were common in our client's environment. Adding those edge cases to the representative calibration dataset fixed the issue entirely.

## ONNX Runtime

ONNX (Open Neural Network Exchange) works across frameworks — convert from PyTorch, TensorFlow, or scikit-learn.

### Converting a scikit-learn Model

```python
from sklearn.ensemble import RandomForestClassifier
from skl2onnx import convert_sklearn
from skl2onnx.common.data_types import FloatTensorType
import numpy as np

# Train model
X_train = np.random.randn(500, 4).astype(np.float32)
y_train = (X_train[:, 0] > 0).astype(int)
clf = RandomForestClassifier(n_estimators=100)
clf.fit(X_train, y_train)

# Convert to ONNX
initial_type = [("input", FloatTensorType([None, 4]))]
onnx_model = convert_sklearn(clf, initial_types=initial_type)

with open("model.onnx", "wb") as f:
    f.write(onnx_model.SerializeToString())
```

### Running ONNX Inference

```python
import onnxruntime as ort
import numpy as np

session = ort.InferenceSession("model.onnx")

input_name = session.get_inputs()[0].name
input_data = np.random.randn(1, 4).astype(np.float32)

results = session.run(None, {input_name: input_data})
prediction = results[0][0]
probabilities = results[1][0]

print(f"Prediction: {prediction}")
print(f"Probabilities: {probabilities}")
```

### Converting a PyTorch Model

```python
import torch
import torch.nn as nn

class SimpleNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(10, 64)
        self.fc2 = nn.Linear(64, 3)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        return self.fc2(x)

model = SimpleNet()
model.eval()

dummy_input = torch.randn(1, 10)
torch.onnx.export(
    model, dummy_input, "pytorch_model.onnx",
    input_names=["input"],
    output_names=["output"],
    dynamic_axes={"input": {0: "batch"}, "output": {0: "batch"}}
)
```

## Deploying on Raspberry Pi

### Image Classification on Pi

```python
import tflite_runtime.interpreter as tflite
from PIL import Image
import numpy as np
import time

# Load MobileNet V2 (optimized for edge)
interpreter = tflite.Interpreter(model_path="mobilenet_v2.tflite")
interpreter.allocate_tensors()

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

def classify_image(image_path: str) -> tuple[int, float]:
    # Preprocess
    img = Image.open(image_path).resize((224, 224))
    input_data = np.expand_dims(np.array(img, dtype=np.float32) / 255.0, axis=0)

    # Inference
    start = time.time()
    interpreter.set_tensor(input_details[0]["index"], input_data)
    interpreter.invoke()
    latency = (time.time() - start) * 1000

    output = interpreter.get_tensor(output_details[0]["index"])
    class_id = np.argmax(output[0])
    confidence = output[0][class_id]

    return class_id, confidence, latency

class_id, conf, ms = classify_image("test_photo.jpg")
print(f"Class: {class_id}, Confidence: {conf:.2%}, Latency: {ms:.1f}ms")
```

### Real-Time Camera Inference

```python
import cv2
import tflite_runtime.interpreter as tflite
import numpy as np

interpreter = tflite.Interpreter(model_path="mobilenet_v2.tflite")
interpreter.allocate_tensors()

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Preprocess
    img = cv2.resize(frame, (224, 224))
    input_data = np.expand_dims(img.astype(np.float32) / 255.0, axis=0)

    # Inference
    interpreter.set_tensor(input_details[0]["index"], input_data)
    interpreter.invoke()
    output = interpreter.get_tensor(output_details[0]["index"])

    class_id = np.argmax(output[0])
    confidence = output[0][class_id]

    # Display
    cv2.putText(frame, f"Class {class_id}: {confidence:.2%}",
                (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    cv2.imshow("Edge AI", frame)

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()
```

## Performance Benchmarking

```python
import time
import numpy as np

def benchmark_model(interpreter, input_shape, num_runs=100):
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    latencies = []
    for _ in range(num_runs):
        input_data = np.random.randn(*input_shape).astype(np.float32)
        interpreter.set_tensor(input_details[0]["index"], input_data)

        start = time.perf_counter()
        interpreter.invoke()
        latencies.append((time.perf_counter() - start) * 1000)

    return {
        "mean_ms": np.mean(latencies),
        "median_ms": np.median(latencies),
        "p95_ms": np.percentile(latencies, 95),
        "p99_ms": np.percentile(latencies, 99),
    }

results = benchmark_model(interpreter, (1, 224, 224, 3))
print(f"Mean: {results['mean_ms']:.1f}ms")
print(f"P95: {results['p95_ms']:.1f}ms")
print(f"P99: {results['p99_ms']:.1f}ms")
```

## Key Takeaways

- TensorFlow Lite and ONNX Runtime are the two main edge inference frameworks
- Quantization (float32 → int8) gives 4x size reduction and 2-3x speedup
- MobileNet and EfficientNet are designed for edge devices — use them instead of ResNet
- Always benchmark on your target hardware — laptop performance doesn't predict Pi performance
- ONNX is framework-agnostic: convert from PyTorch, TensorFlow, or scikit-learn
- Start with dynamic range quantization, move to full int8 if you need more speed
- Real-time camera inference at 10-30 FPS is achievable on Raspberry Pi 4 with quantized models
- For production edge deployments, set up [MLOps pipelines](/posts/MLOps-with-Python-Production-ML-Pipelines/) to manage model versioning and over-the-air updates

## Related Posts

- [Object Detection with Python and YOLO](/posts/Object-Detection-with-Python-YOLO/) -- Train and deploy real-time object detection models optimized for edge hardware.
- [Fine-Tuning LLMs with Python](/posts/Fine-Tuning-LLMs-with-Python/) -- Apply quantization and distillation techniques to shrink models for edge deployment.
- [MLOps with Python: Production ML Pipelines](/posts/MLOps-with-Python-Production-ML-Pipelines/) -- Manage model lifecycle, versioning, and monitoring for edge AI systems.
