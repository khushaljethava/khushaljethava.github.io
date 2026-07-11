---
title: "IA multimodal con Python: trabajar con texto, imágenes y audio"
description: Aprende a crear aplicaciones de IA multimodal con Python. Esta guía cubre la API de GPT-4 Vision de OpenAI, la generación de descripciones de imágenes con transformers, la transcripción de audio con Whisper, la combinación de modalidades y la creación de un chatbot multimodal práctico.
date: 2026-04-01 12:00:00 +0800
categories: [Python]
tags: [python, ai, multimodal]
translations: [hi, es, pt]
lang: es
image:
  path: "/commons/Multimodal AI with Python Working with Text Images and Audio.webp"
  alt: "Arquitectura de IA multimodal que combina el procesamiento de texto, imágenes y audio mediante GPT-4 Vision, transformers y Whisper en Python"
---

## ¿Qué es la IA multimodal?

La IA multimodal se refiere a sistemas que pueden procesar y razonar sobre múltiples tipos de entrada —texto, imágenes, audio y vídeo— dentro de un único modelo o pipeline. En lugar de tratar cada tipo de dato de forma aislada, los sistemas multimodales comprenden las relaciones entre ellos. Un modelo multimodal puede mirar una foto y responder preguntas sobre ella, transcribir voz y resumir su contenido, o generar imágenes a partir de descripciones de texto.

El valor práctico es evidente: los datos del mundo real rara vez vienen en un único formato. Los tickets de soporte al cliente incluyen capturas de pantalla. Los historiales médicos combinan notas de texto con escáneres de imágenes. Las publicaciones en redes sociales mezclan texto, fotos y vídeo. Construir sistemas de IA que gestionen todo esto en conjunto produce mejores resultados que encadenar herramientas separadas de una sola modalidad.

Cuando construí un pipeline de Document AI en Codiste utilizando transformers ajustados, las mayores mejoras de precisión provinieron de combinar la extracción de texto por OCR con las características visuales de diseño de las imágenes de los documentos. Tratar cada modalidad de forma aislada nos dio resultados decentes, pero fusionarlas elevó la precisión de extracción de alrededor del 82% a más del 94% en formatos de factura complejos.

En esta guía, construirás aplicaciones multimodales con Python. Cubriremos la comprensión de imágenes con GPT-4 Vision, la generación de descripciones de imágenes con transformers de Hugging Face, la transcripción de audio con Whisper y, finalmente, lo uniremos todo en un chatbot multimodal funcional. Si quieres ajustar modelos para tareas multimodales específicas, consulta nuestra guía sobre [Ajuste de LLM con Python](/posts/Fine-Tuning-LLMs-with-Python/).

## Configurar tu entorno

Comienza instalando los paquetes necesarios:

```python
pip install openai transformers torch torchvision pillow openai-whisper soundfile
```

Configura tu clave de API de OpenAI como una variable de entorno:

```python
import os
os.environ["OPENAI_API_KEY"] = "your-api-key-here"
```

Para uso en producción, almacénala en un archivo `.env` y cárgala con `python-dotenv` en lugar de codificarla directamente.

## Comprensión de imágenes con GPT-4 Vision

GPT-4 Vision (GPT-4V) acepta imágenes junto con prompts de texto. Puedes pasar imágenes como URLs o como cadenas codificadas en base64.

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

Para imágenes locales, codifícalas como base64:

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

También puedes pasar varias imágenes en una sola solicitud:

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

El parámetro `detail` controla cómo procesa el modelo la imagen. Usa `"low"` para un análisis más rápido y económico cuando no se necesita detalle fino, y `"high"` cuando necesitas que el modelo lea texto pequeño o identifique características de grano fino.

## Generación de descripciones de imágenes con transformers de Hugging Face

Para la generación de descripciones de imágenes sin conexión o autoalojada, usa el modelo BLIP-2 de Hugging Face:

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

También puedes generar descripciones condicionadas proporcionando un prompt de texto:

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

BLIP se ejecuta localmente, por lo que funciona bien para el procesamiento por lotes de grandes conjuntos de datos de imágenes sin costes de API. Puedes combinar la generación de descripciones de imágenes con un [sistema RAG](/posts/RAG-with-Python-Retrieval-Augmented-Generation/) para crear bases de datos de imágenes consultables utilizando las descripciones generadas como embeddings de texto.

En mi experiencia trabajando con ControlNet para tareas de segmentación de imágenes, descubrí que los modelos de descripción locales como BLIP son invaluables para generar anotaciones de datos de entrenamiento a escala. Usamos este enfoque en Codiste para etiquetar automáticamente miles de imágenes antes de que los revisores humanos las refinaran, reduciendo nuestro tiempo de anotación en aproximadamente un 60%.

## Transcripción de audio con Whisper

El modelo Whisper de OpenAI transcribe audio a texto. Puedes usarlo localmente a través del paquete `openai-whisper` o mediante la API.

### Whisper local

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

### Whisper a través de la API de OpenAI

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

Para archivos de audio más largos, divídelos primero en fragmentos:

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

## Combinar modalidades

El verdadero poder de la IA multimodal proviene de combinar diferentes tipos de datos. Aquí hay un pipeline que procesa un vídeo extrayendo fotogramas y audio, y luego combina el análisis:

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

## Crear un chatbot multimodal

Ahora vamos a combinarlo todo en un chatbot que pueda gestionar texto, imágenes y audio en una conversación:

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

## Añadir análisis de salida estructurada

Al crear aplicaciones sobre IA multimodal, a menudo necesitas datos estructurados en lugar de texto libre. Usa modelos de Pydantic con la API:

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

## Consideraciones de rendimiento y coste

Algunas notas prácticas para aplicaciones multimodales en producción:

**La resolución de la imagen importa.** La API de GPT-4 Vision cobra en función del tamaño de la imagen. Redimensiona las imágenes grandes antes de enviarlas. Para la mayoría de las tareas, 1024x1024 píxeles es suficiente:

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

**Almacena en caché las transcripciones.** La transcripción de audio es lenta. Almacena en caché los resultados para evitar volver a procesarlos:

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

**Procesamiento por lotes.** Al analizar muchas imágenes, usa solicitudes asíncronas para mejorar el rendimiento:

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

## Resumen

La IA multimodal con Python se reduce a tres capacidades: comprender imágenes, transcribir audio y combinar estos con el razonamiento basado en texto. La API de OpenAI gestiona la primera y la tercera a través de GPT-4 Vision. Whisper gestiona la transcripción de audio, ya sea localmente o mediante la API. Los transformers de Hugging Face proporcionan alternativas locales para la comprensión de imágenes.

Los patrones clave que debes recordar:

- Codifica las imágenes locales como base64 antes de enviarlas a las APIs
- Divide los archivos de audio largos en fragmentos para una transcripción fiable
- Almacena en caché las operaciones costosas como la transcripción y el análisis de imágenes
- Usa el análisis de salida estructurada cuando necesites resultados legibles por máquina
- Redimensiona las imágenes antes de las llamadas a la API para controlar los costes
- Usa solicitudes asíncronas para el procesamiento por lotes

Estos bloques de construcción se combinan en aplicaciones como resumidores de vídeo, chatbots multimodales, analizadores de documentos que gestionan medios mixtos y herramientas de accesibilidad que describen contenido visual. Para profundizar en el ajuste de modelos de visión, consulta nuestra guía sobre [Ajuste de LLM con Python](/posts/Fine-Tuning-LLMs-with-Python/). Comienza con el ejemplo del chatbot anterior y amplíalo para adaptarlo a tu caso de uso específico.

---

## Publicaciones relacionadas

- [Ajuste de grandes modelos de lenguaje con Python](/posts/Fine-Tuning-LLMs-with-Python/) - Ajusta modelos para tareas multimodales específicas de dominio
- [RAG con Python: generación aumentada por recuperación](/posts/RAG-with-Python-Retrieval-Augmented-Generation/) - Combina descripciones de imágenes y transcripciones con la generación aumentada por recuperación
- [IA explicable con Python](/posts/Explainable-AI-with-Python-SHAP-LIME/) - Interpreta y explica las predicciones de tu modelo multimodal
