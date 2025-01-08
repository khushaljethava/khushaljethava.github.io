---
title: Python sorted()
description: The sorted() is a built-in python function that returns a sorted list of the given iterable object.
date: 2025-01-03 22:42:23 +0800
categories: [Python]
tags: [python]
image:
 path: /commons/Python sorted().png
 alt: Python sorted()
---

The syntax of sorted() is:

```python
sorted(iterable, key, reverse)

```

## sorted() Parameters

The sorted() function takes three parameters as argument:

* iterable \- an iterable object like string, list,set, etc.  
* key (Optional) \- A Function to execute to decide the order. Default is None.  
* reverse (Optional) \- 

Let see an example of the sorted()   function.

### Example 1: How to use sorted() function in python?

```python
a = (2, 5, 3)
x = sorted(a)
print(x)

```

Output:

```python
[2, 3, 5]

```

### Example 2: sorted() function with python string.

```python
a = ("h", "b", "a", "c", "f", "d", "e", "g")
x = sorted(a)
print(x)

```

Output:

```python
['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

```