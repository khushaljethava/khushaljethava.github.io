---
title: "Build a Transformer from Scratch in Python"
description: Build a working transformer block in PyTorch from scratch — attention, feed-forward, residuals, and layer norm — and see how the pieces of an LLM fit together.
date: 2026-07-14 13:00:00 +0530
categories: [Python, AI]
tags: [python, transformers, pytorch, llm, deep-learning]
image:
  path: "/commons/Build a Transformer from Scratch in Python.webp"
  alt: "A transformer block showing attention, add-and-norm, and feed-forward layers stacked"
---

## Assembling the LLM Engine

A transformer is a stack of identical blocks. Each block does two things: mix information across tokens with attention, then process each token independently with a small neural network. Wrap both in residual connections and layer norm and you have the engine behind every LLM. This post builds one block in PyTorch.

```bash
pip install torch
```

If the attention math below looks unfamiliar, start with [the attention mechanism explained](/posts/The-Attention-Mechanism-in-LLMs-Explained-with-Python/).

## Multi-Head Self-Attention

PyTorch gives us the projections and batched matmuls. Here's attention as a module.

```python
import torch
import torch.nn as nn
import torch.nn.functional as F

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, n_heads):
        super().__init__()
        self.n_heads = n_heads
        self.d_head = d_model // n_heads
        self.qkv = nn.Linear(d_model, d_model * 3)
        self.out = nn.Linear(d_model, d_model)

    def forward(self, x):
        B, T, C = x.shape
        q, k, v = self.qkv(x).chunk(3, dim=-1)
        # split into heads: (B, n_heads, T, d_head)
        q, k, v = [t.view(B, T, self.n_heads, self.d_head).transpose(1, 2)
                   for t in (q, k, v)]
        att = (q @ k.transpose(-2, -1)) / self.d_head ** 0.5
        att = F.softmax(att, dim=-1)
        y = (att @ v).transpose(1, 2).reshape(B, T, C)
        return self.out(y)
```

## The Feed-Forward Network

After tokens exchange information, each is processed independently by a two-layer MLP that expands then contracts the dimension. This is where much of the model's capacity lives.

```python
class FeedForward(nn.Module):
    def __init__(self, d_model, mult=4):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(d_model, d_model * mult),
            nn.GELU(),
            nn.Linear(d_model * mult, d_model),
        )

    def forward(self, x):
        return self.net(x)
```

## Residuals and Layer Norm

The two sublayers are wrapped in residual connections (`x + sublayer(x)`) with layer norm applied first. Residuals let gradients flow through deep stacks; without them, training deep transformers stalls.

```python
class Block(nn.Module):
    def __init__(self, d_model, n_heads):
        super().__init__()
        self.ln1 = nn.LayerNorm(d_model)
        self.attn = MultiHeadAttention(d_model, n_heads)
        self.ln2 = nn.LayerNorm(d_model)
        self.ff = FeedForward(d_model)

    def forward(self, x):
        x = x + self.attn(self.ln1(x))   # pre-norm residual
        x = x + self.ff(self.ln2(x))
        return x
```

## Running a Forward Pass

```python
block = Block(d_model=64, n_heads=8)
x = torch.randn(2, 10, 64)   # batch 2, 10 tokens, dim 64
print(block(x).shape)        # torch.Size([2, 10, 64]) — shape preserved
```

The output shape matches the input, which is the point: blocks stack. Chain twelve of these, add token and positional embeddings at the bottom and a linear head at the top, and you have a GPT.

## Pre-Norm vs Post-Norm

Notice layer norm runs *before* each sublayer, not after. The original 2017 transformer used post-norm; modern LLMs almost all switched to pre-norm because it trains more stably at depth without careful learning-rate warmup. It's a one-line change with an outsized effect — the kind of detail that only shows up when you build it yourself.

## Frequently Asked Questions

### Why expand the feed-forward dimension by 4x?

The wider hidden layer gives the network room to compute richer per-token transformations before compressing back. Four is a convention from the original paper that most models still follow.

### What adds word order if attention is order-agnostic?

Attention alone treats input as a bag of tokens. Positional embeddings — added to token embeddings before the first block — inject order. Modern models often use rotary positional embeddings instead.

### Can I train this on a laptop?

A small block trains on CPU for toy data. Real language modeling needs a GPU and [quantization](/posts/Quantization-for-LLMs-Run-Big-Models-on-Small-Hardware/) to fit larger models in limited memory.

## Takeaways

- A transformer block = attention + feed-forward, each in a pre-norm residual.
- Output shape equals input shape, which is why blocks stack cleanly.
- Pre-norm and residuals are what make deep stacks trainable.

Put it to work: see how a full model reasons in [build a reasoning LLM from scratch](/posts/Build-a-Reasoning-LLM-from-Scratch-in-Python/).
