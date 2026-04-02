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

* **Iterable** (optional) \- the python iterable like a set, dictionary, tuple, etc., which contains elements.

Let’s check some examples of the python frozenset() method.

### Example 1: How to use frozenset() in python?

```python
# list of numbers
numbers = [1,2,3,4,5]

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
<class 'frozenset'>
Traceback (most recent call last):
  File "", line 14, in <module>
    Fset.add(6)
AttributeError: 'frozenset' object has no attribute 'add'

```

As you can see in the above example, we are first creating a list of numbers and converting it into a frozenset. Also, you can see we are getting class frozenset when we check the type of the Fset. We are trying to add one more number to the Fset, but as we know, frozenset cannot modify it is showing as an error because there is no attribute to add or remove an element from python frozenset.

But there are different attributes available with frozenset().

## Frozenset Operations in Python

Five operations can be performed in frozenset, just like regular sets.

* copy  
* difference  
* intersection   
* symmetric\_difference   
* union   
  


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

## Rules of frozenset() 

* frozenset() only takes iterable as an argument.  
* frozenset() method returns an immutable frozenset which the iterable elements will initialize.  
* Empty frozenset can be declared bypassing the empty frozenset() method.