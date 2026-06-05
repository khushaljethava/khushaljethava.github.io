---
title: Python Dictionary fromkeys()
description: The fromkeys() method returns a new dictionary with the specified  keys with specified value.
date: 2025-01-18 21:38:03 +0800
categories: [Python Dictionary Reference]
tags: [Python Dictionary Reference]
image:
  path: /commons/Python Dictionary fromkeys().webp
  alt: Python Dictionary fromkeys()
---

The `fromkeys()` method in Python creates a **new dictionary** from a sequence of keys, all assigned to a single value. It is a **class method** called on `dict`, not on a dictionary instance. It is ideal for initializing a dictionary with default values for a known set of keys.

## Syntax

```python
dict.fromkeys(keys, value)
```

## fromkeys() Parameters

| Parameter | Description |
|-----------|-------------|
| `keys` | An iterable whose elements become the keys. |
| `value` | *(Optional)* The value assigned to every key. Defaults to `None`. |

## Return Value

Returns a new `dict` object. The original iterable is not modified.

---

## Example 1: Create a Dictionary with Default None Values

```python
keys = {1, 2, 3, 4}
result = dict.fromkeys(keys)
print(result)
```

**Output:**
```
{1: None, 2: None, 3: None, 4: None}
```

---

## Example 2: Create a Dictionary with a Specific Value

```python
keys = {'BMW', 'TOYOTA', 'AUDI'}
value = 'cars'
result = dict.fromkeys(keys, value)
print(result)
```

**Output:**
```
{'BMW': 'cars', 'AUDI': 'cars', 'TOYOTA': 'cars'}
```

---

## Example 3: Initialize Counters to Zero

```python
subjects = ["math", "science", "english", "history"]
scores = dict.fromkeys(subjects, 0)
print(scores)
```

**Output:**
```
{'math': 0, 'science': 0, 'english': 0, 'history': 0}
```

---

## Example 4: Keys from a String

Each character of the string becomes a key:

```python
result = dict.fromkeys("abc", 100)
print(result)  # {'a': 100, 'b': 100, 'c': 100}
```

---

## Example 5: Initialize an Empty Form

```python
fields = ["name", "email", "phone", "address"]
empty_form = dict.fromkeys(fields, "")
print(empty_form)
```

**Output:**
```
{'name': '', 'email': '', 'phone': '', 'address': ''}
```

---

## Important: Mutable Default Values

All keys share the **same** mutable object when a list or dict is used as the default:

```python
keys = ["a", "b", "c"]
d = dict.fromkeys(keys, [])
d["a"].append(1)
print(d)  # {'a': [1], 'b': [1], 'c': [1]} — all keys affected!
```

Use a dictionary comprehension for independent mutable defaults:

```python
d = {key: [] for key in keys}
d["a"].append(1)
print(d)  # {'a': [1], 'b': [], 'c': []}
```

---

## Real-World Use Cases

**1. Feature flag initialization:**
```python
features = ["dark_mode", "notifications", "beta_access"]
flags = dict.fromkeys(features, False)
```

**2. User status lookup table:**
```python
user_ids = [101, 102, 103, 104]
status = dict.fromkeys(user_ids, "inactive")
```

**3. Remove duplicates preserving order (Python 3.7+):**
```python
items = [3, 1, 4, 1, 5, 9, 2, 6, 5]
unique = list(dict.fromkeys(items))
print(unique)  # [3, 1, 4, 5, 9, 2, 6]
```

---

## fromkeys() vs Dictionary Comprehension

| Approach | When to use |
|----------|-------------|
| `dict.fromkeys(keys, val)` | Same immutable value for all keys |
| `{k: val for k in keys}` | Per-key values or mutable defaults |

---

## Common Mistakes

- **Mutable default** — all keys share the same list/dict. Use a comprehension instead.
- **Expecting modification** — `fromkeys()` always returns a new dict, never modifies an existing one.

---

## FAQ

**Q: Does `fromkeys()` modify an existing dictionary?**
No — it always returns a new dictionary.

**Q: What happens with duplicate keys in the iterable?**
Duplicates are silently ignored — only one entry per unique key is created.

**Q: Can I call `fromkeys()` on a dict instance?**
Yes, but it behaves identically to calling it on `dict`. It does not copy or use the instance's existing data.

## Performance Considerations

Understanding the cost of `fromkeys()` helps you write efficient code at scale. For small collections the difference is negligible, but inside tight loops or when processing large datasets, choosing the right method matters. Python's built-in container methods are implemented in C, so they are almost always faster than an equivalent hand-written Python loop that does the same work. Whenever a single method call can replace several lines of manual iteration, prefer the method — it is faster, less error-prone, and communicates intent more clearly to other developers reading your code.

## Conclusion

The `fromkeys()` method builds a brand-new dictionary from a collection of keys that all share one default value. It is one of the everyday building blocks that make Python's dictionaries and lists so pleasant to work with, and using it correctly leads to shorter, clearer, and more reliable programs. As you practise, try to recognise the situations where `fromkeys()` is the natural fit rather than reaching for a longer manual alternative. Combine it with the related methods covered above, keep the common mistakes in mind, and you will handle real-world data manipulation tasks with confidence. Bookmark this reference and revisit the examples whenever you need a quick reminder of the syntax, parameters, return value, and behaviour of `fromkeys()`.

## Quick Reference Recap

To summarise the essentials of `fromkeys()`: it is a built-in method you will use constantly when you need to initialise many keys with a shared default. Keep the syntax and return value in mind, remember whether it modifies the object in place or produces a new one, and lean on the worked examples above when you are unsure. Practising with small snippets in the Python interpreter is the fastest way to build an instinct for when `fromkeys()` is the right tool, so try retyping a few of these examples yourself and experiment with variations until the behaviour feels natural.
