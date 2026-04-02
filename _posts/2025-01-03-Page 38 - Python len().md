---
title: Python len() Method
description: In this tutorial we will learn about the python len() method and its uses with examples.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python len() Method.webp
  alt: Python len() Method
---

Python's `len()` function returns the number of items in an object. It accepts a single argument -- any sequence (such as a string, list, tuple, or range) or collection (such as a dictionary, set, or frozenset) -- and returns an integer representing the total count of elements. Under the hood, `len()` calls the object's `__len__()` method, which means custom classes can support `len()` by implementing that dunder method. This is one of the most frequently used built-in functions in Python, essential for iterating over data, validating input length, checking whether collections are empty, implementing pagination, and controlling loop boundaries. If you need to generate a sequence of numbers up to a certain length, see [Python range()](/posts/Page-53-Python-range()/). For checking the type of an object before measuring its length, see [Python type()](/posts/Page-66-Python-type()/).

## What does len() return?

The `len()` function returns a non-negative integer representing the number of items in the given object. For strings, it counts characters; for lists and tuples, it counts elements; for dictionaries, it counts key-value pairs.

## When should you use len()?

Use `len()` whenever you need to know how many items a collection contains. This includes checking if a list is empty (`len(my_list) == 0`), validating that user input meets minimum length requirements, implementing pagination logic, or determining loop boundaries.

## What is the python len() Method?

The Python len() method is a built-in Python method that returns the object's length. It's also known as the python length method.

The syntax of python len() is

```python
len(object)

```

## Python len() Parameters Method

The len() method takes only one parameter as an argument.


* **object** \- the name of the object that can be a sequence or a collection.

len() method can be used with almost all the objects like string, integer, tuple, list, range, dictionary, set, list, etc.

### Example 1: How to use the len() method in python?

```python
# string

b = "We love Python"
print("The length of b is:", len(b))

# list

my_list = [1,2,3,4,5]
print("The length of my_list is:", len(my_list))

# tuple

my_tuple = ("Apple","Banana","Orange")
print("The length of my_tuple is:",len(my_tuple))

```

Output:

```python
The length of b is: 14
The length of my_list is: 5
The length of my_tuple is: 3

```

We can also use the len() method and the range() method to check the length of the range.

### Example 2: How to use len() with range() method?

```python
# range

print("The length of range method is",len(range(1,100)))

```

Output:

```python
The length of range method is 99

```


### Example 3: How to use the len() method with dictionaries and sets?

```python
# set

my_set = {1,2,3,4,5}
print("The length of the my_set is",len(my_set))


# dictionary

my_dict = {1:'Apple',2:'Banana',3:'Orange'}
print("The length of the my_dict is",len(my_dict))

```


Output:

```python
The length of the my_set is 5
The length of the my_dict is 3

```

## Common Use Cases

**Validating input length.** When accepting user input such as passwords, usernames, or form fields, `len()` is the standard way to enforce minimum and maximum length constraints. For example, `if len(password) < 8` ensures a password meets a minimum security requirement.

**Checking if a collection is empty.** While Python allows `if not my_list` to check emptiness, `len(my_list) == 0` is sometimes preferred for explicit readability, especially in codebases where clarity matters more than brevity.

**Implementing pagination.** When displaying data in pages, `len()` tells you the total number of records, which you can divide by the page size to calculate the total number of pages and control navigation.

## Rules of len() method

* If a non-sequence object is passed, it will raise a TypeError exception because the len() method cannot deal with non-sequence objects.

## Related Functions

* [Python range()](/posts/Page-53-Python-range()/) -- generate a sequence of numbers, often used with `len()` for indexing.
* [Python type()](/posts/Page-66-Python-type()/) -- check the type of an object before measuring its length.
* [Python bool()](/posts/Python-bool()/) -- convert a value to Boolean (empty collections are falsy).