---
title: "Sentiment Analysis with Python: From Basics to Production"
description: Complete guide to sentiment analysis with Python using TextBlob, VADER, scikit-learn, and Hugging Face Transformers. Includes building a REST API for production deployment.
date: 2026-03-31 12:00:00 +0800
categories: [Python]
tags: [python, nlp, machine-learning]
image:
  path: "/commons/Sentiment Analysis with Python From Basics to Production.png"
  alt: "Sentiment Analysis with Python: From Basics to Production"
---

## What Is Sentiment Analysis?

Sentiment analysis determines whether a piece of text expresses a positive, negative, or neutral opinion. It is one of the most common NLP tasks, used in product review analysis, social media monitoring, customer feedback processing, and brand tracking.

```python
from textblob import TextBlob

text = "This product is absolutely fantastic, I love it!"
blob = TextBlob(text)
print(f"Sentiment: {blob.sentiment}")
# Sentiment(polarity=0.56, subjectivity=0.73)
```

There are multiple ways to approach sentiment analysis, from simple rule-based methods to fine-tuned deep learning models. Each approach has different trade-offs in terms of accuracy, speed, and setup effort.

## Approach 1: TextBlob for Quick Analysis

TextBlob is the simplest way to get sentiment scores. It uses a pre-built lexicon where words are mapped to polarity scores.

### Installation

```bash
pip install textblob
python -m textblob.download_corpora
```

### Basic Usage

```python
from textblob import TextBlob

texts = [
    "The food was delicious and the service was excellent.",
    "Terrible experience. The room was dirty and staff was rude.",
    "The hotel was okay. Nothing special but not bad either.",
    "I absolutely love this place! Best vacation ever!",
    "Worst purchase I've ever made. Complete waste of money.",
]

for text in texts:
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity      # -1 (negative) to 1 (positive)
    subjectivity = blob.sentiment.subjectivity  # 0 (objective) to 1 (subjective)

    if polarity > 0.1:
        label = "Positive"
    elif polarity < -0.1:
        label = "Negative"
    else:
        label = "Neutral"

    print(f"[{label:>8}] (polarity={polarity:+.2f}) {text[:60]}")
```

Output:

```text
[Positive] (polarity=+0.75) The food was delicious and the service was excellent.
[Negative] (polarity=-0.65) Terrible experience. The room was dirty and staff was rude.
[ Neutral] (polarity=+0.05) The hotel was okay. Nothing special but not bad either.
[Positive] (polarity=+0.63) I absolutely love this place! Best vacation ever!
[Negative] (polarity=-0.52) Worst purchase I've ever made. Complete waste of money.
```

### Analyzing a CSV of Reviews

```python
import pandas as pd
from textblob import TextBlob

df = pd.read_csv("reviews.csv")  # Assumes a "text" column

df["polarity"] = df["text"].apply(lambda x: TextBlob(str(x)).sentiment.polarity)
df["subjectivity"] = df["text"].apply(lambda x: TextBlob(str(x)).sentiment.subjectivity)
df["label"] = df["polarity"].apply(
    lambda p: "Positive" if p > 0.1 else ("Negative" if p < -0.1 else "Neutral")
)

print(df["label"].value_counts())
print(f"\nAverage polarity: {df['polarity'].mean():.3f}")
```

**Limitations of TextBlob:** It relies on word-level polarity scores and misses context, sarcasm, and negation patterns. "Not bad" gets a negative score because "bad" is negative, even though the phrase is mildly positive.

## Approach 2: VADER for Social Media Text

VADER (Valence Aware Dictionary and sEntiment Reasoner) is designed specifically for social media text. It handles emojis, slang, capitalization, and punctuation.

### Installation

```bash
pip install vaderSentiment
```

### Basic Usage

```python
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

analyzer = SentimentIntensityAnalyzer()

texts = [
    "This movie is AMAZING!!!",
    "the food was meh... not great tbh",
    "lol this is SO bad it's funny 😂",
    "Great product, fast shipping, would buy again 👍",
    "DO NOT buy this. Absolute garbage.",
    "It's not bad, actually kind of good.",
]

for text in texts:
    scores = analyzer.polarity_scores(text)
    compound = scores["compound"]  # Normalized score from -1 to 1

    if compound >= 0.05:
        label = "Positive"
    elif compound <= -0.05:
        label = "Negative"
    else:
        label = "Neutral"

    print(f"[{label:>8}] (compound={compound:+.3f}) {text}")
```

VADER returns four scores:

- `neg` — Proportion of text that is negative
- `neu` — Proportion that is neutral
- `pos` — Proportion that is positive
- `compound` — Aggregated score from -1 to +1

```python
text = "The food was great but the service was terrible"
scores = analyzer.polarity_scores(text)
print(scores)
# {'neg': 0.268, 'neu': 0.444, 'pos': 0.288, 'compound': 0.0516}
```

VADER correctly identifies mixed sentiment here — both positive and negative elements are present, and the compound score reflects the slight overall positivity.

### Batch Processing with VADER

```python
import pandas as pd
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

analyzer = SentimentIntensityAnalyzer()

def analyze_sentiment_vader(text):
    scores = analyzer.polarity_scores(str(text))
    compound = scores["compound"]
    if compound >= 0.05:
        return "Positive", compound
    elif compound <= -0.05:
        return "Negative", compound
    return "Neutral", compound

df = pd.read_csv("tweets.csv")
results = df["text"].apply(analyze_sentiment_vader)
df["label"] = results.apply(lambda x: x[0])
df["compound"] = results.apply(lambda x: x[1])

print(df["label"].value_counts())
print(f"\nMost positive: {df.loc[df['compound'].idxmax(), 'text'][:80]}")
print(f"Most negative: {df.loc[df['compound'].idxmin(), 'text'][:80]}")
```

## Approach 3: Custom Model with Scikit-Learn

When you have labeled data, you can train a custom classifier that learns patterns specific to your domain.

```python
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import classification_report
from sklearn.pipeline import Pipeline

# Load labeled data (assumes columns: "text", "label")
# Labels: "positive", "negative", "neutral"
df = pd.read_csv("labeled_reviews.csv")
print(f"Dataset size: {len(df)}")
print(df["label"].value_counts())

X_train, X_test, y_train, y_test = train_test_split(
    df["text"], df["label"], test_size=0.2, random_state=42, stratify=df["label"]
)

# Build a pipeline
pipeline = Pipeline([
    ("tfidf", TfidfVectorizer(
        max_features=10000,
        ngram_range=(1, 2),     # Unigrams and bigrams
        min_df=2,
        max_df=0.95,
        sublinear_tf=True,
    )),
    ("clf", LogisticRegression(
        max_iter=1000,
        C=1.0,
        class_weight="balanced",
    )),
])

# Cross-validation
cv_scores = cross_val_score(pipeline, X_train, y_train, cv=5, scoring="f1_macro")
print(f"Cross-validation F1: {cv_scores.mean():.3f} (+/- {cv_scores.std():.3f})")

# Train and evaluate
pipeline.fit(X_train, y_train)
y_pred = pipeline.predict(X_test)
print(classification_report(y_test, y_pred))
```

### Trying Multiple Classifiers

```python
from sklearn.svm import LinearSVC
from sklearn.naive_bayes import MultinomialNB
from sklearn.ensemble import RandomForestClassifier

classifiers = {
    "Logistic Regression": LogisticRegression(max_iter=1000, C=1.0),
    "Linear SVM": LinearSVC(max_iter=2000, C=1.0),
    "Naive Bayes": MultinomialNB(alpha=0.1),
}

tfidf = TfidfVectorizer(max_features=10000, ngram_range=(1, 2), sublinear_tf=True)
X_train_tfidf = tfidf.fit_transform(X_train)
X_test_tfidf = tfidf.transform(X_test)

for name, clf in classifiers.items():
    clf.fit(X_train_tfidf, y_train)
    y_pred = clf.predict(X_test_tfidf)
    from sklearn.metrics import f1_score
    f1 = f1_score(y_test, y_pred, average="macro")
    print(f"{name:25s} F1-macro: {f1:.3f}")
```

### Saving and Loading the Model

```python
import joblib

# Save
joblib.dump(pipeline, "sentiment_model.joblib")

# Load
loaded_model = joblib.load("sentiment_model.joblib")
prediction = loaded_model.predict(["This product exceeded my expectations!"])
print(f"Prediction: {prediction[0]}")
```

## Approach 4: Hugging Face Transformers

Transformer models provide the highest accuracy for sentiment analysis. You can use pretrained models directly or fine-tune them.

### Installation

```bash
pip install transformers torch
```

### Using a Pretrained Sentiment Model

```python
from transformers import pipeline

# Load a pretrained sentiment analysis model
sentiment_pipeline = pipeline(
    "sentiment-analysis",
    model="cardiffnlp/twitter-roberta-base-sentiment-latest",
    device=0  # Use GPU; set to -1 for CPU
)

texts = [
    "I absolutely love this new feature!",
    "The update completely broke everything.",
    "It works fine, nothing special.",
    "Best customer support I've ever experienced!",
    "This is the worst app on the store.",
]

results = sentiment_pipeline(texts)
for text, result in zip(texts, results):
    print(f"[{result['label']:>8}] ({result['score']:.3f}) {text}")
```

### Processing Large Datasets Efficiently

```python
from transformers import pipeline
import pandas as pd

sentiment_pipeline = pipeline(
    "sentiment-analysis",
    model="cardiffnlp/twitter-roberta-base-sentiment-latest",
    device=0,
    batch_size=32,
)

df = pd.read_csv("reviews.csv")
texts = df["text"].tolist()

# Process in batches
results = sentiment_pipeline(texts, truncation=True, max_length=512)

df["transformer_label"] = [r["label"] for r in results]
df["transformer_score"] = [r["score"] for r in results]

print(df["transformer_label"].value_counts())
```

### Fine-Tuning a Transformer for Your Data

When the pretrained model does not match your domain, fine-tune it. For a more comprehensive guide on fine-tuning techniques including LoRA and QLoRA, see [Fine-Tuning LLMs with Python](/posts/Fine-Tuning-LLMs-with-Python/).

```python
from transformers import (
    AutoModelForSequenceClassification,
    AutoTokenizer,
    TrainingArguments,
    Trainer,
)
from datasets import Dataset
import numpy as np
from sklearn.metrics import accuracy_score, f1_score

model_name = "distilbert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Prepare data
label_map = {"negative": 0, "neutral": 1, "positive": 2}

def tokenize(examples):
    return tokenizer(
        examples["text"],
        truncation=True,
        padding="max_length",
        max_length=256,
    )

# Assume df has "text" and "label" columns
df["label_id"] = df["label"].map(label_map)
dataset = Dataset.from_pandas(df[["text", "label_id"]].rename(columns={"label_id": "label"}))
dataset = dataset.train_test_split(test_size=0.2, seed=42)
dataset = dataset.map(tokenize, batched=True)

# Load model
model = AutoModelForSequenceClassification.from_pretrained(
    model_name,
    num_labels=3,
    id2label={0: "negative", 1: "neutral", 2: "positive"},
    label2id=label_map,
)

def compute_metrics(eval_pred):
    logits, labels = eval_pred
    preds = np.argmax(logits, axis=-1)
    return {
        "accuracy": accuracy_score(labels, preds),
        "f1_macro": f1_score(labels, preds, average="macro"),
    }

training_args = TrainingArguments(
    output_dir="./sentiment_model",
    num_train_epochs=3,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=32,
    learning_rate=2e-5,
    weight_decay=0.01,
    evaluation_strategy="epoch",
    save_strategy="epoch",
    load_best_model_at_end=True,
    metric_for_best_model="f1_macro",
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset["train"],
    eval_dataset=dataset["test"],
    compute_metrics=compute_metrics,
)

trainer.train()

# Save the fine-tuned model
trainer.save_model("./sentiment_model_final")
tokenizer.save_pretrained("./sentiment_model_final")
```

## Comparing All Approaches

```python
import time
from textblob import TextBlob
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from transformers import pipeline

test_texts = [
    "This is the best product I've ever bought!",
    "Absolutely terrible, waste of money.",
    "It's okay, does what it says.",
    "Not bad actually, pleasantly surprised.",
    "DO NOT BUY. Broke after one day!!!",
    "Love love love this!! 😍",
    "meh, could be better tbh",
    "The quality is outstanding, highly recommend.",
]

# TextBlob
print("=== TextBlob ===")
start = time.time()
for text in test_texts:
    polarity = TextBlob(text).sentiment.polarity
    label = "Pos" if polarity > 0.1 else ("Neg" if polarity < -0.1 else "Neu")
    print(f"  [{label}] {text[:50]}")
print(f"  Time: {time.time() - start:.3f}s\n")

# VADER
print("=== VADER ===")
analyzer = SentimentIntensityAnalyzer()
start = time.time()
for text in test_texts:
    compound = analyzer.polarity_scores(text)["compound"]
    label = "Pos" if compound >= 0.05 else ("Neg" if compound <= -0.05 else "Neu")
    print(f"  [{label}] {text[:50]}")
print(f"  Time: {time.time() - start:.3f}s\n")

# Transformer
print("=== Transformer ===")
sent_pipeline = pipeline("sentiment-analysis", model="cardiffnlp/twitter-roberta-base-sentiment-latest")
start = time.time()
results = sent_pipeline(test_texts, truncation=True)
for text, result in zip(test_texts, results):
    print(f"  [{result['label'][:3]}] {text[:50]}")
print(f"  Time: {time.time() - start:.3f}s")
```

### Comparison Summary

| Approach | Accuracy | Speed | Setup Effort | Best For |
|---|---|---|---|---|
| TextBlob | Low-Medium | Very fast | Minimal | Quick prototypes |
| VADER | Medium | Very fast | Minimal | Social media, informal text |
| Scikit-learn | Medium-High | Fast | Moderate (needs labeled data) | Domain-specific classification |
| Transformers | High | Slower | Moderate-High | Production systems needing accuracy |

## Building a Sentiment Analysis API

You can also integrate sentiment analysis into LLM-powered applications using [LangChain](/posts/Beginner-Guide-to-LangChain-in-Python/) for chaining NLP tasks together.

Wrap your model in a REST API using FastAPI:

```bash
pip install fastapi uvicorn
```

```python
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI(title="Sentiment Analysis API")

# Load model at startup
sentiment_model = pipeline(
    "sentiment-analysis",
    model="cardiffnlp/twitter-roberta-base-sentiment-latest",
)

class TextInput(BaseModel):
    text: str

class BatchInput(BaseModel):
    texts: list[str]

class SentimentResult(BaseModel):
    text: str
    label: str
    score: float

@app.post("/analyze", response_model=SentimentResult)
def analyze_single(input: TextInput):
    result = sentiment_model(input.text, truncation=True, max_length=512)[0]
    return SentimentResult(
        text=input.text,
        label=result["label"],
        score=round(result["score"], 4),
    )

@app.post("/analyze/batch", response_model=list[SentimentResult])
def analyze_batch(input: BatchInput):
    results = sentiment_model(input.texts, truncation=True, max_length=512)
    return [
        SentimentResult(
            text=text,
            label=result["label"],
            score=round(result["score"], 4),
        )
        for text, result in zip(input.texts, results)
    ]

@app.get("/health")
def health():
    return {"status": "ok"}
```

Run the API:

```bash
uvicorn sentiment_api:app --host 0.0.0.0 --port 8000
```

Test it:

```python
import requests

# Single text
response = requests.post(
    "http://localhost:8000/analyze",
    json={"text": "This product is absolutely wonderful!"}
)
print(response.json())

# Batch
response = requests.post(
    "http://localhost:8000/analyze/batch",
    json={"texts": [
        "Great product!",
        "Terrible experience.",
        "It was fine."
    ]}
)
for result in response.json():
    print(f"[{result['label']}] ({result['score']:.3f}) {result['text']}")
```

## Production Considerations

**Caching.** If you see repeated texts, cache the results. A simple dictionary cache or Redis can save inference time.

```python
from functools import lru_cache

@lru_cache(maxsize=10000)
def cached_sentiment(text: str) -> tuple:
    result = sentiment_model(text, truncation=True, max_length=512)[0]
    return result["label"], result["score"]
```

**Input validation.** Truncate very long texts, handle empty strings, and sanitize input to prevent unexpected behavior.

**Monitoring.** Log predictions along with input texts so you can audit the model's performance over time. Track the distribution of predicted labels -- a sudden shift might indicate a data quality issue. To understand why your model makes specific predictions, add [Explainable AI techniques like SHAP and LIME](/posts/Explainable-AI-with-Python-SHAP-LIME/).

**Model updates.** Periodically evaluate your model on fresh labeled data. Sentiment patterns change over time (new slang, evolving language), and your model may need retraining.

## Summary

Sentiment analysis ranges from simple lexicon-based methods (TextBlob, VADER) to trained machine learning models (scikit-learn) to transformer-based approaches (Hugging Face). TextBlob and VADER require no training data and work instantly but lack accuracy on domain-specific text. Scikit-learn models offer a good balance when you have labeled data. Transformers provide the highest accuracy and work well out of the box for general sentiment, with the option to fine-tune for your domain. For production, wrap your model in a FastAPI service with caching, input validation, and monitoring.

---

## Related Posts

- [Explainable AI with Python: SHAP and LIME](/posts/Explainable-AI-with-Python-SHAP-LIME/) - Understand why your sentiment model classifies text the way it does
- [Fine-Tuning Large Language Models with Python](/posts/Fine-Tuning-LLMs-with-Python/) - Fine-tune transformer models for domain-specific sentiment analysis
- [Beginner Guide to LangChain in Python](/posts/Beginner-Guide-to-LangChain-in-Python/) - Chain sentiment analysis with other NLP tasks using LangChain
