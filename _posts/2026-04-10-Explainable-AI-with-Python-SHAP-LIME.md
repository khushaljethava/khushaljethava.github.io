---
title: "Explainable AI with Python: Understanding Model Predictions with SHAP and LIME"
description: Learn how to make machine learning models interpretable with Python using SHAP and LIME. This guide covers feature importance, local explanations, visualizations, and practical examples with gradient boosting classifiers.
date: 2026-04-10 12:00:00 +0800
categories: [Python]
tags: [python, ai, explainability, xai]
image:
 path: "/commons/Explainable AI with Python Understanding Model Predictions with SHAP and LIME.png"
 alt: "Explainable AI with Python: Understanding Model Predictions with SHAP and LIME"
---

## Why Explainability Matters

A model says "loan denied." The customer asks why. If you can't answer, you have a compliance problem, a trust problem, and possibly a legal problem.

```python
import shap

# One line to explain any model
explainer = shap.Explainer(model)
shap_values = explainer(X_test)
shap.plots.waterfall(shap_values[0])
```

That waterfall plot shows exactly which features pushed the prediction up or down. That's explainable AI.

## Installation

```bash
pip install shap lime xgboost scikit-learn matplotlib pandas
```

## Setting Up a Model to Explain

We'll train a gradient boosting classifier on a real dataset and then explain its decisions.

```python
import pandas as pd
import numpy as np
from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score

# Use California housing data, convert to classification
# (predict if house price is above median)
data = fetch_california_housing(as_frame=True)
df = data.frame
df["target"] = (df["MedHouseVal"] > df["MedHouseVal"].median()).astype(int)

feature_names = data.feature_names
X = df[feature_names]
y = df["target"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = XGBClassifier(
    n_estimators=200,
    max_depth=5,
    learning_rate=0.1,
    random_state=42,
)
model.fit(X_train, y_train)

accuracy = accuracy_score(y_test, model.predict(X_test))
print(f"Model accuracy: {accuracy:.2%}")
print(f"Features: {feature_names}")
```

## SHAP: Global Explanations

SHAP (SHapley Additive exPlanations) uses game theory to assign each feature an importance value for every prediction.

### Summary Plot

```python
import shap

explainer = shap.Explainer(model, X_train)
shap_values = explainer(X_test)

# Summary plot: which features matter most overall
shap.summary_plot(shap_values, X_test, show=False)
import matplotlib.pyplot as plt
plt.tight_layout()
plt.savefig("shap_summary.png", dpi=150, bbox_inches="tight")
plt.close()
```

The summary plot shows:
- Features ranked by importance (top to bottom)
- Color indicates feature value (red = high, blue = low)
- Position on x-axis shows impact on prediction

### Bar Plot (Feature Importance)

```python
shap.plots.bar(shap_values, show=False)
plt.tight_layout()
plt.savefig("shap_bar.png", dpi=150, bbox_inches="tight")
plt.close()
```

### Dependence Plot

See how a single feature affects predictions:

```python
shap.dependence_plot("MedInc", shap_values.values, X_test, show=False)
plt.tight_layout()
plt.savefig("shap_dependence.png", dpi=150, bbox_inches="tight")
plt.close()
```

This reveals non-linear relationships. For example, median income might have a sharp threshold effect around $50K rather than a smooth linear relationship.

## SHAP: Local Explanations

Explain a single prediction:

```python
# Explain the first test sample
sample_idx = 0
sample = X_test.iloc[[sample_idx]]
prediction = model.predict(sample)[0]
probability = model.predict_proba(sample)[0]

print(f"Prediction: {'Above median' if prediction == 1 else 'Below median'}")
print(f"Probability: {probability[1]:.2%}")

# Waterfall plot for this prediction
shap.plots.waterfall(shap_values[sample_idx], show=False)
plt.tight_layout()
plt.savefig("shap_waterfall.png", dpi=150, bbox_inches="tight")
plt.close()
```

The waterfall shows the base value (average prediction), then each feature's contribution pushing the prediction higher or lower.

### Force Plot

```python
shap.force_plot(
    explainer.expected_value,
    shap_values.values[sample_idx],
    X_test.iloc[sample_idx],
    matplotlib=True,
    show=False
)
plt.tight_layout()
plt.savefig("shap_force.png", dpi=150, bbox_inches="tight")
plt.close()
```

## LIME: Local Interpretable Explanations

LIME (Local Interpretable Model-agnostic Explanations) works differently from SHAP. It creates a simple, interpretable model around each prediction point.

```python
from lime.lime_tabular import LimeTabularExplainer

explainer = LimeTabularExplainer(
    X_train.values,
    feature_names=feature_names,
    class_names=["Below Median", "Above Median"],
    mode="classification"
)

# Explain a single prediction
sample_idx = 0
explanation = explainer.explain_instance(
    X_test.iloc[sample_idx].values,
    model.predict_proba,
    num_features=8
)

# Print text explanation
print("LIME Explanation:")
for feature, weight in explanation.as_list():
    direction = "+" if weight > 0 else ""
    print(f"  {feature}: {direction}{weight:.4f}")

# Save visual explanation
fig = explanation.as_pyplot_figure()
plt.tight_layout()
plt.savefig("lime_explanation.png", dpi=150, bbox_inches="tight")
plt.close()
```

### LIME in HTML

```python
explanation.save_to_file("lime_explanation.html")
```

This generates an interactive HTML file showing the prediction breakdown — useful for sharing with non-technical stakeholders.

## Comparing SHAP and LIME

```python
sample_idx = 0
sample = X_test.iloc[[sample_idx]]

# SHAP values for this sample
shap_importance = dict(zip(feature_names, abs(shap_values.values[sample_idx])))

# LIME values for this sample
lime_explanation = explainer.explain_instance(
    X_test.iloc[sample_idx].values,
    model.predict_proba,
    num_features=len(feature_names)
)
lime_importance = {feat.split(" ")[0]: abs(weight)
                   for feat, weight in lime_explanation.as_list()}

# Compare top features
print(f"{'Feature':<15} {'SHAP':>10} {'LIME':>10}")
print("-" * 35)
for feat in sorted(shap_importance, key=shap_importance.get, reverse=True)[:8]:
    s = shap_importance.get(feat, 0)
    l = lime_importance.get(feat, 0)
    print(f"{feat:<15} {s:>10.4f} {l:>10.4f}")
```

| Aspect | SHAP | LIME |
|--------|------|------|
| Theory | Game theory (Shapley values) | Local linear approximation |
| Consistency | Mathematically consistent | Can vary between runs |
| Speed | Slower for large datasets | Faster per explanation |
| Global view | Yes (summary plots) | No (local only) |
| Model-agnostic | Yes (with KernelSHAP) | Yes |

## Explaining Different Model Types

### For Tree-Based Models (Fast)

```python
# TreeExplainer is optimized for tree models
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)
```

### For Any Model (KernelSHAP)

```python
from sklearn.neural_network import MLPClassifier

nn_model = MLPClassifier(hidden_layer_sizes=(64, 32), max_iter=500)
nn_model.fit(X_train, y_train)

# KernelSHAP works with any model
background = shap.sample(X_train, 100)
explainer = shap.KernelExplainer(nn_model.predict_proba, background)
shap_values = explainer.shap_values(X_test[:50])  # Slower, so use fewer samples
```

### For Deep Learning Models

```python
import tensorflow as tf

# DeepExplainer for neural networks
# explainer = shap.DeepExplainer(tf_model, X_train[:100])
# shap_values = explainer.shap_values(X_test[:50])
```

## Building an Explanation API

```python
from fastapi import FastAPI
from pydantic import BaseModel
import shap
import numpy as np

app = FastAPI()

# Pre-compute explainer
tree_explainer = shap.TreeExplainer(model)

class PredictionRequest(BaseModel):
    features: dict[str, float]

@app.post("/predict-and-explain")
async def predict_explain(request: PredictionRequest):
    # Create feature array in correct order
    feature_array = np.array([[request.features[f] for f in feature_names]])

    # Predict
    prediction = int(model.predict(feature_array)[0])
    probability = float(model.predict_proba(feature_array)[0][1])

    # Explain
    shap_vals = tree_explainer.shap_values(feature_array)[0]

    explanations = sorted(
        [{"feature": name, "impact": float(val)}
         for name, val in zip(feature_names, shap_vals)],
        key=lambda x: abs(x["impact"]),
        reverse=True
    )

    return {
        "prediction": "Above Median" if prediction == 1 else "Below Median",
        "probability": round(probability, 4),
        "top_factors": explanations[:5],
        "base_value": float(tree_explainer.expected_value),
    }
```

## Practical Tips

**Start with global explanations.** Before diving into individual predictions, understand which features matter overall. A summary plot or bar plot gives you the big picture.

**Use SHAP for consistency.** If you need reliable, reproducible explanations (regulatory, audit), SHAP's mathematical foundation is stronger than LIME's.

**Use LIME for speed.** If you need to explain thousands of predictions in real-time, LIME is faster per explanation.

**Watch for correlated features.** Both SHAP and LIME can distribute importance across correlated features in unintuitive ways. If income and spending are highly correlated, each might show moderate importance instead of one showing high importance.

**Cache explanations.** For production APIs, pre-compute SHAP values for common prediction patterns and cache them. Only compute on-the-fly for unusual inputs.

## Key Takeaways

- SHAP provides mathematically consistent feature attributions based on game theory
- LIME creates local, interpretable approximations of any model
- Use TreeExplainer for fast SHAP values on tree-based models
- Waterfall and force plots explain individual predictions
- Summary plots explain global model behavior
- Both tools are model-agnostic — they work with any classifier or regressor
- In regulated industries (finance, healthcare), explainability is often required by law
- Start with SHAP for thorough analysis, add LIME when you need speed
