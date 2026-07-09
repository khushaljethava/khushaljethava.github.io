---
title: "Python Dictionaries: The Complete Guide with All Methods"
description: "Master Python dictionaries — creation, access, iteration, and every built-in method (get, items, keys, pop, setdefault, update, and more) with runnable examples and gotchas."
date: 2026-07-09 11:00:00 +0530
categories: [Python]
tags: [python, dictionary, data-structures]
image:
  path: /commons/Python Dictionary.webp
  alt: "Python dictionaries complete guide with all methods"
redirect_from:
  - /posts/Page-10-Python-Dictionary-update()/
  - /posts/Page-11-Python-Dictionary-values()/
  - /posts/Page-1-Python-Dictionary-clear()/
  - /posts/Page-2-Python-Dictionary-copy()/
  - /posts/Page-3-Python-Dictionary-fromkeys()/
  - /posts/Page-4-Python-Dictionary-get()/
  - /posts/Page-5-Python-Dictionary-items()/
  - /posts/Page-6-Python-Dictionary-keys()/
  - /posts/Page-7-Python-Dictionary-pop()/
  - /posts/Page-8-Python-Dictionary-popitem()/
  - /posts/Page-9-Python-Dictionary-setdefault()/
  - /posts/Python-Dictionary/
---

Python dictionaries are the language's built-in hash map: an unordered (well, insertion-ordered since 3.7) collection of key-value pairs offering average O(1) lookup, insertion, and deletion. If you write Python for more than a day, you'll reach for a dictionary constantly — configuration objects, caches, counters, JSON payloads, graph adjacency lists. This guide covers the fundamentals and every built-in method, with runnable examples and the gotchas that trip people up.

## What Is a Dictionary?

A dictionary maps keys to values. Keys must be hashable — meaning immutable types like strings, numbers, and tuples (of immutable elements) work, but lists and other dicts do not:

```python
d = {"name": "Ada", "age": 36}
bad = {["a", "b"]: 1}  # TypeError: unhashable type: 'list'
```

Values can be anything: strings, numbers, lists, other dicts, functions.

## Creating Dictionaries

```python
# Literal
d1 = {"a": 1, "b": 2}

# dict() constructor
d2 = dict(a=1, b=2)
d3 = dict([("a", 1), ("b", 2)])

# Dict comprehension
d4 = {x: x**2 for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Empty dict
d5 = {}
```

Note: `{}` creates an empty dict, not an empty set — use `set()` for an empty set.

## Accessing Values

```python
person = {"name": "Ada", "age": 36}

person["name"]        # "Ada" — raises KeyError if missing
person.get("email")   # None — safe, no exception
person.get("email", "unknown@example.com")  # default fallback
```

Prefer `.get()` when a missing key is a normal, expected case; use `[]` when a missing key indicates a bug you want to surface immediately.

## Inserting and Updating

Assignment adds a new key or overwrites an existing one — there's no separate "insert" operation:

```python
person["email"] = "ada@example.com"  # adds
person["age"] = 37                    # overwrites
```

## Deleting Entries

```python
del person["email"]        # raises KeyError if missing
person.pop("age", None)    # safe removal with default
person.clear()             # empties the dict in place
```

## Iteration

```python
for key in person:                 # iterates keys by default
    print(key)

for key, value in person.items():  # key-value pairs
    print(key, value)

for value in person.values():      # values only
    print(value)
```

Since Python 3.7, iteration order matches insertion order — this is a language guarantee, not an implementation detail.

## Membership Testing

```python
"name" in person       # True — checks keys, O(1)
"Ada" in person.values()  # True — checks values, O(n)
```

## Nesting

Dictionaries can hold other dictionaries or lists, which is how most JSON-derived data looks in Python:

```python
users = {
    "ada": {"age": 36, "roles": ["admin", "editor"]},
    "grace": {"age": 42, "roles": ["viewer"]},
}
users["ada"]["roles"].append("owner")
```

Watch out for `KeyError` chains on deeply nested structures — `.get()` with chained calls or `collections.defaultdict` can help avoid repetitive existence checks.

## Dictionary Methods

### dict.clear()

Removes all items from the dictionary in place, leaving it empty. Returns `None`.

```python
d = {"a": 1, "b": 2}
d.clear()
print(d)  # {}
```

**Gotcha:** `d.clear()` mutates `d` itself — any other variable referencing the same dict object sees the change too, unlike `d = {}` which just rebinds the local name.

### dict.copy()

Returns a shallow copy of the dictionary — a new dict object, but nested mutable values (lists, dicts) are still shared references.

```python
original = {"a": [1, 2], "b": 2}
shallow = original.copy()
shallow["b"] = 99
shallow["a"].append(3)

print(original)  # {'a': [1, 2, 3], 'b': 2}
```

**Use when:** you need an independent top-level dict but don't mind shared nested objects. For fully independent copies of nested structures, use `copy.deepcopy()`.

### dict.fromkeys()

Class method that builds a new dictionary from an iterable of keys, all mapped to the same optional value (default `None`).

```python
keys = ["a", "b", "c"]
d = dict.fromkeys(keys, 0)
print(d)  # {'a': 0, 'b': 0, 'c': 0}
```

**Gotcha:** if the value is a mutable object (like a list), every key shares the *same* object reference — mutating one affects all:

```python
shared = dict.fromkeys(["x", "y"], [])
shared["x"].append(1)
print(shared)  # {'x': [1], 'y': [1]} — surprising!
```

### dict.get()

Returns the value for a key, or a default (`None` if unspecified) instead of raising `KeyError`.

```python
config = {"timeout": 30}
print(config.get("timeout"))       # 30
print(config.get("retries"))       # None
print(config.get("retries", 3))    # 3
```

**Use when:** a missing key is expected, not exceptional — e.g., reading optional configuration.

### dict.items()

Returns a view object of `(key, value)` tuple pairs, which stays live as the dictionary changes.

```python
scores = {"alice": 90, "bob": 85}
for name, score in scores.items():
    print(f"{name}: {score}")
# alice: 90
# bob: 85
```

**Gotcha:** don't add or remove keys while iterating over `.items()` directly — it raises `RuntimeError: dictionary changed size during iteration`. Iterate over `list(scores.items())` if you need to mutate.

### dict.keys()

Returns a view object of the dictionary's keys, supporting set-like operations (union, intersection).

```python
a = {"x": 1, "y": 2}
b = {"y": 3, "z": 4}
print(a.keys() & b.keys())  # {'y'} — shared keys
```

**Use when:** you need fast membership checks or set algebra across dictionaries' keys.

### dict.pop()

Removes a key and returns its value. Raises `KeyError` if the key is missing and no default is given.

```python
inventory = {"apples": 10, "bananas": 5}
count = inventory.pop("apples")
print(count)      # 10
print(inventory)  # {'bananas': 5}

missing = inventory.pop("cherries", 0)  # 0, no exception
```

**Use when:** you want to remove-and-use a value in one step, common in queue/worklist patterns.

### dict.popitem()

Removes and returns the **last inserted** `(key, value)` pair as a tuple (LIFO order since Python 3.7). Raises `KeyError` on an empty dict.

```python
d = {"a": 1, "b": 2, "c": 3}
print(d.popitem())  # ('c', 3)
print(d)             # {'a': 1, 'b': 2}
```

**Use when:** implementing a stack-like structure or draining a dict from the end without knowing key names.

### dict.setdefault()

Returns the value for a key if present; otherwise inserts the key with a default value and returns that default.

```python
counts = {}
for word in ["a", "b", "a", "c", "b", "a"]:
    counts[word] = counts.setdefault(word, 0) + 1
print(counts)  # {'a': 3, 'b': 2, 'c': 1}
```

**Use when:** building grouped structures, e.g., `groups.setdefault(key, []).append(item)`. Note `collections.defaultdict` is often cleaner for this exact pattern.

### dict.update()

Merges keys/values from another dict, an iterable of pairs, or keyword arguments into the dictionary in place. Existing keys are overwritten.

```python
base = {"a": 1, "b": 2}
base.update({"b": 20, "c": 3})
print(base)  # {'a': 1, 'b': 20, 'c': 3}

base.update(d=4, e=5)
print(base)  # {'a': 1, 'b': 20, 'c': 3, 'd': 4, 'e': 5}
```

**Gotcha:** `update()` returns `None` — it mutates in place, so `base = base.update(...)` silently sets `base` to `None`.

### dict.values()

Returns a view object of the dictionary's values. Unlike keys, values are not required to be unique or hashable.

```python
prices = {"apple": 1.5, "banana": 0.5, "cherry": 1.5}
print(list(prices.values()))       # [1.5, 0.5, 1.5]
print(sum(prices.values()))        # 3.5
```

**Use when:** aggregating or transforming values without caring which key they belong to.

## Method Summary Table

| Method | Returns | Mutates? |
|---|---|---|
| `clear()` | `None` | Yes |
| `copy()` | new `dict` (shallow) | No |
| `fromkeys()` | new `dict` | No (class method) |
| `get()` | value or default | No |
| `items()` | view of `(k, v)` pairs | No |
| `keys()` | view of keys | No |
| `pop()` | removed value | Yes |
| `popitem()` | removed `(k, v)` pair | Yes |
| `setdefault()` | existing or newly-set value | Conditionally |
| `update()` | `None` | Yes |
| `values()` | view of values | No |

## Performance Notes

CPython dictionaries are implemented as hash tables, so key lookup, insertion, and deletion are all average O(1) — independent of dictionary size. This is why dictionaries outperform lists for membership testing: `key in some_dict` is O(1), while `item in some_list` is O(n) because it scans every element. If you find yourself writing code that repeatedly checks `if x in my_list`, converting that list to a dict (or a `set`, if you don't need values) is usually the single biggest performance win available.

Dictionary views (`.keys()`, `.values()`, `.items()`) are lightweight — they don't copy data, they reflect the dictionary live. That's efficient, but it's also why you can't safely add or remove keys while iterating over a view directly.

## Common Patterns

**Counting occurrences** — the manual way with `setdefault()`, or the built-in way with `collections.Counter`, which is purpose-built for this and faster:

```python
from collections import Counter
words = ["a", "b", "a", "c", "b", "a"]
print(Counter(words))  # Counter({'a': 3, 'b': 2, 'c': 1})
```

**Merging dictionaries without mutating either** — the `|` operator (Python 3.9+) creates a new merged dict:

```python
defaults = {"timeout": 30, "retries": 3}
overrides = {"retries": 5}
merged = defaults | overrides
print(merged)  # {'timeout': 30, 'retries': 5}
```

For Python versions before 3.9, use `{**defaults, **overrides}` unpacking to achieve the same result.

**Inverting a dictionary** — swapping keys and values, valid only when values are unique and hashable:

```python
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
print(inverted)  # {1: 'a', 2: 'b', 3: 'c'}
```

**Filtering a dictionary** — building a new dict from a subset of an existing one with a comprehension:

```python
prices = {"apple": 1.5, "banana": 0.5, "cherry": 3.0}
expensive = {k: v for k, v in prices.items() if v > 1.0}
print(expensive)  # {'apple': 1.5, 'cherry': 3.0}
```

## Dictionaries vs. Related Types

It's worth knowing when *not* to use a plain dict:

- **`collections.defaultdict`** — behaves like a dict but auto-creates missing keys with a factory function, eliminating repetitive `setdefault()` calls in grouping code.
- **`collections.OrderedDict`** — mostly redundant since Python 3.7 (regular dicts preserve insertion order), but still useful for its `move_to_end()` method and order-sensitive equality checks.
- **`types.MappingProxyType`** — wraps a dict in a read-only view, useful for exposing internal state without allowing external mutation.
- **`dataclasses`** — when keys are fixed and known ahead of time (not dynamic), a dataclass gives you attribute access, type hints, and better tooling support than a dict with string keys.

## Where to Go Next

Dictionaries pair naturally with Python's built-in functions — `sorted()`, `zip()`, and `len()` all work directly on dict views, as covered in the [Python Built-in Functions reference](/posts/python-built-in-functions-reference/). If you're building data pipelines that pass dictionaries between stages, see [Python Async/Await for AI Pipelines](/posts/Python-Async-Await-for-AI-Pipelines-A-Practical-Guide/) for patterns on handling dict-shaped payloads concurrently. And if you're working with vector data alongside metadata dictionaries, the [Vector Databases with Python](/posts/Vector-Databases-with-Python-A-Practical-Guide/) guide shows how dicts commonly carry document metadata in retrieval systems.
