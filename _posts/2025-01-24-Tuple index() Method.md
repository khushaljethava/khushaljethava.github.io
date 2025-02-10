---
title: Python Tuple index() Method
description: The index() method returns the index of the first occurrence of a specified value in a tuple.
date: 2025-01-24 22:02:00 +0800
categories: [Python Tuple Reference]
tags: [Python Tuple Reference]
image:
  path: /commons/Python Tuple index() Method.png
  alt: Python Tuple index()
---

The index() method finds the position of a specific element in a tuple.

The syntax of the index() method is:

```python
tuple.index(value[, start[, end]])
```

## index() Parameters

The index() method takes up to three parameters:

* value - the element to search for in the tuple
* start (Optional) - search start position. Default is 0
* end (Optional) - search end position. Default is the end of tuple

### Example 1: How to use index() method in python?

```python
# create a tuple
numbers = (1, 2, 3, 2, 5, 2, 6)

# get the index of first occurrence of 2
index = numbers.index(2)
print(index)

# get the index of 2 starting from position 2
index = numbers.index(2, 2)
print(index)

# get the index of 2 between positions 2 and 5
index = numbers.index(2, 2, 5)
print(index)
```

Output:
```python
1
3
3
```

## Rules of index()

* Raises ValueError if the value is not found
* Returns the index of first occurrence only
* Search range can be specified using start and end parameters
* The end index is not included in the search