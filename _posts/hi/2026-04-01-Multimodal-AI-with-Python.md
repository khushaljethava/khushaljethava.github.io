---
title: "Python के साथ मल्टीमॉडल AI: टेक्स्ट, इमेज और ऑडियो पर काम करना"
description: Python के साथ मल्टीमॉडल AI एप्लिकेशन बनाना सीखें। यह गाइड OpenAI GPT-4 Vision API, transformers के साथ इमेज कैप्शनिंग, Whisper के साथ ऑडियो ट्रांसक्रिप्शन, मॉडैलिटीज़ को जोड़ना और एक व्यावहारिक मल्टीमॉडल चैटबॉट बनाने को कवर करती है।
date: 2026-04-01 12:00:00 +0800
categories: [Python]
tags: [python, ai, multimodal]
translations: [hi, es, pt]
lang: hi
image:
  path: "/commons/Multimodal AI with Python Working with Text Images and Audio.webp"
  alt: "Python में GPT-4 Vision, transformers और Whisper का उपयोग करके टेक्स्ट, इमेज और ऑडियो प्रोसेसिंग को जोड़ने वाला मल्टीमॉडल AI आर्किटेक्चर"
---

## मल्टीमॉडल AI क्या है?

मल्टीमॉडल AI उन सिस्टम को संदर्भित करता है जो एक ही मॉडल या पाइपलाइन के भीतर कई प्रकार के इनपुट — टेक्स्ट, इमेज, ऑडियो और वीडियो — को प्रोसेस और तर्क कर सकते हैं। प्रत्येक डेटा प्रकार को अलग-अलग मानने के बजाय, मल्टीमॉडल सिस्टम उनके बीच के संबंधों को समझते हैं। एक मल्टीमॉडल मॉडल किसी फोटो को देख सकता है और उसके बारे में प्रश्नों के उत्तर दे सकता है, भाषण को ट्रांसक्राइब कर सकता है और उसकी सामग्री का सारांश दे सकता है, या टेक्स्ट विवरण से इमेज बना सकता है।

व्यावहारिक मूल्य स्पष्ट है: वास्तविक दुनिया का डेटा शायद ही कभी एक ही प्रारूप में आता है। ग्राहक सहायता टिकटों में स्क्रीनशॉट शामिल होते हैं। मेडिकल रिकॉर्ड टेक्स्ट नोट्स को इमेजिंग स्कैन के साथ जोड़ते हैं। सोशल मीडिया पोस्ट टेक्स्ट, फोटो और वीडियो को मिलाते हैं। ऐसे AI सिस्टम बनाना जो इन सभी को एक साथ संभालें, अलग-अलग सिंगल-मॉडैलिटी टूल को जोड़ने की तुलना में बेहतर परिणाम देते हैं।

जब मैंने Codiste में फाइन-ट्यून किए गए transformers का उपयोग करके एक Document AI पाइपलाइन बनाई, तो सबसे बड़ी सटीकता में सुधार OCR टेक्स्ट एक्सट्रैक्शन को डॉक्यूमेंट इमेज से विज़ुअल लेआउट फीचर्स के साथ जोड़ने से आया। प्रत्येक मॉडैलिटी को अलग-अलग मानने से हमें ठीक-ठाक परिणाम मिले, लेकिन उन्हें एक साथ फ्यूज़ करने से जटिल इनवॉइस प्रारूपों पर एक्सट्रैक्शन सटीकता लगभग 82% से बढ़कर 94% से अधिक हो गई।

इस गाइड में, आप Python का उपयोग करके मल्टीमॉडल एप्लिकेशन बनाएंगे। हम GPT-4 Vision के साथ इमेज समझ, Hugging Face transformers के साथ इमेज कैप्शनिंग, Whisper के साथ ऑडियो ट्रांसक्रिप्शन को कवर करेंगे, और अंत में सब कुछ एक कार्यशील मल्टीमॉडल चैटबॉट में बांधेंगे। यदि आप विशिष्ट मल्टीमॉडल कार्यों के लिए मॉडल फाइन-ट्यून करना चाहते हैं, तो हमारी गाइड [Python के साथ LLMs को फाइन-ट्यून करना](/posts/Fine-Tuning-LLMs-with-Python/) देखें।

## अपना एनवायरनमेंट सेट करना

आवश्यक पैकेज इंस्टॉल करके शुरुआत करें:

```python
pip install openai transformers torch torchvision pillow openai-whisper soundfile
```

अपनी OpenAI API key को एक एनवायरनमेंट वेरिएबल के रूप में सेट करें:

```python
import os
os.environ["OPENAI_API_KEY"] = "your-api-key-here"
```

प्रोडक्शन उपयोग के लिए, इसे हार्डकोड करने के बजाय एक `.env` फ़ाइल में स्टोर करें और `python-dotenv` के साथ लोड करें।

## GPT-4 Vision के साथ इमेज समझ

GPT-4 Vision (GPT-4V) टेक्स्ट प्रॉम्प्ट के साथ इमेज स्वीकार करता है। आप इमेज को URLs या base64-एन्कोडेड स्ट्रिंग के रूप में पास कर सकते हैं।

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

लोकल इमेज के लिए, उन्हें base64 के रूप में एन्कोड करें:

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

आप एक ही अनुरोध में कई इमेज भी पास कर सकते हैं:

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

`detail` पैरामीटर नियंत्रित करता है कि मॉडल इमेज को कैसे प्रोसेस करता है। जब बारीक विवरण की आवश्यकता न हो तो तेज़, सस्ते विश्लेषण के लिए `"low"` का उपयोग करें, और जब आपको मॉडल से छोटे टेक्स्ट को पढ़ने या बारीक विशेषताओं की पहचान करने की आवश्यकता हो तो `"high"` का उपयोग करें।

## Hugging Face Transformers के साथ इमेज कैप्शनिंग

ऑफ़लाइन या सेल्फ-होस्टेड इमेज कैप्शनिंग के लिए, Hugging Face से BLIP-2 मॉडल का उपयोग करें:

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

आप एक टेक्स्ट प्रॉम्प्ट प्रदान करके कंडीशनल कैप्शनिंग भी कर सकते हैं:

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

BLIP लोकल रूप से चलता है, इसलिए यह API लागत के बिना बड़े इमेज डेटासेट के बैच प्रोसेसिंग के लिए अच्छी तरह काम करता है। आप इमेज कैप्शनिंग को एक [RAG सिस्टम](/posts/RAG-with-Python-Retrieval-Augmented-Generation/) के साथ जोड़कर जेनरेट किए गए कैप्शन को टेक्स्ट एम्बेडिंग के रूप में उपयोग करते हुए खोजे जाने योग्य इमेज डेटाबेस बना सकते हैं।

इमेज सेगमेंटेशन कार्यों के लिए ControlNet के साथ काम करने के मेरे अनुभव में, मैंने पाया कि BLIP जैसे लोकल कैप्शनिंग मॉडल बड़े पैमाने पर ट्रेनिंग डेटा एनोटेशन जेनरेट करने के लिए अमूल्य हैं। हमने Codiste में इस दृष्टिकोण का उपयोग हजारों इमेज को ऑटो-लेबल करने के लिए किया, इससे पहले कि मानव समीक्षक उन्हें परिष्कृत करते, जिससे हमारा एनोटेशन समय लगभग 60% कम हो गया।

## Whisper के साथ ऑडियो ट्रांसक्रिप्शन

OpenAI का Whisper मॉडल ऑडियो को टेक्स्ट में ट्रांसक्राइब करता है। आप इसे `openai-whisper` पैकेज के माध्यम से लोकल रूप से या API के माध्यम से उपयोग कर सकते हैं।

### लोकल Whisper

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

### OpenAI API के माध्यम से Whisper

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

लंबी ऑडियो फ़ाइलों के लिए, पहले उन्हें चंक्स में विभाजित करें:

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

## मॉडैलिटीज़ को जोड़ना

मल्टीमॉडल AI की असली शक्ति विभिन्न डेटा प्रकारों को जोड़ने से आती है। यहाँ एक पाइपलाइन है जो फ्रेम और ऑडियो निकालकर एक वीडियो को प्रोसेस करती है, फिर विश्लेषण को जोड़ती है:

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

## एक मल्टीमॉडल चैटबॉट बनाना

अब आइए सब कुछ एक चैटबॉट में जोड़ें जो किसी बातचीत में टेक्स्ट, इमेज और ऑडियो को संभाल सके:

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

## स्ट्रक्चर्ड आउटपुट पार्सिंग जोड़ना

मल्टीमॉडल AI के ऊपर एप्लिकेशन बनाते समय, आपको अक्सर फ्री-फॉर्म टेक्स्ट के बजाय स्ट्रक्चर्ड डेटा की आवश्यकता होती है। API के साथ Pydantic मॉडल का उपयोग करें:

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

## प्रदर्शन और लागत संबंधी विचार

प्रोडक्शन मल्टीमॉडल एप्लिकेशन के लिए कुछ व्यावहारिक टिप्पणियाँ:

**इमेज रिज़ॉल्यूशन मायने रखता है।** GPT-4 Vision API इमेज के आकार के आधार पर शुल्क लेता है। बड़ी इमेज भेजने से पहले उन्हें रीसाइज़ करें। अधिकांश कार्यों के लिए, 1024x1024 पिक्सेल पर्याप्त है:

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

**ट्रांसक्रिप्शन को कैश करें।** ऑडियो ट्रांसक्रिप्शन धीमा होता है। पुनः-प्रोसेसिंग से बचने के लिए परिणामों को कैश करें:

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

**बैच प्रोसेसिंग।** कई इमेज का विश्लेषण करते समय, थ्रूपुट बढ़ाने के लिए async अनुरोधों का उपयोग करें:

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

## सारांश

Python के साथ मल्टीमॉडल AI तीन क्षमताओं तक सिमट जाता है: इमेज को समझना, ऑडियो को ट्रांसक्राइब करना, और इन्हें टेक्स्ट-आधारित तर्क के साथ जोड़ना। OpenAI API GPT-4 Vision के माध्यम से पहली और तीसरी क्षमता को संभालता है। Whisper ऑडियो ट्रांसक्रिप्शन को या तो लोकल रूप से या API के माध्यम से संभालता है। Hugging Face transformers इमेज समझ के लिए लोकल विकल्प प्रदान करते हैं।

याद रखने योग्य प्रमुख पैटर्न:

- APIs को भेजने से पहले लोकल इमेज को base64 के रूप में एन्कोड करें
- विश्वसनीय ट्रांसक्रिप्शन के लिए लंबी ऑडियो फ़ाइलों को चंक्स में विभाजित करें
- ट्रांसक्रिप्शन और इमेज विश्लेषण जैसे महंगे ऑपरेशन को कैश करें
- जब आपको मशीन-पठनीय परिणामों की आवश्यकता हो तो स्ट्रक्चर्ड आउटपुट पार्सिंग का उपयोग करें
- लागत को नियंत्रित करने के लिए API कॉल से पहले इमेज को रीसाइज़ करें
- बैच प्रोसेसिंग के लिए async अनुरोधों का उपयोग करें

ये बिल्डिंग ब्लॉक वीडियो समराइज़र, मल्टीमॉडल चैटबॉट, मिश्रित मीडिया को संभालने वाले डॉक्यूमेंट एनालाइज़र, और विज़ुअल सामग्री का वर्णन करने वाले एक्सेसिबिलिटी टूल जैसे एप्लिकेशन में संयोजित होते हैं। विज़न मॉडल को फाइन-ट्यून करने के बारे में गहराई से जानने के लिए, हमारी गाइड [Python के साथ LLMs को फाइन-ट्यून करना](/posts/Fine-Tuning-LLMs-with-Python/) देखें। ऊपर दिए गए चैटबॉट उदाहरण से शुरुआत करें और इसे अपने विशिष्ट उपयोग के मामले के अनुसार विस्तारित करें।

---

## संबंधित पोस्ट

- [Python के साथ बड़े भाषा मॉडल को फाइन-ट्यून करना](/posts/Fine-Tuning-LLMs-with-Python/) - डोमेन-विशिष्ट मल्टीमॉडल कार्यों के लिए मॉडल फाइन-ट्यून करें
- [Python के साथ RAG: रिट्रीवल-ऑगमेंटेड जेनरेशन](/posts/RAG-with-Python-Retrieval-Augmented-Generation/) - इमेज कैप्शन और ट्रांसक्रिप्ट को रिट्रीवल-ऑगमेंटेड जेनरेशन के साथ जोड़ें
- [Python के साथ Explainable AI](/posts/Explainable-AI-with-Python-SHAP-LIME/) - अपने मल्टीमॉडल मॉडल पूर्वानुमानों की व्याख्या और स्पष्टीकरण करें
