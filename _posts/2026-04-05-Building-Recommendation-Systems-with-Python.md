---
title: "Building Recommendation Systems with Python from Scratch"
description: Learn how to build recommendation systems with Python from scratch. This guide covers collaborative filtering, content-based filtering, matrix factorization, the surprise library, scikit-learn implementations, hybrid approaches, and a complete movie recommendation example.
date: 2026-04-05 12:00:00 +0800
categories: [Python]
tags: [python, machine-learning, recommendation-systems]
image:
  path: "/commons/Building Recommendation Systems with Python from Scratch.png"
  alt: "Building Recommendation Systems with Python from Scratch"
---

## What Are Recommendation Systems?

Recommendation systems predict what a user might like based on past behavior, item attributes, or what similar users have liked. Netflix suggests movies. Amazon suggests products. Spotify suggests playlists. Behind all of these are recommendation algorithms.

There are three main approaches:

- **Collaborative filtering** — Recommend items that similar users liked. Does not need to know anything about the items themselves.
- **Content-based filtering** — Recommend items similar to what a user has liked before, based on item features.
- **Hybrid approaches** — Combine both methods for better results.

This guide implements each approach from scratch in Python, then shows how to use libraries like Surprise and scikit-learn to build production-quality systems.

## Setting Up

```python
pip install numpy pandas scikit-learn scikit-surprise scipy
```

We will use the MovieLens 100K dataset throughout this guide:

```python
import pandas as pd
import numpy as np

# Load MovieLens 100K dataset
ratings = pd.read_csv(
    "https://files.grouplens.org/datasets/movielens/ml-100k/u.data",
    sep="\t",
    names=["user_id", "item_id", "rating", "timestamp"]
)

movies = pd.read_csv(
    "https://files.grouplens.org/datasets/movielens/ml-100k/u.item",
    sep="|",
    encoding="latin-1",
    names=["item_id", "title", "release_date", "video_release", "url",
           "unknown", "Action", "Adventure", "Animation", "Children",
           "Comedy", "Crime", "Documentary", "Drama", "Fantasy",
           "Film-Noir", "Horror", "Musical", "Mystery", "Romance",
           "Sci-Fi", "Thriller", "War", "Western"],
    usecols=range(24)
)

print(f"Ratings: {len(ratings)}")
print(f"Users: {ratings['user_id'].nunique()}")
print(f"Movies: {ratings['item_id'].nunique()}")
print(f"Sparsity: {1 - len(ratings) / (ratings['user_id'].nunique() * ratings['item_id'].nunique()):.4f}")
```

## Collaborative Filtering from Scratch

Collaborative filtering works on the idea that users who agreed in the past will agree in the future.

### User-Based Collaborative Filtering

Find users similar to the target user, then recommend what those similar users liked:

```python
import numpy as np
import pandas as pd
from scipy.spatial.distance import cosine

class UserBasedCF:
    def __init__(self, ratings_df: pd.DataFrame):
        self.ratings = ratings_df
        self.user_item_matrix = ratings_df.pivot_table(
            index="user_id", columns="item_id", values="rating"
        ).fillna(0)
        self.user_similarity = self._compute_similarity()

    def _compute_similarity(self) -> pd.DataFrame:
        """Compute cosine similarity between all users."""
        matrix = self.user_item_matrix.values
        n_users = matrix.shape[0]
        similarity = np.zeros((n_users, n_users))

        for i in range(n_users):
            for j in range(i, n_users):
                if np.any(matrix[i]) and np.any(matrix[j]):
                    sim = 1 - cosine(matrix[i], matrix[j])
                else:
                    sim = 0
                similarity[i][j] = sim
                similarity[j][i] = sim

        return pd.DataFrame(
            similarity,
            index=self.user_item_matrix.index,
            columns=self.user_item_matrix.index
        )

    def recommend(self, user_id: int, n_recommendations: int = 10, n_neighbors: int = 20) -> list:
        """Recommend items for a user based on similar users."""
        # Find most similar users
        similar_users = self.user_similarity[user_id].sort_values(ascending=False)
        similar_users = similar_users.iloc[1:n_neighbors + 1]  # Exclude self

        # Get items the user has not rated
        user_ratings = self.user_item_matrix.loc[user_id]
        unrated_items = user_ratings[user_ratings == 0].index

        # Predict ratings for unrated items
        predictions = {}
        for item in unrated_items:
            numerator = 0
            denominator = 0
            for neighbor_id, similarity in similar_users.items():
                neighbor_rating = self.user_item_matrix.loc[neighbor_id, item]
                if neighbor_rating > 0:
                    numerator += similarity * neighbor_rating
                    denominator += abs(similarity)

            if denominator > 0:
                predictions[item] = numerator / denominator

        # Sort and return top N
        sorted_predictions = sorted(predictions.items(), key=lambda x: x[1], reverse=True)
        return sorted_predictions[:n_recommendations]

# Usage
cf = UserBasedCF(ratings)
recommendations = cf.recommend(user_id=1, n_recommendations=10)
for item_id, predicted_rating in recommendations:
    title = movies[movies["item_id"] == item_id]["title"].values[0]
    print(f"  {title}: predicted rating {predicted_rating:.2f}")
```

### Item-Based Collaborative Filtering

Instead of finding similar users, find similar items:

```python
class ItemBasedCF:
    def __init__(self, ratings_df: pd.DataFrame):
        self.ratings = ratings_df
        self.user_item_matrix = ratings_df.pivot_table(
            index="user_id", columns="item_id", values="rating"
        ).fillna(0)
        self.item_similarity = self._compute_item_similarity()

    def _compute_item_similarity(self) -> pd.DataFrame:
        """Compute cosine similarity between items."""
        matrix = self.user_item_matrix.values.T  # Transpose: items as rows
        n_items = matrix.shape[0]
        similarity = np.zeros((n_items, n_items))

        for i in range(n_items):
            for j in range(i, n_items):
                if np.any(matrix[i]) and np.any(matrix[j]):
                    sim = 1 - cosine(matrix[i], matrix[j])
                else:
                    sim = 0
                similarity[i][j] = sim
                similarity[j][i] = sim

        return pd.DataFrame(
            similarity,
            index=self.user_item_matrix.columns,
            columns=self.user_item_matrix.columns
        )

    def recommend(self, user_id: int, n_recommendations: int = 10) -> list:
        """Recommend items based on item similarity."""
        user_ratings = self.user_item_matrix.loc[user_id]
        rated_items = user_ratings[user_ratings > 0]
        unrated_items = user_ratings[user_ratings == 0].index

        predictions = {}
        for item in unrated_items:
            numerator = 0
            denominator = 0
            for rated_item, rating in rated_items.items():
                sim = self.item_similarity.loc[item, rated_item]
                if sim > 0:
                    numerator += sim * rating
                    denominator += sim

            if denominator > 0:
                predictions[item] = numerator / denominator

        sorted_predictions = sorted(predictions.items(), key=lambda x: x[1], reverse=True)
        return sorted_predictions[:n_recommendations]

item_cf = ItemBasedCF(ratings)
recommendations = item_cf.recommend(user_id=1)
for item_id, score in recommendations:
    title = movies[movies["item_id"] == item_id]["title"].values[0]
    print(f"  {title}: {score:.2f}")
```

Item-based CF is generally preferred over user-based in practice. Item similarities are more stable than user similarities since items do not change, but user preferences do.

## Content-Based Filtering

Content-based filtering uses item features to recommend similar items to those a user already likes:

```python
from sklearn.metrics.pairwise import cosine_similarity

class ContentBasedRecommender:
    def __init__(self, movies_df: pd.DataFrame, ratings_df: pd.DataFrame):
        self.movies = movies_df
        self.ratings = ratings_df

        # Genre columns as feature vectors
        self.genre_columns = [
            "Action", "Adventure", "Animation", "Children", "Comedy",
            "Crime", "Documentary", "Drama", "Fantasy", "Film-Noir",
            "Horror", "Musical", "Mystery", "Romance", "Sci-Fi",
            "Thriller", "War", "Western"
        ]
        self.feature_matrix = self.movies[self.genre_columns].values
        self.item_similarity = cosine_similarity(self.feature_matrix)

    def get_user_profile(self, user_id: int) -> np.ndarray:
        """Build a user profile from their rated items."""
        user_ratings = self.ratings[self.ratings["user_id"] == user_id]
        user_ratings = user_ratings.merge(self.movies, on="item_id")

        # Weighted average of genre vectors by rating
        profile = np.zeros(len(self.genre_columns))
        total_weight = 0

        for _, row in user_ratings.iterrows():
            weight = row["rating"]
            features = row[self.genre_columns].values.astype(float)
            profile += weight * features
            total_weight += weight

        if total_weight > 0:
            profile /= total_weight

        return profile

    def recommend(self, user_id: int, n_recommendations: int = 10) -> list:
        """Recommend items based on content similarity to user profile."""
        user_profile = self.get_user_profile(user_id)

        # Compute similarity between user profile and all items
        scores = cosine_similarity([user_profile], self.feature_matrix)[0]

        # Get items the user has already rated
        rated_items = set(
            self.ratings[self.ratings["user_id"] == user_id]["item_id"].values
        )

        # Rank unrated items
        item_scores = []
        for idx, score in enumerate(scores):
            item_id = self.movies.iloc[idx]["item_id"]
            if item_id not in rated_items:
                item_scores.append((item_id, score))

        item_scores.sort(key=lambda x: x[1], reverse=True)
        return item_scores[:n_recommendations]

    def find_similar_movies(self, movie_id: int, n: int = 5) -> list:
        """Find movies similar to a given movie."""
        idx = self.movies[self.movies["item_id"] == movie_id].index[0]
        similarities = self.item_similarity[idx]

        similar_indices = similarities.argsort()[::-1][1:n + 1]
        results = []
        for i in similar_indices:
            results.append({
                "title": self.movies.iloc[i]["title"],
                "similarity": similarities[i],
                "genres": [g for g in self.genre_columns if self.movies.iloc[i][g] == 1]
            })
        return results

# Usage
cb = ContentBasedRecommender(movies, ratings)

# Get recommendations for a user
recs = cb.recommend(user_id=1)
print("Content-based recommendations for user 1:")
for item_id, score in recs:
    title = movies[movies["item_id"] == item_id]["title"].values[0]
    print(f"  {title}: score {score:.3f}")

# Find movies similar to "Toy Story (1995)"
similar = cb.find_similar_movies(movie_id=1)
print("\nMovies similar to Toy Story:")
for movie in similar:
    print(f"  {movie['title']} ({movie['similarity']:.3f}) - {', '.join(movie['genres'])}")
```

## Matrix Factorization

Matrix factorization decomposes the sparse user-item rating matrix into two lower-rank matrices. This captures latent factors — hidden features that explain rating patterns.

```python
import numpy as np

class MatrixFactorization:
    def __init__(self, n_factors: int = 20, learning_rate: float = 0.005,
                 regularization: float = 0.02, n_epochs: int = 50):
        self.n_factors = n_factors
        self.lr = learning_rate
        self.reg = regularization
        self.n_epochs = n_epochs

    def fit(self, ratings_df: pd.DataFrame):
        """Train the model using SGD."""
        self.user_ids = sorted(ratings_df["user_id"].unique())
        self.item_ids = sorted(ratings_df["item_id"].unique())
        self.user_map = {uid: i for i, uid in enumerate(self.user_ids)}
        self.item_map = {iid: i for i, iid in enumerate(self.item_ids)}

        n_users = len(self.user_ids)
        n_items = len(self.item_ids)

        # Initialize latent factor matrices
        self.user_factors = np.random.normal(0, 0.1, (n_users, self.n_factors))
        self.item_factors = np.random.normal(0, 0.1, (n_items, self.n_factors))
        self.user_biases = np.zeros(n_users)
        self.item_biases = np.zeros(n_items)
        self.global_mean = ratings_df["rating"].mean()

        # Training with SGD
        ratings_list = ratings_df[["user_id", "item_id", "rating"]].values

        for epoch in range(self.n_epochs):
            np.random.shuffle(ratings_list)
            total_error = 0

            for user_id, item_id, rating in ratings_list:
                u = self.user_map[int(user_id)]
                i = self.item_map[int(item_id)]

                prediction = self.predict_single(u, i)
                error = rating - prediction
                total_error += error ** 2

                # Update biases
                self.user_biases[u] += self.lr * (error - self.reg * self.user_biases[u])
                self.item_biases[i] += self.lr * (error - self.reg * self.item_biases[i])

                # Update latent factors
                user_factor = self.user_factors[u].copy()
                self.user_factors[u] += self.lr * (error * self.item_factors[i] - self.reg * self.user_factors[u])
                self.item_factors[i] += self.lr * (error * user_factor - self.reg * self.item_factors[i])

            rmse = np.sqrt(total_error / len(ratings_list))
            if (epoch + 1) % 10 == 0:
                print(f"Epoch {epoch + 1}/{self.n_epochs}, RMSE: {rmse:.4f}")

    def predict_single(self, user_idx: int, item_idx: int) -> float:
        """Predict rating for a user-item pair (using internal indices)."""
        return (self.global_mean +
                self.user_biases[user_idx] +
                self.item_biases[item_idx] +
                np.dot(self.user_factors[user_idx], self.item_factors[item_idx]))

    def predict(self, user_id: int, item_id: int) -> float:
        """Predict rating for a user-item pair (using original IDs)."""
        if user_id not in self.user_map or item_id not in self.item_map:
            return self.global_mean
        u = self.user_map[user_id]
        i = self.item_map[item_id]
        return np.clip(self.predict_single(u, i), 1, 5)

    def recommend(self, user_id: int, rated_items: set, n: int = 10) -> list:
        """Get top-N recommendations for a user."""
        if user_id not in self.user_map:
            return []

        predictions = []
        for item_id in self.item_ids:
            if item_id not in rated_items:
                score = self.predict(user_id, item_id)
                predictions.append((item_id, score))

        predictions.sort(key=lambda x: x[1], reverse=True)
        return predictions[:n]

# Train
mf = MatrixFactorization(n_factors=20, n_epochs=50)
mf.fit(ratings)

# Get recommendations
user_rated = set(ratings[ratings["user_id"] == 1]["item_id"].values)
recs = mf.recommend(user_id=1, rated_items=user_rated)

print("Matrix factorization recommendations:")
for item_id, score in recs:
    title = movies[movies["item_id"] == item_id]["title"].values[0]
    print(f"  {title}: {score:.2f}")
```

## Using the Surprise Library

The Surprise library provides optimized implementations of common recommendation algorithms:

```python
from surprise import Dataset, Reader, SVD, KNNBasic, NMF
from surprise.model_selection import cross_validate, train_test_split
from surprise import accuracy
import pandas as pd

# Load data into Surprise format
reader = Reader(rating_scale=(1, 5))
data = Dataset.load_from_df(ratings[["user_id", "item_id", "rating"]], reader)

# Compare different algorithms
algorithms = {
    "SVD": SVD(n_factors=50, n_epochs=20, lr_all=0.005, reg_all=0.02),
    "KNN User-Based": KNNBasic(k=40, sim_options={"name": "cosine", "user_based": True}),
    "KNN Item-Based": KNNBasic(k=40, sim_options={"name": "cosine", "user_based": False}),
    "NMF": NMF(n_factors=15, n_epochs=50),
}

for name, algo in algorithms.items():
    results = cross_validate(algo, data, measures=["RMSE", "MAE"], cv=5, verbose=False)
    print(f"{name:20s} RMSE: {results['test_rmse'].mean():.4f}  MAE: {results['test_mae'].mean():.4f}")
```

Train the best model and generate recommendations:

```python
from surprise import SVD, Dataset, Reader
from collections import defaultdict

reader = Reader(rating_scale=(1, 5))
data = Dataset.load_from_df(ratings[["user_id", "item_id", "rating"]], reader)
trainset = data.build_full_trainset()

model = SVD(n_factors=50, n_epochs=20, lr_all=0.005, reg_all=0.02)
model.fit(trainset)

def get_top_n(model, trainset, n=10):
    """Get top N recommendations for all users."""
    # Get all item IDs
    all_items = set(trainset.all_items())
    top_n = defaultdict(list)

    for uid in trainset.all_users():
        raw_uid = trainset.to_raw_uid(uid)
        # Items the user has already rated
        rated_items = set(trainset.ur[uid])
        rated_iids = {iid for iid, _ in rated_items}

        # Predict for unrated items
        for iid in all_items:
            if iid not in rated_iids:
                raw_iid = trainset.to_raw_iid(iid)
                prediction = model.predict(raw_uid, raw_iid)
                top_n[raw_uid].append((raw_iid, prediction.est))

        # Sort and keep top N
        top_n[raw_uid].sort(key=lambda x: x[1], reverse=True)
        top_n[raw_uid] = top_n[raw_uid][:n]

    return top_n

top_n = get_top_n(model, trainset, n=10)

# Show recommendations for user 1
print("Top 10 for user 1:")
for item_id, predicted_rating in top_n[1]:
    title = movies[movies["item_id"] == item_id]["title"].values[0]
    print(f"  {title}: {predicted_rating:.2f}")
```

## Hybrid Recommendation System

Combine collaborative and content-based approaches for better results:

```python
from sklearn.preprocessing import MinMaxScaler

class HybridRecommender:
    def __init__(self, ratings_df: pd.DataFrame, movies_df: pd.DataFrame,
                 cf_weight: float = 0.6, cb_weight: float = 0.4):
        self.cf_weight = cf_weight
        self.cb_weight = cb_weight
        self.ratings = ratings_df
        self.movies = movies_df
        self.scaler = MinMaxScaler()

        # Train collaborative filtering (using Surprise SVD)
        from surprise import SVD, Dataset, Reader
        reader = Reader(rating_scale=(1, 5))
        data = Dataset.load_from_df(ratings_df[["user_id", "item_id", "rating"]], reader)
        trainset = data.build_full_trainset()
        self.cf_model = SVD(n_factors=50, n_epochs=20)
        self.cf_model.fit(trainset)
        self.trainset = trainset

        # Build content-based features
        self.genre_columns = [
            "Action", "Adventure", "Animation", "Children", "Comedy",
            "Crime", "Documentary", "Drama", "Fantasy", "Film-Noir",
            "Horror", "Musical", "Mystery", "Romance", "Sci-Fi",
            "Thriller", "War", "Western"
        ]
        self.feature_matrix = movies_df[self.genre_columns].values
        self.item_similarity = cosine_similarity(self.feature_matrix)

    def _cf_score(self, user_id: int, item_id: int) -> float:
        """Get collaborative filtering prediction."""
        return self.cf_model.predict(user_id, item_id).est

    def _cb_score(self, user_id: int, item_id: int) -> float:
        """Get content-based score."""
        user_ratings = self.ratings[self.ratings["user_id"] == user_id]
        if len(user_ratings) == 0:
            return 0

        target_idx = self.movies[self.movies["item_id"] == item_id].index
        if len(target_idx) == 0:
            return 0
        target_idx = target_idx[0]

        score = 0
        weight_sum = 0
        for _, row in user_ratings.iterrows():
            rated_idx = self.movies[self.movies["item_id"] == row["item_id"]].index
            if len(rated_idx) == 0:
                continue
            rated_idx = rated_idx[0]
            sim = self.item_similarity[target_idx][rated_idx]
            score += sim * row["rating"]
            weight_sum += sim

        return score / weight_sum if weight_sum > 0 else 0

    def recommend(self, user_id: int, n: int = 10) -> list:
        """Generate hybrid recommendations."""
        rated_items = set(self.ratings[self.ratings["user_id"] == user_id]["item_id"].values)
        all_items = self.movies["item_id"].values

        scores = []
        for item_id in all_items:
            if item_id in rated_items:
                continue
            cf = self._cf_score(user_id, item_id)
            cb = self._cb_score(user_id, item_id)
            hybrid = self.cf_weight * cf + self.cb_weight * cb
            scores.append((item_id, hybrid, cf, cb))

        scores.sort(key=lambda x: x[1], reverse=True)
        return scores[:n]

# Usage
hybrid = HybridRecommender(ratings, movies, cf_weight=0.6, cb_weight=0.4)
recs = hybrid.recommend(user_id=1, n=10)

print("Hybrid recommendations for user 1:")
print(f"{'Title':<45} {'Hybrid':>7} {'CF':>7} {'CB':>7}")
print("-" * 70)
for item_id, hybrid_score, cf_score, cb_score in recs:
    title = movies[movies["item_id"] == item_id]["title"].values[0]
    print(f"{title:<45} {hybrid_score:>7.2f} {cf_score:>7.2f} {cb_score:>7.2f}")
```

## Evaluating Recommendation Systems

Evaluation goes beyond RMSE. Use ranking metrics to measure how good the recommendations actually are:

```python
from sklearn.model_selection import train_test_split
import numpy as np

def evaluate_recommender(model, ratings_df, k=10):
    """Evaluate with precision@k and recall@k."""
    train_df, test_df = train_test_split(ratings_df, test_size=0.2, random_state=42)

    # Group test ratings by user
    test_user_items = test_df.groupby("user_id")["item_id"].apply(set).to_dict()
    # Only consider items rated 4+ as "relevant"
    relevant_items = test_df[test_df["rating"] >= 4].groupby("user_id")["item_id"].apply(set).to_dict()

    precisions = []
    recalls = []

    for user_id in test_user_items:
        if user_id not in relevant_items or len(relevant_items[user_id]) == 0:
            continue

        # Get top-k recommendations
        rated_in_train = set(train_df[train_df["user_id"] == user_id]["item_id"].values)
        recs = model.recommend(user_id, rated_items=rated_in_train, n=k)
        rec_items = set(item_id for item_id, _ in recs)

        # Precision: fraction of recommended items that are relevant
        hits = rec_items & relevant_items[user_id]
        precision = len(hits) / k if k > 0 else 0
        precisions.append(precision)

        # Recall: fraction of relevant items that were recommended
        recall = len(hits) / len(relevant_items[user_id])
        recalls.append(recall)

    avg_precision = np.mean(precisions)
    avg_recall = np.mean(recalls)

    print(f"Precision@{k}: {avg_precision:.4f}")
    print(f"Recall@{k}: {avg_recall:.4f}")
    print(f"F1@{k}: {2 * avg_precision * avg_recall / (avg_precision + avg_recall + 1e-8):.4f}")

    return avg_precision, avg_recall
```

## Cold Start Solutions

New users and new items have no interaction history. Here are practical approaches:

```python
def popularity_recommendations(ratings_df: pd.DataFrame, n: int = 10) -> list:
    """Recommend most popular items as a fallback."""
    popular = (ratings_df.groupby("item_id")
               .agg(avg_rating=("rating", "mean"), count=("rating", "count"))
               .query("count >= 20")
               .sort_values("avg_rating", ascending=False)
               .head(n))
    return popular.index.tolist()

def demographic_recommendations(user_features: dict, user_db: pd.DataFrame,
                                ratings_df: pd.DataFrame, n: int = 10) -> list:
    """Recommend based on what similar demographic groups liked."""
    # Find users in similar age/gender group
    similar_users = user_db[
        (user_db["age_group"] == user_features["age_group"]) &
        (user_db["gender"] == user_features["gender"])
    ]["user_id"].values

    # Get their highly-rated items
    group_ratings = ratings_df[
        (ratings_df["user_id"].isin(similar_users)) &
        (ratings_df["rating"] >= 4)
    ]

    popular_in_group = (group_ratings.groupby("item_id")["rating"]
                        .count()
                        .sort_values(ascending=False)
                        .head(n))

    return popular_in_group.index.tolist()
```

## Summary

Recommendation systems follow a clear progression of complexity:

1. **Popularity-based** — Simplest baseline. Recommend what is most popular. Works as a cold-start fallback.
2. **Content-based filtering** — Uses item features. Good when you have rich metadata. Does not need other users' data.
3. **Collaborative filtering** — Uses interaction patterns. Finds non-obvious recommendations. Needs sufficient user-item interactions.
4. **Matrix factorization** — Learns latent factors from the rating matrix. Better generalization than raw collaborative filtering.
5. **Hybrid** — Combines multiple approaches. Best overall performance.

Start with SVD from the Surprise library for a strong baseline. Add content-based features if you have good item metadata. Use popularity as a fallback for cold-start users. Evaluate with ranking metrics like precision@k and recall@k rather than just RMSE, because real recommendation quality is about whether users like the top few suggestions, not average prediction error across all items.
