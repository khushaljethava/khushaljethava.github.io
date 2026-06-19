---
title: "Hyperparameter Tuning with Optuna: A Python Guide"
description: Learn hyperparameter tuning in Python with Optuna. Covers search spaces, pruning, multi-objective optimization, and a complete example tuning an XGBoost model.
date: 2026-06-19 15:00:00 +0530
categories: [Python, AI]
tags: [python, optuna, hyperparameter-tuning, machine-learning, xgboost]
image:
  path: "/commons/Hyperparameter Tuning with Optuna A Python Guide.webp"
  alt: "Optuna hyperparameter tuning showing search space, trials, and optimization history in Python"
---

## Why Grid Search Falls Short

Grid search tests every combination in a fixed set of values — wasteful, because most combinations are obviously bad after a few trials. Optuna uses a smarter search (Tree-structured Parzen Estimator by default) that learns from previous trials and focuses on promising regions of the search space, finding better hyperparameters in far fewer trials.

This matters for any model from this site's [Fraud Detection with Machine Learning](/posts/Fraud-Detection-with-Machine-Learning-Python/) pipeline onward — tuned hyperparameters consistently beat hand-picked defaults.

```bash
pip install optuna xgboost scikit-learn
```

## Defining a Search Space

```python
import optuna
import xgboost as xgb
from sklearn.model_selection import cross_val_score
from sklearn.datasets import load_breast_cancer

X, y = load_breast_cancer(return_X_y=True)

def objective(trial):
    params = {
        "n_estimators": trial.suggest_int("n_estimators", 50, 500),
        "max_depth": trial.suggest_int("max_depth", 3, 12),
        "learning_rate": trial.suggest_float("learning_rate", 0.01, 0.3, log=True),
        "subsample": trial.suggest_float("subsample", 0.5, 1.0),
        "colsample_bytree": trial.suggest_float("colsample_bytree", 0.5, 1.0),
        "reg_lambda": trial.suggest_float("reg_lambda", 1e-3, 10.0, log=True),
    }
    model = xgb.XGBClassifier(**params, random_state=42, eval_metric="logloss")
    score = cross_val_score(model, X, y, cv=5, scoring="roc_auc").mean()
    return score
```

`suggest_int`, `suggest_float`, and `log=True` matter: learning rate and regularization parameters span orders of magnitude, so searching them on a log scale avoids wasting trials oversampling large values.

## Running the Optimization

```python
study = optuna.create_study(direction="maximize")
study.optimize(objective, n_trials=50)

print(f"Best AUC: {study.best_value:.4f}")
print(f"Best params: {study.best_params}")
```

```text
Best AUC: 0.9912
Best params: {'n_estimators': 287, 'max_depth': 5, 'learning_rate': 0.0421, 'subsample': 0.812, 'colsample_bytree': 0.734, 'reg_lambda': 0.156}
```

## Pruning Bad Trials Early

For expensive models, Optuna can stop a trial early if it's clearly underperforming — saving compute for trials that actually matter:

```python
def objective_with_pruning(trial):
    params = {
        "n_estimators": trial.suggest_int("n_estimators", 50, 500),
        "max_depth": trial.suggest_int("max_depth", 3, 12),
        "learning_rate": trial.suggest_float("learning_rate", 0.01, 0.3, log=True),
    }
    model = xgb.XGBClassifier(**params, random_state=42, eval_metric="logloss")

    scores = []
    for fold_score in cross_val_score(model, X, y, cv=5, scoring="roc_auc"):
        scores.append(fold_score)
        trial.report(sum(scores) / len(scores), len(scores))
        if trial.should_prune():
            raise optuna.TrialPruned()

    return sum(scores) / len(scores)

study_pruned = optuna.create_study(direction="maximize", pruner=optuna.pruners.MedianPruner())
study_pruned.optimize(objective_with_pruning, n_trials=50)
```

`MedianPruner` kills a trial once its intermediate score falls below the median of completed trials at the same step — typically cutting total runtime by 30–50% with no quality loss.

## Visualizing the Search

```python
import optuna.visualization as vis

fig1 = vis.plot_optimization_history(study)
fig1.write_html("optimization_history.html")

fig2 = vis.plot_param_importances(study)
fig2.write_html("param_importances.html")
```

`plot_param_importances` is especially useful — it tells you which hyperparameters actually matter for your model, so you can stop wasting search budget on ones that don't.

## Multi-Objective Optimization

Sometimes you want to balance accuracy against model size or inference speed:

```python
def multi_objective(trial):
    params = {
        "n_estimators": trial.suggest_int("n_estimators", 50, 500),
        "max_depth": trial.suggest_int("max_depth", 3, 12),
    }
    model = xgb.XGBClassifier(**params, random_state=42, eval_metric="logloss")
    auc = cross_val_score(model, X, y, cv=5, scoring="roc_auc").mean()
    model_size = params["n_estimators"] * params["max_depth"]  # proxy for inference cost
    return auc, model_size

study_multi = optuna.create_study(directions=["maximize", "minimize"])
study_multi.optimize(multi_objective, n_trials=50)

for trial in study_multi.best_trials[:3]:
    print(f"AUC={trial.values[0]:.4f}, size={trial.values[1]}, params={trial.params}")
```

This returns a Pareto front — multiple "best" trials representing different tradeoffs between accuracy and size, instead of forcing one into a single combined score.

## Key Takeaways

- Optuna's TPE sampler learns from previous trials, finding good hyperparameters faster than grid search
- Use log-scale sampling for parameters spanning orders of magnitude (learning rate, regularization)
- Pruning stops bad trials early, often cutting tuning time by 30–50%
- `plot_param_importances` shows which hyperparameters are actually worth tuning
- Multi-objective optimization gives you a Pareto front when accuracy and efficiency both matter
- Always validate the final tuned model on a held-out test set — cross-validation scores during tuning can overfit to the validation folds

## Related Posts

- [Fraud Detection with Machine Learning in Python](/posts/Fraud-Detection-with-Machine-Learning-Python/) -- Apply Optuna tuning to improve the XGBoost model built in this guide.
- [Feature Engineering for Tabular ML: A Python Guide](/posts/Feature-Engineering-for-Tabular-ML-A-Python-Guide/) -- Pair good features with tuned hyperparameters for the biggest model improvements.
- [MLOps with Python: Production ML Pipelines](/posts/MLOps-with-Python-Production-ML-Pipelines/) -- Automate hyperparameter tuning as part of a retraining pipeline.
