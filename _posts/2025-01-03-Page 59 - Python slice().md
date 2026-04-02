---
title: Python slice()
description: The slice() is a built-in python function that slice the given object.(List, String, etc)
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python slice().webp
  alt: Python slice()
---

The Python `slice()` function is a built-in constructor that creates a slice object, which represents a range of indices defined by start, stop, and step values. It accepts up to three integer parameters: `start` (the index where slicing begins, defaulting to 0), `stop` (the index where slicing ends, exclusive), and `step` (the increment between indices, defaulting to 1). The function returns a `slice` object that can be passed to the `__getitem__()` method of any sequence type such as lists, strings, and tuples. Unlike the colon-based slicing syntax (`a[1:5:2]`), the `slice()` function allows you to store and reuse slicing logic as a named variable. This is especially valuable when you need to apply the same extraction pattern across multiple sequences, such as parsing fixed-width data files where each column occupies predefined character positions. It pairs well with [list()](/posts/Page-39-Python-list()/) and [tuple()](/posts/Page-65-Python-tuple()/) for converting sliced results.

## What does slice() return?

The `slice()` function returns a `slice` object that encapsulates the start, stop, and step parameters. This object can then be used as an index on any sequence to extract elements within the specified range.

## When should you use slice()?

Use `slice()` when you need to define a reusable slicing pattern that will be applied to multiple sequences, or when the slice boundaries are computed dynamically at runtime and need to be stored in a variable.

The syntax of slice() is:

```python
slice(start, stop, step)

```

## slice() Parameters

The slice() functions takes three parameters as argument:

* start (optional) \- An integer number specifying at which position to start the slicing. Default is 0  
* stop \- An integer number specifying at which position to end the slicing  

* step (optional) \- Optional. An integer number specifying the step of the slicing. Default is 1\.


Lets see an example of python slice() function.


### Example 1: How to use slice() in python?

```python
# Python program to demonstrate
# slice() operator

# String slicing
String ='PythonScholar'
s1 = slice(3)
s2 = slice(1, 5, 2)
print("String slicing")
print(String[s1])
print(String[s2])

# List slicing
L = [1, 2, 3, 4, 5]
s1 = slice(3)
s2 = slice(1, 5, 2)
print("\nList slicing")
print(L[s1])
print(L[s2])

# Tuple slicing
T = (1, 2, 3, 4, 5)
s1 = slice(3)
s2 = slice(1, 5, 2)
print("\nTuple slicing")
print(T[s1])
print(T[s2])

```

Output:

```python
String slicing
Pyt
yh

List slicing
[1, 2, 3]
[2, 4]

Tuple slicing
(1, 2, 3)
(2, 4)

```

## Common Use Cases

A common use case for `slice()` is parsing fixed-width text files where each field occupies specific character positions, allowing you to define named slices like `name_field = slice(0, 20)` and reuse them across every line. Another practical application is extracting the same subset of elements from multiple lists or tuples in data processing pipelines, ensuring consistent extraction logic without repeating index values. It is also useful in frameworks and libraries that accept slice objects as configuration parameters to control which portions of data are displayed or processed.