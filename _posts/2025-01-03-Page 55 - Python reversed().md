---
title: Python reversed()
description: The reversed() function returns the reversed iterator of the given sequence object.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python reversed().webp
  alt: Python reversed()
---

The Python `reversed()` built-in function returns a reverse iterator over a sequence. It accepts a single parameter, a sequence object such as a list, tuple, string, or range, or any object that implements the `__reversed__()` method or supports the sequence protocol (`__len__()` and `__getitem__()`). The function returns a `reversed` iterator object that yields elements from the sequence in reverse order without modifying the original sequence or creating a copy of it in memory. This makes `reversed()` memory-efficient for iterating over large sequences backward. Common real-world use cases include processing log entries from newest to oldest, implementing undo functionality by traversing action history in reverse, reversing user input for palindrome checking, iterating through sorted results in descending order, and displaying stack traces or breadcrumb trails from most recent to earliest.

## What does reversed() return?

The `reversed()` function returns a `reversed` iterator object that yields elements of the given sequence from last to first, without modifying or copying the original data.

## When should you use reversed()?

Use `reversed()` when you need to iterate through a sequence in reverse order without creating a reversed copy, which is more memory-efficient than slicing with `[::-1]` for large sequences.

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

## Common Use Cases

Processing data in reverse chronological order is a common application of `reversed()`. When working with log files, transaction histories, or event streams stored in chronological order, iterating with `reversed()` lets you process the most recent entries first without reversing the entire dataset in memory.

Implementing algorithms that require backward traversal benefits from `reversed()`. For example, checking whether a string is a palindrome can be done by comparing the original string with `''.join(reversed(string))`. Similarly, certain dynamic programming algorithms process sequences from right to left, and `reversed()` provides an elegant way to express this iteration.

Building user interfaces that display items in reverse order, such as chat message feeds showing the newest messages at the bottom or breadcrumb navigations showing the most specific page first, frequently use `reversed()` to transform the data before rendering.

For sorting sequences in a specific order, see the [Python sorted()](/posts/Page-60-Python-sorted/) function, which can produce descending results using its `reverse` parameter. To convert a reversed iterator into a list, the [Python list()](/posts/Page-39-Python-list/) function is commonly used.

## Rules of reversed()

* The reversed() function can only take sequence objects like list, string, tuple, etc.