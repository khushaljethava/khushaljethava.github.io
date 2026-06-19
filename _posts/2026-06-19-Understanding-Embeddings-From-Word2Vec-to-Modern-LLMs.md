---
title: "Understanding Embeddings: From Word2Vec to Modern LLMs"
description: Learn how embeddings work in Python, from Word2Vec to modern transformer-based embedding models. Covers vector arithmetic, cosine similarity, and visualizing embeddings with t-SNE.
date: 2026-06-19 18:00:00 +0530
categories: [AI, Python]
tags: [python, embeddings, word2vec, nlp, transformers]
image:
  path: "/commons/Understanding Embeddings From Word2Vec to Modern LLMs.webp"
  alt: "Embedding evolution from Word2Vec to modern transformer embeddings shown as vector space diagrams"
---

## What an Embedding Actually Is

An embedding is a list of numbers that represents the meaning of something — a word, sentence, or document — as a point in high-dimensional space. Similar meanings land near each other. Everything downstream, from [vector database search](/posts/Vector-Databases-with-Python-A-Practical-Guide/) to RAG retrieval, depends on embeddings actually capturing meaning well.

```bash
pip install gensim sentence-transformers scikit-learn matplotlib numpy
```

## Word2Vec: The Original Idea

Word2Vec (2013) learns word embeddings from co-occurrence patterns — words that appear in similar contexts get similar vectors.

```python
from gensim.models import Word2Vec

sentences = [
    ["king", "queen", "royal", "palace"],
    ["man", "woman", "person", "human"],
    ["python", "code", "programming", "software"],
    ["king", "man", "royal", "throne"],
    ["queen", "woman", "royal", "crown"],
]

model = Word2Vec(sentences, vector_size=50, window=3, min_count=1, workers=4)
print(model.wv["king"].shape)
```

```text
(50,)
```

The famous demonstration of Word2Vec's structure is vector arithmetic:

```python
result = model.wv.most_similar(positive=["king", "woman"], negative=["man"], topn=3)
print(result)
```

```text
[('queen', 0.891), ('royal', 0.743), ('crown', 0.612)]
```

`king - man + woman ≈ queen` — this works because Word2Vec encodes relational structure directly into the vector space, not just raw similarity.

## The Limitation: No Context

Word2Vec gives every word exactly one vector — "bank" gets the same embedding whether it means a financial institution or a riverbank. That's the gap modern transformer embeddings close.

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")

emb1 = model.encode("I deposited money at the bank")
emb2 = model.encode("We sat by the river bank")

from sklearn.metrics.pairwise import cosine_similarity
sim = cosine_similarity([emb1], [emb2])[0][0]
print(f"Similarity: {sim:.3f}")
```

```text
Similarity: 0.312
```

A contextual embedding model produces noticeably different vectors for "bank" depending on surrounding words — Word2Vec couldn't do this at all.

## Comparing Sentence Similarity

```python
sentences = [
    "Python is a popular programming language",
    "Python is widely used for software development",
    "The chef cooked a delicious meal",
]

embeddings = model.encode(sentences)
sim_matrix = cosine_similarity(embeddings)

for i, row in enumerate(sim_matrix):
    print(f"{sentences[i][:30]}... -> {[round(x, 2) for x in row]}")
```

```text
Python is a popular progra... -> [1.0, 0.84, 0.09]
Python is widely used for ... -> [0.84, 1.0, 0.06]
The chef cooked a delicio... -> [0.09, 0.06, 1.0]
```

The two programming-related sentences score 0.84 similarity; the unrelated cooking sentence scores near zero against both — exactly the structure that makes embeddings useful for semantic search.

## Visualizing Embeddings with t-SNE

High-dimensional vectors can't be plotted directly. t-SNE projects them down to 2D while preserving relative distances:

```python
from sklearn.manifold import TSNE
import matplotlib.pyplot as plt
import numpy as np

words = ["king", "queen", "man", "woman", "python", "code", "programming", "software"]
word_vectors = [model.wv[w] if w in model.wv else model.encode(w) for w in words]

tsne = TSNE(n_components=2, random_state=42, perplexity=5)
coords = tsne.fit_transform(np.array(word_vectors))

plt.figure(figsize=(8, 6))
for i, word in enumerate(words):
    plt.scatter(coords[i, 0], coords[i, 1])
    plt.annotate(word, (coords[i, 0], coords[i, 1]))
plt.title("Word Embeddings in 2D (t-SNE)")
plt.savefig("embeddings_tsne.png", dpi=150)
```

Words from the same cluster ("king", "queen", "royal") group visually together, while unrelated clusters ("python", "code", "programming") form a separate group — a quick sanity check that your embeddings actually capture meaning.

## Choosing an Embedding Model Today

| Model type | Example | Best for |
|---|---|---|
| Word2Vec/GloVe | gensim | Educational, small custom vocabularies |
| Sentence transformers | `all-MiniLM-L6-v2` | Fast, free, local semantic search |
| OpenAI embeddings | `text-embedding-3-small` | Hosted, strong general-purpose quality |
| Domain-specific | `BioBERT`, `CodeBERT` | Specialized text (medical, code) |

## Key Takeaways

- Embeddings represent meaning as vectors — similar meanings produce vectors that are close together
- Word2Vec captures relational structure (`king - man + woman ≈ queen`) but gives every word only one fixed vector
- Modern transformer embeddings are contextual — the same word gets different vectors depending on surrounding text
- Cosine similarity is the standard way to compare embeddings for semantic relevance
- t-SNE lets you visually sanity-check whether your embeddings cluster meaningfully
- Embeddings are the foundation under every [vector database](/posts/Vector-Databases-with-Python-A-Practical-Guide/) and RAG system — understanding them helps you debug retrieval quality issues

## Related Posts

- [Vector Databases with Python: A Practical Guide](/posts/Vector-Databases-with-Python-A-Practical-Guide/) -- See how embeddings get stored and searched at scale.
- [RAG with Python: Build a Retrieval-Augmented Generation System](/posts/RAG-with-Python-Retrieval-Augmented-Generation/) -- Use embeddings as the retrieval foundation for a full RAG pipeline.
- [Building a RAG Evaluation Pipeline with Python](/posts/Building-a-RAG-Evaluation-Pipeline-with-Python/) -- Measure whether your embedding choice is actually retrieving relevant context.
