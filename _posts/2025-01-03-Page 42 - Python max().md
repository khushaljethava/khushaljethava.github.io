---
title: Python max()
description: The max() function returns the item with the largest value or the item with the largest value in an iterable.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python max().webp
  alt: Python max()
---

The Python `max()` function is a built-in that returns the largest item from an iterable or the largest of two or more arguments. It supports two calling conventions: passing individual objects as positional arguments (`max(a, b, c)`), or passing a single iterable (`max(my_list)`). An optional `key` parameter accepts a function that extracts a comparison key from each element, and an optional `default` parameter provides a fallback value when the iterable is empty. Without a `default`, passing an empty iterable raises a `ValueError`. The function uses standard comparison operators, so it works with numbers, strings (compared lexicographically), and any objects that support the `>` operator. A common real-world use case is finding the highest score, maximum temperature, or most recent date in a dataset. For example, a grading system might use `max(student_scores, key=lambda s: s['grade'])` to find the top-performing student.

## What does max() return?

The `max()` function returns the largest item among the provided arguments or from the given iterable, according to standard comparison or a custom `key` function.

## When should you use max()?

Use `max()` when you need to find the largest value in a collection or among several values, optionally using a custom comparison key for complex objects.

## Syntax of max()

There are two different syntaxes of `max()` in Python:

**Syntax 1 — comparing individual objects:**

```python
max(n1, n2, n3, *n, key)
```

**Syntax 2 — finding the maximum from an iterable:**

```python
max(iterable, *iterable, key, default)
```

Both syntaxes support a `key` parameter for custom comparisons. Let's explore each form.

## max() function with objects

The object form finds the highest value among two or more directly provided arguments.

### max() parameters (object form)

* **n1** — First object to compare (required).
* **n2** — Second object to compare (required).
* **n3, \*n (optional)** — Any additional objects.
* **key (optional)** — A function applied to each argument before comparison.

### Example 1: Finding the maximum among given numbers

```python
result = max(2, 56, -2, 72, -83)
print("The largest number is:", result)
```

Output:

```
The largest number is: 72
```

### Example 2: Finding the maximum among variables

```python
num1 = 34
num2 = 2
num3 = -65
num4 = 92
num5 = -21

result = max(num1, num2, num3, num4, num5)
print("The largest number is:", result)
```

Output:

```
The largest number is: 92
```

---

## max() function with iterable

The iterable form finds the highest value element in a list, tuple, set, dictionary, or any other iterable.

### max() parameters (iterable form)

* **iterable** — The iterable to search (list, tuple, set, dict, etc.).
* **\*iterable** — Additional iterables; when multiple are provided, the global maximum across all is returned.
* **key (optional)** — A function applied to each element before comparison.
* **default (optional)** — A fallback value returned when the iterable is empty. Without this, an empty iterable raises `ValueError`.

### Example 3: Finding the largest item from a list

```python
numbers = [7, 1, -6, 2, 8, 10]
print("The largest number is:", max(numbers))
```

Output:

```
The largest number is: 10
```

### Example 4: Using the key parameter

The `key` parameter lets you define a custom comparison criterion. Here we find the longest word:

```python
words = ["apple", "banana", "fig", "strawberry", "kiwi"]
longest = max(words, key=len)
print("Longest word:", longest)
```

Output:

```
Longest word: strawberry
```

Find the student with the highest grade using a lambda:

```python
students = [
    {"name": "Alice", "grade": 88},
    {"name": "Bob", "grade": 95},
    {"name": "Carol", "grade": 79},
]

top_student = max(students, key=lambda s: s["grade"])
print("Top student:", top_student["name"], "with grade", top_student["grade"])
```

Output:

```
Top student: Bob with grade 95
```

### Example 5: Using the default parameter for empty iterables

```python
empty_list = []
result = max(empty_list, default=0)
print("Max of empty list:", result)
```

Output:

```
Max of empty list: 0
```

Without `default=0`, this would raise a `ValueError`.

### Example 6: Finding max in a dictionary by value

```python
scores = {"Alice": 88, "Bob": 95, "Carol": 79}

winner = max(scores, key=lambda name: scores[name])
print("Winner:", winner)
```

Output:

```
Winner: Bob
```

---

## Real-World Use Cases

### Peak temperature detection

```python
daily_temps = [22.1, 25.3, 19.8, 28.6, 24.0]
peak = max(daily_temps)
print(f"Peak temperature: {peak}C")
```

### Most expensive product

```python
products = [
    {"name": "Laptop", "price": 999},
    {"name": "Mouse", "price": 29},
    {"name": "Monitor", "price": 349},
]
most_expensive = max(products, key=lambda p: p["price"])
print(f"Most expensive: {most_expensive['name']} at ${most_expensive['price']}")
```

### Safe max over filtered results

```python
sales = [120, 85, 0, 200, 150]
high_sales = [s for s in sales if s > 100]
best = max(high_sales, default=0)
print("Best high sale:", best)
```

---

## Edge Cases and Gotchas

- **Empty iterable without default**: Raises `ValueError`. Always provide `default` when the iterable may be empty.
- **Mixed types**: Comparing incompatible types (e.g., `max(1, "a")`) raises a `TypeError` in Python 3.
- **String comparison is lexicographic**: `max("banana", "apple", "cherry")` returns `"cherry"` — not the longest word, but the alphabetically last one.
- **Ties return the first element**: When multiple elements share the maximum value, `max()` returns the first one found.
- **Key function return value is not returned**: `max()` returns the original element, not the value produced by `key`.

---

## Tips and Best Practices

1. **Use `key=len`** to find the longest string or largest collection by element count.
2. **Always use `default`** when the iterable may be empty — it avoids defensive `try/except` blocks.
3. **Use `operator.itemgetter`** instead of lambdas for cleaner key functions on dictionaries.
4. **Avoid `max()` on mixed types** — Python 3 raises `TypeError` for incompatible comparisons.
5. **Combine with generator expressions** to find the max among filtered data efficiently.

---

## Common Use Cases

A common use of `max()` is finding the highest value in a list of numbers, such as determining the peak temperature from a week of weather readings or the highest bid in an auction. Another practical scenario is using the `key` parameter to find the longest string in a list with `max(words, key=len)`, or identifying the most expensive item in a list of product dictionaries. Developers also use `max()` with `default` to safely handle potentially empty iterables, such as `max(filtered_results, default=0)`.

If you want to learn about finding the smallest or lowest value item, see the [Python min() function](/posts/Page-44-Python-min()/). To sort an entire collection rather than finding just the maximum, the [Python sorted() function](/posts/Page-60-Python-sorted()/) is the standard approach.

---

## Rules of max() function

* If an empty iterable is passed without a `default` parameter, it will raise a `ValueError` exception.
* If multiple iterables are passed, the largest value item from across all given iterables is returned.
* The `key` function is used for comparison only — the original element (not the key value) is returned.

---

## Frequently Asked Questions

**Q1: What happens when two elements are equal under `max()`?**

When multiple elements tie for the maximum value, `max()` returns the first one encountered in iteration order. This is consistent and deterministic, but be aware of it when order matters.

**Q2: Can I use `max()` with strings?**

Yes. Applied to strings, `max()` uses lexicographic (alphabetical) ordering. `max("banana", "apple", "cherry")` returns `"cherry"` because `c` comes after `b` and `a` alphabetically. Use `key=len` if you want the longest string instead.

**Q3: What is the difference between `max(a, b)` and `max([a, b])`?**

Both produce the same result. `max(a, b)` passes two separate arguments directly. `max([a, b])` passes a list as a single iterable argument. Use the iterable form when you have a variable-length collection; use the multi-argument form for a small fixed set of values.