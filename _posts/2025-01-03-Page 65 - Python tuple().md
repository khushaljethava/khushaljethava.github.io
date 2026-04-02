---
title: Python tuple()
description: The tuple() is a built-in function of python that is used to create a tuple in python.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python tuple().webp
  alt: Python tuple()
---

The Python `tuple()` function is a built-in constructor that creates a new tuple object from an iterable. It accepts a single optional parameter: an iterable such as a list, string, set, dictionary, or generator. When called with no arguments, it returns an empty tuple `()`. When given an iterable, it returns a tuple containing all the elements of that iterable in order. Tuples are immutable sequences, meaning their elements cannot be changed after creation, which makes them hashable and suitable for use as dictionary keys or set members. The `tuple()` function is commonly used to convert mutable sequences like lists into immutable form for safe storage, function return values, or as keys in dictionaries. A real-world example is converting a list of database column names into a tuple for use as a constant. It pairs naturally with [list()](/posts/Page-39-Python-list()/) for converting between mutable and immutable sequences, and with [len()](/posts/Page-38-Python-len()/) to check the number of elements.

## What does tuple() return?

The `tuple()` function returns a new tuple containing all elements from the given iterable. When called with no arguments, it returns an empty tuple `()`.

## When should you use tuple()?

Use `tuple()` when you need to convert a mutable iterable like a list or set into an immutable sequence, or when you want to create a tuple from a generator or other iterable for safe storage and hashing.

Tuples are immutable sequences and you can learn more about tuples from here.

The syntax of tuple() function is:

```python
tuple(iterable)

```

## tuple() Parameters


The tuple() function takes only one parameter as argument.

* iterable (Optional) \- an iterable or collection of items like list, set, dictionary , etc.


  

Lets an example of tuple() function in python:

### Example 1: How to use tuple() function in python?

```python
tuple1 = tuple()
print(tuple1)

# creating a tuple from a list
tuple2 = tuple([1, 4, 6])
print(tuple2)

# creating a tuple from a string
tuple3 = tuple('Python')
print(tuple3)

# creating a tuple from a dictionary
tuple4 = tuple({1: 'one', 2: 'two'})
print(tuple4)

```

Output:

```python
()
(1, 4, 6)
('P', 'y', 't', 'h', 'o', 'n')
(1, 2)

```


## Common Use Cases

A common use case for `tuple()` is freezing a list into an immutable form so it can be used as a dictionary key, such as creating a lookup table keyed by coordinate pairs. Another practical scenario is converting the results of [zip()](/posts/Page-68-Python-zip()/) or [enumerate()](/posts/Page-19-Python-enumerate()/) into a tuple for indexed access and safe storage. It is also used to create constant sequences that should not be modified throughout the life of a program, such as configuration values or fixed menu options.

## Rules of tuple()

* It will only return when only an iterable is passed.  
* It will return an empty tuple when passed with no parameters.