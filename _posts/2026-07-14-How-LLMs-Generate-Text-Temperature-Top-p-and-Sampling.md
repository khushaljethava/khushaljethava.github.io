---
title: "How LLMs Generate Text: Temperature, Top-p, and Sampling"
description: How LLMs generate text, one token at a time — logits, softmax, temperature, top-k, and top-p sampling explained with runnable Python you can experiment with.
date: 2026-07-14 19:00:00 +0530
categories: [Python, AI]
tags: [python, llm, text-generation, sampling, temperature]
image:
  path: "/commons/How LLMs Generate Text Temperature Top-p and Sampling.webp"
  alt: "Token probability distribution reshaped by temperature and top-p sampling"
---

## One Token at a Time

An LLM doesn't write a sentence — it predicts the next token, appends it, and predicts again. Every knob you've seen (temperature, top-p, top-k) shapes that one prediction. Understanding them turns generation from magic into a dial you control. This guide builds the sampling step in NumPy so each knob is concrete.

```bash
pip install numpy
```

## From Logits to Probabilities

The model outputs a raw score (logit) for every token in its vocabulary. Softmax turns those scores into probabilities that sum to 1. If the model just picks the highest every time (greedy), output is deterministic and often repetitive.

```python
import numpy as np

# Toy vocabulary of 5 tokens and their logits from the model
tokens = ["cat", "dog", "sky", "run", "the"]
logits = np.array([2.0, 1.5, 0.2, 0.1, 3.0])

def softmax(x):
    e = np.exp(x - x.max())
    return e / e.sum()

probs = softmax(logits)
print(dict(zip(tokens, probs.round(3))))
```

## Temperature: The Randomness Dial

Temperature divides the logits before softmax. Below 1 sharpens the distribution (safer, more predictable); above 1 flattens it (more diverse, more random). At 0 it's greedy.

```python
def with_temperature(logits, t):
    return softmax(logits / t)

print(with_temperature(logits, 0.5).round(3))  # sharper: favors "the", "cat"
print(with_temperature(logits, 1.5).round(3))  # flatter: rarer tokens get a chance
```

This is the same temperature you set for [sentiment classification](/posts/Sentiment-Analysis-with-LLMs-in-Python/) — 0 there because you want the single best label, not variety.

## Top-k and Top-p Sampling

Even a flattened distribution has a long tail of nonsense tokens. Top-k keeps the k most likely; top-p (nucleus) keeps the smallest set whose probabilities sum to p. Both cut the tail, then sample from what remains.

```python
def top_p(probs, p=0.9):
    order = np.argsort(probs)[::-1]
    cumulative = np.cumsum(probs[order])
    keep = order[cumulative <= p]
    if len(keep) == 0:            # always keep at least the top token
        keep = order[:1]
    filtered = np.zeros_like(probs)
    filtered[keep] = probs[keep]
    return filtered / filtered.sum()

print(top_p(probs, p=0.9).round(3))
```

Top-p adapts: when the model is confident, it keeps few tokens; when uncertain, it keeps more. That's why it's the common default.

## Putting It Together

Generation is a loop: get logits, apply temperature, filter with top-p, sample one token, repeat.

```python
def sample(logits, t=1.0, p=0.9):
    probs = top_p(softmax(logits / t), p)
    return np.random.choice(len(probs), p=probs)

idx = sample(logits, t=0.8, p=0.9)
print("next token:", tokens[idx])
```

Swap the toy `logits` for a real model's output and this is exactly how ChatGPT picks each word. The [reasoning LLM built from scratch](/posts/Build-a-Reasoning-LLM-from-Scratch-in-Python/) runs this same sampling step in its generation loop.

## Frequently Asked Questions

### What temperature should I use?

Use 0 for deterministic tasks like classification or extraction, around 0.7 for balanced chat, and 1.0+ for creative writing or brainstorming. Test on your own prompts — the right value depends on the task.

### What is the difference between top-k and top-p?

Top-k keeps a fixed number of candidate tokens; top-p keeps a variable number that together reach a probability mass. Top-p adapts to the model's confidence, which usually gives more natural output.

### Why does the model repeat itself at low temperature?

Low temperature and greedy decoding keep picking the highest-probability token, which can loop on common phrases. Raising temperature or adding a repetition penalty breaks the loop.

## Takeaways

- LLMs generate one token at a time: logits → softmax → sample → repeat.
- Temperature dials randomness; top-p and top-k trim the nonsense tail.
- Temperature 0 for deterministic tasks, higher for creative ones.

To see these knobs inside a complete model, build [a reasoning LLM from scratch](/posts/Build-a-Reasoning-LLM-from-Scratch-in-Python/).
