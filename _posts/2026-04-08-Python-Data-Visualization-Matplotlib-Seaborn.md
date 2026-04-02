---
title: "Python Data Visualization with Matplotlib and Seaborn: Complete Guide"
description: Learn Python data visualization with Matplotlib, Seaborn, and Plotly. This complete guide covers bar charts, line plots, heatmaps, interactive charts, custom themes, and building dashboard-style visualizations.
date: 2026-04-08 12:00:00 +0800
categories: [Python]
tags: [python, data-visualization, matplotlib]
image:
  path: "/commons/Python Data Visualization with Matplotlib and Seaborn Complete Guide.webp"
  alt: "Python data visualization examples showing bar charts, heatmaps, and interactive plots using Matplotlib, Seaborn, and Plotly"
---

## Why Data Visualization Matters

A table of 10,000 numbers tells you nothing. A chart tells a story in seconds. Python's visualization libraries turn raw data into insights. Whether you are plotting [time series forecasts](/posts/Time-Series-Forecasting-with-Python/) or exploring [sentiment analysis results](/posts/Sentiment-Analysis-with-Python/), effective visualization is what makes the data actionable.

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
plt.plot(x, np.sin(x))
plt.title("Sine Wave")
plt.savefig("sine.png")
```

Three lines to go from data to chart. Let's build on this.

## Installation

```bash
pip install matplotlib seaborn plotly pandas numpy
```

## Matplotlib Fundamentals

### Line Charts

```python
import matplotlib.pyplot as plt
import numpy as np

months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
sales_2024 = [45, 52, 48, 61, 55, 67, 72, 68, 74, 82, 91, 105]
sales_2025 = [50, 58, 55, 68, 62, 75, 80, 77, 85, 93, 98, 112]

fig, ax = plt.subplots(figsize=(10, 5))
ax.plot(months, sales_2024, marker="o", label="2024", linewidth=2)
ax.plot(months, sales_2025, marker="s", label="2025", linewidth=2)

ax.set_xlabel("Month")
ax.set_ylabel("Sales (thousands)")
ax.set_title("Monthly Sales Comparison")
ax.legend()
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig("sales_comparison.png", dpi=150)
```

### Bar Charts

```python
categories = ["Python", "JavaScript", "Java", "C++", "Go"]
popularity = [31.5, 18.2, 15.8, 11.3, 8.7]
colors = ["#3776AB", "#F7DF1E", "#ED8B00", "#00599C", "#00ADD8"]

fig, ax = plt.subplots(figsize=(8, 5))
bars = ax.bar(categories, popularity, color=colors, edgecolor="white", linewidth=1.5)

# Add value labels on bars
for bar, val in zip(bars, popularity):
    ax.text(bar.get_x() + bar.get_width() / 2, bar.get_height() + 0.5,
            f"{val}%", ha="center", fontweight="bold")

ax.set_ylabel("Popularity (%)")
ax.set_title("Programming Language Popularity 2026")
ax.spines["top"].set_visible(False)
ax.spines["right"].set_visible(False)

plt.tight_layout()
plt.savefig("language_popularity.png", dpi=150)
```

### Subplots

```python
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# Subplot 1: Line chart
x = np.linspace(0, 10, 50)
axes[0, 0].plot(x, np.sin(x), color="#e74c3c")
axes[0, 0].set_title("Sine Wave")

# Subplot 2: Scatter plot
np.random.seed(42)
x = np.random.randn(100)
y = x * 2 + np.random.randn(100) * 0.5
axes[0, 1].scatter(x, y, alpha=0.6, c="#3498db")
axes[0, 1].set_title("Scatter Plot")

# Subplot 3: Histogram
data = np.random.normal(100, 15, 1000)
axes[1, 0].hist(data, bins=30, color="#2ecc71", edgecolor="white")
axes[1, 0].set_title("Distribution")

# Subplot 4: Box plot
data = [np.random.normal(m, 10, 100) for m in [60, 70, 80, 90]]
axes[1, 1].boxplot(data, labels=["Q1", "Q2", "Q3", "Q4"])
axes[1, 1].set_title("Quarterly Performance")

plt.tight_layout()
plt.savefig("subplots.png", dpi=150)
```

## Seaborn for Statistical Plots

Seaborn builds on Matplotlib with better defaults and statistical visualizations.

### Heatmap

```python
import seaborn as sns
import pandas as pd
import numpy as np

# Correlation matrix
np.random.seed(42)
data = pd.DataFrame({
    "Revenue": np.random.randn(100),
    "Users": np.random.randn(100),
    "Sessions": np.random.randn(100),
    "Bounce Rate": np.random.randn(100),
    "Conversion": np.random.randn(100),
})
data["Conversion"] = data["Revenue"] * 0.7 + np.random.randn(100) * 0.3
data["Sessions"] = data["Users"] * 0.8 + np.random.randn(100) * 0.4

corr = data.corr()

plt.figure(figsize=(8, 6))
sns.heatmap(corr, annot=True, cmap="RdBu_r", center=0,
            fmt=".2f", square=True, linewidths=0.5)
plt.title("Feature Correlation Matrix")
plt.tight_layout()
plt.savefig("heatmap.png", dpi=150)
```

### Distribution Plots

```python
fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# KDE plot
sns.kdeplot(data=data, x="Revenue", fill=True, ax=axes[0], color="#3498db")
axes[0].set_title("Revenue Distribution")

# Violin plot
tips = sns.load_dataset("tips")
sns.violinplot(data=tips, x="day", y="total_bill", ax=axes[1], palette="Set2")
axes[1].set_title("Bills by Day")

# Swarm plot
sns.swarmplot(data=tips, x="day", y="tip", hue="sex", ax=axes[2], palette="Set1", size=4)
axes[2].set_title("Tips by Day and Gender")

plt.tight_layout()
plt.savefig("distributions.png", dpi=150)
```

### Pair Plot

```python
iris = sns.load_dataset("iris")

g = sns.pairplot(iris, hue="species", palette="husl",
                 diag_kind="kde", plot_kws={"alpha": 0.6})
g.fig.suptitle("Iris Dataset Pair Plot", y=1.02)
plt.savefig("pairplot.png", dpi=150)
```

### Regression Plot

```python
tips = sns.load_dataset("tips")

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

sns.regplot(data=tips, x="total_bill", y="tip", ax=axes[0],
            scatter_kws={"alpha": 0.5}, line_kws={"color": "red"})
axes[0].set_title("Tip vs Total Bill")

sns.residplot(data=tips, x="total_bill", y="tip", ax=axes[1],
              scatter_kws={"alpha": 0.5})
axes[1].set_title("Residuals")

plt.tight_layout()
plt.savefig("regression.png", dpi=150)
```

## Plotly for Interactive Charts

```python
import plotly.express as px
import plotly.graph_objects as go

# Interactive scatter plot
df = px.data.gapminder().query("year == 2007")
fig = px.scatter(
    df, x="gdpPercap", y="lifeExp",
    size="pop", color="continent",
    hover_name="country",
    log_x=True,
    title="GDP vs Life Expectancy (2007)"
)
fig.write_html("interactive_scatter.html")

# Interactive line chart with range slider
df = px.data.stocks()
fig = px.line(df, x="date", y=df.columns[1:],
              title="Stock Prices Over Time")
fig.update_xaxes(rangeslider_visible=True)
fig.write_html("stocks.html")
```

## Custom Themes and Styling

### Creating a Custom Style

```python
import matplotlib.pyplot as plt

# Define custom style
custom_style = {
    "figure.facecolor": "#1a1a2e",
    "axes.facecolor": "#16213e",
    "axes.edgecolor": "#e94560",
    "axes.labelcolor": "#eee",
    "text.color": "#eee",
    "xtick.color": "#eee",
    "ytick.color": "#eee",
    "grid.color": "#333",
    "grid.alpha": 0.3,
    "font.size": 12,
}

with plt.rc_context(custom_style):
    fig, ax = plt.subplots(figsize=(10, 5))
    x = np.linspace(0, 10, 100)
    ax.plot(x, np.sin(x), color="#e94560", linewidth=2, label="sin(x)")
    ax.plot(x, np.cos(x), color="#0f3460", linewidth=2, label="cos(x)")
    ax.set_title("Dark Theme Chart")
    ax.legend()
    ax.grid(True)
    plt.tight_layout()
    plt.savefig("dark_theme.png", dpi=150)
```

### Seaborn Built-in Themes

```python
themes = ["darkgrid", "whitegrid", "dark", "white", "ticks"]

fig, axes = plt.subplots(1, 5, figsize=(20, 4))
for ax, theme in zip(axes, themes):
    with sns.axes_style(theme):
        x = np.random.randn(100)
        ax.hist(x, bins=20, color="#3498db")
        ax.set_title(theme)

plt.tight_layout()
plt.savefig("seaborn_themes.png", dpi=150)
```

## Dashboard-Style Visualization

Combine multiple charts into a cohesive dashboard. This technique is especially useful for presenting [fraud detection model evaluations](/posts/Fraud-Detection-with-Machine-Learning-Python/) where ROC curves, confusion matrices, and feature importance plots need to appear together.

```python
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
import numpy as np
import pandas as pd

np.random.seed(42)

fig = plt.figure(figsize=(16, 10))
gs = gridspec.GridSpec(3, 3, hspace=0.35, wspace=0.3)

# KPI cards (top row)
kpis = [
    ("Total Revenue", "$1.2M", "+12.5%", "#27ae60"),
    ("Active Users", "48.3K", "+8.2%", "#2980b9"),
    ("Conversion Rate", "3.7%", "-0.3%", "#e74c3c"),
]

for i, (title, value, change, color) in enumerate(kpis):
    ax = fig.add_subplot(gs[0, i])
    ax.text(0.5, 0.7, value, ha="center", va="center",
            fontsize=28, fontweight="bold", color=color)
    ax.text(0.5, 0.35, change, ha="center", va="center",
            fontsize=14, color=color, alpha=0.8)
    ax.text(0.5, 0.1, title, ha="center", va="center",
            fontsize=11, color="#666")
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis("off")

# Revenue trend (middle left)
ax = fig.add_subplot(gs[1, :2])
months = pd.date_range("2025-01", periods=12, freq="M")
revenue = [85, 92, 88, 101, 95, 108, 115, 110, 120, 132, 141, 155]
ax.fill_between(months, revenue, alpha=0.3, color="#3498db")
ax.plot(months, revenue, color="#3498db", linewidth=2, marker="o", markersize=5)
ax.set_title("Monthly Revenue Trend")
ax.set_ylabel("Revenue ($K)")

# Top products (middle right)
ax = fig.add_subplot(gs[1, 2])
products = ["Product A", "Product B", "Product C", "Product D", "Product E"]
sales = [340, 280, 220, 190, 150]
colors = ["#3498db", "#2ecc71", "#e74c3c", "#f39c12", "#9b59b6"]
ax.barh(products, sales, color=colors)
ax.set_title("Top Products by Sales")
ax.invert_yaxis()

# Traffic sources (bottom left)
ax = fig.add_subplot(gs[2, 0])
sources = ["Organic", "Direct", "Social", "Referral", "Email"]
values = [42, 25, 18, 10, 5]
ax.pie(values, labels=sources, autopct="%1.0f%%", colors=colors, startangle=90)
ax.set_title("Traffic Sources")

# Daily active users (bottom center+right)
ax = fig.add_subplot(gs[2, 1:])
days = np.arange(30)
users = np.random.poisson(1200, 30) + np.linspace(0, 200, 30).astype(int)
ax.bar(days, users, color="#3498db", alpha=0.7)
ax.axhline(y=np.mean(users), color="#e74c3c", linestyle="--", label=f"Avg: {np.mean(users):.0f}")
ax.set_title("Daily Active Users (Last 30 Days)")
ax.set_xlabel("Day")
ax.legend()

plt.suptitle("Business Dashboard — March 2026", fontsize=16, fontweight="bold", y=1.01)
plt.savefig("dashboard.png", dpi=150, bbox_inches="tight")
```

## Key Takeaways

- Matplotlib handles any chart type with full control over every element
- Seaborn excels at statistical visualization with minimal code
- Plotly creates interactive, web-ready charts
- Always remove unnecessary chart elements (top/right spines, extra gridlines)
- Color palettes matter — use colorblind-friendly palettes for accessibility
- Combine multiple plots into dashboards using GridSpec
- Save at 150+ DPI for crisp output in reports and presentations

## Related Posts

- [Time Series Forecasting with Python](/posts/Time-Series-Forecasting-with-Python/) -- Visualize trends, seasonality, and model forecasts with Matplotlib.
- [Sentiment Analysis with Python](/posts/Sentiment-Analysis-with-Python/) -- Chart sentiment distributions and opinion trends across datasets.
- [Fraud Detection with Machine Learning in Python](/posts/Fraud-Detection-with-Machine-Learning-Python/) -- Build evaluation dashboards with ROC curves, confusion matrices, and feature importance plots.
