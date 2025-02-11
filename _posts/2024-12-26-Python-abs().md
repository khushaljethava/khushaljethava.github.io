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


 The syntax of abs() method:

```python
abs(number)
```

<script type="text/javascript">
	atOptions = {
		'key' : '98858c4e91885e00ea9926beee01c03e',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
</script>
<script type="text/javascript" src="https://www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
## Python abs() Parameters

We can only give a single argument in the abs() function.

**number** \- A number can be an integer, floating number, or complex number whose absolute value of python will return. 

Let see an example of the abs() function.

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
The Magnitude of 10 - 7j is: 12.206555615733702
```
<script type="text/javascript">
	atOptions = {
		'key' : '98858c4e91885e00ea9926beee01c03e',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
</script>
<script type="text/javascript" src="https://www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
## Rules of abs()

<script type="text/javascript">
	atOptions = {
		'key' : '98858c4e91885e00ea9926beee01c03e',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
</script>
<script type="text/javascript" src="https://www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
* If the integer value is passed it will return an integer value only.  
* If the floating value is passed it will return an absolute floating value.  
* If the complex number is passed it will return a magnitude of the given number.