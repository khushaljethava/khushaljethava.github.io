---
title: Python zip()
description: The zip() is a built-in python function that returns a zip object.It will take two or more iterable and add each item in a tuple.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python zip().webp
  alt: Python zip()
---

The Python `zip()` function is a built-in function that combines multiple iterables element-wise into an iterator of tuples. It accepts any number of iterable arguments (lists, strings, tuples, sets, etc.) and pairs up corresponding elements from each iterable. If the input iterables have different lengths, `zip()` stops at the shortest one. The function returns a `zip` object, which is a lazy iterator that produces tuples on demand. Each tuple contains one element from each input iterable at the same index position. The `zip()` function is essential for parallel iteration, a pattern needed in many real-world tasks such as combining column headers with row values to create dictionaries, pairing student names with their grades, or iterating over coordinates. It pairs naturally with [dict()](/posts/Page-16-Python-dict()/) for creating dictionaries from two lists, and with [enumerate()](/posts/Page-19-Python-enumerate()/) when you also need index positions during iteration.

## What does zip() return?

The `zip()` function returns a `zip` iterator that yields tuples, where each tuple contains the corresponding elements from all input iterables grouped by their position.

## When should you use zip()?

Use `zip()` when you need to iterate over two or more sequences in parallel, combining elements at the same index into tuples for processing, comparison, or dictionary construction.

A zip() function will pair each item passed in the iterator and if the passed iterators have different lengths, the iterator with the least items decides the length of the new iterator.

The syntax of the zip() function is:

```python
zip(iterable1, iterable2, iterable3 ... )
```

## zip() Parameters

The zip() function will take only single parameters as argument:


* iterables \- any iterable like list, string, set ,etc.


### Example 1: How to use zip() function in python?

```python
number_list = [1, 2, 3]
str_list = ['one', 'two', 'three']

# No iterables are passed
result = zip()

# Converting iterator to list
result_list = list(result)
print(result_list)

# Two iterables are passed
result = zip(number_list, str_list)

# Converting iterator to set
result_set = set(result)
print(result_set)
```

Output:

```python
[]
{(2, 'two'), (3, 'three'), (1, 'one')}

```

## Common Use Cases

A common use case for `zip()` is creating a dictionary from two parallel lists, such as `dict(zip(column_names, row_values))` when processing CSV data or database results. Another practical scenario is iterating over multiple related lists simultaneously, such as pairing product names with their prices and quantities in an inventory system. It is also frequently used to transpose a matrix (list of lists) with `list(zip(*matrix))`, turning rows into columns.

## Rules of zip()

* If we do not pass any parameter, zip() returns an empty iterator  
* If a single iterable is passed, zip() returns an iterator of tuples with each tuple having only one element.  

* If multiple iterables are passed, zip() returns an iterator of tuples with each tuple having elements from all the iterables.