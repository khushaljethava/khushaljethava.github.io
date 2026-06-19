---
title: "Python Async/Await for AI Pipelines: A Practical Guide"
description: Learn how to use Python async/await to speed up LLM API calls, batch embeddings, and build concurrent AI pipelines with asyncio and httpx. Includes real benchmarks.
date: 2026-06-19 12:00:00 +0530
categories: [Python, AI]
tags: [python, asyncio, concurrency, llm-api, performance]
image:
  path: "/commons/Python Async Await for AI Pipelines A Practical Guide.webp"
  alt: "Python asyncio concurrency diagram for parallel LLM API calls and AI pipelines"
---

## Why AI Pipelines Need Async

Calling an LLM API is mostly waiting — network latency, not CPU work. If you call 100 prompts one at a time, you pay 100x the latency. With `asyncio`, you fire all 100 requests concurrently and wait once for the slowest one. The same pattern speeds up [building recommendation systems](/posts/Building-Recommendation-Systems-with-Python/) when fetching embeddings or feature data from multiple sources.

```bash
pip install httpx openai asyncio
```

## Sync vs Async: A Direct Comparison

```python
import time
import httpx

def fetch_sync(prompt: str) -> str:
    response = httpx.post(
        "https://api.openai.com/v1/chat/completions",
        headers={"Authorization": "Bearer YOUR_KEY"},
        json={"model": "gpt-4o-mini", "messages": [{"role": "user", "content": prompt}]},
        timeout=30,
    )
    return response.json()["choices"][0]["message"]["content"]

prompts = [f"Summarize topic {i} in 5 words" for i in range(10)]

start = time.time()
results = [fetch_sync(p) for p in prompts]
print(f"Sync: {time.time() - start:.2f}s")
```

```text
Sync: 8.91s
```

Now the async version:

```python
import asyncio
import httpx

async def fetch_async(client: httpx.AsyncClient, prompt: str) -> str:
    response = await client.post(
        "https://api.openai.com/v1/chat/completions",
        headers={"Authorization": "Bearer YOUR_KEY"},
        json={"model": "gpt-4o-mini", "messages": [{"role": "user", "content": prompt}]},
        timeout=30,
    )
    return response.json()["choices"][0]["message"]["content"]

async def run_all(prompts: list[str]) -> list[str]:
    async with httpx.AsyncClient() as client:
        tasks = [fetch_async(client, p) for p in prompts]
        return await asyncio.gather(*tasks)

start = time.time()
results = asyncio.run(run_all(prompts))
print(f"Async: {time.time() - start:.2f}s")
```

```text
Async: 1.14s
```

Same 10 requests, ~8x faster — because the requests now overlap instead of queueing one after another.

## Limiting Concurrency with a Semaphore

Firing unlimited requests at once will hit rate limits fast. Cap concurrency with a `Semaphore`:

```python
async def fetch_with_limit(client, prompt, semaphore):
    async with semaphore:
        return await fetch_async(client, prompt)

async def run_limited(prompts: list[str], max_concurrent: int = 5):
    semaphore = asyncio.Semaphore(max_concurrent)
    async with httpx.AsyncClient() as client:
        tasks = [fetch_with_limit(client, p, semaphore) for p in prompts]
        return await asyncio.gather(*tasks)
```

This keeps at most `max_concurrent` requests in flight, which is exactly how to stay under a provider's rate limit while still getting most of the concurrency speedup.

## Using the OpenAI Async Client Directly

```python
from openai import AsyncOpenAI

client = AsyncOpenAI(api_key="YOUR_KEY")

async def get_completion(prompt: str) -> str:
    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
    )
    return response.choices[0].message.content

async def batch_complete(prompts: list[str]):
    return await asyncio.gather(*(get_completion(p) for p in prompts))

results = asyncio.run(batch_complete(prompts))
```

The official async client handles connection pooling and retries internally — prefer it over raw `httpx` when the SDK supports it.

## Handling Failures Without Killing the Whole Batch

A single failed request shouldn't crash the rest of the batch. Use `return_exceptions=True`:

```python
async def safe_batch(prompts: list[str]):
    results = await asyncio.gather(
        *(get_completion(p) for p in prompts),
        return_exceptions=True,
    )
    successes, failures = [], []
    for prompt, result in zip(prompts, results):
        if isinstance(result, Exception):
            failures.append((prompt, str(result)))
        else:
            successes.append(result)
    return successes, failures
```

```python
successes, failures = asyncio.run(safe_batch(prompts))
print(f"Succeeded: {len(successes)}, Failed: {len(failures)}")
```

This is the difference between a pipeline that degrades gracefully and one that loses an entire run because one prompt timed out.

## Combining with Retry Logic

```python
import random

async def fetch_with_retry(client, prompt, max_retries=3):
    for attempt in range(max_retries):
        try:
            return await fetch_async(client, prompt)
        except httpx.HTTPStatusError as e:
            if attempt == max_retries - 1:
                raise
            wait = (2 ** attempt) + random.uniform(0, 1)
            await asyncio.sleep(wait)
```

Exponential backoff with jitter prevents every retried request from hammering the API at the exact same moment — a common cause of cascading rate-limit errors.

## Key Takeaways

- Async/await dramatically speeds up I/O-bound work like LLM API calls — typically 5–10x for batches
- Use `asyncio.gather` to run requests concurrently, and a `Semaphore` to cap concurrency under rate limits
- Prefer a provider's native async client (`AsyncOpenAI`) over raw HTTP when available
- `return_exceptions=True` keeps one failed request from killing an entire batch
- Combine async with exponential backoff + jitter for resilient retry behavior
- Async helps I/O-bound work, not CPU-bound work — for heavy local compute, use multiprocessing instead

## Related Posts

- [Building Recommendation Systems with Python](/posts/Building-Recommendation-Systems-with-Python/) -- Apply the same concurrent fetching pattern to feature and embedding lookups.
- [Building AI Agents with Python: A Complete Guide](/posts/Building-AI-Agents-with-Python/) -- See where async tool calls fit into a full agent architecture.
- [MLOps with Python: Production ML Pipelines](/posts/MLOps-with-Python-Production-ML-Pipelines/) -- Use async batching to speed up production inference pipelines.
