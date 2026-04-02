---
title: "Multimodal AI with Python: Working with Text, Images, and Audio"
description: Learn how to build multimodal AI applications with Python. This guide covers OpenAI GPT-4 Vision API, image captioning with transformers, audio transcription with Whisper, combining modalities, and building a practical multimodal chatbot.
date: 2026-04-01 12:00:00 +0800
categories: [Python]
tags: [python, ai, multimodal]
image:
  path: "/commons/Multimodal AI with Python Working with Text Images and Audio.webp"
  alt: "Multimodal AI architecture combining text, image, and audio processing using GPT-4 Vision, transformers, and Whisper in Python"
---

## What Is Multimodal AI?

Multimodal AI refers to systems that can process and reason across multiple types of input — text, images, audio, and video — within a single model or pipeline. Instead of treating each data type in isolation, multimodal systems understand the relationships between them. A multimodal model can look at a photo and answer questions about it, transcribe speech and summarize its content, or generate images from text descriptions.

The practical value is straightforward: real-world data rarely comes in a single format. Customer support tickets include screenshots. Medical records combine text notes with imaging scans. Social media posts mix text, photos, and video. Building AI systems that handle all of these together produces better results than chaining separate single-modality tools.

In this guide, you will build multimodal applications using Python. We will cover image understanding with GPT-4 Vision, image captioning with Hugging Face transformers, audio transcription with Whisper, and finally tie everything together into a working multimodal chatbot. If you want to fine-tune models for specific multimodal tasks, see our guide on [Fine-Tuning LLMs with Python](/posts/Fine-Tuning-LLMs-with-Python/).

## Setting Up Your Environment

Start by installing the required packages:

```python
pip install openai transformers torch torchvision pillow openai-whisper soundfile
```

Set up your OpenAI API key as an environment variable:

```python
import os
os.environ["OPENAI_API_KEY"] = "your-api-key-here"
```

For production use, store this in a `.env` file and load it with `python-dotenv` instead of hardcoding it.

## Image Understanding with GPT-4 Vision

GPT-4 Vision (GPT-4V) accepts images alongside text prompts. You can pass images as URLs or base64-encoded strings.

```python
import openai
import base64
from pathlib import Path

client = openai.OpenAI()

def analyze_image_from_url(image_url: str, question: str) -> str:
    """Send an image URL to GPT-4 Vision with a question."""
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": question},
                    {
                        "type": "image_url",
                        "image_url": {"url": image_url},
                    },
                ],
            }
        ],
        max_tokens=1024,
    )
    return response.choices[0].message.content

result = analyze_image_from_url(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
    "What breed of cat is this? Describe its features."
)
print(result)
```

For local images, encode them as base64:

```python
def analyze_local_image(image_path: str, question: str) -> str:
    """Encode a local image and send it to GPT-4 Vision."""
    image_data = Path(image_path).read_bytes()
    base64_image = base64.b64encode(image_data).decode("utf-8")

    # Determine MIME type from extension
    ext = Path(image_path).suffix.lower()
    mime_types = {".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".gif": "image/gif"}
    mime_type = mime_types.get(ext, "image/jpeg")

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": question},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:{mime_type};base64,{base64_image}"
                        },
                    },
                ],
            }
        ],
        max_tokens=1024,
    )
    return response.choices[0].message.content

result = analyze_local_image("./photo.jpg", "Describe what you see in this image.")
print(result)
```

You can also pass multiple images in a single request:

```python
def compare_images(image_url_1: str, image_url_2: str, question: str) -> str:
    """Compare two images using GPT-4 Vision."""
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": question},
                    {"type": "image_url", "image_url": {"url": image_url_1}},
                    {"type": "image_url", "image_url": {"url": image_url_2}},
                ],
            }
        ],
        max_tokens=1024,
    )
    return response.choices[0].message.content

result = compare_images(
    "https://example.com/before.jpg",
    "https://example.com/after.jpg",
    "What are the differences between these two images?"
)
print(result)
```

The `detail` parameter controls how the model processes the image. Use `"low"` for faster, cheaper analysis when fine detail is not needed, and `"high"` when you need the model to read small text or identify fine-grained features.

## Image Captioning with Hugging Face Transformers

For offline or self-hosted image captioning, use the BLIP-2 model from Hugging Face:

```python
from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import requests

processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-large")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-large")

def caption_image(image_source: str) -> str:
    """Generate a caption for an image from a URL or local path."""
    if image_source.startswith("http"):
        raw_image = Image.open(requests.get(image_source, stream=True).raw).convert("RGB")
    else:
        raw_image = Image.open(image_source).convert("RGB")

    # Unconditional captioning
    inputs = processor(raw_image, return_tensors="pt")
    output = model.generate(**inputs, max_new_tokens=50)
    caption = processor.decode(output[0], skip_special_tokens=True)
    return caption

url = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/300px-PNG_transparency_demonstration_1.png"
print(caption_image(url))
```

You can also do conditional captioning by providing a text prompt:

```python
def conditional_caption(image_source: str, prompt: str) -> str:
    """Generate a caption conditioned on a text prompt."""
    if image_source.startswith("http"):
        raw_image = Image.open(requests.get(image_source, stream=True).raw).convert("RGB")
    else:
        raw_image = Image.open(image_source).convert("RGB")

    inputs = processor(raw_image, prompt, return_tensors="pt")
    output = model.generate(**inputs, max_new_tokens=50)
    caption = processor.decode(output[0], skip_special_tokens=True)
    return caption

print(conditional_caption(url, "a photo of"))
```

BLIP runs locally, so it works well for batch processing large image datasets without API costs. You can combine image captioning with a [RAG system](/posts/RAG-with-Python-Retrieval-Augmented-Generation/) to build searchable image databases using generated captions as text embeddings.

## Audio Transcription with Whisper

OpenAI's Whisper model transcribes audio to text. You can use it locally through the `openai-whisper` package or through the API.

### Local Whisper

```python
import whisper

model = whisper.load_model("base")  # Options: tiny, base, small, medium, large

def transcribe_audio(audio_path: str) -> dict:
    """Transcribe an audio file using local Whisper model."""
    result = model.transcribe(audio_path)
    return {
        "text": result["text"],
        "language": result["language"],
        "segments": [
            {
                "start": seg["start"],
                "end": seg["end"],
                "text": seg["text"],
            }
            for seg in result["segments"]
        ],
    }

transcript = transcribe_audio("meeting_recording.mp3")
print(f"Language: {transcript['language']}")
print(f"Full text: {transcript['text']}")
for seg in transcript["segments"][:5]:
    print(f"[{seg['start']:.1f}s - {seg['end']:.1f}s] {seg['text']}")
```

### Whisper via OpenAI API

```python
from openai import OpenAI

client = OpenAI()

def transcribe_via_api(audio_path: str) -> str:
    """Transcribe audio using OpenAI's Whisper API."""
    with open(audio_path, "rb") as audio_file:
        transcript = client.audio.transcriptions.create(
            model="whisper-1",
            file=audio_file,
            response_format="text"
        )
    return transcript

text = transcribe_via_api("interview.mp3")
print(text)
```

For longer audio files, split them into chunks first:

```python
from pydub import AudioSegment
import tempfile
import os

def transcribe_long_audio(audio_path: str, chunk_length_ms: int = 600000) -> str:
    """Transcribe long audio files by splitting into chunks."""
    audio = AudioSegment.from_file(audio_path)
    chunks = [audio[i:i + chunk_length_ms] for i in range(0, len(audio), chunk_length_ms)]

    full_transcript = []
    for i, chunk in enumerate(chunks):
        with tempfile.NamedTemporaryFile(suffix=".mp3", delete=False) as tmp:
            chunk.export(tmp.name, format="mp3")
            transcript = transcribe_via_api(tmp.name)
            full_transcript.append(transcript)
            os.unlink(tmp.name)
        print(f"Chunk {i + 1}/{len(chunks)} transcribed.")

    return " ".join(full_transcript)

full_text = transcribe_long_audio("long_podcast.mp3")
print(full_text)
```

## Combining Modalities

The real power of multimodal AI comes from combining different data types. Here is a pipeline that processes a video by extracting frames and audio, then combines the analysis:

```python
import cv2
import tempfile
import os
from pathlib import Path

def extract_frames(video_path: str, interval_seconds: int = 10) -> list[str]:
    """Extract frames from a video at regular intervals."""
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    frame_interval = int(fps * interval_seconds)
    frame_paths = []
    frame_count = 0

    tmp_dir = tempfile.mkdtemp()

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        if frame_count % frame_interval == 0:
            frame_path = os.path.join(tmp_dir, f"frame_{frame_count}.jpg")
            cv2.imwrite(frame_path, frame)
            frame_paths.append(frame_path)
        frame_count += 1

    cap.release()
    return frame_paths

def extract_audio(video_path: str) -> str:
    """Extract audio track from a video file."""
    from pydub import AudioSegment
    audio = AudioSegment.from_file(video_path)
    audio_path = video_path.rsplit(".", 1)[0] + ".mp3"
    audio.export(audio_path, format="mp3")
    return audio_path

def analyze_video(video_path: str) -> dict:
    """Full multimodal analysis of a video file."""
    # Extract and transcribe audio
    audio_path = extract_audio(video_path)
    transcript = transcribe_audio(audio_path)

    # Extract and caption key frames
    frame_paths = extract_frames(video_path, interval_seconds=30)
    frame_descriptions = []
    for fp in frame_paths:
        desc = analyze_local_image(fp, "Describe what is happening in this video frame.")
        frame_descriptions.append(desc)

    # Combine everything into a summary prompt
    combined_prompt = f"""Based on the following video analysis, provide a comprehensive summary.

Audio transcript: {transcript['text']}

Visual descriptions of key frames:
{chr(10).join(f'- Frame {i+1}: {desc}' for i, desc in enumerate(frame_descriptions))}

Provide a structured summary covering: main topics discussed, visual content shown, and key takeaways."""

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": combined_prompt}],
        max_tokens=2048,
    )

    return {
        "transcript": transcript["text"],
        "frame_descriptions": frame_descriptions,
        "summary": response.choices[0].message.content,
    }

result = analyze_video("presentation.mp4")
print(result["summary"])
```

## Building a Multimodal Chatbot

Now let us combine everything into a chatbot that can handle text, images, and audio in a conversation:

```python
import openai
import base64
import whisper
from pathlib import Path

class MultimodalChatbot:
    def __init__(self, system_prompt: str = "You are a helpful assistant that can analyze text, images, and audio."):
        self.client = openai.OpenAI()
        self.whisper_model = whisper.load_model("base")
        self.conversation_history = [
            {"role": "system", "content": system_prompt}
        ]

    def _encode_image(self, image_path: str) -> str:
        image_data = Path(image_path).read_bytes()
        return base64.b64encode(image_data).decode("utf-8")

    def _transcribe(self, audio_path: str) -> str:
        result = self.whisper_model.transcribe(audio_path)
        return result["text"]

    def send_text(self, text: str) -> str:
        """Send a text message."""
        self.conversation_history.append({"role": "user", "content": text})
        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=self.conversation_history,
            max_tokens=1024,
        )
        reply = response.choices[0].message.content
        self.conversation_history.append({"role": "assistant", "content": reply})
        return reply

    def send_image(self, image_path: str, question: str = "What do you see in this image?") -> str:
        """Send an image with an optional question."""
        base64_img = self._encode_image(image_path)
        ext = Path(image_path).suffix.lower()
        mime = {"jpg": "image/jpeg", "jpeg": "image/jpeg", "png": "image/png"}.get(ext.strip("."), "image/jpeg")

        message = {
            "role": "user",
            "content": [
                {"type": "text", "text": question},
                {"type": "image_url", "image_url": {"url": f"data:{mime};base64,{base64_img}"}},
            ],
        }
        self.conversation_history.append(message)
        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=self.conversation_history,
            max_tokens=1024,
        )
        reply = response.choices[0].message.content
        self.conversation_history.append({"role": "assistant", "content": reply})
        return reply

    def send_audio(self, audio_path: str, question: str = None) -> str:
        """Transcribe audio and send the transcript as a message."""
        transcript = self._transcribe(audio_path)
        prompt = f"I just said the following (transcribed from audio): '{transcript}'"
        if question:
            prompt += f"\n\nAdditional question: {question}"
        return self.send_text(prompt)

    def reset(self):
        """Clear conversation history."""
        self.conversation_history = [self.conversation_history[0]]

# Usage
bot = MultimodalChatbot()

# Text conversation
print(bot.send_text("Hi, I need help identifying some items."))

# Send an image
print(bot.send_image("unknown_plant.jpg", "What plant is this? Is it safe to eat?"))

# Follow up with text referencing the image
print(bot.send_text("Where does this plant typically grow?"))

# Send audio
print(bot.send_audio("voice_note.mp3", "Can you summarize what I just said?"))

# Reset conversation
bot.reset()
```

## Adding Structured Output Parsing

When building applications on top of multimodal AI, you often need structured data rather than free-form text. Use Pydantic models with the API:

```python
from pydantic import BaseModel
from typing import Optional

class ImageAnalysis(BaseModel):
    description: str
    objects_detected: list[str]
    dominant_colors: list[str]
    text_in_image: Optional[str]
    sentiment: str

def structured_image_analysis(image_path: str) -> ImageAnalysis:
    """Get structured analysis of an image."""
    base64_img = base64.b64encode(Path(image_path).read_bytes()).decode("utf-8")

    response = client.beta.chat.completions.parse(
        model="gpt-4o",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Analyze this image. Return a structured analysis with: description, objects detected, dominant colors, any text visible in the image, and overall sentiment.",
                    },
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:image/jpeg;base64,{base64_img}"},
                    },
                ],
            }
        ],
        response_format=ImageAnalysis,
    )
    return response.choices[0].message.parsed

analysis = structured_image_analysis("photo.jpg")
print(f"Description: {analysis.description}")
print(f"Objects: {analysis.objects_detected}")
print(f"Colors: {analysis.dominant_colors}")
print(f"Text found: {analysis.text_in_image}")
print(f"Sentiment: {analysis.sentiment}")
```

## Performance and Cost Considerations

A few practical notes for production multimodal applications:

**Image resolution matters.** The GPT-4 Vision API charges based on image size. Resize large images before sending them. For most tasks, 1024x1024 pixels is sufficient:

```python
from PIL import Image

def resize_for_api(image_path: str, max_size: int = 1024) -> str:
    """Resize image to reduce API costs."""
    img = Image.open(image_path)
    img.thumbnail((max_size, max_size))
    output_path = image_path.rsplit(".", 1)[0] + "_resized.jpg"
    img.save(output_path, "JPEG", quality=85)
    return output_path
```

**Cache transcriptions.** Audio transcription is slow. Cache results to avoid re-processing:

```python
import hashlib
import json

CACHE_DIR = Path("./transcription_cache")
CACHE_DIR.mkdir(exist_ok=True)

def cached_transcribe(audio_path: str) -> str:
    file_hash = hashlib.md5(Path(audio_path).read_bytes()).hexdigest()
    cache_file = CACHE_DIR / f"{file_hash}.json"

    if cache_file.exists():
        return json.loads(cache_file.read_text())["text"]

    result = whisper.load_model("base").transcribe(audio_path)
    cache_file.write_text(json.dumps({"text": result["text"]}))
    return result["text"]
```

**Batch processing.** When analyzing many images, use async requests to improve throughput:

```python
import asyncio
from openai import AsyncOpenAI

async_client = AsyncOpenAI()

async def analyze_batch(image_paths: list[str], question: str) -> list[str]:
    """Analyze multiple images concurrently."""
    async def analyze_one(path):
        base64_img = base64.b64encode(Path(path).read_bytes()).decode("utf-8")
        response = await async_client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": question},
                        {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{base64_img}"}},
                    ],
                }
            ],
            max_tokens=512,
        )
        return response.choices[0].message.content

    tasks = [analyze_one(p) for p in image_paths]
    return await asyncio.gather(*tasks)

results = asyncio.run(analyze_batch(["img1.jpg", "img2.jpg", "img3.jpg"], "Describe this image."))
for r in results:
    print(r)
```

## Summary

Multimodal AI with Python boils down to three capabilities: understanding images, transcribing audio, and combining these with text-based reasoning. The OpenAI API handles the first and third through GPT-4 Vision. Whisper handles audio transcription either locally or via API. Hugging Face transformers provide local alternatives for image understanding.

The key patterns to remember:

- Encode local images as base64 before sending to APIs
- Split long audio files into chunks for reliable transcription
- Cache expensive operations like transcription and image analysis
- Use structured output parsing when you need machine-readable results
- Resize images before API calls to control costs
- Use async requests for batch processing

These building blocks combine into applications like video summarizers, multimodal chatbots, document analyzers that handle mixed media, and accessibility tools that describe visual content. For a deeper dive into fine-tuning vision models, see our guide on [Fine-Tuning LLMs with Python](/posts/Fine-Tuning-LLMs-with-Python/). Start with the chatbot example above and extend it to fit your specific use case.

---

## Related Posts

- [Fine-Tuning Large Language Models with Python](/posts/Fine-Tuning-LLMs-with-Python/) - Fine-tune models for domain-specific multimodal tasks
- [RAG with Python: Retrieval-Augmented Generation](/posts/RAG-with-Python-Retrieval-Augmented-Generation/) - Combine image captions and transcripts with retrieval-augmented generation
- [Explainable AI with Python](/posts/Explainable-AI-with-Python-SHAP-LIME/) - Interpret and explain your multimodal model predictions
