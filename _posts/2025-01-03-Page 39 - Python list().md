---
title: Python list() Method
description: In this tutorial we will learn about the python list() method and its uses with examples.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python list() Method.png
 alt: Python list() Method
---

## What is the Python list() Method?

The python list() method is used to create a list along with typecasting of the list.

A list is a python built-in data structure that is a collection of ordered and mutable objects. You can learn more about python lists from here(Link).

The syntax of python list() is:

```python
list(iterable)

```

## Python list() Method Parameters

<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="https://www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
The list() method takes only one parameter as argument:

* **iterable (optional)** \- an iterable object that can be a sequence or collection of objects. (that can include string, tuples, set, or dictionary)

<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="https://www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
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

<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="https://www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
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

## Rules of list() method

* If the list() method is passed without a parameter it will return an empty list.  
* Dictionary object will only return keys when passed in the list() method.  
* Only sequences or collections of objects can be used with the list() method.