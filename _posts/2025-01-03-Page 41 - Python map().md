---
title: Python map() Method
description: In this tutorial, we will learn about the python map() method and its uses with examples.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python map() Method.webp
  alt: Python map() Method
---

The Python `map()` function is a built-in that applies a given function to every item in one or more iterables and returns a map object (an iterator) of the results. It takes two or more parameters: the first is the function to apply, and the remaining are iterables whose items are passed as arguments to that function. When multiple iterables are provided, the function must accept that many arguments, and iteration stops when the shortest iterable is exhausted. The returned map object is lazy, meaning it computes values on demand rather than all at once, which makes it memory-efficient for large datasets. A common real-world use case is data transformation pipelines, where you need to apply the same operation to every element in a collection, such as converting a list of temperature readings from Celsius to Fahrenheit. It is also frequently combined with `list()` to materialize the results into a list for further processing or serialization.

## What does map() return?

The `map()` function returns a map object, which is a lazy iterator that yields the results of applying the specified function to each item in the provided iterable(s).

## When should you use map()?

Use `map()` when you need to apply the same transformation function to every element of one or more iterables, especially when working with large datasets where lazy evaluation improves memory efficiency.

## What is the python map() method?

The map() method will return a map object of each item in an iterable. For example, (list, tuple, etc.)

These items are sent to the map method as a parameter.

The syntax of map() method is:

```python
map(function, iterable)

```


## map() parameters

The map() method takes two parameters as an argument.

* **function** \- each item of the iterable will be passed to this function.  

* **iterable** \- A sequence or iterable object which is to be mapped.

Let's see some examples of the map() method in python.

### Example 1: Working of the Python map() Method?

```python
def myfunc(a, b):
  return a + b

x = map(myfunc, ('Tata', 'BMW', 'Audi'), ('Volkswagen', 'Porsche', 'Ford'))
print(x)

```

The output will be as follows.

```python
<map object at 0x7fe0c0e9e4f0>

```


Since map() expects a method to be passed in, lambda methods are commonly used while working with map() methods.

A lambda method is a short method without a name. Visit this page to learn more about Python lambda methods.

### Example 2: How to use the lambda method with map()?

```python
numbers = (1, 2, 3, 4)
result = map(lambda x: x*x, numbers)
print(result)

# converting map object to set
numbersSquare = set(result)
print(numbersSquare)

```

The output will be as follows.

```python
<map 0x7fafc21ccb00>
{16, 1, 4, 9}

```

## Common Use Cases

A frequent use of `map()` is type conversion across a collection, such as `list(map(int, string_list))` to convert a list of string numbers into integers in one concise expression. Another practical scenario is applying a formatting function to every element in a dataset, such as stripping whitespace from each line read from a file with `map(str.strip, file.readlines())`. Developers also use `map()` with lambda functions for quick inline transformations, like squaring every number in a list or extracting a specific field from a list of dictionaries.

To selectively include items based on a condition instead of transforming all of them, see the [Python filter() method](/posts/Page-22-Python-filter()/). To convert the lazy map object into a concrete list, use the [Python list() method](/posts/Page-39-Python-list()/).

## Rules of map() method

* The map() method applies a given method to each item of an iterable and returns a list of the results.  
    
* The returned value from the map() (map object) can then be passed to methods like list() (to create a list), set() (to create a set), and so on.