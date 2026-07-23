---
title: "Decoder-Only vs Encoder-Decoder LLMs: Which and Why"
description: Decoder-only vs encoder-decoder LLMs explained — how GPT, BERT, and T5 differ, why most modern LLMs are decoder-only, and which architecture fits your task.
date: 2026-07-14 18:00:00 +0530
categories: [AI]
tags: [llm, transformers, architecture, gpt, bert]
image:
  path: "/commons/Decoder Only vs Encoder Decoder LLMs.webp"
  alt: "Comparison of encoder-only, decoder-only, and encoder-decoder transformer architectures"
---

## Why GPT and BERT Are Built Differently

All three are transformers, yet GPT, BERT, and T5 have fundamentally different shapes. The difference comes down to one choice: which parts of the transformer you keep, and how attention is allowed to look at the sequence. That choice decides what the model is good at. This post explains the three families and why decoder-only won.

If you want the machinery underneath, see [build a transformer from scratch](/posts/Build-a-Transformer-from-Scratch-in-Python/).

## The Three Families

There are three architectures, defined by which transformer stack they use.

```text
Encoder-only    (BERT)   -- reads the whole input at once; great at understanding
Decoder-only    (GPT)    -- generates left-to-right; great at producing text
Encoder-Decoder (T5)     -- reads input, then generates output; great at translation
```

Encoder-only sees every token bidirectionally, so it builds rich representations — ideal for classification and search. Decoder-only sees only past tokens, so it predicts the next one — ideal for generation.

## The Attention Difference

The split is really about the attention mask. An encoder uses **bidirectional** attention: every token attends to every other. A decoder uses **causal** attention: a token attends only to tokens before it, so it can't peek at the future it's trying to predict.

```python
import torch

T = 4
# Causal mask: position i can only attend to positions <= i
causal = torch.tril(torch.ones(T, T))
print(causal)
# tensor([[1, 0, 0, 0],
#         [1, 1, 0, 0],
#         [1, 1, 1, 0],
#         [1, 1, 1, 1]])
```

That lower-triangular mask is the entire architectural difference in code. Bidirectional models drop the mask; causal models apply it.

## Why Decoder-Only Won

Nearly every large model today — GPT, Llama, Mistral — is decoder-only. The reason is scale and simplicity. A decoder-only model does one thing, next-token prediction, so it trains on any raw text with no labels and scales cleanly to trillions of tokens. It also turns out that a big decoder can *do* understanding tasks by framing them as generation ("The sentiment is ___"), collapsing three architectures into one. See this in action in [sentiment analysis with LLMs](/posts/Sentiment-Analysis-with-LLMs-in-Python/).

Encoder-decoder still wins where input and output are clearly separate — translation, summarization — but the gap has narrowed as decoders scaled.

## Which Should You Use?

Use a decoder-only model (GPT-style) for generation, chat, agents, and general tasks — it's the default now. Use an encoder-only model (BERT-style) when you need fast, cheap embeddings or classification at scale and don't need generation. Reach for encoder-decoder (T5-style) for dedicated translation or summarization pipelines. For most projects, a decoder-only model plus good prompting covers everything.

## Frequently Asked Questions

### Why are most modern LLMs decoder-only?

Decoder-only models train on raw unlabeled text via next-token prediction, scale simply, and can handle understanding tasks by framing them as generation. That flexibility and training simplicity made them the default at scale.

### Is BERT an LLM?

BERT is a large language model in the broad sense, but it's encoder-only and can't generate text freely. It excels at understanding tasks — classification, search, embeddings — not open-ended generation.

### When is encoder-decoder still better?

When input and output are distinct sequences, like translating a sentence or summarizing a document. The dedicated encoder builds a clean representation of the input before the decoder generates, which helps on these tasks.

## Takeaways

- The difference is the attention mask: bidirectional (encoder) vs causal (decoder).
- Decoder-only won because it trains simply on raw text and scales.
- Decoder-only for generation, encoder-only for embeddings, encoder-decoder for translation.

To see how a decoder actually produces text token by token, read [how LLMs generate text](/posts/How-LLMs-Generate-Text-Temperature-Top-p-and-Sampling/).
