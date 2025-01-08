---
title: Python reversed()
description: The reversed() function returns the reversed iterator of the given sequence object.
date: 2025-01-03 22:42:23 +0800
categories: [Python]
tags: [python]
image:
 path: /commons/Python reversed().png
 alt: Python reversed()
---

The syntax of reversed() is:

```python
reserved(iterator)

```

## reversed() Parameters

The reversed() function take  only one parameter as an argument:

* **iterator** \- the iterator to be reversed.

Let's check some examples of python reversed() functions.

### Example 1: How to use reversed() function in python?

```python
# for string
seq_string = 'Python'
print(list(reversed(seq_string)))

# for tuple
seq_tuple = ('P', 'y', 't', 'h', 'o', 'n')
print(list(reversed(seq_tuple)))

# for range
seq_range = range(5, 9)
print(list(reversed(seq_range)))

# for list
seq_list = [1, 2, 4, 3, 5]
print(list(reversed(seq_list)))

```

The output will be as follows.

```python
['n', 'o', 'h', 't', 'y', 'P']
['n', 'o', 'h', 't', 'y', 'P']
[8, 7, 6, 5]
[5, 3, 4, 2, 1]

```

In the above program, we have converted the iterators returned by reversed() to list using the list() function.

We can also use reversed() in any object that implements \_\_reverse\_\_().

### Example 2:  How to use reversed() function with custom objects?

```python
class Vowels:
    vowels = ['a', 'e', 'i', 'o', 'u']

    def __reversed__(self):
        return reversed(self.vowels)

v = Vowels()
print(list(reversed(v)))

```

Output:

```python
['u', 'o', 'i', 'e', 'a']

```

## Rules of reversed()

* The reversed() function can only take squeal objects like list, set, string, tuple, etc.