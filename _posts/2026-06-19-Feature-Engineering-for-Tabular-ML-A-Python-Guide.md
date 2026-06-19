---
title: "Feature Engineering for Tabular ML: A Python Guide"
description: Learn practical feature engineering techniques in Python for tabular machine learning — encoding, scaling, binning, interaction features, and target encoding with real examples.
date: 2026-06-19 17:00:00 +0530
categories: [Python, AI]
tags: [python, feature-engineering, machine-learning, pandas, scikit-learn]
image:
  path: "/commons/Feature Engineering for Tabular ML A Python Guide.webp"
  alt: "Feature engineering pipeline for tabular machine learning showing encoding, scaling, and interaction features in Python"
---

## Why Features Matter More Than the Model

In tabular ML, a well-engineered feature set with a simple model usually beats a complex model with raw, untransformed columns. This guide covers the techniques that consistently move the needle — the same groundwork used in [Fraud Detection with Machine Learning](/posts/Fraud-Detection-with-Machine-Learning-Python/) before any model gets touched.

```bash
pip install pandas scikit-learn category_encoders numpy
```

## Setting Up a Sample Dataset

```python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    "age": [25, 34, 45, 23, 52, 38],
    "income": [42000, 58000, 95000, 31000, 110000, 67000],
    "city": ["NYC", "LA", "NYC", "SF", "LA", "SF"],
    "signup_date": pd.to_datetime(["2024-01-15", "2023-06-20", "2022-11-03", "2024-03-10", "2021-08-25", "2023-09-12"]),
    "purchased": [0, 1, 1, 0, 1, 0],
})
print(df)
```

## Encoding Categorical Variables

One-hot encoding works for low-cardinality columns, but a high-cardinality column like `city` (with hundreds of values) explodes into too many sparse columns. Target encoding handles that better:

```python
# One-hot for low cardinality
df_onehot = pd.get_dummies(df, columns=["city"], prefix="city")

# Target encoding for high cardinality
from category_encoders import TargetEncoder

encoder = TargetEncoder(cols=["city"])
df["city_target_enc"] = encoder.fit_transform(df["city"], df["purchased"])
print(df[["city", "city_target_enc"]])
```

```text
  city  city_target_enc
0  NYC          0.612
1   LA          0.598
2  NYC          0.612
3   SF          0.401
4   LA          0.598
5   SF          0.401
```

Target encoding replaces each category with the average target value for that category — but it must be fit only on training data, or it leaks the label into the features.

## Extracting Date Features

A raw timestamp is nearly useless to a model. Decompose it into signal the model can actually use:

```python
df["signup_year"] = df["signup_date"].dt.year
df["signup_month"] = df["signup_date"].dt.month
df["days_since_signup"] = (pd.Timestamp.now() - df["signup_date"]).dt.days
df["signup_is_weekend"] = df["signup_date"].dt.dayofweek >= 5
```

`days_since_signup` (tenure) is almost always more predictive than the raw date — it captures "how established is this customer" directly.

## Binning Continuous Variables

Binning can help tree-based models find non-linear thresholds faster, and makes features interpretable:

```python
df["age_bracket"] = pd.cut(
    df["age"],
    bins=[0, 25, 35, 50, 100],
    labels=["18-25", "26-35", "36-50", "50+"],
)

df["income_quantile"] = pd.qcut(df["income"], q=4, labels=["Q1", "Q2", "Q3", "Q4"])
```

`pd.qcut` bins by quantile rather than fixed ranges — useful when the distribution is skewed and fixed bins would put most rows in one bucket.

## Creating Interaction Features

Sometimes the relationship between two features matters more than either alone:

```python
df["income_per_age"] = df["income"] / df["age"]
df["high_income_young"] = ((df["income"] > df["income"].median()) & (df["age"] < 35)).astype(int)
```

`high_income_young` is a manually-crafted interaction a linear model can't discover on its own — tree-based models can find some interactions automatically, but explicit ones still often help.

## Scaling Numeric Features

Required for linear models, SVMs, and neural networks; not needed for tree-based models (Random Forest, XGBoost):

```python
from sklearn.preprocessing import StandardScaler, RobustScaler

scaler = StandardScaler()
df["income_scaled"] = scaler.fit_transform(df[["income"]])

# RobustScaler is better when outliers are present — uses median/IQR instead of mean/std
robust_scaler = RobustScaler()
df["income_robust_scaled"] = robust_scaler.fit_transform(df[["income"]])
```

## Putting It in a Reusable Pipeline

```python
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder

numeric_features = ["age", "income"]
categorical_features = ["city"]

preprocessor = ColumnTransformer([
    ("num", StandardScaler(), numeric_features),
    ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_features),
])

pipeline = Pipeline([("preprocessor", preprocessor)])
X_transformed = pipeline.fit_transform(df)
print(X_transformed.shape)
```

Wrapping transforms in a `ColumnTransformer` + `Pipeline` means the exact same fitted preprocessing applies automatically at inference time — no risk of training/serving skew from manually reapplying steps.

## Key Takeaways

- Target encoding beats one-hot for high-cardinality categorical features, but must be fit only on training data to avoid leakage
- Decompose dates into tenure, day-of-week, and seasonality features — raw timestamps carry little signal
- Binning helps interpretability and can help linear models capture non-linear thresholds
- Manually crafted interaction features still add value even with tree-based models
- Tree-based models don't need scaling; linear models, SVMs, and neural nets do
- Always wrap preprocessing in a `Pipeline`/`ColumnTransformer` to guarantee training and inference use identical transforms

## Related Posts

- [Fraud Detection with Machine Learning in Python](/posts/Fraud-Detection-with-Machine-Learning-Python/) -- See feature engineering applied to a real imbalanced classification problem.
- [Hyperparameter Tuning with Optuna: A Python Guide](/posts/Hyperparameter-Tuning-with-Optuna-A-Python-Guide/) -- Tune the model that consumes these engineered features.
- [Explainable AI with Python: SHAP and LIME](/posts/Explainable-AI-with-Python-SHAP-LIME/) -- Verify which engineered features actually matter to your model.
