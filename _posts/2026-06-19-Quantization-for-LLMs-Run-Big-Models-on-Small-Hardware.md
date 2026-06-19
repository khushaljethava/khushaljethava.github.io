---
title: "Quantization for LLMs: Run Big Models on Small Hardware"
description: Learn how LLM quantization works in Python — GPTQ, GGUF, and bitsandbytes 4-bit/8-bit. See real memory and speed comparisons and run a quantized model on a laptop GPU.
date: 2026-06-19 11:00:00 +0530
categories: [AI, Python]
tags: [python, llm, quantization, gguf, bitsandbytes, local-llm]
image:
  path: "/commons/Quantization for LLMs Run Big Models on Small Hardware.webp"
  alt: "LLM quantization showing FP16 to 4-bit conversion and memory savings on consumer hardware"
---

## The Memory Problem

A 7-billion-parameter model in full precision (FP16) needs roughly 14GB of GPU memory just to load — before you've run a single token. Most consumer GPUs don't have that. Quantization shrinks each weight from 16 bits to 8, 4, or even fewer bits, cutting memory use by 2–4x with a small, often negligible, accuracy cost.

This is the same model-shrinking idea behind running [DeepSeek V4 Flash locally](/posts/run-deepseek-v4-flash-locally/) — quantization is the mechanism that makes that possible on consumer hardware.

```bash
pip install transformers bitsandbytes accelerate torch
```

## Precision Levels, Visualized

```text
FP32 (32-bit): 4 bytes/param  →  7B model ≈ 28GB
FP16 (16-bit): 2 bytes/param  →  7B model ≈ 14GB
INT8  (8-bit): 1 byte/param   →  7B model ≈ 7GB
INT4  (4-bit): 0.5 byte/param →  7B model ≈ 3.5GB
```

Each step down roughly halves memory. The cost is precision in the weight values themselves — quantization rounds them into a smaller set of discrete levels.

## 8-bit Quantization with bitsandbytes

```python
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
import torch

quant_config = BitsAndBytesConfig(load_in_8bit=True)

model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3.1-8B-Instruct",
    quantization_config=quant_config,
    device_map="auto",
)
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3.1-8B-Instruct")

print(f"Memory footprint: {model.get_memory_footprint() / 1e9:.2f} GB")
```

```text
Memory footprint: 8.45 GB
```

## 4-bit Quantization (QLoRA-style)

4-bit is where most local deployments land — it's the sweet spot between memory savings and output quality:

```python
quant_config_4bit = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",        # normalized float 4 — better than plain int4
    bnb_4bit_compute_dtype=torch.bfloat16,
    bnb_4bit_use_double_quant=True,   # quantize the quantization constants too
)

model_4bit = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3.1-8B-Instruct",
    quantization_config=quant_config_4bit,
    device_map="auto",
)

print(f"Memory footprint: {model_4bit.get_memory_footprint() / 1e9:.2f} GB")
```

```text
Memory footprint: 5.59 GB
```

`nf4` (Normal Float 4) outperforms naive 4-bit rounding because it allocates more precision to the weight values that actually occur most often in trained models — most weights cluster near zero.

## GGUF: Quantization for CPU and llama.cpp

GGUF is the format used by `llama.cpp` and Ollama — designed for fast CPU inference, not just GPU:

```bash
pip install llama-cpp-python

# Download a pre-quantized GGUF model (Q4_K_M is a good default)
huggingface-cli download TheBloke/Llama-3.1-8B-Instruct-GGUF llama-3.1-8b-instruct.Q4_K_M.gguf --local-dir ./models
```

```python
from llama_cpp import Llama

llm = Llama(model_path="./models/llama-3.1-8b-instruct.Q4_K_M.gguf", n_ctx=2048, n_gpu_layers=0)

output = llm("Explain quantization in one sentence.", max_tokens=60)
print(output["choices"][0]["text"])
```

The `Q4_K_M` suffix tells you the quantization scheme — `K_M` quantization mixes precision levels across layers, keeping more bits where they matter most for output quality.

## Benchmarking Quality vs Speed

```python
import time

def benchmark(model, tokenizer, prompt, max_new_tokens=50):
    inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
    start = time.time()
    output = model.generate(**inputs, max_new_tokens=max_new_tokens)
    elapsed = time.time() - start
    tokens_per_sec = max_new_tokens / elapsed
    return tokenizer.decode(output[0], skip_special_tokens=True), tokens_per_sec

text, speed = benchmark(model_4bit, tokenizer, "The future of AI is")
print(f"Speed: {speed:.1f} tokens/sec")
```

In practice, 4-bit models run noticeably faster than FP16 on memory-bandwidth-limited consumer GPUs, because moving less data per token is often the bigger bottleneck than raw compute.

## Quantization Method Comparison

| Method | Bits | Best for | Quality loss |
|---|---|---|---|
| bitsandbytes INT8 | 8 | Quick GPU memory savings | Minimal |
| bitsandbytes NF4 | 4 | GPU inference, fine-tuning (QLoRA) | Small |
| GPTQ | 4 | Pre-quantized GPU checkpoints | Small |
| GGUF (llama.cpp) | 2–8 (mixed) | CPU/Mac inference, Ollama | Small–moderate |

## Key Takeaways

- Quantization reduces weight precision to cut memory use, typically 2–4x with small accuracy loss
- 4-bit (`nf4`) is the practical default for running large models on consumer GPUs
- GGUF is the format to use for CPU-only or Apple Silicon inference via `llama.cpp` or Ollama
- Double quantization compresses the quantization metadata itself for extra savings
- Lower precision often means faster inference too, since memory bandwidth is usually the bottleneck
- Always benchmark quality on your actual task — quantization quality loss varies by model and domain

## Related Posts

- [Run DeepSeek V4 Flash Locally](/posts/run-deepseek-v4-flash-locally/) -- A hands-on example of quantization enabling local deployment of a large model.
- [Fine-Tuning LLMs with Python](/posts/Fine-Tuning-LLMs-with-Python/) -- Combine quantization with QLoRA to fine-tune large models on a single GPU.
- [Building a Local AI Chatbot with Ollama and Python](/posts/Building-a-Local-AI-Chatbot-with-Ollama-and-Python/) -- Use GGUF-quantized models directly through Ollama's simple API.
