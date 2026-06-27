---
title: "IA multimodal com Python: trabalhando com texto, imagens e áudio"
description: Aprenda a criar aplicações de IA multimodal com Python. Este guia aborda a API GPT-4 Vision da OpenAI, legendagem de imagens com transformers, transcrição de áudio com Whisper, combinação de modalidades e a construção de um chatbot multimodal prático.
date: 2026-04-01 12:00:00 +0800
categories: [Python]
tags: [python, ai, multimodal]
translations: [hi, es, pt]
lang: pt
image:
  path: "/commons/Multimodal AI with Python Working with Text Images and Audio.webp"
  alt: "Arquitetura de IA multimodal combinando processamento de texto, imagem e áudio usando GPT-4 Vision, transformers e Whisper em Python"
---

## O que é IA multimodal?

A IA multimodal refere-se a sistemas que podem processar e raciocinar sobre vários tipos de entrada — texto, imagens, áudio e vídeo — dentro de um único modelo ou pipeline. Em vez de tratar cada tipo de dado isoladamente, os sistemas multimodais compreendem as relações entre eles. Um modelo multimodal pode olhar para uma foto e responder perguntas sobre ela, transcrever fala e resumir seu conteúdo, ou gerar imagens a partir de descrições de texto.

O valor prático é direto: os dados do mundo real raramente vêm em um único formato. Os tíquetes de suporte ao cliente incluem capturas de tela. Os registros médicos combinam notas de texto com exames de imagem. As publicações em redes sociais misturam texto, fotos e vídeo. Construir sistemas de IA que lidem com tudo isso em conjunto produz resultados melhores do que encadear ferramentas separadas de uma única modalidade.

Quando construí um pipeline de Document AI na Codiste usando transformers ajustados, os maiores ganhos de precisão vieram da combinação da extração de texto por OCR com características visuais de layout das imagens dos documentos. Tratar cada modalidade isoladamente nos deu resultados razoáveis, mas fundi-las elevou a precisão de extração de cerca de 82% para mais de 94% em formatos de fatura complexos.

Neste guia, você construirá aplicações multimodais usando Python. Abordaremos a compreensão de imagens com GPT-4 Vision, a legendagem de imagens com transformers da Hugging Face, a transcrição de áudio com Whisper e, finalmente, uniremos tudo em um chatbot multimodal funcional. Se você quiser ajustar modelos para tarefas multimodais específicas, consulte nosso guia sobre [Ajuste fino de LLMs com Python](/posts/Fine-Tuning-LLMs-with-Python/).

## Configurando seu ambiente

Comece instalando os pacotes necessários:

```python
pip install openai transformers torch torchvision pillow openai-whisper soundfile
```

Configure sua chave de API da OpenAI como uma variável de ambiente:

```python
import os
os.environ["OPENAI_API_KEY"] = "your-api-key-here"
```

Para uso em produção, armazene-a em um arquivo `.env` e carregue-a com `python-dotenv` em vez de codificá-la diretamente.

## Compreensão de imagens com GPT-4 Vision

O GPT-4 Vision (GPT-4V) aceita imagens junto com prompts de texto. Você pode passar imagens como URLs ou strings codificadas em base64.

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

Para imagens locais, codifique-as como base64:

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

Você também pode passar várias imagens em uma única solicitação:

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

O parâmetro `detail` controla como o modelo processa a imagem. Use `"low"` para uma análise mais rápida e barata quando o detalhe fino não for necessário, e `"high"` quando você precisar que o modelo leia textos pequenos ou identifique características de granularidade fina.

## Legendagem de imagens com transformers da Hugging Face

Para legendagem de imagens offline ou auto-hospedada, use o modelo BLIP-2 da Hugging Face:

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

Você também pode fazer legendagem condicional fornecendo um prompt de texto:

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

O BLIP é executado localmente, então funciona bem para o processamento em lote de grandes conjuntos de dados de imagens sem custos de API. Você pode combinar a legendagem de imagens com um [sistema RAG](/posts/RAG-with-Python-Retrieval-Augmented-Generation/) para construir bancos de dados de imagens pesquisáveis usando as legendas geradas como embeddings de texto.

Em minha experiência trabalhando com ControlNet para tarefas de segmentação de imagens, descobri que modelos de legendagem locais como o BLIP são inestimáveis para gerar anotações de dados de treinamento em escala. Usamos essa abordagem na Codiste para rotular automaticamente milhares de imagens antes que revisores humanos as refinassem, reduzindo nosso tempo de anotação em cerca de 60%.

## Transcrição de áudio com Whisper

O modelo Whisper da OpenAI transcreve áudio em texto. Você pode usá-lo localmente através do pacote `openai-whisper` ou através da API.

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

### Whisper via API da OpenAI

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

Para arquivos de áudio mais longos, divida-os primeiro em pedaços:

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

## Combinando modalidades

O verdadeiro poder da IA multimodal vem da combinação de diferentes tipos de dados. Aqui está um pipeline que processa um vídeo extraindo quadros e áudio, e depois combina a análise:

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

## Construindo um chatbot multimodal

Agora vamos combinar tudo em um chatbot que pode lidar com texto, imagens e áudio em uma conversa:

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

## Adicionando análise de saída estruturada

Ao construir aplicações sobre IA multimodal, você geralmente precisa de dados estruturados em vez de texto livre. Use modelos Pydantic com a API:

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

## Considerações de desempenho e custo

Algumas observações práticas para aplicações multimodais em produção:

**A resolução da imagem importa.** A API GPT-4 Vision cobra com base no tamanho da imagem. Redimensione imagens grandes antes de enviá-las. Para a maioria das tarefas, 1024x1024 pixels é suficiente:

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

**Armazene transcrições em cache.** A transcrição de áudio é lenta. Armazene os resultados em cache para evitar reprocessamento:

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

**Processamento em lote.** Ao analisar muitas imagens, use solicitações assíncronas para melhorar a taxa de transferência:

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

## Resumo

A IA multimodal com Python se resume a três capacidades: compreender imagens, transcrever áudio e combinar isso com o raciocínio baseado em texto. A API da OpenAI lida com a primeira e a terceira por meio do GPT-4 Vision. O Whisper lida com a transcrição de áudio, seja localmente ou via API. Os transformers da Hugging Face fornecem alternativas locais para a compreensão de imagens.

Os principais padrões a serem lembrados:

- Codifique imagens locais como base64 antes de enviá-las para as APIs
- Divida arquivos de áudio longos em pedaços para uma transcrição confiável
- Armazene em cache operações caras como transcrição e análise de imagens
- Use a análise de saída estruturada quando precisar de resultados legíveis por máquina
- Redimensione imagens antes das chamadas de API para controlar custos
- Use solicitações assíncronas para processamento em lote

Esses blocos de construção se combinam em aplicações como resumidores de vídeo, chatbots multimodais, analisadores de documentos que lidam com mídia mista e ferramentas de acessibilidade que descrevem conteúdo visual. Para um mergulho mais profundo no ajuste fino de modelos de visão, consulte nosso guia sobre [Ajuste fino de LLMs com Python](/posts/Fine-Tuning-LLMs-with-Python/). Comece com o exemplo de chatbot acima e amplie-o para se adequar ao seu caso de uso específico.

---

## Publicações relacionadas

- [Ajuste fino de grandes modelos de linguagem com Python](/posts/Fine-Tuning-LLMs-with-Python/) - Ajuste modelos para tarefas multimodais específicas de domínio
- [RAG com Python: geração aumentada por recuperação](/posts/RAG-with-Python-Retrieval-Augmented-Generation/) - Combine legendas de imagens e transcrições com geração aumentada por recuperação
- [IA explicável com Python](/posts/Explainable-AI-with-Python-SHAP-LIME/) - Interprete e explique as previsões do seu modelo multimodal
