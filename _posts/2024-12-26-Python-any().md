---
title: Python any() Method
description: In this tutorial we will learn about python any() method and its uses.
date: 2024-12-26 21:08:00 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python any() Method.png
  alt: Python any() Method

---

## What is python any() method?

<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
The any() is a built-in method available in python, which will return True if any element is present in an iterable like list, tuple, set, dictionary, or loop in python.

<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
If the iterable is empty or any elements are not present, the any() method will return False.

Syntax of any() method.

```python
any(iterable)
```

## Python any() Parameter

The any() method will take an iterable, including list, tuple, set, dictionary, string, and loop in python.

Let's see a basic example of any() method.

Example 1: using any() on python Lists.

```python
my_list = [1,2,3,4,5]
print(any(my_list))

my_list_2 = []
print(any(my_list_2))

my_list_3 = [0,False]
print(any(my_list_3))
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
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
The Output will be as follows.

```python
True
False
False
```

As we can see, the first list is not empty. That’s why any() method is returning True because its contents elements and the second list are empty, hence returning False.

Note that any() method will consider 0 and False as a Null value, hence returning False in the third list.

The any() method works similarly for tuples and sets like lists.

Example 2: Using any() on Python Strings

```python
my_string = "This is Python"
print(any(my_string))

my_string_2 = "
print(any(my_string_2))
```

Output:

```python
True
False
```
Example 3: Using any() on Python Dictionaries	

```python
my_dict = {1:True}
print(any(my_dict))

my_dict = {0:False}
print(any(my_dict))

my_dict = {0:'False',1:'True'}
print(any(my_dict))

my_dict = {0:'False'}
print(any(my_dict))

my_dict = {}
print(any(my_dict))

my_dict = {0: 'False', False : 0}
print(any(my_dict))
```

The output will be as follows:

```python
True
False
True
False
False
False
```

In the case of dictionaries, if all keys (not values) are false or the dictionary is empty, any() returns False. If at least one key is true, any() returns True.

## Rules of any() method

* The any() method will return a boolean as a value.  
* If there is at least one element in an iterable that is true, any() method will return True.  
* If all elements in an iterable are False or an iterable is empty, then any() method will return False.  
* If all the values are true in iterable, any() will return True.  
* If all the values are false in iterable, any() will return False.  
* If one value is true and others are false, any() will return True.  
* If one value is false and others are true, any() will return True.  
* If the iterable is empty, any() will return False.