---
title: Python zip()
description: The zip() is a built-in python function that returns a zip object.It will take two or more iterable and add each item in a tuple.
date: 2025-01-03 22:42:23 +0800
categories: [Python]
tags: [python]
image:
 path: /commons/Python zip().png
 alt: Python zip()
---

A zip() function  will pair each item passed in the iterator and  If the passed iterators have different lengths, the iterator with the least items decides the length of the new iterator.

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

## Rules of zip()

* If we do not pass any parameter, zip() returns an empty iterator  
* If a single iterable is passed, zip() returns an iterator of tuples with each tuple having only one element.  
* If multiple iterables are passed, zip() returns an iterator of tuples with each tuple having elements from all the iterables.