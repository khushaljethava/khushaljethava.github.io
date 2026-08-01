---
title: "Мультимодальный ИИ на Python: работа с текстом, изображениями и аудио"
description: Узнайте, как создавать мультимодальные приложения ИИ на Python. В этом руководстве рассматриваются API OpenAI GPT-4 Vision, описание изображений с помощью transformers, транскрипция аудио с помощью Whisper, объединение модальностей и создание практичного мультимодального чат-бота.
date: 2026-04-01 12:00:00 +0800
categories: [Python]
tags: [python, ai, multimodal]
translations: [hi, es, pt, ru]
lang: ru
image:
  path: "/commons/Multimodal AI with Python Working with Text Images and Audio.webp"
  alt: "Архитектура мультимодального ИИ, объединяющая обработку текста, изображений и аудио с использованием GPT-4 Vision, transformers и Whisper на Python"
---

## Что такое мультимодальный ИИ?

Мультимодальный ИИ — это системы, способные обрабатывать несколько типов входных данных — текст, изображения, аудио и видео — в рамках единой модели или конвейера и рассуждать на их основе. Вместо того чтобы рассматривать каждый тип данных изолированно, мультимодальные системы понимают связи между ними. Мультимодальная модель может посмотреть на фотографию и ответить на вопросы о ней, транскрибировать речь и обобщить её содержание или сгенерировать изображение по текстовому описанию.

Практическая ценность здесь очевидна: реальные данные редко приходят в одном формате. Тикеты службы поддержки содержат скриншоты. Медицинские записи сочетают текстовые заметки со снимками. Посты в соцсетях смешивают текст, фотографии и видео. Создание ИИ-систем, которые обрабатывают всё это вместе, даёт лучшие результаты, чем связывание отдельных однотипных инструментов.

Когда я создавал конвейер Document AI в Codiste с использованием дообученных transformers, наибольший прирост точности дало объединение извлечения текста через OCR с визуальными признаками макета документа на изображениях. Обработка каждой модальности по отдельности давала приемлемые результаты, но их совместное слияние подняло точность извлечения данных с примерно 82% до более чем 94% на сложных форматах счетов-фактур.

В этом руководстве вы создадите мультимодальные приложения на Python. Мы разберём понимание изображений с помощью GPT-4 Vision, описание изображений с помощью transformers от Hugging Face, транскрипцию аудио с помощью Whisper, а в конце объединим всё это в работающего мультимодального чат-бота. Если вы хотите дообучить модели для конкретных мультимодальных задач, смотрите наше руководство [Дообучение LLM на Python](/posts/Fine-Tuning-LLMs-with-Python/).

## Настройка окружения

Начните с установки необходимых пакетов:

```python
pip install openai transformers torch torchvision pillow openai-whisper soundfile
```

Задайте ваш API-ключ OpenAI как переменную окружения:

```python
import os
os.environ["OPENAI_API_KEY"] = "your-api-key-here"
```

Для промышленного использования храните ключ в файле `.env` и загружайте его через `python-dotenv`, а не прописывайте его прямо в коде.

## Понимание изображений с GPT-4 Vision

GPT-4 Vision (GPT-4V) принимает изображения вместе с текстовыми запросами. Изображения можно передавать в виде URL-адресов или строк в кодировке base64.

Код в этом разделе ориентирован на модель `gpt-4o` — мультимодальную модель OpenAI, обрабатывающую текст, изображения и аудио. Тот же формат запроса без изменений работает и на более новых моделях: достаточно заменить строку `model` на `gpt-5` или любую другую мультимодальную модель, к которой у вас есть доступ, а формат сообщений, блоки содержимого `image_url` и разбор ответа остаются прежними. В этом и заключается смысл интерфейса Chat Completions: поддержка модальностей — это свойство названной модели, а не написанного вами кода.

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

Для локальных изображений закодируйте их в base64:

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

Можно также передать несколько изображений в одном запросе:

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

Параметр `detail` определяет, как модель обрабатывает изображение. Используйте `"low"` для более быстрого и дешёвого анализа, когда мелкие детали не важны, и `"high"`, когда модели нужно прочитать мелкий текст или распознать тонкие детали.

## Описание изображений с помощью Hugging Face Transformers

Для офлайн-генерации подписей к изображениям или размещения на собственном сервере используйте модель BLIP-2 от Hugging Face:

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

Можно также выполнить условное описание, задав текстовую подсказку:

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

BLIP работает локально, поэтому он хорошо подходит для пакетной обработки больших наборов изображений без затрат на API. Описание изображений можно совместить с [RAG-системой](/posts/RAG-with-Python-Retrieval-Augmented-Generation/) для создания баз изображений с возможностью поиска, используя сгенерированные подписи как текстовые эмбеддинги.

Из моего опыта работы с ControlNet для задач сегментации изображений: локальные модели описания, такие как BLIP, незаменимы для массовой генерации аннотаций обучающих данных. В Codiste мы использовали этот подход для автоматической разметки тысяч изображений, прежде чем их дорабатывали специалисты, что сократило время на аннотирование примерно на 60%.

## Транскрипция аудио с Whisper

Модель Whisper от OpenAI преобразует аудио в текст. Использовать её можно локально через пакет `openai-whisper` или через API.

### Локальный Whisper

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

### Whisper через API OpenAI

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

Для более длинных аудиофайлов сначала разбейте их на части:

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

## Объединение модальностей

Настоящая сила мультимодального ИИ раскрывается при объединении разных типов данных. Вот конвейер, который обрабатывает видео, извлекая кадры и аудио, а затем объединяет результаты анализа:

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

## Создание мультимодального чат-бота

Теперь объединим всё в чат-бота, который может обрабатывать текст, изображения и аудио в рамках одного диалога:

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

## Добавление структурированного разбора вывода

При создании приложений поверх мультимодального ИИ часто требуются структурированные данные, а не текст в свободной форме. Используйте модели Pydantic вместе с API:

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

## Производительность и затраты

Несколько практических замечаний для промышленных мультимодальных приложений:

**Разрешение изображения имеет значение.** API GPT-4 Vision взимает плату в зависимости от размера изображения. Перед отправкой уменьшайте размер больших изображений. Для большинства задач достаточно 1024x1024 пикселей:

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

**Кэшируйте транскрипции.** Транскрипция аудио выполняется медленно. Кэшируйте результаты, чтобы избежать повторной обработки:

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

**Пакетная обработка.** При анализе большого количества изображений используйте асинхронные запросы для увеличения пропускной способности:

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

## Резюме

Мультимодальный ИИ на Python сводится к трём возможностям: понимание изображений, транскрипция аудио и объединение этого с текстовым рассуждением. API OpenAI решает первую и третью задачи через GPT-4 Vision. Whisper обрабатывает транскрипцию аудио, локально или через API. Transformers от Hugging Face предоставляют локальные альтернативы для понимания изображений.

Ключевые паттерны, которые стоит запомнить:

- Кодируйте локальные изображения в base64 перед отправкой в API
- Разбивайте длинные аудиофайлы на части для надёжной транскрипции
- Кэшируйте затратные операции, такие как транскрипция и анализ изображений
- Используйте разбор структурированного вывода, когда нужны машиночитаемые результаты
- Уменьшайте размер изображений перед вызовами API, чтобы контролировать расходы
- Используйте асинхронные запросы для пакетной обработки

Эти строительные блоки складываются в такие приложения, как видеосумматоры, мультимодальные чат-боты, анализаторы документов со смешанным медиаконтентом и инструменты доступности, описывающие визуальное содержимое. Чтобы глубже разобраться в дообучении моделей зрения, смотрите наше руководство [Дообучение LLM на Python](/posts/Fine-Tuning-LLMs-with-Python/). Начните с примера чат-бота выше и расширяйте его под свою конкретную задачу.

---

## Похожие статьи

- [Дообучение больших языковых моделей на Python](/posts/Fine-Tuning-LLMs-with-Python/) - Дообучение моделей для доменно-специфичных мультимодальных задач
- [RAG на Python: генерация с дополненным поиском](/posts/RAG-with-Python-Retrieval-Augmented-Generation/) - Объедините описания изображений и транскрипты с генерацией с дополненным поиском
- [Explainable AI на Python](/posts/Explainable-AI-with-Python-SHAP-LIME/) - Интерпретируйте и объясняйте предсказания вашей мультимодальной модели