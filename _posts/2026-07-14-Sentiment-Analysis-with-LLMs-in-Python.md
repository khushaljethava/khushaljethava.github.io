---
title: "Sentiment Analysis with LLMs in Python"
description: Run sentiment analysis with LLMs in Python — zero-shot classification, structured output, batching for cost, and when a classic model beats an LLM.
date: 2026-07-14 16:00:00 +0530
categories: [Python, AI]
tags: [python, sentiment-analysis, llm, nlp, classification]
image:
  path: "/commons/Sentiment Analysis with LLMs in Python.webp"
  alt: "Customer reviews flowing into an LLM and coming out labeled positive, negative, or neutral"
---

## Sentiment Analysis Without Training a Model

Classic sentiment analysis meant labeling thousands of examples and training a classifier. An LLM does it zero-shot — no training data, and it handles sarcasm and context that bag-of-words models miss. This guide runs sentiment analysis in Python, with the batching and structure you need to do it cheaply at scale.

```bash
pip install openai
```

## Zero-Shot Classification

Ask the model to label text directly. Constrain the output to a fixed set so results are parseable.

```python
from openai import OpenAI
client = OpenAI()

def sentiment(text):
    r = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{
            "role": "user",
            "content": f"Classify the sentiment as POSITIVE, NEGATIVE, or "
                       f"NEUTRAL. Reply with one word only.\n\nText: {text}",
        }],
        temperature=0,   # deterministic classification
    )
    return r.choices[0].message.content.strip()

print(sentiment("Shipping was slow but the product is fantastic."))
# POSITIVE
```

`temperature=0` matters for classification — you want the same input to always give the same label.

## Structured Output With Confidence

One-word labels are fine until you need a score or a reason. Ask for JSON.

```python
import json

def sentiment_detailed(text):
    r = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{
            "role": "user",
            "content": f"""Analyze sentiment. Return JSON with keys:
"label" (POSITIVE/NEGATIVE/NEUTRAL), "score" (0-1 confidence),
"reason" (short). Only JSON.\n\nText: {text}""",
        }],
        temperature=0,
    )
    return json.loads(r.choices[0].message.content)

print(sentiment_detailed("It's okay, nothing special."))
# {'label': 'NEUTRAL', 'score': 0.8, 'reason': 'lukewarm, no strong emotion'}
```

The structured pattern here is the same one from [prompt engineering techniques](/posts/Prompt-Engineering-Techniques-in-Python/) — constrain and parse.

## Batching for Cost

Calling the API once per review is slow and expensive. Classify many in a single call.

```python
def sentiment_batch(texts):
    numbered = "\n".join(f"{i+1}. {t}" for i, t in enumerate(texts))
    r = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{
            "role": "user",
            "content": f"""Classify each review as POSITIVE/NEGATIVE/NEUTRAL.
Return a JSON list of labels in order. Only JSON.\n\n{numbered}""",
        }],
        temperature=0,
    )
    return json.loads(r.choices[0].message.content)

reviews = ["Love it!", "Broke immediately.", "Arrived on time."]
print(sentiment_batch(reviews))   # ['POSITIVE', 'NEGATIVE', 'NEUTRAL']
```

For thousands of reviews, batching cuts calls by 10-50x. If you send the same instructions every batch, [prompt caching](/posts/Prompt-Caching-Explained-How-It-Cuts-LLM-Costs/) trims cost further.

## When Not to Use an LLM

An LLM is overkill for high-volume, latency-sensitive sentiment. A fine-tuned small classifier (DistilBERT) runs in milliseconds on CPU at a fraction of the cost, once you have labeled data. Use the LLM to *generate* that labeled data cheaply, then train the fast model. LLM for flexibility and cold starts; classic model for scale.

## Frequently Asked Questions

### Is an LLM more accurate than a traditional sentiment model?

On nuanced text — sarcasm, mixed sentiment, domain slang — usually yes, because it understands context. On simple, high-volume text a fine-tuned classifier can match it at far lower cost and latency.

### How do I handle sarcasm and mixed sentiment?

Ask the model for a reason alongside the label, and consider a NEUTRAL or MIXED class. LLMs catch sarcasm far better than keyword methods, but validate on your own tricky examples.

### How do I keep costs down at scale?

Batch many texts per call, set temperature to 0, use a small model, and cache the shared instruction prefix. For very high volume, distill to a small local classifier.

## Takeaways

- LLMs do zero-shot sentiment with no training data, handling context and sarcasm.
- Use temperature 0 and structured JSON for reliable, parseable labels.
- Batch to cut cost; switch to a small classifier at high scale.

To ground sentiment in retrieved context or build a full pipeline, see [building a RAG evaluation pipeline](/posts/Building-a-RAG-Evaluation-Pipeline-with-Python/).
