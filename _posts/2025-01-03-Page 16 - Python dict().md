---
title: Python dict() Method
description: In this tutorial we will learn about the python dict() method and its uses.
date: 2025-01-03 22:15:55 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python dict() Method.webp
  alt: Python dict() Method
---

The Python `dict()` function is a built-in constructor that creates a new dictionary object. It can be called with no arguments to create an empty dictionary, with keyword arguments like `dict(x=5, y=10)`, with an iterable of key-value pairs such as a list of tuples, or with a mapping object like another dictionary. The function returns a `dict` object, which is Python's primary data structure for storing key-value pairs with O(1) average-time lookups. Dictionaries are mutable, ordered (as of Python 3.7+), and keys must be hashable. A common real-world use case is converting configuration data from various formats into a unified dictionary structure, such as parsing command-line arguments, reading environment variables, or transforming JSON API responses into Python-native dictionaries for further processing.

## What does dict() return?

The `dict()` function returns a new Python dictionary object populated with the key-value pairs specified by the arguments, or an empty dictionary if no arguments are provided.

## When should you use dict()?

Use `dict()` when you need to create dictionaries programmatically from iterables or keyword arguments, especially when constructing dictionaries from `zip()` pairs, database query results, or dynamically computed key-value data.

## Common Use Cases

A frequent use of `dict()` is combining two parallel lists into a dictionary using `dict(zip(keys, values))`, which is cleaner than manual iteration. Another practical scenario is merging configuration defaults with user overrides by passing a base mapping along with keyword arguments. You might also use `dict()` to create copies of existing dictionaries or to convert lists of two-element tuples returned by APIs into dictionaries for easier access. Related functions include the [Python dir() method](/posts/Page-17-Python-dir()/) for inspecting dictionary attributes and the [Python frozenset() method](/posts/Page-25-Python-frozenset()/) when you need immutable keys derived from sets.

## Syntax

The dict() method helps to create a Python dictionary.

Different forms of dict() constructors are:

```python
dict(**kwarg)
dict(mapping, **kwarg)
dict(iterable, **kwarg)
```

Note: `**kwarg` lets you take an arbitrary number of keyword arguments.

## dict() Parameters

| Parameter | Description | Required |
|-----------|-------------|----------|
| `**kwarg` | Arbitrary keyword arguments used as key-value pairs | Optional |
| `mapping` | A mapping object (e.g., another dictionary) to copy entries from | Optional |
| `iterable` | An iterable of key-value pairs (e.g., list of tuples) | Optional |

When no argument is provided, `dict()` returns an empty dictionary `{}`.

## Example 1: Creating a dictionary using keyword arguments

```python
numbers = dict(x=5, y=0)
print(numbers)
print(type(numbers))
```

Output:

```python
{'x': 5, 'y': 0}
<class 'dict'>
```

Keyword arguments become the keys of the new dictionary. Note that the key names must follow Python identifier rules — they cannot start with a digit or contain spaces.

## Example 2: Creating an empty dictionary

```python
numbers = dict()
print(numbers)
print(type(numbers))
```

Output:

```python
{}
<class 'dict'>
```

An empty dictionary is useful when you plan to populate it dynamically inside a loop or function.

## Example 3: Creating a dictionary from an iterable

```python
# keyword argument is not passed
numbers1 = dict([('x', 5), ('y', -5)])
print('numbers1 =', numbers1)

# keyword argument is also passed
numbers2 = dict([('x', 5), ('y', -5)], z=8)
print('numbers2 =', numbers2)

# zip() creates an iterable in Python 3
numbers3 = dict(zip(['x', 'y', 'z'], [1, 2, 3]))
print('numbers3 =', numbers3)
```

Output:

```python
numbers1 = {'x': 5, 'y': -5}
numbers2 = {'x': 5, 'y': -5, 'z': 8}
numbers3 = {'x': 1, 'y': 2, 'z': 3}
```

The `zip()` + `dict()` pattern is particularly powerful when you have two lists — one of keys and one of values — and want to combine them efficiently.

## Example 4: Creating a dictionary from another mapping

```python
numbers1 = dict({'x': 4, 'y': 5})
print('numbers1 =', numbers1)

# You don't need to use dict() in the above code
numbers2 = {'x': 4, 'y': 5}
print('numbers2 =', numbers2)

# Keyword argument is also passed to extend the dictionary
numbers3 = dict({'x': 4, 'y': 5}, z=8)
print('numbers3 =', numbers3)
```

Output:

```python
numbers1 = {'x': 4, 'y': 5}
numbers2 = {'x': 4, 'y': 5}
numbers3 = {'x': 4, 'y': 5, 'z': 8}
```

## Example 5: Real-world use case — building a config dictionary

```python
# Suppose you receive CSV-like config data as rows
config_rows = [
    ("host", "localhost"),
    ("port", "5432"),
    ("database", "mydb"),
]

config = dict(config_rows, user="admin")
print(config)
# Output: {'host': 'localhost', 'port': '5432', 'database': 'mydb', 'user': 'admin'}
```

This pattern is especially handy when reading settings from files or environment parsers that return iterable pairs.

## Example 6: Merging two dictionaries using dict()

```python
defaults = {"theme": "light", "language": "en", "debug": False}
user_prefs = {"theme": "dark", "debug": True}

# In Python 3.9+ you can use: merged = defaults | user_prefs
merged = {**defaults, **user_prefs}
print(merged)
# Output: {'theme': 'dark', 'language': 'en', 'debug': True}
```

User preferences override the defaults because later keys win when using dictionary unpacking.

## Edge Cases and Tips

**Duplicate keys**: When constructing a dictionary with duplicate keys, the last value wins.

```python
d = dict([('a', 1), ('a', 2)])
print(d)  # {'a': 2}
```

**Keys must be hashable**: Trying to use a list as a key raises a `TypeError`.

```python
try:
    bad = dict({[1, 2]: "value"})
except TypeError as e:
    print(e)  # unhashable type: 'list'
```

**Performance note**: Using `{}` literal syntax is slightly faster than `dict()` for creating empty or simple literal dictionaries because the interpreter can optimize it directly. Use `dict()` when building from dynamic data.

**Copying a dictionary**: `dict(existing)` creates a shallow copy, not a deep copy. Nested mutable objects are still shared.

```python
original = {"a": [1, 2, 3]}
copy = dict(original)
copy["a"].append(99)
print(original)  # {'a': [1, 2, 3, 99]} — both are affected
```

For a true deep copy, use `copy.deepcopy()`.

## Frequently Asked Questions

**Q1: What is the difference between `{}` and `dict()`?**  
Both create dictionaries, but `{}` is a literal syntax while `dict()` is a constructor call. Literal `{}` is faster for static definitions. `dict()` is more flexible when building dictionaries programmatically, such as from `zip()` pairs or keyword arguments.

**Q2: Can I use `dict()` to copy a dictionary?**  
Yes. `dict(existing_dict)` creates a shallow copy. However, any nested objects (like lists inside the dictionary) are not deep-copied — they still point to the same objects. Use `copy.deepcopy()` for a fully independent copy.

**Q3: Why does `dict(x=5)` work but `dict(1=5)` raise an error?**  
Keyword arguments must be valid Python identifiers. Numbers and strings with spaces cannot be keyword argument names. To use such keys, pass them via an iterable or mapping: `dict([(1, 5)])`.

**Q4: How can I combine two dictionaries using `dict()`?**  
You can unpack both into a new `dict()` call: `dict(**dict1, **dict2)`. If both have the same key, the second dictionary's value wins. In Python 3.9+, the `|` merge operator is a cleaner alternative.

**Q5: Is `dict()` ordered?**  
Yes, since Python 3.7, dictionaries maintain insertion order as a language guarantee. Iterating over a dictionary or calling `dict()` respects the order in which keys were inserted.
