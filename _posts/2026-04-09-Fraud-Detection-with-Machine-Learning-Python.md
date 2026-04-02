---
title: "Fraud Detection with Machine Learning in Python"
description: Learn how to build a fraud detection system with Python using Random Forest, XGBoost, and neural networks. Covers handling imbalanced datasets with SMOTE, feature engineering, evaluation metrics, and a complete credit card fraud detection pipeline.
date: 2026-04-09 12:00:00 +0800
categories: [Python]
tags: [python, machine-learning, fraud-detection]
image:
  path: "/commons/Fraud Detection with Machine Learning in Python.webp"
  alt: "Credit card fraud detection pipeline using Random Forest, XGBoost, and SMOTE for imbalanced dataset handling in Python"
---

## The Fraud Detection Problem

Credit card fraud accounts for billions in losses annually. The challenge: fraudulent transactions are rare — typically less than 1% of all transactions. The same class imbalance problem appears in [recommendation systems](/posts/Building-Recommendation-Systems-with-Python/) where relevant items are a tiny fraction of the catalog. A model that predicts "not fraud" for everything gets 99% accuracy but catches zero fraud.

```python
import pandas as pd

# Load the Kaggle credit card fraud dataset
df = pd.read_csv("creditcard.csv")

print(f"Total transactions: {len(df):,}")
print(f"Fraudulent: {df['Class'].sum():,} ({df['Class'].mean():.2%})")
print(f"Legitimate: {(df['Class'] == 0).sum():,}")
```

```text
Total transactions: 284,807
Fraudulent: 492 (0.17%)
Legitimate: 284,315
```

That's a 578:1 imbalance. Standard accuracy is meaningless here. You need precision, recall, and AUC-ROC.

## Installation

```bash
pip install pandas numpy scikit-learn xgboost imbalanced-learn matplotlib seaborn
```

## Exploratory Analysis

```python
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# Transaction amount distribution
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Legitimate vs fraud amounts
legit = df[df["Class"] == 0]["Amount"]
fraud = df[df["Class"] == 1]["Amount"]

axes[0].hist(legit, bins=50, alpha=0.7, label="Legitimate", color="#2ecc71")
axes[0].hist(fraud, bins=50, alpha=0.7, label="Fraud", color="#e74c3c")
axes[0].set_title("Transaction Amount Distribution")
axes[0].set_xlabel("Amount ($)")
axes[0].legend()
axes[0].set_xlim(0, 500)

# Time distribution
axes[1].scatter(df[df["Class"] == 0]["Time"], df[df["Class"] == 0]["Amount"],
               alpha=0.1, s=1, label="Legitimate", color="#2ecc71")
axes[1].scatter(df[df["Class"] == 1]["Time"], df[df["Class"] == 1]["Amount"],
               alpha=0.5, s=10, label="Fraud", color="#e74c3c")
axes[1].set_title("Transactions Over Time")
axes[1].legend()

plt.tight_layout()
plt.savefig("fraud_eda.png", dpi=150)
```

## Feature Engineering

```python
from sklearn.preprocessing import StandardScaler

# The dataset already has PCA-transformed features (V1-V28)
# Scale the remaining features
scaler = StandardScaler()
df["Amount_scaled"] = scaler.fit_transform(df[["Amount"]])
df["Time_scaled"] = scaler.fit_transform(df[["Time"]])

# Add engineered features
df["Amount_log"] = np.log1p(df["Amount"])

# Hour of day (Time is in seconds from first transaction)
df["Hour"] = (df["Time"] / 3600) % 24

# Drop original unscaled columns
features = [c for c in df.columns if c not in ["Class", "Amount", "Time"]]

X = df[features]
y = df["Class"]

print(f"Features: {len(features)}")
print(f"Samples: {len(X)}")
```

## Train/Test Split

```python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print(f"Train: {len(X_train)} ({y_train.mean():.2%} fraud)")
print(f"Test: {len(X_test)} ({y_test.mean():.2%} fraud)")
```

## Handling Imbalanced Data with SMOTE

SMOTE (Synthetic Minority Over-sampling Technique) generates synthetic fraud samples:

```python
from imblearn.over_sampling import SMOTE
from imblearn.under_sampling import RandomUnderSampler
from imblearn.pipeline import Pipeline as ImbPipeline

# SMOTE + undersampling combo
resampler = ImbPipeline([
    ("smote", SMOTE(sampling_strategy=0.5, random_state=42)),
    ("under", RandomUnderSampler(sampling_strategy=0.8, random_state=42)),
])

X_resampled, y_resampled = resampler.fit_resample(X_train, y_train)

print(f"Before SMOTE: {len(X_train)} samples ({y_train.sum()} fraud)")
print(f"After SMOTE:  {len(X_resampled)} samples ({y_resampled.sum()} fraud)")
```

The strategy: oversample fraud to 50% of legitimate, then undersample legitimate to get an 80/20 split. This gives the model enough fraud examples without drowning in duplicates.

## Model 1: Random Forest

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, roc_auc_score, confusion_matrix

rf = RandomForestClassifier(
    n_estimators=200,
    max_depth=15,
    class_weight="balanced",
    random_state=42,
    n_jobs=-1,
)
rf.fit(X_resampled, y_resampled)

# Predict probabilities
rf_probs = rf.predict_proba(X_test)[:, 1]
rf_preds = (rf_probs > 0.5).astype(int)

print("Random Forest Results:")
print(classification_report(y_test, rf_preds, target_names=["Legitimate", "Fraud"]))
print(f"AUC-ROC: {roc_auc_score(y_test, rf_probs):.4f}")
```

## Model 2: XGBoost

```python
import xgboost as xgb

# Calculate scale_pos_weight for imbalanced data
scale_pos_weight = len(y_train[y_train == 0]) / len(y_train[y_train == 1])

xgb_model = xgb.XGBClassifier(
    n_estimators=300,
    max_depth=6,
    learning_rate=0.1,
    scale_pos_weight=scale_pos_weight,
    eval_metric="aucpr",
    random_state=42,
    n_jobs=-1,
)
xgb_model.fit(X_resampled, y_resampled)

xgb_probs = xgb_model.predict_proba(X_test)[:, 1]
xgb_preds = (xgb_probs > 0.5).astype(int)

print("XGBoost Results:")
print(classification_report(y_test, xgb_preds, target_names=["Legitimate", "Fraud"]))
print(f"AUC-ROC: {roc_auc_score(y_test, xgb_probs):.4f}")
```

## Model 3: Neural Network

```python
from sklearn.neural_network import MLPClassifier

nn = MLPClassifier(
    hidden_layer_sizes=(128, 64, 32),
    activation="relu",
    max_iter=300,
    random_state=42,
    early_stopping=True,
    validation_fraction=0.1,
)
nn.fit(X_resampled, y_resampled)

nn_probs = nn.predict_proba(X_test)[:, 1]
nn_preds = (nn_probs > 0.5).astype(int)

print("Neural Network Results:")
print(classification_report(y_test, nn_preds, target_names=["Legitimate", "Fraud"]))
print(f"AUC-ROC: {roc_auc_score(y_test, nn_probs):.4f}")
```

## Evaluation: The Right Metrics

For fraud detection, focus on:
- **Recall** (sensitivity): What fraction of actual fraud did we catch?
- **Precision**: Of all fraud alerts, how many were real?
- **AUC-ROC**: Overall model discrimination ability
- **AUC-PR**: Better than ROC for imbalanced datasets

```python
from sklearn.metrics import (
    roc_curve, precision_recall_curve, average_precision_score, auc
)

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# ROC Curves
for name, probs in [("Random Forest", rf_probs), ("XGBoost", xgb_probs), ("Neural Net", nn_probs)]:
    fpr, tpr, _ = roc_curve(y_test, probs)
    roc_auc = auc(fpr, tpr)
    axes[0].plot(fpr, tpr, label=f"{name} (AUC={roc_auc:.4f})")

axes[0].plot([0, 1], [0, 1], "k--", alpha=0.3)
axes[0].set_xlabel("False Positive Rate")
axes[0].set_ylabel("True Positive Rate")
axes[0].set_title("ROC Curve")
axes[0].legend()

# Precision-Recall Curves
for name, probs in [("Random Forest", rf_probs), ("XGBoost", xgb_probs), ("Neural Net", nn_probs)]:
    precision, recall, _ = precision_recall_curve(y_test, probs)
    ap = average_precision_score(y_test, probs)
    axes[1].plot(recall, precision, label=f"{name} (AP={ap:.4f})")

axes[1].set_xlabel("Recall")
axes[1].set_ylabel("Precision")
axes[1].set_title("Precision-Recall Curve")
axes[1].legend()

plt.tight_layout()
plt.savefig("model_evaluation.png", dpi=150)
```

## Threshold Tuning

The default 0.5 threshold isn't optimal for fraud detection. Tune it:

```python
from sklearn.metrics import f1_score

thresholds = np.arange(0.1, 0.9, 0.01)
f1_scores = [f1_score(y_test, (xgb_probs > t).astype(int)) for t in thresholds]

best_threshold = thresholds[np.argmax(f1_scores)]
best_f1 = max(f1_scores)
print(f"Best threshold: {best_threshold:.2f}")
print(f"Best F1 score: {best_f1:.4f}")

# Apply optimal threshold
final_preds = (xgb_probs > best_threshold).astype(int)
print("\nOptimized Results:")
print(classification_report(y_test, final_preds, target_names=["Legitimate", "Fraud"]))
```

## Feature Importance

To understand why a model flags certain transactions, [Explainable AI techniques like SHAP and LIME](/posts/Explainable-AI-with-Python-SHAP-LIME/) can provide per-prediction explanations.

```python
import matplotlib.pyplot as plt

# XGBoost feature importance
importance = xgb_model.feature_importances_
indices = np.argsort(importance)[-15:]  # Top 15

plt.figure(figsize=(10, 6))
plt.barh(range(15), importance[indices], color="#3498db")
plt.yticks(range(15), [features[i] for i in indices])
plt.xlabel("Feature Importance")
plt.title("Top 15 Features for Fraud Detection")
plt.tight_layout()
plt.savefig("feature_importance.png", dpi=150)
```

## Complete Pipeline

```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
import xgboost as xgb
import joblib

# Production pipeline
pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("model", xgb.XGBClassifier(
        n_estimators=300,
        max_depth=6,
        learning_rate=0.1,
        scale_pos_weight=scale_pos_weight,
        random_state=42,
    ))
])

pipeline.fit(X_resampled, y_resampled)

# Save for production
joblib.dump(pipeline, "fraud_detection_model.pkl")
joblib.dump(best_threshold, "optimal_threshold.pkl")

# Load and predict
loaded_pipeline = joblib.load("fraud_detection_model.pkl")
threshold = joblib.load("optimal_threshold.pkl")

def predict_fraud(transaction_features):
    prob = loaded_pipeline.predict_proba(transaction_features)[:, 1]
    is_fraud = prob > threshold
    return is_fraud, prob
```

## Key Takeaways

- Fraud detection is an imbalanced classification problem — accuracy is misleading
- Use SMOTE to generate synthetic fraud samples, combined with undersampling
- XGBoost with `scale_pos_weight` handles imbalance natively
- Evaluate with precision, recall, F1, AUC-ROC, and AUC-PR — not accuracy
- Tune the classification threshold for your business needs (catch more fraud vs. fewer false alerts)
- Feature importance analysis reveals which transaction attributes matter most
- In production, monitor for concept drift — fraud patterns evolve constantly
- Use [MLOps pipelines](/posts/MLOps-with-Python-Production-ML-Pipelines/) to automate retraining when model performance degrades

## Related Posts

- [Building Recommendation Systems with Python](/posts/Building-Recommendation-Systems-with-Python/) -- Tackle similar class imbalance and evaluation challenges in a different ML domain.
- [Explainable AI with Python: SHAP and LIME](/posts/Explainable-AI-with-Python-SHAP-LIME/) -- Add interpretability to your fraud models so stakeholders understand why transactions are flagged.
- [MLOps with Python: Production ML Pipelines](/posts/MLOps-with-Python-Production-ML-Pipelines/) -- Deploy fraud detection models with automated monitoring, retraining, and drift detection.
