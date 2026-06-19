---
title: "Building a Local AI Chatbot with Ollama and Python"
description: Learn how to build a private, local AI chatbot in Python using Ollama. Covers installation, streaming responses, conversation memory, and a simple Gradio web UI.
date: 2026-06-19 16:00:00 +0530
categories: [Python, AI]
tags: [python, ollama, local-llm, chatbot, gradio]
image:
  path: "/commons/Building a Local AI Chatbot with Ollama and Python.webp"
  alt: "Local AI chatbot architecture using Ollama and Python with conversation memory and streaming"
---

## Why Run a Chatbot Locally

No API key, no per-token cost, no data leaving your machine. Ollama packages [quantized](/posts/Quantization-for-LLMs-Run-Big-Models-on-Small-Hardware/) open models behind a simple local API — you get most of the convenience of a hosted LLM API without sending a single request over the internet.

## Installing Ollama and Pulling a Model

```bash
# macOS / Linux
curl -fsSL https://ollama.com/install.sh | sh

# Pull a model (4-bit quantized, ~4.7GB)
ollama pull llama3.1:8b

pip install ollama gradio
```

## Your First Local Completion

```python
import ollama

response = ollama.chat(
    model="llama3.1:8b",
    messages=[{"role": "user", "content": "Explain recursion in two sentences."}],
)
print(response["message"]["content"])
```

```text
Recursion is when a function calls itself to solve smaller instances of the same problem.
It needs a base case to stop, or it will call itself forever and crash with a stack overflow.
```

No API key, no network call beyond `localhost:11434` — the model is running entirely on your machine.

## Streaming Responses

For a chatbot UI, you want tokens to appear as they're generated, not all at once after a long wait:

```python
def stream_chat(prompt: str, history: list[dict] = None):
    messages = (history or []) + [{"role": "user", "content": prompt}]
    full_response = ""
    for chunk in ollama.chat(model="llama3.1:8b", messages=messages, stream=True):
        token = chunk["message"]["content"]
        full_response += token
        print(token, end="", flush=True)
    return full_response

stream_chat("Write a haiku about Python programming.")
```

```text
Indented blocks
Snake-like syntax flows with ease
Bugs hide in whitespace
```

## Adding Conversation Memory

Without history, every message is treated in isolation. Track the conversation as a growing list of messages:

```python
class LocalChatbot:
    def __init__(self, model: str = "llama3.1:8b", system_prompt: str = "You are a helpful assistant."):
        self.model = model
        self.history = [{"role": "system", "content": system_prompt}]

    def send(self, message: str) -> str:
        self.history.append({"role": "user", "content": message})
        response = ollama.chat(model=self.model, messages=self.history)
        reply = response["message"]["content"]
        self.history.append({"role": "assistant", "content": reply})
        return reply

    def reset(self):
        self.history = self.history[:1]  # keep only the system prompt

bot = LocalChatbot()
print(bot.send("My name is Alex."))
print(bot.send("What's my name?"))
```

```text
Nice to meet you, Alex! How can I help you today?
Your name is Alex.
```

The second response only works because `self.history` carries the first exchange forward — exactly the same pattern as conversation memory in hosted-API chatbots.

## Building a Simple Web UI with Gradio

```python
import gradio as gr

bot = LocalChatbot()

def respond(message, chat_history):
    reply = bot.send(message)
    chat_history.append((message, reply))
    return "", chat_history

with gr.Blocks() as demo:
    chatbot_ui = gr.Chatbot()
    msg = gr.Textbox(placeholder="Ask me anything...")
    msg.submit(respond, [msg, chatbot_ui], [msg, chatbot_ui])

demo.launch()
```

This launches a local web chat interface at `http://127.0.0.1:7860` — no frontend framework required, just Python.

## Limiting Context to Control Memory and Speed

Long conversations slow down every subsequent call because the full history gets reprocessed each time. Cap it:

```python
def send_with_window(self, message: str, max_turns: int = 10) -> str:
    self.history.append({"role": "user", "content": message})
    system = self.history[0]
    recent = self.history[1:][-(max_turns * 2):]  # keep last N user/assistant pairs
    response = ollama.chat(model=self.model, messages=[system] + recent)
    reply = response["message"]["content"]
    self.history.append({"role": "assistant", "content": reply})
    return reply
```

Trimming to a sliding window keeps latency roughly constant instead of growing with every message in a long-running conversation.

## Key Takeaways

- Ollama runs quantized open models locally with a simple chat API — no API key or network dependency
- Streaming responses (`stream=True`) makes a chatbot feel responsive instead of making users wait for the full reply
- Conversation memory is just a growing list of `{role, content}` messages passed back on every call
- Gradio gives you a working chat web UI in under 20 lines of Python
- Trim conversation history to a sliding window to keep latency from growing indefinitely
- Local models trade some quality for privacy and zero per-token cost — benchmark against a hosted API for your specific task

## Related Posts

- [Quantization for LLMs: Run Big Models on Small Hardware](/posts/Quantization-for-LLMs-Run-Big-Models-on-Small-Hardware/) -- Understand the quantization that makes Ollama's models small enough to run locally.
- [Run DeepSeek V4 Flash Locally](/posts/run-deepseek-v4-flash-locally/) -- Another local deployment guide for a different open model family.
- [Building AI Agents with Python: A Complete Guide](/posts/Building-AI-Agents-with-Python/) -- Extend this chatbot with tool calling to turn it into a local agent.
