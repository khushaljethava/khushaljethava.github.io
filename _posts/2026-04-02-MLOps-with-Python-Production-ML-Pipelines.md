---
title: "MLOps with Python: Building Production ML Pipelines"
description: Learn MLOps practices with Python including experiment tracking with MLflow, data versioning with DVC, model serving with FastAPI, CI/CD for ML, monitoring model performance, and building a complete production ML pipeline.
date: 2026-04-02 12:00:00 +0800
categories: [Python]
tags: [python, mlops, machine-learning]
image:
 path: "/commons/MLOps with Python Building Production ML Pipelines.png"
 alt: "MLOps with Python: Building Production ML Pipelines"
---

## What Is MLOps?

MLOps applies DevOps principles to machine learning systems. It covers the full lifecycle: data preparation, model training, evaluation, deployment, monitoring, and retraining. Without MLOps, ML projects stall at the notebook stage. Models that work in Jupyter never reach production, and those that do degrade over time without anyone noticing.

The core problems MLOps solves:

- **Reproducibility** — Can you recreate a model trained six months ago with the exact same data and code?
- **Deployment** — Can you serve your model behind an API with low latency?
- **Monitoring** — Do you know when your model's performance drops?
- **Automation** — Can you retrain and redeploy without manual intervention?

This guide walks through each piece using Python tools: MLflow for experiment tracking, DVC for data versioning, FastAPI for model serving, and GitHub Actions for CI/CD.

## Project Structure

A well-organized ML project looks like this:

```
ml-project/
├── data/
│   ├── raw/
│   └── processed/
├── models/
├── src/
│   ├── __init__.py
│   ├── data_processing.py
│   ├── train.py
│   ├── evaluate.py
│   ├── predict.py
│   └── serve.py
├── tests/
│   ├── test_data_processing.py
│   ├── test_model.py
│   └── test_api.py
├── dvc.yaml
├── params.yaml
├── requirements.txt
└── Dockerfile
```

Install the core dependencies:

```python
pip install mlflow dvc fastapi uvicorn scikit-learn pandas numpy pytest
```

## Experiment Tracking with MLflow

MLflow tracks parameters, metrics, and artifacts for every training run. This replaces the spreadsheet-based tracking that most teams fall back on.

```python
# src/train.py
import mlflow
import mlflow.sklearn
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score
import json

def train_model(n_estimators: int = 100, max_depth: int = None, test_size: float = 0.2):
    """Train a model with full MLflow tracking."""
    mlflow.set_tracking_uri("http://localhost:5000")
    mlflow.set_experiment("iris-classification")

    X, y = load_iris(return_X_y=True)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=test_size, random_state=42
    )

    with mlflow.start_run():
        # Log parameters
        mlflow.log_param("n_estimators", n_estimators)
        mlflow.log_param("max_depth", max_depth)
        mlflow.log_param("test_size", test_size)
        mlflow.log_param("model_type", "RandomForestClassifier")

        # Train
        model = RandomForestClassifier(
            n_estimators=n_estimators,
            max_depth=max_depth,
            random_state=42
        )
        model.fit(X_train, y_train)

        # Evaluate
        y_pred = model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        f1 = f1_score(y_test, y_pred, average="weighted")
        precision = precision_score(y_test, y_pred, average="weighted")
        recall = recall_score(y_test, y_pred, average="weighted")

        # Log metrics
        mlflow.log_metric("accuracy", accuracy)
        mlflow.log_metric("f1_score", f1)
        mlflow.log_metric("precision", precision)
        mlflow.log_metric("recall", recall)

        # Log the model
        mlflow.sklearn.log_model(model, "model")

        # Log additional artifacts
        feature_importance = dict(zip(
            [f"feature_{i}" for i in range(X_train.shape[1])],
            model.feature_importances_.tolist()
        ))
        with open("feature_importance.json", "w") as f:
            json.dump(feature_importance, f)
        mlflow.log_artifact("feature_importance.json")

        print(f"Run ID: {mlflow.active_run().info.run_id}")
        print(f"Accuracy: {accuracy:.4f}")
        print(f"F1 Score: {f1:.4f}")

        return model

if __name__ == "__main__":
    train_model(n_estimators=200, max_depth=10)
```

Start the MLflow tracking server:

```bash
mlflow server --host 0.0.0.0 --port 5000
```

Run hyperparameter sweeps and compare results:

```python
# src/hyperparameter_search.py
import mlflow
from train import train_model
from itertools import product

def run_sweep():
    """Run a grid search with MLflow tracking."""
    n_estimators_options = [50, 100, 200, 500]
    max_depth_options = [5, 10, 20, None]

    for n_est, depth in product(n_estimators_options, max_depth_options):
        print(f"Training with n_estimators={n_est}, max_depth={depth}")
        train_model(n_estimators=n_est, max_depth=depth)

if __name__ == "__main__":
    run_sweep()
```

After running experiments, register the best model:

```python
# src/register_model.py
import mlflow
from mlflow.tracking import MlflowClient

def register_best_model(experiment_name: str, model_name: str):
    """Find the best run and register it as a model."""
    client = MlflowClient()
    experiment = client.get_experiment_by_name(experiment_name)

    runs = client.search_runs(
        experiment_ids=[experiment.experiment_id],
        order_by=["metrics.f1_score DESC"],
        max_results=1
    )

    best_run = runs[0]
    print(f"Best run: {best_run.info.run_id}")
    print(f"F1 Score: {best_run.data.metrics['f1_score']:.4f}")

    model_uri = f"runs:/{best_run.info.run_id}/model"
    registered_model = mlflow.register_model(model_uri, model_name)
    print(f"Registered model version: {registered_model.version}")

    return registered_model

if __name__ == "__main__":
    register_best_model("iris-classification", "iris-classifier")
```

## Data Versioning with DVC

DVC (Data Version Control) tracks datasets alongside your code in Git. Large files stay in remote storage while Git tracks only lightweight pointer files.

Initialize DVC in your project:

```bash
git init
dvc init
dvc remote add -d myremote s3://my-bucket/dvc-storage
```

Create a `params.yaml` for configuration:

```yaml
# params.yaml
data:
  raw_path: data/raw/dataset.csv
  processed_path: data/processed/clean_dataset.csv
  test_size: 0.2

model:
  n_estimators: 200
  max_depth: 10

serve:
  host: 0.0.0.0
  port: 8000
```

Define your pipeline in `dvc.yaml`:

```yaml
# dvc.yaml
stages:
  process_data:
    cmd: python src/data_processing.py
    deps:
      - src/data_processing.py
      - data/raw/dataset.csv
    params:
      - data
    outs:
      - data/processed/clean_dataset.csv

  train:
    cmd: python src/train.py
    deps:
      - src/train.py
      - data/processed/clean_dataset.csv
    params:
      - model
      - data.test_size
    outs:
      - models/model.pkl
    metrics:
      - metrics.json:
          cache: false

  evaluate:
    cmd: python src/evaluate.py
    deps:
      - src/evaluate.py
      - models/model.pkl
      - data/processed/clean_dataset.csv
    metrics:
      - evaluation.json:
          cache: false
```

The data processing script:

```python
# src/data_processing.py
import pandas as pd
import yaml
from pathlib import Path

def process_data():
    with open("params.yaml") as f:
        params = yaml.safe_load(f)

    raw_path = params["data"]["raw_path"]
    processed_path = params["data"]["processed_path"]

    df = pd.read_csv(raw_path)

    # Remove duplicates
    df = df.drop_duplicates()

    # Handle missing values
    df = df.dropna(subset=df.columns[:-1])  # Drop rows with missing features
    df = df.fillna(df.median(numeric_only=True))

    # Remove outliers using IQR
    numeric_cols = df.select_dtypes(include="number").columns
    for col in numeric_cols:
        q1 = df[col].quantile(0.25)
        q3 = df[col].quantile(0.75)
        iqr = q3 - q1
        lower = q1 - 1.5 * iqr
        upper = q3 + 1.5 * iqr
        df = df[(df[col] >= lower) & (df[col] <= upper)]

    Path(processed_path).parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(processed_path, index=False)
    print(f"Processed data saved: {len(df)} rows")

if __name__ == "__main__":
    process_data()
```

Run the full pipeline:

```bash
dvc repro
```

DVC only re-runs stages whose dependencies have changed. Track data changes:

```bash
dvc add data/raw/dataset.csv
git add data/raw/dataset.csv.dvc data/raw/.gitignore
git commit -m "Update raw dataset v2"
dvc push
```

## Model Serving with FastAPI

Serve your trained model behind a REST API:

```python
# src/serve.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pickle
import numpy as np
from pathlib import Path
import logging
from datetime import datetime

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="ML Model API", version="1.0.0")

# Load model at startup
MODEL_PATH = Path("models/model.pkl")

def load_model():
    if not MODEL_PATH.exists():
        raise FileNotFoundError(f"Model not found at {MODEL_PATH}")
    with open(MODEL_PATH, "rb") as f:
        return pickle.load(f)

model = load_model()

class PredictionRequest(BaseModel):
    features: list[float]

class PredictionResponse(BaseModel):
    prediction: int
    probability: list[float]
    model_version: str
    timestamp: str

class BatchPredictionRequest(BaseModel):
    instances: list[list[float]]

class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    timestamp: str

@app.get("/health", response_model=HealthResponse)
def health_check():
    return HealthResponse(
        status="healthy",
        model_loaded=model is not None,
        timestamp=datetime.utcnow().isoformat()
    )

@app.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    try:
        features = np.array(request.features).reshape(1, -1)
        prediction = model.predict(features)[0]
        probability = model.predict_proba(features)[0].tolist()

        logger.info(f"Prediction: {prediction}, Features: {request.features}")

        return PredictionResponse(
            prediction=int(prediction),
            probability=probability,
            model_version="1.0.0",
            timestamp=datetime.utcnow().isoformat()
        )
    except Exception as e:
        logger.error(f"Prediction failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/batch")
def predict_batch(request: BatchPredictionRequest):
    try:
        features = np.array(request.instances)
        predictions = model.predict(features).tolist()
        probabilities = model.predict_proba(features).tolist()

        return {
            "predictions": predictions,
            "probabilities": probabilities,
            "count": len(predictions),
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

Run the server:

```bash
uvicorn src.serve:app --host 0.0.0.0 --port 8000
```

Test it:

```python
import requests

# Single prediction
response = requests.post(
    "http://localhost:8000/predict",
    json={"features": [5.1, 3.5, 1.4, 0.2]}
)
print(response.json())

# Batch prediction
response = requests.post(
    "http://localhost:8000/predict/batch",
    json={"instances": [[5.1, 3.5, 1.4, 0.2], [6.2, 3.4, 5.4, 2.3]]}
)
print(response.json())
```

## Containerizing with Docker

Package everything in a Docker container:

```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY src/ src/
COPY models/ models/
COPY params.yaml .

EXPOSE 8000

CMD ["uvicorn", "src.serve:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build and run:

```bash
docker build -t ml-model-api .
docker run -p 8000:8000 ml-model-api
```

## CI/CD for ML with GitHub Actions

Automate testing, training, and deployment:

```yaml
# .github/workflows/ml-pipeline.yml
name: ML Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.11"
      - run: pip install -r requirements.txt
      - run: pytest tests/ -v

  train:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.11"
      - run: pip install -r requirements.txt
      - name: Pull data with DVC
        run: dvc pull
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      - name: Run pipeline
        run: dvc repro
      - name: Check metrics
        run: python src/evaluate.py --check-threshold 0.90
      - uses: actions/upload-artifact@v4
        with:
          name: model
          path: models/model.pkl

  deploy:
    needs: train
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/download-artifact@v4
        with:
          name: model
          path: models/
      - name: Build and push Docker image
        run: |
          docker build -t myregistry/ml-model-api:${{ github.sha }} .
          docker push myregistry/ml-model-api:${{ github.sha }}
```

## Monitoring Model Performance

Track prediction quality over time by logging predictions and running periodic checks:

```python
# src/monitor.py
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from pathlib import Path
import json
import logging

logger = logging.getLogger(__name__)

class ModelMonitor:
    def __init__(self, log_path: str = "prediction_logs.csv"):
        self.log_path = Path(log_path)
        if not self.log_path.exists():
            pd.DataFrame(
                columns=["timestamp", "features", "prediction", "actual", "probability"]
            ).to_csv(self.log_path, index=False)

    def log_prediction(self, features: list, prediction: int, probability: list, actual: int = None):
        """Log a prediction for monitoring."""
        row = pd.DataFrame([{
            "timestamp": datetime.utcnow().isoformat(),
            "features": json.dumps(features),
            "prediction": prediction,
            "actual": actual,
            "probability": json.dumps(probability)
        }])
        row.to_csv(self.log_path, mode="a", header=False, index=False)

    def detect_data_drift(self, reference_data: np.ndarray, window_hours: int = 24) -> dict:
        """Detect drift between reference data and recent predictions."""
        logs = pd.read_csv(self.log_path)
        logs["timestamp"] = pd.to_datetime(logs["timestamp"])

        cutoff = datetime.utcnow() - timedelta(hours=window_hours)
        recent = logs[logs["timestamp"] > cutoff]

        if len(recent) < 10:
            return {"drift_detected": False, "message": "Not enough recent data"}

        recent_features = np.array([json.loads(f) for f in recent["features"]])

        drift_scores = {}
        for i in range(reference_data.shape[1]):
            ref_mean = reference_data[:, i].mean()
            ref_std = reference_data[:, i].std()
            recent_mean = recent_features[:, i].mean()

            z_score = abs(recent_mean - ref_mean) / (ref_std + 1e-8)
            drift_scores[f"feature_{i}"] = float(z_score)

        drift_detected = any(score > 3.0 for score in drift_scores.values())

        return {
            "drift_detected": drift_detected,
            "drift_scores": drift_scores,
            "window_hours": window_hours,
            "sample_size": len(recent)
        }

    def check_prediction_distribution(self, window_hours: int = 24) -> dict:
        """Check if prediction distribution has shifted."""
        logs = pd.read_csv(self.log_path)
        logs["timestamp"] = pd.to_datetime(logs["timestamp"])

        cutoff = datetime.utcnow() - timedelta(hours=window_hours)
        recent = logs[logs["timestamp"] > cutoff]
        historical = logs[logs["timestamp"] <= cutoff]

        if len(recent) < 10 or len(historical) < 10:
            return {"shift_detected": False, "message": "Not enough data"}

        recent_dist = recent["prediction"].value_counts(normalize=True).to_dict()
        historical_dist = historical["prediction"].value_counts(normalize=True).to_dict()

        return {
            "recent_distribution": recent_dist,
            "historical_distribution": historical_dist,
            "sample_sizes": {"recent": len(recent), "historical": len(historical)}
        }

monitor = ModelMonitor()
```

## Writing Tests for ML Code

Test your data processing, model training, and API:

```python
# tests/test_model.py
import pytest
import numpy as np
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

def test_model_accuracy():
    """Model should achieve at least 90% accuracy on test set."""
    from src.train import train_model
    import pickle

    train_model(n_estimators=100, max_depth=10)

    with open("models/model.pkl", "rb") as f:
        model = pickle.load(f)

    X, y = load_iris(return_X_y=True)
    _, X_test, _, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    accuracy = model.score(X_test, y_test)
    assert accuracy >= 0.90, f"Accuracy {accuracy:.4f} below threshold 0.90"

def test_model_prediction_shape():
    """Predictions should have correct shape."""
    import pickle

    with open("models/model.pkl", "rb") as f:
        model = pickle.load(f)

    X = np.array([[5.1, 3.5, 1.4, 0.2]])
    pred = model.predict(X)
    proba = model.predict_proba(X)

    assert pred.shape == (1,)
    assert proba.shape[0] == 1
    assert proba.shape[1] == 3  # 3 classes for iris

# tests/test_api.py
from fastapi.testclient import TestClient
from src.serve import app

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_predict():
    response = client.post("/predict", json={"features": [5.1, 3.5, 1.4, 0.2]})
    assert response.status_code == 200
    data = response.json()
    assert "prediction" in data
    assert "probability" in data
    assert isinstance(data["prediction"], int)

def test_predict_batch():
    response = client.post("/predict/batch", json={
        "instances": [[5.1, 3.5, 1.4, 0.2], [6.2, 3.4, 5.4, 2.3]]
    })
    assert response.status_code == 200
    assert len(response.json()["predictions"]) == 2
```

## Summary

A production ML system needs more than a trained model. Here is what each tool provides:

- **MLflow** — Experiment tracking and model registry. Compare runs, reproduce results, manage model versions.
- **DVC** — Data versioning and pipeline orchestration. Track datasets in Git, run reproducible pipelines.
- **FastAPI** — Model serving. Low-latency REST API with automatic documentation, input validation, and async support.
- **Docker** — Packaging. Consistent environments from development through production.
- **GitHub Actions** — Automation. Run tests, train models, and deploy on every push.
- **Monitoring** — Drift detection and performance tracking. Know when your model needs retraining.

Start with experiment tracking. Once you have reproducible training, add data versioning. Then build the API, containerize it, and set up CI/CD. Add monitoring last — it matters most after the model is serving real traffic. Each piece builds on the previous one, and you can adopt them incrementally.
