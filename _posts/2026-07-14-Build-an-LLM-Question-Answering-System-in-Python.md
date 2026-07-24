---
title: "Build an LLM Question-Answering System in Python"
description: Build a question-answering system in Python that answers from your own documents — chunking, embeddings, retrieval, and grounded generation, end to end.
date: 2026-07-14 17:00:00 +0530
categories: [Python, AI]
tags: [python, question-answering, rag, llm, embeddings]
image:
  path: "/commons/Build an LLM Question Answering System in Python.webp"
  alt: "A question-answering system retrieving document chunks and generating a grounded answer"
---

## Answering Questions From Your Own Documents

An LLM alone answers from its training data — often out of date, sometimes wrong, and blind to your private documents. A question-answering (QA) system fixes this: it retrieves relevant text from your documents, then asks the model to answer using only that text. This guide builds one end to end in Python.

```bash
pip install openai numpy
```

## Chunking the Documents

Long documents don't fit in a prompt and retrieve poorly. Split them into overlapping chunks so each is small and self-contained.

```python
def chunk(text, size=500, overlap=50):
    words = text.split()
    chunks, i = [], 0
    while i < len(words):
        chunks.append(" ".join(words[i:i + size]))
        i += size - overlap   # overlap keeps context across boundaries
    return chunks

docs = chunk(open("handbook.txt").read())
```

Overlap matters: a fact split across a boundary is lost without it.

## Embedding and Retrieval

Turn each chunk into a vector, then find the chunks closest to the question. This is the retrieval half — the same idea behind [vector databases](/posts/Vector-Databases-with-Python-A-Practical-Guide/).

```python
import numpy as np
from openai import OpenAI

client = OpenAI()

def embed(texts):
    r = client.embeddings.create(model="text-embedding-3-small", input=texts)
    return np.array([d.embedding for d in r.data])

doc_vecs = embed(docs)

def retrieve(question, k=3):
    q_vec = embed([question])[0]
    sims = doc_vecs @ q_vec   # cosine sim (vectors are normalized)
    top = sims.argsort()[-k:][::-1]
    return [docs[i] for i in top]
```

For a deeper look at what these vectors represent, see [embeddings](/posts/Understanding-Embeddings-From-Word2Vec-to-Modern-LLMs/).

## Grounded Generation

Feed the retrieved chunks to the model and instruct it to answer only from that context. This is what stops hallucination.

```python
def answer(question):
    context = "\n\n".join(retrieve(question))
    prompt = f"""Answer the question using ONLY the context below.
If the answer isn't in the context, say "I don't know."

Context:
{context}

Question: {question}"""
    r = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0,
    )
    return r.choices[0].message.content

print(answer("How many vacation days do new employees get?"))
```

The "say I don't know" instruction is the single most important line. Without it, the model invents plausible answers when retrieval misses.

## Why Grounding Beats a Bare LLM

Ask a bare LLM about your internal policy and it guesses. Ground it in retrieved text and it quotes your actual handbook — or admits it doesn't know. That "I don't know" is a feature: a wrong answer erodes trust faster than an honest gap. Before shipping, measure retrieval and faithfulness with a [RAG evaluation pipeline](/posts/Building-a-RAG-Evaluation-Pipeline-with-Python/).

## Frequently Asked Questions

### How big should document chunks be?

Around 300-800 words with some overlap works for most text. Too large and retrieval gets noisy; too small and chunks lose context. Tune against your own documents and questions.

### How do I stop the system from hallucinating?

Instruct the model to answer only from the retrieved context and to say "I don't know" otherwise, set temperature to 0, and evaluate faithfulness. Grounding plus an explicit escape hatch does most of the work.

### Do I need a vector database?

Not for a few thousand chunks — a NumPy array and dot product are enough. Reach for a vector database when you scale to millions of chunks or need filtering and persistence.

## Takeaways

- QA = chunk, embed, retrieve, then generate grounded in retrieved text.
- Overlapping chunks and an "I don't know" instruction prevent lost facts and hallucination.
- Start with NumPy; add a vector database only when scale demands it.

To let the model act on its answers — search, calculate, call APIs — turn it into a [tool-calling agent](/posts/Build-an-LLM-Agent-from-Scratch-in-Python/).
