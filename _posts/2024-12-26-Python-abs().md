---
title: Python abs() Function
description: The abs() is a built-in function available in python. Python abs() functions are used to return the python absolute value of the given number.
date: 2024-12-26 21:01:00 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python abs() Function.png
  alt: Python abs() Function

---


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
 The syntax of abs() method:

```python
abs(number)
```

## Python abs() Parameters

We can only give a single argument in the abs() function.

**number** \- A number can be an integer, floating number, or complex number whose absolute value of python will return. 

Let see an example of the abs() function.
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

Example 1:

```python
#Integer Number
integer = -32
print("The Absolute value of the integer variable is:", abs(integer))

#Floating Number
floating = -12.54
print("The Absolute value of the floating variable is:", abs(floating))

```

The output will be as follow:

```python
The Absolute value of the integer variable is: 32
The Absolute value of the floating variable is: 12.54
```

Unlike integer and floating numbers, complex numbers will not return any absolute value in python, but instead, they will return a magnitude of the complex number.

Example 2:
```python
#Complex Number

complex = (10 - 7j)

print("The Magnitude of 10 - 7j is:", abs(complex))
```

The output is as follows:

```python
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
The Magnitude of 10 - 7j is: 12.206555615733702
```
## Rules of abs()

* If the integer value is passed it will return an integer value only.  
* If the floating value is passed it will return an absolute floating value.  
* If the complex number is passed it will return a magnitude of the given number.