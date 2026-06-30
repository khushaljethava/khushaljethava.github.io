---
title: "Building a RAG Evaluation Pipeline with Python"
description: Learn how to evaluate RAG systems in Python using retrieval metrics, faithfulness scoring, and RAGAS. Build a complete evaluation pipeline to catch hallucinations before production.
date: 2026-06-19 13:00:00 +0530
categories: [Python, AI]
tags: [python, rag, evaluation, ragas, llm-evaluation]
image:
  path: "/commons/Building a RAG Evaluation Pipeline with Python.webp"
  alt: "RAG evaluation pipeline diagram showing retrieval metrics, faithfulness, and answer relevance scoring"
---

## Why "It Looks Right" Isn't Enough

A RAG system can return fluent, confident answers that are still wrong — retrieving the wrong context, or generating claims the context doesn't support. Without metrics, you find out from users, not tests. This guide builds the evaluation layer that should sit on top of any [RAG pipeline](/posts/RAG-with-Python-Retrieval-Augmented-Generation/) before it ships.

```bash
pip install ragas datasets langchain-openai
```

## The Four Core RAG Metrics

```text
Context Precision  -- Of the retrieved chunks, how many were actually relevant?
Context Recall      -- Of the relevant chunks that exist, how many were retrieved?
Faithfulness         -- Is the generated answer supported by the retrieved context?
Answer Relevance     -- Does the answer actually address the question asked?
```

Context precision/recall evaluate your **retrieval** step — the same vector search covered in [Vector Databases with Python](/posts/Vector-Databases-with-Python-A-Practical-Guide/). Faithfulness and answer relevance evaluate your **generation** step.

## Setting Up a Test Dataset

```python
test_data = [
    {
        "question": "What is the time complexity of binary search?",
        "ground_truth": "Binary search runs in O(log n) time.",
        "contexts": ["Binary search repeatedly divides the search interval in half, giving it O(log n) time complexity."],
        "answer": "Binary search has O(log n) time complexity.",
    },
    {
        "question": "What does SMOTE stand for?",
        "ground_truth": "Synthetic Minority Over-sampling Technique.",
        "contexts": ["SMOTE generates synthetic samples for the minority class to handle imbalanced data."],
        "answer": "SMOTE stands for Synthetic Minority Over-sampling Technique.",
    },
]
```

In practice, `contexts` and `answer` come from running your actual RAG pipeline against each question — `ground_truth` is the reference answer a human verified.

## Running RAGAS Metrics

```python
from datasets import Dataset
from ragas import evaluate
from ragas.metrics import context_precision, context_recall, faithfulness, answer_relevancy

dataset = Dataset.from_list(test_data)

results = evaluate(
    dataset,
    metrics=[context_precision, context_recall, faithfulness, answer_relevancy],
)

print(results)
```

```text
{'context_precision': 0.91, 'context_recall': 0.87, 'faithfulness': 0.95, 'answer_relevancy': 0.93}
```

Each score is 0–1. A faithfulness score below ~0.8 is a strong signal your model is hallucinating beyond what the retrieved context supports — investigate before shipping.

## Building a Faithfulness Check Without RAGAS

If you want a lightweight check without the full library, you can use an LLM-as-judge pattern directly:

```python
from openai import OpenAI

client = OpenAI()

def check_faithfulness(answer: str, context: str) -> dict:
    prompt = f"""Given the CONTEXT below, determine if the ANSWER is fully supported by it.
Reply in JSON: {% raw %}{{"faithful": true/false, "unsupported_claims": ["..."]}}{% endraw %}

CONTEXT: {context}
ANSWER: {answer}
"""
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"},
    )
    import json
    return json.loads(response.choices[0].message.content)

result = check_faithfulness(
    answer="Binary search runs in O(log n) time and was invented in 1946.",
    context="Binary search repeatedly divides the search interval in half, giving it O(log n) time complexity.",
)
print(result)
```

```text
{'faithful': False, 'unsupported_claims': ['was invented in 1946']}
```

This catches a real failure mode: the model adding a plausible-sounding fact that isn't anywhere in the retrieved context.

## Tracking Scores Over Time

```python
import pandas as pd
from datetime import datetime

def log_evaluation(results: dict, run_name: str):
    row = {"run": run_name, "timestamp": datetime.now().isoformat(), **results}
    df = pd.DataFrame([row])
    df.to_csv("rag_eval_history.csv", mode="a", header=not pd.io.common.file_exists("rag_eval_history.csv"), index=False)

log_evaluation(results, run_name="v2-chunk-size-512")
```

Tracking scores across runs is how you tell whether a change — a new chunk size, a different embedding model, a reranker — actually improved retrieval, instead of guessing.

## CI Gate Example

```python
MIN_FAITHFULNESS = 0.85
MIN_CONTEXT_RECALL = 0.80

def evaluation_gate(results: dict) -> bool:
    if results["faithfulness"] < MIN_FAITHFULNESS:
        print(f"FAIL: faithfulness {results['faithfulness']:.2f} below {MIN_FAITHFULNESS}")
        return False
    if results["context_recall"] < MIN_CONTEXT_RECALL:
        print(f"FAIL: context_recall {results['context_recall']:.2f} below {MIN_CONTEXT_RECALL}")
        return False
    return True
```

Wiring this into CI turns "did this change make retrieval worse?" from a manual review into an automated gate, the same way unit tests gate regular code changes.

## Key Takeaways

- Evaluate retrieval (precision, recall) and generation (faithfulness, relevance) as separate concerns
- Faithfulness scoring catches hallucinated claims that aren't supported by retrieved context
- RAGAS gives you these metrics out of the box; an LLM-as-judge prompt works for lightweight custom checks
- Track evaluation scores over time to know if a pipeline change actually helped
- Set minimum thresholds and gate deployments on them — don't ship retrieval regressions silently
- Evaluation is what turns "this looks like it works" into a measurable, reproducible answer

## Related Posts

- [RAG with Python: Build a Retrieval-Augmented Generation System](/posts/RAG-with-Python-Retrieval-Augmented-Generation/) -- The pipeline this evaluation framework is designed to test.
- [Vector Databases with Python: A Practical Guide](/posts/Vector-Databases-with-Python-A-Practical-Guide/) -- Improve the retrieval step that context precision and recall measure.
- [Explainable AI with Python: SHAP and LIME](/posts/Explainable-AI-with-Python-SHAP-LIME/) -- Add interpretability on top of evaluation to understand why retrieval fails.
