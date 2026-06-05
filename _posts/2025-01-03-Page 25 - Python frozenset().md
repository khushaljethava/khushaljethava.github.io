---
title: Python frozenset() Method
description: In this tutorial we will learn all about python frozenset() metod and its uses.
date: 2025-01-03 22:15:55 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python frozenset() Method.webp
  alt: Python frozenset() Method
---

The Python `frozenset()` function is a built-in constructor that creates an immutable, unordered collection of unique elements. It takes a single optional parameter, which must be an iterable such as a list, tuple, set, dictionary, or string. When called without arguments, it creates an empty frozenset. The function returns a `frozenset` object that supports all set operations like union, intersection, and difference, but does not allow adding or removing elements after creation. Because frozensets are immutable and hashable, they can be used as dictionary keys or as elements of other sets, which is not possible with regular mutable sets. A common real-world use case is creating constant sets for lookup tables that should never be modified, such as a fixed set of allowed file extensions, valid country codes, or supported configuration options.

## Introduction to frozenset()

In Python, a regular `set` is a mutable, unordered collection of unique elements. You can add, remove, and modify its contents freely. But sometimes you need all the power of a set — fast membership testing, set algebra, uniqueness guarantees — without the risk of accidental modification. That is exactly where `frozenset()` comes in.

A `frozenset` is the immutable counterpart of a `set`. Once created, its contents are fixed. You cannot add elements, remove elements, or change any values inside it. This immutability brings a crucial benefit: frozensets are **hashable**, which means they can be used as dictionary keys or stored as elements inside another set — two things that regular mutable sets cannot do.

Understanding `frozenset()` is important when writing robust Python code that relies on constants, cache keys, or set-based lookups that must remain stable throughout program execution.

## What does frozenset() return?

The `frozenset()` function returns an immutable frozenset object containing unique elements from the given iterable, or an empty frozenset if no argument is provided.

## When should you use frozenset()?

Use `frozenset()` when you need a set that must remain unchanged after creation, especially when you need to use a set as a dictionary key, store sets within other sets, or define constant lookup collections.

## Common Use Cases

A frequent use of `frozenset()` is defining constant lookup sets for validation, such as a frozenset of valid HTTP status codes or allowed user roles that should never be accidentally modified during program execution. Another practical scenario is using frozensets as dictionary keys to create mappings from combinations of attributes, since regular sets are unhashable and cannot serve as keys. You can also use frozensets in caching and memoization where function arguments include sets that need to be hashable for the cache key. Related functions include the [Python dict() method](/posts/Page-16-Python-dict()/) where frozensets can serve as keys, and the [Python filter() method](/posts/Page-22-Python-filter()/) for selecting elements before freezing them into an immutable set.

## What is python frozenset() Method?

The frozenset() method returns an immutable frozenset object like a regular set object but cannot be modified once declared. The frozenset() takes input as python iterable.

In Python, Frozenset is just like a normal python set object, but a python set is a mutable object. In the python set, we can modify each element and be added or removed, but in frozenset we cannot modify, add, or remove any element.

The syntax of frozenset() is:

```python
frozenset([iterable])
```

## frozenset() Parameters

The frozenset() method takes only one parameter:

* **Iterable** (optional) — the python iterable like a set, dictionary, tuple, etc., which contains elements. If a dictionary is passed, only the keys are used. All elements must be hashable.

Key rules to remember:
- Passing a non-iterable raises a `TypeError`.
- All elements must themselves be **hashable** (e.g., integers, strings, tuples).
- Passing a dictionary uses only its **keys**, not values.

Let’s check some examples of the python frozenset() method.

### Example 1: How to use frozenset() in python?

```python
# list of numbers
numbers = [1, 2, 3, 4, 5]

Fset = frozenset(numbers)

print(Fset)

# type of frozenset
print(type(Fset))

# Add a number to immutable frozenset
Fset.add(6)
```

We will get the following output.

```python
frozenset({1, 2, 3, 4, 5})
<class ‘frozenset’>
Traceback (most recent call last):
  File "", line 14, in <module>
    Fset.add(6)
AttributeError: ‘frozenset’ object has no attribute ‘add’
```

As you can see in the above example, we are first creating a list of numbers and converting it into a frozenset. Also, you can see we are getting class frozenset when we check the type of the Fset. We are trying to add one more number to the Fset, but as we know, frozenset cannot modify it — it shows an error because there is no attribute to add or remove an element from python frozenset.

But there are different attributes available with frozenset().

## Frozenset Operations in Python

Five operations can be performed in frozenset, just like regular sets.

* copy
* difference
* intersection
* symmetric_difference
* union

All of these operations return a **new frozenset** — the originals are never modified.

Let see an example of how we can use operations in frozenset.

### Example 2: How to use Python frozenset operations.

```python
# Frozensets
# initialize A and B
A = frozenset([1, 2, 3, 4])
B = frozenset([3, 4, 5, 6])

# copying a frozenset
C = A.copy()  # Output: frozenset({1, 2, 3, 4})
print(C)

# union
print(A.union(B))  # Output: frozenset({1, 2, 3, 4, 5, 6})

# intersection
print(A.intersection(B))  # Output: frozenset({3, 4})

# difference
print(A.difference(B))  # Output: frozenset({1, 2})

# symmetric_difference
print(A.symmetric_difference(B))  # Output: frozenset({1, 2, 5, 6})
```

When we run the above program we will get the following output:

```python
frozenset({1, 2, 3, 4})
frozenset({1, 2, 3, 4, 5, 6})
frozenset({3, 4})
frozenset({1, 2})
frozenset({1, 2, 5, 6})
```

We can also use simple set operations like isdisjoint, issubset, and issuperset with the python frozenset.

### Example 3: Using python set operations with frozenset.

```python
# Frozensets
# initialize A, B and C
A = frozenset([1, 2, 3, 4])
B = frozenset([3, 4, 5, 6])
C = frozenset([5, 6])

# isdisjoint() method
print(A.isdisjoint(C))  # Output: True

# issubset() method
print(C.issubset(B))  # Output: True

# issuperset() method
print(B.issuperset(C))  # Output: True
```

Output:

```python
True
True
True
```

These relational methods are useful when validating that one collection of items falls entirely within another — for example, checking that a user’s requested permissions are a subset of their allowed permissions.

## Real-World Use Cases

### 1. Using frozenset as a dictionary key

Because regular sets are mutable and therefore unhashable, you cannot use them as dictionary keys. Frozensets solve this problem:

```python
# Map combinations of ingredients to recipe names
recipes = {
    frozenset(["flour", "water", "yeast"]): "bread",
    frozenset(["eggs", "milk", "flour"]): "pancakes",
    frozenset(["tomato", "cheese", "dough"]): "pizza",
}

ingredients = frozenset(["eggs", "milk", "flour"])
print(recipes.get(ingredients))  # pancakes
```

This pattern is powerful for building lookup tables where the key is a combination or group of items.

### 2. Constant lookup sets for validation

```python
ALLOWED_EXTENSIONS = frozenset([".jpg", ".jpeg", ".png", ".gif", ".webp"])

def is_valid_image(filename):
    import os
    _, ext = os.path.splitext(filename)
    return ext.lower() in ALLOWED_EXTENSIONS

print(is_valid_image("photo.jpg"))    # True
print(is_valid_image("script.exe"))  # False
```

Defining `ALLOWED_EXTENSIONS` as a frozenset instead of a list gives you O(1) membership testing and also prevents any part of your code from accidentally modifying the allowed extensions at runtime.

### 3. Storing sets inside a set

Regular Python sets cannot contain other sets (because sets are unhashable), but they can contain frozensets:

```python
group_a = frozenset([1, 2, 3])
group_b = frozenset([4, 5, 6])
group_c = frozenset([1, 2, 3])  # same as group_a

collection = {group_a, group_b, group_c}
print(collection)
# {frozenset({1, 2, 3}), frozenset({4, 5, 6})}
# group_a and group_c are considered equal, so only one is kept
```

## Edge Cases and Gotchas

### Empty frozenset
You must use `frozenset()` — not `{}` — to create an empty frozenset. Using `{}` creates an empty **dictionary**:

```python
empty_fs = frozenset()
print(type(empty_fs))  # <class ‘frozenset’>

empty_dict = {}
print(type(empty_dict))  # <class ‘dict’>
```

### Dictionary input uses only keys
When you pass a dictionary to `frozenset()`, only the keys are included:

```python
d = {"a": 1, "b": 2, "c": 3}
fs = frozenset(d)
print(fs)  # frozenset({‘a’, ‘b’, ‘c’})
```

### Elements must be hashable
If your iterable contains unhashable items (like lists or other sets), Python raises a `TypeError`:

```python
frozenset([[1, 2], [3, 4]])
# TypeError: unhashable type: ‘list’
```

Use tuples instead of lists if you need nested sequences inside a frozenset.

## frozenset() vs set() — Key Differences

| Feature              | set()         | frozenset()      |
|----------------------|---------------|------------------|
| Mutable              | Yes           | No               |
| Hashable             | No            | Yes              |
| Dict key             | No            | Yes              |
| Element of a set     | No            | Yes              |
| Supports add/remove  | Yes           | No               |
| Set algebra methods  | Yes           | Yes (read-only)  |

Use `set()` when you need to build or modify a collection dynamically. Use `frozenset()` when you need a permanent, safe, hashable collection.

## Comparison with Related Functions

- **`set()`**: The mutable sibling of `frozenset()`. Use it when you need to modify the collection after creation.
- **`tuple()`**: Also immutable and ordered, but does not guarantee uniqueness and does not support set algebra operations.
- **`dict()`**: Can use frozensets as keys, making the combination of `dict()` and `frozenset()` very powerful for mapping group-based lookups.

## Rules of frozenset()

* frozenset() only takes iterable as an argument.
* frozenset() method returns an immutable frozenset which the iterable elements will initialize.
* Empty frozenset can be declared by calling the empty `frozenset()` method.
* Elements inside a frozenset must be hashable — no lists, dicts, or regular sets are allowed.
* All operations that would modify the set (add, remove, discard, pop, clear, update) are unavailable on a frozenset.

## Frequently Asked Questions

**Q1: Can I convert a frozenset back to a regular set?**

Yes. Simply pass the frozenset to the `set()` constructor:

```python
fs = frozenset([1, 2, 3])
s = set(fs)
print(s)       # {1, 2, 3}
print(type(s)) # <class ‘set’>
```

The resulting set is fully mutable and independent of the original frozenset.

**Q2: Is a frozenset faster than a set for membership testing?**

Performance for membership testing (`in` operator) is essentially the same for both `set` and `frozenset` — both use hash tables and provide O(1) average-case lookup. The immutability of frozenset does not meaningfully change lookup speed, but it does allow frozensets to be used in contexts where hashability is required.

**Q3: Why does Python have frozenset when tuples already provide immutability?**

Tuples and frozensets serve different purposes. A tuple is an ordered sequence that can contain duplicate values and does not support set operations. A frozenset is an unordered collection of unique elements that fully supports set algebra (union, intersection, difference, etc.) and fast membership testing. When you need immutable **set semantics** — uniqueness, fast lookup, set math — frozenset is the right tool. When you need an immutable **ordered sequence**, use a tuple.