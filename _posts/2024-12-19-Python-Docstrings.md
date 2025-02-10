---
title: Python Docstring
description: In this tutorial, we will learn about python docstring, where and why python docstrings are used.
date: 2024-12-19 23:35:00 +0800
categories: [Python]
tags: [python]
image:
  path: /commons/Python Docstring.png
  alt: Python Docstring
---

## What is Python Docstring?

Python docstring or Documentation strings is a string literally used in the class, module, function, or method definition. 

As like multiline comment, docstring is also declared using three (‘’’) or four (“””). For example   
**‘’’ triple single quotes ‘’’** or **“”” triple double quotes ”””**

Docstrings are accessible from the doc attribute (\_\_doc\_\_)   for any of the Python objects and built-in functions. Docstrings are great for understanding the functionality of the more extensive code of the project.

Example of Code:

```python
def addition(n):
		''' This is a docstrings example we have added in addition function '''
		return n+n

print(addition.__doc__)
```
To run this docstring code, we have to follow this step.

```python
print(addition.__doc__)

```

Here the output of string literal.

Output

```python
	This is a docstrings example we have added in the addition function. 

```

Here, we have documented our addition function, and then we are accessing it with \_\_doc\_\_ attribute.

## Docstring in built-in functions

Now let's use docstring for the built-in python function and let it have a print function, for example.

```python
print(print.__doc__)

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
Output:

```python
print(value, ..., sep=' ', end='\n', file=sys.stdout, flush=False)

Prints the values to a stream, or to sys.stdout by default.
Optional keyword arguments:
file:  a file-like object (stream); defaults to the current sys.stdout.
sep:   string inserted between values, default a space.
end:   string appended after the last value, default a newline.
flush: whether to forcibly flush the stream.

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

As we can see, we got the documentation output of the print() function defined by python.

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
 

## Docstring in Python Module

```python
import numpy 
print(numpy.__doc__)

```

Output

```python
NumPy
=====

Provides
  1. An array object of arbitrary homogeneous items
  2. Fast mathematical operations over arrays
  3. Linear Algebra, Fourier Transforms, Random Number Generation

How to use the documentation
----------------------------
Documentation is available in two forms: docstrings provided
with the code, and a loose standing reference guide, available from
`the NumPy homepage <https://www.scipy.org>`_.

We recommend exploring the docstrings using
`IPython <https://ipython.org>`_, an advanced Python shell with
TAB-completion and introspection capabilities.  See below for further
instructions.

The docstring examples assume that `numpy` has been imported as `np`::

  >>> import numpy as np

.
.
.
.

```

