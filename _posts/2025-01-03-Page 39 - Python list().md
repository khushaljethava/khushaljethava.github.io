---
title: Python list() Method
description: In this tutorial we will learn about the python list() method and its uses with examples.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python list() Method.webp
  alt: Python list() Method
---

The Python `list()` function is a built-in constructor that creates a new list object. It accepts a single optional parameter: an iterable (such as a string, tuple, set, dictionary, or range) whose elements will become the items of the new list. When called without arguments, it returns an empty list `[]`. The function is essential for converting other sequence types into lists, which are mutable and support indexing, slicing, appending, and other modification operations. A common real-world use case is materializing lazy iterables into concrete lists. For example, after applying `map()` or `filter()` to transform data, you often wrap the result in `list()` to produce an actual list you can index, slice, or serialize to JSON. The `list()` constructor is also frequently used to create independent copies of existing lists, since `list(original)` produces a shallow copy that can be modified without affecting the original.

## What does list() return?

The `list()` function returns a new list containing the elements from the given iterable, or an empty list if no argument is provided.

## When should you use list()?

Use `list()` when you need to convert an iterable (such as a tuple, set, string, or generator) into a list, create an empty list, or make a shallow copy of an existing list.

## What is the Python list() Method?

The python list() method is used to create a list along with typecasting of the list.

A list is a python built-in data structure that is a collection of ordered and mutable objects. You can learn more about python lists from here(Link).

The syntax of python list() is:

```python
list(iterable)

```

## Python list() Method Parameters


The list() method takes only one parameter as argument:

* **iterable (optional)** \- an iterable object that can be a sequence or collection of objects. (that can include string, tuples, set, or dictionary)


### Example 1: How to use the list() method in python?

```python
# empty list
print(list())

# vowel string
vowel_string = 'aeiou'
print(list(vowel_string))

# vowel tuple
vowel_tuple = ('a', 'e', 'i', 'o', 'u')
print(list(vowel_tuple))

# vowel list
vowel_list = ['a', 'e', 'i', 'o', 'u']
print(list(vowel_list))

```

Output:

```python
[]
['a', 'e', 'i', 'o', 'u']
['a', 'e', 'i', 'o', 'u']
['a', 'e', 'i', 'o', 'u']

```


### Example 2: How to convert a dictionary to list using list() method?

```python
# number list

fruits = {1 : 'banana',2 : 'mango',3 : 'apple'}
print(fruits)

fruits_list = list(fruits)
print(fruits_list)

```

Output:

```python
{1: 'banana', 2: 'mango', 3: 'apple'}
[1, 2, 3]

```

When we try to convert a dictionary to a list, only keys will be the elements of the list. It will not take values in the list. Also, the order of the elements will be random.

### Example 3: How to create an empty list in python?

```python
#Empty List

lst = list()

print(lst)

#Check Type of Python
print(type(lst))

```

Output:

```python
[]
<class 'list'>

```

## Common Use Cases

A frequent use of `list()` is converting the results of `map()`, `filter()`, or `zip()` into a concrete list that can be indexed, iterated multiple times, or serialized. Another common scenario is splitting a string into individual characters by passing it to `list()`, which produces a list like `['h', 'e', 'l', 'l', 'o']` from the string `"hello"`. Developers also use `list()` to extract dictionary keys into a list for iteration or display, since `list(my_dict)` returns a list of all keys in insertion order.

To create an immutable sequence instead, see the [Python tuple() function](/posts/Page-65-Python-tuple()/). If you need to apply a transformation to each element before collecting into a list, the [Python map() method](/posts/Page-41-Python-map()/) is commonly used in combination with `list()`.

## Rules of list() method

* If the list() method is passed without a parameter it will return an empty list.  
* Dictionary object will only return keys when passed in the list() method.  
* Only sequences or collections of objects can be used with the list() method.