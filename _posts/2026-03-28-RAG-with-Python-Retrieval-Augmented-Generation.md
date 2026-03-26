---
title: "RAG with Python: Build a Retrieval-Augmented Generation System"
description: Learn how to build a Retrieval-Augmented Generation (RAG) system with Python using ChromaDB, FAISS, OpenAI embeddings, and LangChain. Complete working examples included.
date: 2026-03-28 12:00:00 +0800
categories: [Python]
tags: [python, ai, rag, llm]
image:
  path: "/commons/RAG with Python Build a Retrieval-Augmented Generation System.png"
  alt: "RAG with Python: Build a Retrieval-Augmented Generation System"
---

## What Is RAG and Why Does It Matter?

Retrieval-Augmented Generation (RAG) is a technique that gives an LLM access to external knowledge by retrieving relevant documents before generating a response. Instead of relying solely on what the model learned during training, RAG fetches specific information from your own data and includes it in the prompt.

```python
# The RAG pattern in pseudocode
user_question = "What is our company's refund policy?"

# Step 1: Retrieve relevant documents
relevant_docs = vector_store.search(user_question, top_k=3)

# Step 2: Augment the prompt
prompt = f"""Answer the question based on the following context:

{relevant_docs}

Question: {user_question}"""

# Step 3: Generate the answer
answer = llm.generate(prompt)
```

This solves three major problems with vanilla LLMs:

- **Stale knowledge** -- LLMs have a training cutoff date. RAG lets them access current information.
- **Hallucination** -- By grounding responses in actual documents, the model is less likely to fabricate facts.
- **Domain specificity** -- You can point RAG at your internal docs, codebases, or databases.

## Setting Up the Environment

Install the required packages:

```bash
pip install openai langchain langchain-openai langchain-community chromadb faiss-cpu pypdf tiktoken
```

Set your OpenAI API key:

```python
import os
os.environ["OPENAI_API_KEY"] = "your-api-key-here"
```

## Step 1: Loading Documents

The first step is loading your source documents. LangChain provides loaders for many file types.

```python
from langchain_community.document_loaders import (
    PyPDFLoader,
    TextLoader,
    DirectoryLoader,
)

# Load a single PDF
pdf_loader = PyPDFLoader("company_handbook.pdf")
pdf_docs = pdf_loader.load()
print(f"Loaded {len(pdf_docs)} pages from PDF")

# Load a single text file
text_loader = TextLoader("faq.txt", encoding="utf-8")
text_docs = text_loader.load()

# Load all .txt files from a directory
dir_loader = DirectoryLoader(
    "documents/",
    glob="**/*.txt",
    loader_cls=TextLoader,
    loader_kwargs={"encoding": "utf-8"}
)
all_docs = dir_loader.load()
print(f"Loaded {len(all_docs)} documents from directory")
```

Each document object has two attributes: `page_content` (the text) and `metadata` (source file, page number, etc.).

```python
for doc in pdf_docs[:2]:
    print(f"Source: {doc.metadata['source']}, Page: {doc.metadata.get('page', 'N/A')}")
    print(f"Content preview: {doc.page_content[:200]}")
    print("---")
```

## Step 2: Chunking Documents

LLMs have context length limits, and embedding models work best on smaller text segments. You need to split documents into chunks.

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    length_function=len,
    separators=["\n\n", "\n", ". ", " ", ""]
)

chunks = splitter.split_documents(all_docs)
print(f"Split {len(all_docs)} documents into {len(chunks)} chunks")
```

The `RecursiveCharacterTextSplitter` tries to split on paragraph boundaries first, then sentences, then words. The `chunk_overlap` parameter creates overlap between consecutive chunks so that context is not lost at boundaries.

Choosing chunk size matters:

- **Smaller chunks (200-500 chars)** -- More precise retrieval, but may lose context.
- **Larger chunks (1000-2000 chars)** -- More context per chunk, but less precise matching.
- **Overlap (10-20% of chunk size)** -- Prevents important information from being split across chunks.

```python
# Inspect chunk sizes
sizes = [len(c.page_content) for c in chunks]
print(f"Min: {min(sizes)}, Max: {max(sizes)}, Avg: {sum(sizes)/len(sizes):.0f}")
```

## Step 3: Generating Embeddings

Embeddings convert text into numerical vectors that capture semantic meaning. Similar texts produce similar vectors, which enables semantic search.

```python
from langchain_openai import OpenAIEmbeddings

embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

# Embed a single query to test
test_embedding = embeddings.embed_query("What is the refund policy?")
print(f"Embedding dimension: {len(test_embedding)}")
print(f"First 5 values: {test_embedding[:5]}")
```

The `text-embedding-3-small` model produces 1536-dimensional vectors. Each dimension captures some aspect of the text's meaning, and the cosine similarity between two vectors indicates how semantically similar the texts are.

You can also use free, local embeddings to avoid API costs:

```python
from langchain_community.embeddings import HuggingFaceEmbeddings

embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
```

## Step 4: Creating a Vector Store with ChromaDB

ChromaDB is an open-source vector database that runs locally with no setup required.

```python
from langchain_community.vectorstores import Chroma

# Create vector store and embed all chunks
vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory="./chroma_db",
    collection_name="my_documents"
)

print(f"Stored {vectorstore._collection.count()} chunks in ChromaDB")
```

To load an existing vector store later:

```python
vectorstore = Chroma(
    persist_directory="./chroma_db",
    embedding_function=embeddings,
    collection_name="my_documents"
)
```

Test retrieval:

```python
results = vectorstore.similarity_search("refund policy", k=3)
for i, doc in enumerate(results):
    print(f"\n--- Result {i+1} ---")
    print(f"Source: {doc.metadata.get('source', 'unknown')}")
    print(f"Content: {doc.page_content[:300]}")
```

## Step 4 (Alternative): Using FAISS

FAISS (Facebook AI Similarity Search) is faster for large-scale vector search. It runs entirely in memory.

```python
from langchain_community.vectorstores import FAISS

# Create FAISS index
faiss_store = FAISS.from_documents(
    documents=chunks,
    embedding=embeddings
)

# Save to disk
faiss_store.save_local("./faiss_index")

# Load from disk
faiss_store = FAISS.load_local(
    "./faiss_index",
    embeddings,
    allow_dangerous_deserialization=True
)

# Search with scores
results = faiss_store.similarity_search_with_score("refund policy", k=3)
for doc, score in results:
    print(f"Score: {score:.4f} | {doc.page_content[:100]}")
```

The score from FAISS is the L2 distance -- lower means more similar.

## Step 5: Building the RAG Chain

Now combine retrieval with LLM generation:

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

llm = ChatOpenAI(model="gpt-4o", temperature=0)
retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

template = """Answer the question based only on the following context. If the context does not contain enough information to answer, say "I don't have enough information to answer this question."

Context:
{context}

Question: {question}

Answer:"""

prompt = ChatPromptTemplate.from_template(template)

def format_docs(docs):
    return "\n\n---\n\n".join(
        f"Source: {doc.metadata.get('source', 'unknown')}\n{doc.page_content}"
        for doc in docs
    )

rag_chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

# Ask a question
answer = rag_chain.invoke("What is the company's refund policy?")
print(answer)
```

## Complete Working Example

Here is a self-contained RAG system that works with text files:

```python
import os
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_core.documents import Document

os.environ["OPENAI_API_KEY"] = "your-api-key-here"

class RAGSystem:
    def __init__(self, persist_dir: str = "./rag_db"):
        self.embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
        self.llm = ChatOpenAI(model="gpt-4o", temperature=0)
        self.persist_dir = persist_dir
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000, chunk_overlap=200
        )
        self.vectorstore = None
        self.rag_chain = None

    def ingest(self, texts: list[str], metadatas: list[dict] = None):
        """Ingest raw text strings into the vector store."""
        docs = []
        for i, text in enumerate(texts):
            meta = metadatas[i] if metadatas else {"source": f"text_{i}"}
            docs.append(Document(page_content=text, metadata=meta))

        chunks = self.splitter.split_documents(docs)

        if self.vectorstore is None:
            self.vectorstore = Chroma.from_documents(
                documents=chunks,
                embedding=self.embeddings,
                persist_directory=self.persist_dir
            )
        else:
            self.vectorstore.add_documents(chunks)

        self._build_chain()
        return len(chunks)

    def ingest_directory(self, directory: str, glob_pattern: str = "**/*.txt"):
        """Ingest all matching files from a directory."""
        from langchain_community.document_loaders import DirectoryLoader, TextLoader

        loader = DirectoryLoader(
            directory, glob=glob_pattern,
            loader_cls=TextLoader, loader_kwargs={"encoding": "utf-8"}
        )
        docs = loader.load()
        chunks = self.splitter.split_documents(docs)

        if self.vectorstore is None:
            self.vectorstore = Chroma.from_documents(
                documents=chunks,
                embedding=self.embeddings,
                persist_directory=self.persist_dir
            )
        else:
            self.vectorstore.add_documents(chunks)

        self._build_chain()
        return len(chunks)

    def _build_chain(self):
        retriever = self.vectorstore.as_retriever(search_kwargs={"k": 4})

        template = """Answer the question based only on the following context.
If the context does not contain the answer, say so.

Context:
{context}

Question: {question}

Answer:"""
        prompt = ChatPromptTemplate.from_template(template)

        def format_docs(docs):
            return "\n\n---\n\n".join(doc.page_content for doc in docs)

        self.rag_chain = (
            {"context": retriever | format_docs, "question": RunnablePassthrough()}
            | prompt
            | self.llm
            | StrOutputParser()
        )

    def ask(self, question: str) -> str:
        if self.rag_chain is None:
            return "No documents ingested yet."
        return self.rag_chain.invoke(question)

    def search(self, query: str, k: int = 5) -> list:
        if self.vectorstore is None:
            return []
        return self.vectorstore.similarity_search(query, k=k)


# Usage
rag = RAGSystem()

rag.ingest([
    "Our refund policy allows returns within 30 days of purchase. Items must be unused and in original packaging. Digital products are non-refundable.",
    "Shipping takes 3-5 business days for domestic orders and 10-15 business days for international orders. Express shipping is available for an additional fee.",
    "Customer support is available Monday through Friday, 9 AM to 5 PM EST. You can reach us by email at support@example.com or by phone at 1-800-555-0123."
], metadatas=[
    {"source": "refund_policy.txt"},
    {"source": "shipping_info.txt"},
    {"source": "contact_info.txt"},
])

print(rag.ask("How long do I have to return an item?"))
print(rag.ask("How can I contact customer support?"))
print(rag.ask("What is the meaning of life?"))
```

## Advanced: Hybrid Search

Combine keyword search (BM25) with semantic search for better results:

```python
from langchain.retrievers import EnsembleRetriever
from langchain_community.retrievers import BM25Retriever

bm25_retriever = BM25Retriever.from_documents(chunks)
bm25_retriever.k = 4

vector_retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

hybrid_retriever = EnsembleRetriever(
    retrievers=[bm25_retriever, vector_retriever],
    weights=[0.5, 0.5]
)

results = hybrid_retriever.invoke("refund policy for digital products")
for doc in results:
    print(doc.page_content[:200])
    print("---")
```

Hybrid search catches cases where semantic search misses exact keyword matches and vice versa.

## Advanced: Reranking Retrieved Documents

Retrieval returns the top-k most similar chunks, but similarity does not always equal relevance. A reranker scores each retrieved document against the actual question:

```python
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import CrossEncoderReranker
from langchain_community.cross_encoders import HuggingFaceCrossEncoder

cross_encoder = HuggingFaceCrossEncoder(model_name="cross-encoder/ms-marco-MiniLM-L-6-v2")
reranker = CrossEncoderReranker(model=cross_encoder, top_n=3)

compression_retriever = ContextualCompressionRetriever(
    base_compressor=reranker,
    base_retriever=vectorstore.as_retriever(search_kwargs={"k": 10})
)

results = compression_retriever.invoke("digital product refund")
for doc in results:
    print(doc.page_content[:200])
```

## Evaluating Your RAG System

You need to measure both retrieval quality and generation quality.

```python
def evaluate_retrieval(questions_and_answers: list[dict], retriever, k: int = 4):
    """Evaluate retrieval accuracy."""
    hits = 0
    total = len(questions_and_answers)

    for qa in questions_and_answers:
        results = retriever.invoke(qa["question"])
        retrieved_texts = " ".join(doc.page_content for doc in results)
        if qa["expected_keyword"] in retrieved_texts.lower():
            hits += 1

    recall = hits / total
    print(f"Retrieval recall@{k}: {recall:.2%}")
    return recall

test_cases = [
    {"question": "What is the refund window?", "expected_keyword": "30 days"},
    {"question": "How long does shipping take?", "expected_keyword": "3-5 business days"},
    {"question": "What is the support email?", "expected_keyword": "support@example.com"},
]

evaluate_retrieval(test_cases, retriever=vectorstore.as_retriever(search_kwargs={"k": 4}))
```

## Common Pitfalls

**Chunk size too large or too small.** Experiment with different sizes. Start with 1000 characters and 200 overlap, then adjust based on retrieval quality.

**Not including metadata.** Always store the source file, page number, and any other relevant metadata. This lets you cite sources in answers.

**Ignoring the "I don't know" case.** Your prompt must instruct the LLM to say when it cannot answer from the provided context. Otherwise, it will hallucinate.

**Not updating the index.** If your source documents change, you need to re-ingest them. Build an update pipeline that detects changes and refreshes affected chunks.

## Summary

RAG gives LLMs access to your specific data without fine-tuning. The pipeline is: load documents, chunk them, embed them into a vector store, retrieve relevant chunks at query time, and pass them to an LLM for generation. ChromaDB works well for prototypes and small-to-medium datasets. FAISS is better for large-scale deployments. Hybrid search and reranking improve retrieval quality. Always evaluate both retrieval accuracy and generation quality to ensure your system works reliably.
