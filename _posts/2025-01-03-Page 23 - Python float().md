---
title: Python float() Method
description: In this tutorial we will learn about python float() method and ts uses.
date: 2025-01-03 22:15:55 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python float() Method.png
 alt: Python float() Method
---

## What is python float() method?

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
The python float() method returns the floating-point number of a given number or a string; we can also use it for typecasting in python.

The syntax of float() is:

```python
float(variable)

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
## float() Parameters

The float() method takes only one parameter as an argument:

**variable**  \-  a number or string that needs to be typecast to a floating-point number.

Let's check an example of the float() method.

### Example 1: How to use float()  in python

```python
print(float(4))

print(float(6.5))

print(float(-72))

print(float("345"))

print(float("   98      "))

print(float(True))

print(float(False))

```

The output will be as follows.

```python
4.0
6.5
-72.0
345.0
98.0
1.0
0.0

```

In the above program, we take multiple values like integer, string, string with whitespace, negative integer, and boolean. As you can see, we are using the float() method to convert them into a floating-point number. But when we use a boolean value, it will give 1.0 for True and 0.0 for False value.

We need to remember that it should be in numbers or Nan(not a number); otherwise, it will raise an error.

### Example 2: How to use float() with string in python?

```python
print(float("34"))

print(float("67.34"))

print(float("PythonScholar"))

```

Output:

```python
34.0
67.34
Traceback (most recent call last):
  File "", line 5, in <module>
    print(float("PythonScholar"))
ValueError: could not convert string to float: 'PythonScholar.'

```

As you can see in the output, it converts all the strings with numbers but throws an error when using a string with PythonScholar because we cannot convert a string that is not a number.

### Example 3: using float() with infinity and Nan(not a number)?

```python
# NaN in float

print(float("nan"))

print(float("NaN"))

# inf/infinity in float

print(float("inf"))
print(float("InF"))
print(float("InFiNiTy"))
print(float("infinity"))

```

The output will be as follow:

```python
nan
nan
inf
inf
inf
inf

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
## Rules of float() method

* An argument must be an integer, string with a number, boolean, or Nan value.   
* If the 0.0 value is passed, it will not return anything.  
* It will cause an OverflowError exception when the argument is passed outside of the range of python float.