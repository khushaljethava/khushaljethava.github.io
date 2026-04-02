---
title: Python min() Method
description: The min() method returns the item with the smallest value or the item with the smallest value in an iterable.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python min() Method.webp
  alt: Python min() Method
---

The Python `min()` built-in function returns the smallest item from an iterable or the smallest of two or more arguments. It accepts either multiple positional arguments or a single iterable such as a list, tuple, or generator expression. An optional `key` parameter lets you supply a function that extracts a comparison value from each element, and an optional `default` parameter provides a fallback value when the iterable is empty. The function returns the minimum element according to the natural ordering of the items or the ordering defined by the `key` function. In real-world applications, `min()` is used extensively for tasks like finding the cheapest product in a catalog, identifying the earliest date in a list of timestamps, selecting the shortest string in a collection, or determining the lowest score in a dataset. Its ability to accept a `key` function makes it flexible enough to handle complex comparison logic on structured data like dictionaries or custom objects.

## What does min() return?

The `min()` function returns the smallest item from the provided arguments or iterable, as determined by default comparison or the optional `key` function.

## When should you use min()?

Use `min()` whenever you need to find the smallest or lowest-ranked element in a collection or among several values, especially when combined with a `key` function for custom comparison logic on complex data structures.

The syntax of min() method:


There are two different syntaxes of min() that can be used in python.

```python
min(n1, n2, n3, *n,key)

```

Or

```python
min(iterable,*iterable, key,default)

```

As you can see, there are different parameters for different syntax in the python min() method.


Let's check them one by one

## Python min() method with objects

It helps us to find the lowest value object between two or more objects. As we can see this syntax:

```python
min(n1,n2,n3,*n,key)

```

### min() parameters

* **n1** \- an object; can be a number, string, etc.  
* **n2** \- an object; can be a number, string, etc.  
* **n3**  \- an object; can be a number, string, etc.  
* **\*n (optional)** \- any number of objects.  
* **key (optional)** \-  key method where each argument is passed, and comparison is performed based on its return value

Let's check some examples of min() methods with objects.

### Example 1:How to find minimum value among given numbers?

```python
result = min(2,56,-2,72,-83)
print("The smallest number is:",result)

```

Output:

```python
The smallest number is: -83

```

### Example 2: How to find minimum value among given variables?

```python
num1 = 34
num2 = 2
num3 = -65
num4 = 92
num5 = -21

result = min(num1,num2,num3,num4,num5)
print("The smallest number is:",result)

```

Output:

```python
The smallest number is: -65

```

## min() method with iterable

It helps us to find the lowest value from an iterable. As we can see this syntax:

```python
min(iterable, *iterable, key,default)

```

### min() parameters

* **iterable** \- an iterable that can be list, tuple, set, dictionary, etc.  
* **\*iterable** \- any number of iterables: can be more than one.  
* **key (optional)** \- key method where the iterables are passed and comparison is performed based on its return value  
* **default (optional)** \- a default value if the given iterable is empty.

### Example 3: Find smallest item from a list.

```python
numbers = [7,1,-6,2,8,10]
print("The smallest number is:",min(numbers))

```

The output will be as follows.

```python
The smallest number is: -6

```

## Common Use Cases

Finding the minimum value in a dataset is one of the most common applications. For example, given a list of employee salaries, you can quickly identify the lowest salary using `min(salaries)`. When working with dictionaries, you can use the `key` parameter to find the entry with the smallest value, such as `min(prices, key=prices.get)` to find the cheapest item by name.

Date and time comparisons are another practical use case. If you have a list of datetime objects representing event timestamps, `min(timestamps)` returns the earliest event. This is useful in scheduling applications, log analysis, and timeline construction.

String comparison with `min()` is also valuable. When applied to a list of strings, `min()` returns the string that comes first in lexicographic (alphabetical) order. This can be useful for sorting operations, finding the first entry alphabetically, or selecting the shortest string with `min(strings, key=len)`.

For the inverse operation of finding the largest value, see the [Python max()](/posts/Page-42-Python-max/) function. You may also find the [Python sorted()](/posts/Page-60-Python-sorted/) function helpful when you need a fully ordered result rather than just the minimum.

## Rules of min() method

* If an empty iterator is passed without a default parameter it will raise a ValueError exception.  
* If the multiple iterators are passed, the smallest value item from the given iterators will return.