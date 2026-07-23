---
title: "The Attention Mechanism in LLMs, Explained with Python"
description: Understand self-attention — the core of every transformer — by building it in NumPy. Queries, keys, values, scaling, and softmax, explained with runnable code.
date: 2026-07-14 12:00:00 +0530
categories: [Python, AI]
tags: [python, attention, transformers, llm, deep-learning]
image:
  path: "/commons/The Attention Mechanism in LLMs Explained with Python.webp"
  alt: "Self-attention computation showing queries, keys, values, and a softmax attention matrix"
---

## The One Idea Behind Every LLM

Every modern LLM runs on attention. The concept sounds abstract until you compute it once by hand. Attention lets each token look at every other token and decide which ones matter for its meaning. This post builds self-attention in NumPy — no framework — so the math stops being a black box.

```bash
pip install numpy
```

## Queries, Keys, and Values

Each token becomes three vectors. The **query** asks "what am I looking for?", the **key** advertises "what do I offer?", and the **value** carries the actual content. Attention scores every query against every key, then blends values by those scores.

```python
import numpy as np

# 3 tokens, each a 4-dim embedding
X = np.array([
    [1.0, 0.0, 1.0, 0.0],
    [0.0, 2.0, 0.0, 2.0],
    [1.0, 1.0, 1.0, 1.0],
])

# Learned projection matrices (random here; trained in a real model)
rng = np.random.default_rng(0)
W_q = rng.normal(size=(4, 4))
W_k = rng.normal(size=(4, 4))
W_v = rng.normal(size=(4, 4))

Q = X @ W_q
K = X @ W_k
V = X @ W_v
```

## Scoring and Scaling

Score every query against every key with a dot product. Then divide by the square root of the key dimension — without this scaling, large dot products push softmax into tiny gradients.

```python
d_k = K.shape[1]
scores = Q @ K.T / np.sqrt(d_k)   # shape (3, 3): token-to-token
```

Row `i` of `scores` says how much token `i` attends to each other token.

## Softmax and the Weighted Sum

Softmax turns raw scores into weights that sum to 1. Multiply those weights by the values and you get each token's new, context-aware representation.

```python
def softmax(x):
    e = np.exp(x - x.max(axis=-1, keepdims=True))  # subtract max for stability
    return e / e.sum(axis=-1, keepdims=True)

weights = softmax(scores)     # attention matrix, rows sum to 1
output = weights @ V          # context-aware embeddings
print(weights.round(2))
print(output.round(2))
```

That's the entire mechanism: project, score, scale, softmax, blend. Stack this many times and you have a transformer.

## Why the Softmax Trick Matters

Notice `x - x.max(...)` inside softmax. Exponentiating large numbers overflows to infinity; subtracting the row max keeps values bounded without changing the result. Skip it and long sequences produce `nan`. This is the kind of numerical detail that separates a demo from something that trains.

## Multi-Head Attention in One Line of Intuition

Real models run several attention computations in parallel — "heads" — each with its own `W_q`, `W_k`, `W_v`. One head might track syntax, another long-range references. The outputs concatenate. Everything above just runs `h` times with different weights. These learned representations connect directly to [embeddings](/posts/Understanding-Embeddings-From-Word2Vec-to-Modern-LLMs/), which is what the model attends over.

## Frequently Asked Questions

### Why divide by the square root of the key dimension?

Large embedding dimensions produce large dot products, which push softmax toward a near one-hot distribution with vanishing gradients. Dividing by sqrt(d_k) keeps the variance stable so training stays smooth.

### What is the difference between self-attention and cross-attention?

Self-attention has queries, keys, and values all from the same sequence. Cross-attention draws queries from one sequence and keys/values from another — how a decoder attends to an encoder.

### Do I need a GPU to understand this?

No. The NumPy version above runs instantly on any laptop. GPUs matter only when you scale to millions of tokens and many layers.

## Takeaways

- Attention = project to Q/K/V, score, scale, softmax, blend values.
- Scaling by sqrt(d_k) and the softmax max-subtraction are numerical must-haves.
- Multi-head attention is the same computation run several times in parallel.

Next, assemble these pieces into a full model in [build a transformer from scratch](/posts/Build-a-Transformer-from-Scratch-in-Python/).
