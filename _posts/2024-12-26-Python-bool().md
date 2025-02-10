---
title: Python bool() Method
description: The bool() is a built-in Python method that returns the boolean(True or False)  value of a specified given object using python’s standard truth testing procedure.
date: 2024-12-26 21:19:00 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python bool() Method.png
  alt: Python bool() Method

---


The syntax of bool() method is:

```python
bool(value)
```

## Python bool() parameters

The bool()  has no specified parameter; it is not mandatory to pass a value to the bool() method. 

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
Let see an example of the bool() method.

Example 1: Using bool() method.

```python
my_bool = []
print(my_bool,'is',bool(my_bool))

my_bool = [0]
print(my_bool,'is',bool(my_bool))

my_bool = 0.0
print(my_bool,'is',bool(my_bool))

my_bool = None
print(my_bool,'is',bool(my_bool))

my_bool = True
print(my_bool,'is',bool(my_bool))

my_bool = 'Easy string'
print(my_bool,'is',bool(my_bool))
```

The output will be as follows.

```python
[] is False
[0] is True
0.0 is False
None is False
True is True
Easy string is True
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
The following values are always considered false in Python:

* None will return False as it is a Null value.  
* False will also return False as output.  
* Empty Sequence  and mapping like (),\[\],’’ and {} will return False.  
* objects of Classes which has \_\_bool\_\_() or \_\_len()\_\_ method which returns 0 or False

All other values except these values are considered true.

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
## Rules of bool() method.

* If the value is not empty and has any true value, it will return True.  
* If the value is empty and has no true value, it will return False.