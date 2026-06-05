---
title: Python Dictionary update()
description: In python dictionaries, the update() method is used to insert the specified key-value pairs to the dictionary from another dictionary or from an iterable.
date: 2025-01-18 21:56:01 +0800
categories: [Python Dictionary Reference]
tags: [Python Dictionary Reference]
image:
  path: /commons/Python Dictionary update().webp
  alt: Python Dictionary update()
---

The `update()` method merges key-value pairs from another dictionary (or iterable) into the target dictionary. If a key already exists, its value is **overwritten**. New keys are **added**. The method modifies the dictionary in place and returns `None`.

## Syntax

```python
dictionary.update(iterable)
```

## update() Parameters

| Parameter | Description |
|-----------|-------------|
| `iterable` | A dictionary, iterable of key-value pairs, or keyword arguments. Optional. |

## Return Value

`None` — the dictionary is modified in place.

---

## Example 1: Add a New Key

```python
car = {"brand": "Ford", "model": "Mustang", "year": 1964}
car.update({"color": "White"})
print(car)
```

**Output:**
```
{'brand': 'Ford', 'model': 'Mustang', 'year': 1964, 'color': 'White'}
```

---

## Example 2: Overwrite Existing Keys

```python
user = {"name": "Alice", "age": 25, "city": "London"}
user.update({"age": 26, "city": "Paris"})
print(user)
```

**Output:**
```
{'name': 'Alice', 'age': 26, 'city': 'Paris'}
```

---

## Example 3: Update with Keyword Arguments

```python
settings = {"theme": "dark", "font": "Arial"}
settings.update(font="Helvetica", size=14)
print(settings)
```

**Output:**
```
{'theme': 'dark', 'font': 'Helvetica', 'size': 14}
```

---

## Example 4: Update with a List of Tuples

```python
profile = {"username": "john"}
extras = [("email", "john@example.com"), ("age", 30)]
profile.update(extras)
print(profile)
```

**Output:**
```
{'username': 'john', 'email': 'john@example.com', 'age': 30}
```

---

## Example 5: Merging Defaults with Overrides

```python
defaults = {"color": "blue", "size": "M", "stock": 100}
overrides = {"color": "red", "stock": 50}

merged = defaults.copy()
merged.update(overrides)
print(merged)
```

**Output:**
```
{'color': 'red', 'size': 'M', 'stock': 50}
```

This is the standard pattern for applying user settings on top of defaults.

---

## Example 6: Called with No Arguments

```python
data = {"a": 1, "b": 2}
data.update()
print(data)  # {'a': 1, 'b': 2} — unchanged
```

---

## Real-World Use Cases

**1. Applying configuration overrides:**
```python
config = {"debug": False, "log_level": "INFO", "timeout": 30}
user_config = {"debug": True, "timeout": 60}
config.update(user_config)
```

**2. Building a response object incrementally:**
```python
response = {"status": "ok"}
response.update({"data": [1, 2, 3], "count": 3})
response.update({"page": 1, "total_pages": 5})
```

**3. Updating a user record from form input:**
```python
user_record = {"id": 42, "name": "Bob", "email": "bob@old.com"}
form_input = {"email": "bob@new.com", "phone": "555-1234"}
user_record.update(form_input)
```

---

## update() vs `|=` Operator (Python 3.9+)

Python 3.9 introduced `|=` as a shorthand for in-place merging:

```python
d = {"a": 1}
d |= {"b": 2, "a": 99}
print(d)  # {'a': 99, 'b': 2}
```

The `|` operator (without `=`) creates a **new** dictionary instead of modifying in place.

---

## Common Mistakes

- **Expecting a return value** — `update()` returns `None`.
- **Accidentally overwriting important keys** — always check which keys exist before calling `update()` if preservation matters.
- **Deep merging** — `update()` only merges the top level. Nested dict values are replaced entirely, not merged recursively.

---

## FAQ

**Q: Does `update()` modify the source dictionary?**
No — only the dictionary on which `update()` is called is changed.

**Q: Can `update()` handle nested dictionaries?**
It merges only the top level. For deep merging, write a recursive merge function or use a library like `deepmerge`.

**Q: What is the difference between `dict.update()` and `{**a, **b}`?**
`{**a, **b}` creates a new dictionary; `update()` modifies in place.

## Performance Considerations

Understanding the cost of `update()` helps you write efficient code at scale. For small collections the difference is negligible, but inside tight loops or when processing large datasets, choosing the right method matters. Python's built-in container methods are implemented in C, so they are almost always faster than an equivalent hand-written Python loop that does the same work. Whenever a single method call can replace several lines of manual iteration, prefer the method — it is faster, less error-prone, and communicates intent more clearly to other developers reading your code.

## Conclusion

The `update()` method merges key-value pairs from another dictionary or iterable into the target dictionary, overwriting existing keys and adding new ones. It is one of the everyday building blocks that make Python's dictionaries and lists so pleasant to work with, and using it correctly leads to shorter, clearer, and more reliable programs. As you practise, try to recognise the situations where `update()` is the natural fit rather than reaching for a longer manual alternative. Combine it with the related methods covered above, keep the common mistakes in mind, and you will handle real-world data manipulation tasks with confidence. Bookmark this reference and revisit the examples whenever you need a quick reminder of the syntax, parameters, return value, and behaviour of `update()`.

## Quick Reference Recap

To summarise the essentials of `update()`: it is a built-in method you will use constantly when you need to merge dictionaries and apply configuration overrides. Keep the syntax and return value in mind, remember whether it modifies the object in place or produces a new one, and lean on the worked examples above when you are unsure. Practising with small snippets in the Python interpreter is the fastest way to build an instinct for when `update()` is the right tool, so try retyping a few of these examples yourself and experiment with variations until the behaviour feels natural.
