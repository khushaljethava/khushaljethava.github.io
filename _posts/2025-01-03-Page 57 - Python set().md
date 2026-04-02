---
title: Python set()
description: The set() function in python helps to create a python set object.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python set().webp
  alt: Python set()
---

The Python `set()` built-in function creates a new set object, which is an unordered collection of unique, hashable elements. It accepts an optional iterable parameter such as a list, tuple, string, dictionary, or range, and returns a set containing the unique elements from that iterable. When called without arguments, it returns an empty set. Sets automatically eliminate duplicate values, making `set()` the go-to tool for deduplication tasks. The returned set supports mathematical set operations including union, intersection, difference, and symmetric difference. Real-world use cases include removing duplicates from a list of email addresses, finding common elements between two datasets, checking membership efficiently with O(1) average lookup time, filtering unique tags or categories from a collection, and computing set differences to identify new or removed items between two snapshots of data.

## What does set() return?

The `set()` function returns a new set object containing unique elements from the given iterable, or an empty set if no argument is provided.

## When should you use set()?

Use `set()` when you need to eliminate duplicates from a collection, perform set operations like union and intersection, or check membership efficiently, since sets provide O(1) average-time lookups compared to O(n) for lists.

The syntax of set() function is:

```python
set(iterable)

```


## set() Parameters

set() takes only one parameter as an argument:

* **iterable (optional)** \- an iterable object can be a sequence or collection of objects. (Like list, string tuple, dictionary etc.)

Let see some examples of the set() in python.

### Example 1:  How to use the set() function in python?

```python
# empty set
print(set())

# from string
print(set('Python'))

# from tuple
print(set((1,2,3,4,5)))

# from list
print(set(['a', 'e', 'i', 'o', 'u']))

# from range
print(set(range(5)))

```

Output:

```python
set()
{'y', 'P', 't', 'o', 'h', 'n'}
{1, 2, 3, 4, 5}
{'i', 'e', 'o', 'a', 'u'}
{0, 1, 2, 3, 4}

```

Here we are converting a string, tuple, list and range into a set using the set() function, and as the set is an unordered sequence, we are getting output according to it. Also, note that when creating an empty set, you must use the set() function and if your building an empty set using { } syntax, it will create a dictionary, not a set.

### Example 2: How to use a set() function with dictionary and frozenset in python?

```python
# from dictionary
print(set({'a':1, 'e': 2, 'i':3, 'o':4, 'u':5}))

# from frozen set
frozen_set = frozenset(('a', 'e', 'i', 'o', 'u'))
print(set(frozen_set))

```

Output

```python
{'i', 'a', 'u', 'o', 'e'}
{'i', 'a', 'u', 'o', 'e'}

```

## Common Use Cases

Removing duplicates from a list is the most frequent use of `set()`. Given a list with repeated values like `[1, 2, 2, 3, 3, 3]`, calling `list(set(data))` produces a list of unique values. This is commonly used to clean up user input, deduplicate database query results, or extract unique tags from a collection.

Performing set operations to compare datasets is another powerful application. Using set intersection (`set_a & set_b`) you can find common customers between two lists, using set difference (`set_a - set_b`) you can identify items present in one dataset but not another, and using symmetric difference (`set_a ^ set_b`) you can find items exclusive to each set.

Efficient membership testing is a key performance advantage of sets. When you need to check whether an element exists in a large collection, converting it to a set first and using the `in` operator provides constant-time lookups, which is dramatically faster than searching through a list for large datasets.

For creating immutable sets that can be used as dictionary keys or set elements, see the [Python frozenset()](/posts/Page-25-Python-frozenset/) function. To convert a set back to an ordered sequence, the [Python sorted()](/posts/Page-60-Python-sorted/) function returns a sorted list from any iterable.

## Rules of the set()


* A set() function will take only an iterable object as a parameter.  

* An empty set can be created with no parameter if passed.