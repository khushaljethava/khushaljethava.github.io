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

The dict() method helps to create a Python dictionary.

Different forms of dict() constructors are:

```python
dict(**kwarg)
dict(mapping, **kwarg)
dict(iterable, **kwarg)
```

Note: \*\*kwarg let you take an arbitrary number of keyword arguments.

## dict() Parameters

The dict() method has no parameters.

Let's check some examples of dict() method.


### Example 1: Creating a dictionary using dict() method.

```python
numbers = dict(x=5,y=0)
print(numbers)
print(type(numbers))
```


Output as follow:

```python
{'x': 5, 'y': 0}
<class 'dict'>
```
### Example 2: Creating an Empty dictionary using the dict() method.

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

### Example 3: Creating dictionary using Iterable

```python
# keyword argument is not passed
numbers1 = dict([('x', 5), ('y', -5)])
print('numbers1 =',numbers1)

# keyword argument is also passed
numbers2 = dict([('x', 5), ('y', -5)], z=8)
print('numbers2 =',numbers2)

# zip() creates an iterable in Python 3
numbers3 = dict(dict(zip(['x', 'y', 'z'], [1, 2, 3])))
print('numbers3 =',numbers3)

```
The output will be as follow:

```python
numbers1 = {'x': 5, 'y': -5}
numbers2 = {'x': 5, 'y': -5, 'z': 8}
numbers3 = {'x': 1, 'y': 2, 'z': 3}

```

### 

### Example 3: Create Dictionary Using Mapping

```python
numbers1 = dict({'x': 4, 'y': 5})
print('numbers1 =',numbers1)

# you don't need to use dict() in above code
numbers2 = {'x': 4, 'y': 5}
print('numbers2 =',numbers2)

# keyword argument is also passed
numbers3 = dict({'x': 4, 'y': 5}, z=8)
print('numbers3 =',numbers3)

```

When we run above from we will get the following result.

```python
numbers1 = {'x': 4, 'y': 5}
numbers2 = {'x': 4, 'y': 5}
numbers3 = {'x': 4, 'z': 8, 'y': 5}

```