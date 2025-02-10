---
title: Python exec() Method
description: In this tutorial we will learn about python exec() method and its uses with examples.
date: 2025-01-03 22:15:55 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python exec() Method.png
 alt: Python exec() Method
---

The exec() is a built-in python function that executes the specified python code dynamically. Can be a string or a code object.

Python exec() syntax :

```python
exec(object, globals, locals)

```

## exec() Parameters

exec() takes three parameters as argument:

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
* object \-  A string or code object.  
* globals (optional) \- A dictionary containing global parameters.  
* locals (optional) \-  A dictionary containing local parameters.

Lets see an example of python exec() function.

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
### Example 1: How to use exec() function in python?

```python'
code = 'print("Hello Python")'

exec(code)

```

Output:

```python
Hello Python 

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
### Example 2 : exec() function with user input function.

```python
code = 'a = int(input("Enter a Number: "))\nprint(a)'

exec(code)

```

Output:

```python
Enter a Number: 25
25

```