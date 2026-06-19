---
title: "Vector Databases with Python: A Practical Guide"
description: Learn how vector databases work and how to use them in Python with FAISS, Chroma, and Pinecone. Covers embeddings, similarity search, indexing strategies, and a complete semantic search example.
date: 2026-06-19 09:00:00 +0530
categories: [Python, AI]
tags: [python, vector-database, embeddings, semantic-search, rag]
image:
  path: "/commons/Vector Databases with Python A Practical Guide.webp"
  alt: "Vector database architecture showing embeddings, similarity search, and indexing in Python"
---

## Why Vector Databases Exist

Traditional databases search by exact match or range — `WHERE price < 100`. They can't answer "find me documents similar in meaning to this one." That requires comparing high-dimensional vectors (embeddings), and doing it fast across millions of rows needs specialized indexing. That's what a vector database is for.

If you've worked through [RAG with Python](/posts/RAG-with-Python-Retrieval-Augmented-Generation/), you've already used a vector store. This guide goes deeper: how similarity search actually works, and how to choose between FAISS, Chroma, and Pinecone.

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")
embedding = model.encode("Python is great for data science")
print(embedding.shape)  # (384,)
```

```text
(384,)
```

That 384-number array is the "meaning" of the sentence in vector space. Similar sentences produce vectors that are close together — measured with cosine similarity or Euclidean distance.

## Installation

```bash
pip install sentence-transformers faiss-cpu chromadb pinecone-client numpy
```

## Option 1: FAISS — Local and Free

FAISS (Facebook AI Similarity Search) runs entirely in-process. No server, no API key — ideal for prototyping or small-to-medium datasets.

```python
import faiss
import numpy as np

docs = [
    "Python is a popular programming language for AI",
    "Cats are independent pets that sleep a lot",
    "Machine learning models need large training datasets",
    "Dogs are loyal companions that need daily walks",
]

embeddings = model.encode(docs)
dimension = embeddings.shape[1]

index = faiss.IndexFlatL2(dimension)
index.add(np.array(embeddings).astype("float32"))

query = model.encode(["What language is used for machine learning?"])
distances, indices = index.search(np.array(query).astype("float32"), k=2)

for i, dist in zip(indices[0], distances[0]):
    print(f"{docs[i]}  (distance={dist:.3f})")
```

```text
Python is a popular programming language for AI  (distance=0.812)
Machine learning models need large training datasets  (distance=1.103)
```

`IndexFlatL2` checks every vector — exact but slow at scale. For millions of vectors, swap in an approximate index:

```python
nlist = 100  # number of clusters
quantizer = faiss.IndexFlatL2(dimension)
index_ivf = faiss.IndexIVFFlat(quantizer, dimension, nlist)

index_ivf.train(np.array(embeddings).astype("float32"))
index_ivf.add(np.array(embeddings).astype("float32"))
index_ivf.nprobe = 10  # how many clusters to search
```

`IndexIVFFlat` trades a small amount of accuracy for huge speed gains — this is the same approximate-nearest-neighbor tradeoff that powers production search at scale.

## Option 2: Chroma — Local with Metadata Filtering

Chroma adds persistence and metadata filtering on top of a FAISS-like core, with a much simpler API:

```python
import chromadb

client = chromadb.PersistentClient(path="./chroma_db")
collection = client.create_collection("articles")

collection.add(
    documents=docs,
    metadatas=[{"category": "tech"}, {"category": "pets"}, {"category": "tech"}, {"category": "pets"}],
    ids=["doc1", "doc2", "doc3", "doc4"],
)

results = collection.query(
    query_texts=["What language is used for machine learning?"],
    n_results=2,
    where={"category": "tech"},  # metadata filter
)

print(results["documents"])
```

```text
[['Python is a popular programming language for AI', 'Machine learning models need large training datasets']]
```

The `where` filter is the killer feature: combine semantic search with structured filters like date, category, or user ID — something FAISS can't do natively.

## Option 3: Pinecone — Managed and Scalable

For production workloads with millions of vectors and no infrastructure to manage:

```python
from pinecone import Pinecone, ServerlessSpec

pc = Pinecone(api_key="YOUR_API_KEY")

pc.create_index(
    name="articles",
    dimension=384,
    metric="cosine",
    spec=ServerlessSpec(cloud="aws", region="us-east-1"),
)

index = pc.Index("articles")

vectors = [(f"doc{i}", emb.tolist(), {"text": doc}) for i, (emb, doc) in enumerate(zip(embeddings, docs))]
index.upsert(vectors=vectors)

query_emb = model.encode("What language is used for machine learning?").tolist()
matches = index.query(vector=query_emb, top_k=2, include_metadata=True)

for m in matches["matches"]:
    print(m["metadata"]["text"], m["score"])
```

Pinecone handles sharding, replication, and scaling automatically — you pay for that convenience, but it removes an entire category of ops work.

## Choosing the Right One

| Need | Choose |
|---|---|
| Prototyping, < 1M vectors, no server | FAISS |
| Local app with metadata filters | Chroma |
| Production scale, managed infra | Pinecone |
| Already using Postgres | `pgvector` extension |

## Building a Semantic Search Endpoint

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Query(BaseModel):
    text: str
    top_k: int = 5

@app.post("/search")
def search(query: Query):
    query_emb = model.encode([query.text]).astype("float32")
    distances, indices = index.search(query_emb, k=query.top_k)
    return {
        "results": [
            {"text": docs[i], "score": float(d)}
            for i, d in zip(indices[0], distances[0])
        ]
    }
```

This is the exact pattern used in production RAG systems: embed the query, search the index, return ranked results to feed into an LLM prompt.

## Key Takeaways

- Vector databases store embeddings and answer "what's similar to this?" instead of exact-match queries
- FAISS is best for free, local prototyping; Chroma adds metadata filters; Pinecone handles managed production scale
- Approximate indexes (`IndexIVFFlat`) trade a little accuracy for major speed gains at scale
- Cosine similarity and Euclidean distance are the two standard ways to compare embeddings
- Combine vector search with metadata filters when you need both semantic relevance and structured constraints
- This is the retrieval layer behind every [RAG pipeline](/posts/RAG-with-Python-Retrieval-Augmented-Generation/) — get it right and the rest of the system gets easier

## Related Posts

- [RAG with Python: Build a Retrieval-Augmented Generation System](/posts/RAG-with-Python-Retrieval-Augmented-Generation/) -- See how vector search fits into a full retrieval-augmented generation pipeline.
- [Building a RAG Evaluation Pipeline with Python](/posts/Building-a-RAG-Evaluation-Pipeline-with-Python/) -- Measure whether your vector search is actually retrieving the right context.
- [Understanding Embeddings: From Word2Vec to Modern LLMs](/posts/Understanding-Embeddings-From-Word2Vec-to-Modern-LLMs/) -- Learn how the embeddings that vector databases store and search are actually created.
