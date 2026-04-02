---
title: Python max()
description: The max() function returns the item with the largest value or the item with the largest value in an iterable.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python max().webp
  alt: Python max()
---

The Python `max()` function is a built-in that returns the largest item from an iterable or the largest of two or more arguments. It supports two calling conventions: passing individual objects as positional arguments (`max(a, b, c)`), or passing a single iterable (`max(my_list)`). An optional `key` parameter accepts a function that extracts a comparison key from each element, and an optional `default` parameter provides a fallback value when the iterable is empty. Without a `default`, passing an empty iterable raises a `ValueError`. The function uses standard comparison operators, so it works with numbers, strings (compared lexicographically), and any objects that support the `>` operator. A common real-world use case is finding the highest score, maximum temperature, or most recent date in a dataset. For example, a grading system might use `max(student_scores, key=lambda s: s['grade'])` to find the top-performing student.

## What does max() return?

The `max()` function returns the largest item among the provided arguments or from the given iterable, according to standard comparison or a custom `key` function.

## When should you use max()?

Use `max()` when you need to find the largest value in a collection or among several values, optionally using a custom comparison key for complex objects.

The syntax of max() function:

There are two different syntaxes of max() that can be used in python.

```python
max(n1, n2, n3, *n,key)

```

Or

```python
max(iterable,*iterable, key,default)

```

As you can see, there are different parameters for different syntax in the python max() function.

Let's check them one by one

## max() function with objects

It helps us to find the highest value object between two or more objects. As we can see this syntax:

```python
max(n1,n2,n3,*n,key)

```

### max() parameters

* **n1** \- an object; can be a number, string, etc.  
* **n2** \- an object; can be a number, string, etc.  
* **n3**  \- an object; can be a number, string, etc.  

* **\*n (optional)** \- any number of objects.  
* **key (optional)** \-  key function where each argument is passed, and comparison is performed based on its return value

Let's check some examples of max() functions with objects.

### Example 1:How to find maximum value among, given numbers?

```python
result = max(2,56,-2,72,-83)
print("The largest number is:",result)

```

Output:

```python
The largest number is: 72

```


### Example 2: How to find maximum value among given variables?

```python
num1 = 34
num2 = 2
num3 = -65
num4 = 92
num5 = -21

result = max(num1,num2,num3,num4,num5)
print("The largest number is:",result)

```

Output:

```python
The largest number is: 92

```


## max() function with iterable

It helps us to find the highest value from an iterable. As we can see this syntax:

```python
max(iterable, *iterable, key,default)

```

### max() parameters

* **iterable** \- an iterable that can be list, tuple, set, dictionary, etc.  
* **\*iterable** \- any number of iterables: can be more than one.  
* **key (optional)** \- key function where the iterables are passed and comparison is performed based on its return value  
* **default (optional)** \- a default value if the given iterable is empty.

### Example 3: Find largest item from a list.

```python
numbers = [7,1,-6,2,8,10]
print("The largest number is:",max(numbers))

```
The output will be as follows.

```python
The largest number is: 10

```

## Common Use Cases

A common use of `max()` is finding the highest value in a list of numbers, such as determining the peak temperature from a week of weather readings or the highest bid in an auction. Another practical scenario is using the `key` parameter to find the longest string in a list with `max(words, key=len)`, or identifying the most expensive item in a list of product dictionaries. Developers also use `max()` with `default` to safely handle potentially empty iterables, such as `max(filtered_results, default=0)` to avoid exceptions when no items match a filter condition.

If you want to learn about finding the smallest or lowest value item, see the [Python min() function](/posts/Page-44-Python-min()/). To sort an entire collection rather than finding just the maximum, the [Python sorted() function](/posts/Page-60-Python-sorted()/) is the standard approach.

## Rules of max() function

* If an empty iterator is passed without a default parameter, it will raise a ValueError exception.  
* If the multiple iterators are passed, the largest value item from the given iterators will return.