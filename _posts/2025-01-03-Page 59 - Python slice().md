---
title: Python slice()
description: The slice() is a built-in python function that slice the given object.(List, String, etc)
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python slice().png
 alt: Python slice()
---

The syntax of slice() is:

```python
slice(start, stop, step)

```

## slice() Parameters

The slice() functions takes three parameters as argument:

* start (optional) \- An integer number specifying at which position to start the slicing. Default is 0  
* stop \- An integer number specifying at which position to end the slicing  
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
* step (optional) \- Optional. An integer number specifying the step of the slicing. Default is 1\.

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
Lets see an example of python slice() function.

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
### Example 1: How to use slice() in python?

```python
# Python program to demonstrate
# slice() operator

# String slicing
String ='PythonScholar'
s1 = slice(3)
s2 = slice(1, 5, 2)
print("String slicing")
print(String[s1])
print(String[s2])

# List slicing
L = [1, 2, 3, 4, 5]
s1 = slice(3)
s2 = slice(1, 5, 2)
print("\nList slicing")
print(L[s1])
print(L[s2])

# Tuple slicing
T = (1, 2, 3, 4, 5)
s1 = slice(3)
s2 = slice(1, 5, 2)
print("\nTuple slicing")
print(T[s1])
print(T[s2])

```

Output:

```python
String slicing
Pyt
yh

List slicing
[1, 2, 3]
[2, 4]

Tuple slicing
(1, 2, 3)
(2, 4)

```