---
title: "Prompt Caching Explained: How It Cuts LLM Costs"
description: Learn how prompt caching works with Claude and OpenAI APIs in Python. See real cost and latency comparisons, and learn how to structure prompts to maximize cache hits.
date: 2026-06-19 14:00:00 +0530
categories: [AI, Python]
tags: [python, llm, prompt-caching, cost-optimization, claude-api, openai-api]
image:
  path: "/commons/Prompt Caching Explained How It Cuts LLM Costs.webp"
  alt: "Prompt caching diagram showing cached prefix tokens reducing LLM API cost and latency"
---

## What Prompt Caching Actually Caches

When you send a prompt to an LLM, the model processes every token before generating a response — including the system prompt and context you send on every single call. Prompt caching stores the model's internal representation of a repeated prefix, so subsequent calls with the same prefix skip that processing. You pay full price once, then a fraction of the price for every cache hit.

This matters most for agents and RAG systems that resend large system prompts, tool definitions, or retrieved context on every turn — exactly the pattern in [Building AI Agents with Python](/posts/Building-AI-Agents-with-Python/).

```bash
pip install anthropic openai
```

## How Caching Works with Claude

Claude's API lets you mark a block as cacheable with `cache_control`. The cached portion must come first and stay byte-identical across calls.

```python
import anthropic

client = anthropic.Anthropic()

long_system_prompt = """You are a customer support agent for Acme Corp.
[... 2000 tokens of policies, FAQs, and tone guidelines ...]
"""

response = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=300,
    system=[
        {
            "type": "text",
            "text": long_system_prompt,
            "cache_control": {"type": "ephemeral"},
        }
    ],
    messages=[{"role": "user", "content": "What's your return policy?"}],
)

print(response.usage)
```

```text
Usage(input_tokens=12, output_tokens=58, cache_creation_input_tokens=2000, cache_read_input_tokens=0)
```

First call: the full 2000-token system prompt is processed and cached (`cache_creation_input_tokens`). On the next call within the cache TTL:

```python
response2 = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=300,
    system=[{"type": "text", "text": long_system_prompt, "cache_control": {"type": "ephemeral"}}],
    messages=[{"role": "user", "content": "Do you ship internationally?"}],
)
print(response2.usage)
```

```text
Usage(input_tokens=10, output_tokens=45, cache_creation_input_tokens=0, cache_read_input_tokens=2000)
```

`cache_read_input_tokens` is billed at roughly 10% of normal input token cost — for a 2000-token system prompt repeated across thousands of calls, that adds up fast.

## How Caching Works with OpenAI

OpenAI's caching is automatic for prompts over 1024 tokens — no explicit marker needed, but ordering still matters:

```python
from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": long_system_prompt},  # same prefix every call
        {"role": "user", "content": "What's your return policy?"},
    ],
)

print(response.usage)
```

```text
CompletionUsage(prompt_tokens=2012, completion_tokens=58, total_tokens=2070, prompt_tokens_details={'cached_tokens': 0})
```

```python
response2 = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": long_system_prompt},  # identical prefix → cache hit
        {"role": "user", "content": "Do you ship internationally?"},
    ],
)
print(response2.usage.prompt_tokens_details)
```

```text
{'cached_tokens': 2048}
```

OpenAI caches automatically but only if the prefix is identical — even a single changed character anywhere before the cached portion invalidates the whole cache for that request.

## Structuring Prompts to Maximize Cache Hits

The cacheable prefix must be **static and first**. Put variable content last:

```python
# Good: static content first, variable content last
messages = [
    {"role": "system", "content": STATIC_SYSTEM_PROMPT},      # cached
    {"role": "system", "content": STATIC_TOOL_DEFINITIONS},   # cached
    {"role": "user", "content": dynamic_user_question},        # always fresh
]

# Bad: dynamic content mixed into the cacheable prefix
messages = [
    {"role": "system", "content": f"{STATIC_SYSTEM_PROMPT}\nCurrent time: {datetime.now()}"},  # breaks caching every call
]
```

That second example is a common mistake — injecting a timestamp or request ID into the system prompt silently disables caching for the entire prefix.

## Measuring the Real Savings

```python
def estimate_savings(calls_per_day: int, cached_tokens: int, cost_per_1k_input: float, cache_discount: float = 0.9):
    full_cost = calls_per_day * (cached_tokens / 1000) * cost_per_1k_input
    cached_cost = full_cost * (1 - cache_discount)
    return {
        "without_caching": round(full_cost, 2),
        "with_caching": round(cached_cost, 2),
        "daily_savings": round(full_cost - cached_cost, 2),
    }

print(estimate_savings(calls_per_day=5000, cached_tokens=2000, cost_per_1k_input=0.003))
```

```text
{'without_caching': 30.0, 'with_caching': 3.0, 'daily_savings': 27.0}
```

At 5,000 calls a day with a 2000-token cached system prompt, that's roughly $27/day saved — almost $10,000/year for one prompt.

## Key Takeaways

- Prompt caching reuses the model's processed representation of a repeated prefix, cutting cost by up to ~90% on cached tokens
- Cached content must be static and placed first — variable content (timestamps, IDs) must go last
- Claude requires explicit `cache_control` markers; OpenAI caches automatically above 1024 tokens
- Caches have a TTL — infrequent calls won't benefit as much as high-frequency agent loops
- This optimization pairs naturally with async batching covered in [Python Async/Await for AI Pipelines](/posts/Python-Async-Await-for-AI-Pipelines-A-Practical-Guide/)
- Always check `usage` in the API response to confirm you're actually getting cache hits, not just assuming it

## Related Posts

- [Building AI Agents with Python: A Complete Guide](/posts/Building-AI-Agents-with-Python/) -- Agents resend large system prompts and tool definitions every turn — the ideal caching use case.
- [Python Async/Await for AI Pipelines: A Practical Guide](/posts/Python-Async-Await-for-AI-Pipelines-A-Practical-Guide/) -- Combine caching with concurrency for the biggest cost and latency wins.
- [MLOps with Python: Production ML Pipelines](/posts/MLOps-with-Python-Production-ML-Pipelines/) -- Track token costs and cache hit rates as part of production monitoring.
