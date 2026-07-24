---
title: "Generating Synthetic Data with LLMs in Python"
description: Generate synthetic training data with LLMs in Python — structured prompts, diversity controls, quality filtering, and how to avoid the traps that poison a dataset.
date: 2026-07-14 15:00:00 +0530
categories: [Python, AI]
tags: [python, synthetic-data, llm, data-generation, fine-tuning]
image:
  path: "/commons/Generating Synthetic Data with LLMs in Python.webp"
  alt: "An LLM generating labeled synthetic examples that pass through a quality filter"
---

## When You Don't Have Enough Data

Real labeled data is expensive and slow to collect. LLMs can generate it — synthetic examples for training a smaller model, testing a pipeline, or bootstrapping a [fine-tuning](/posts/Supervised-Fine-Tuning-SFT-for-LLMs-A-Python-Guide/) dataset. Done carelessly, synthetic data is repetitive and skewed. This guide shows how to generate it well in Python.

```bash
pip install openai
```

## Generating Structured Examples

Ask for JSON so the output drops straight into a dataset. Here we generate labeled customer-support intents.

```python
import json
from openai import OpenAI

client = OpenAI()

def generate_batch(intent, n=5):
    prompt = f"""Generate {n} realistic customer support messages with intent "{intent}".
Vary length, tone, and phrasing. Return a JSON list of objects with keys
"text" and "intent". Return only JSON."""
    raw = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=1.0,   # high temperature for diversity
    ).choices[0].message.content
    return json.loads(raw)

data = generate_batch("refund_request", n=5)
```

Note `temperature=1.0`. Low temperature gives near-duplicate outputs — the opposite of what a dataset needs.

## Forcing Diversity

A single prompt produces samey data. Vary the seed conditions: personas, contexts, edge cases. Loop over dimensions instead of asking for one big batch.

```python
personas = ["a frustrated first-time buyer", "a calm long-time customer",
            "someone in a hurry", "a non-native English speaker"]

dataset = []
for persona in personas:
    prompt = f"""Write 3 refund_request messages as {persona}.
JSON list of {{"text", "intent"}}. Only JSON."""
    out = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=1.0,
    ).choices[0].message.content
    dataset.extend(json.loads(out))
```

Explicit diversity axes beat hoping the model varies on its own.

## Filtering for Quality

Generated data has duplicates and off-target examples. Filter before using it. A cheap first pass: drop near-duplicates by normalized text.

```python
def dedup(rows):
    seen, out = set(), []
    for r in rows:
        key = r["text"].strip().lower()
        if key not in seen:
            seen.add(key)
            out.append(r)
    return out

clean = dedup(dataset)
print(f"{len(dataset)} -> {len(clean)} after dedup")
```

For semantic duplicates (same meaning, different words), embed each text and drop pairs above a similarity threshold — see [embeddings](/posts/Understanding-Embeddings-From-Word2Vec-to-Modern-LLMs/).

## The Traps

Synthetic data inherits the generator's biases and blind spots. If you train a model only on data from one LLM, you cap it at that LLM's distribution — sometimes worse, as errors compound across generations. Mix in real data, validate label accuracy on a sample by hand, and never ship a dataset you haven't eyeballed. Synthetic data is a supplement, not a free lunch.

## Frequently Asked Questions

### What temperature should I use for synthetic data?

High — around 0.9 to 1.2. Low temperature produces near-identical outputs, which defeats the purpose. Diversity is the whole reason to generate rather than copy.

### Can I train a model entirely on synthetic data?

Sometimes, for narrow tasks, but it's risky. The model inherits the generator's biases and can degrade if errors compound. Blending synthetic with real data is safer and usually stronger.

### How do I check synthetic data quality?

Deduplicate, spot-check labels by hand on a random sample, and measure diversity with embeddings. If a downstream model trained on it generalizes to real inputs, the data is doing its job.

## Takeaways

- Generate structured JSON at high temperature for usable, varied data.
- Force diversity with explicit personas and contexts, not one big prompt.
- Deduplicate and hand-check — synthetic data supplements real data, never replaces it.

Feed your cleaned dataset into an [SFT pipeline](/posts/Supervised-Fine-Tuning-SFT-for-LLMs-A-Python-Guide/) to train a specialized model.
