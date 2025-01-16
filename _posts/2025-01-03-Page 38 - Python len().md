---
title: Python len() Method
description: In this tutorial we will learn about the python len() method and its uses with examples.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python len() Method.png
 alt: Python len() Method
---

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

## Rules of len() method

* If a non-sequence object is passed, it will raise a TypeError exception because the len() method cannot deal with non-sequence objects.