---
title: Python all() Method
description: In this tutorial, we will learn about the python all() method and how we can use it.
date: 2024-12-26 21:06:00 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 300,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
  path: /commons/Python all() Method.png
  alt: Python all() Method

---

The all()  is a built-in Method available in python, which will return True when all the elements in the given iterable are true. If any null value is present in iterable, it will return false.

Ann empty iterable will return True in any() function.

The syntax of all() function is :

```python
all(iterable)
```

<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 300,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
## Python all() Parameters

The all() method will take a single argument as an iterable, including list, tuple, set, dictionary, string, and loop in python.

Let's see an example of all() method.

Example 1: How to use all() in lists?

```python
my_list = [1,2,3,4,5]
print(all(my_list))

my_list = [0,False]
print(all(my_list))

my_list = [0,1,2,3,4,5]
print(all(my_list))

my_list = [0,False,1]
print(all(my_list))

my_list = []
print(all(my_list))
```

Output:

```python
True
False
False
False
True
```

The all() method will work similarly for types and sets like the list in python.

Example 2 : How to use all() on strings?

```python
my_string = "This is Python"
print(all(my_string))

my_string = ""
print(all(my_string))
```

The output will be as follows.

```python 
True
True
```

Example 3: How to use all() on dictionaries?

```python
my_dict = {1:True}
print(all(my_dict))

my_dict = {0:False}
print(all(my_dict))

my_dict = {0:'False',1:'True'}
print(all(my_dict))

my_dict = {0:'False'}
print(all(my_dict))

my_dict = {}
print(all(my_dict))
```

The Output will be as follows.

```
True
False
False
False
True
```
<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 300,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>

In dictionaries, it is all the keys, not the values are true, or the dictionary is empty, then all() will return True otherwise, it will return false for all other cases.  
