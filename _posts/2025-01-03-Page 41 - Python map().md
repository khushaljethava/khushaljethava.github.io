---
title: Python map() Method
description: In this tutorial, we will learn about the python map() method and its uses with examples.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python map() Method.png
 alt: Python map() Method
---

## What is the python map() method?

The map() method will return a map object of each item in an iterable. For example, (list, tuple, etc.)

These items are sent to the map method as a parameter.

The syntax of map() method is:

```python
map(function, iterable)

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
## map() parameters

The map() method takes two parameters as an argument.

* **function** \- each item of the iterable will be passed to this function.  
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
* **iterable** \- A sequence or iterable object which is to be mapped.

Let's see some examples of the map() method in python.

### Example 1: Working of the Python map() Method?

```python
def myfunc(a, b):
  return a + b

x = map(myfunc, ('Tata', 'BMW', 'Audi'), ('Volkswagen', 'Porsche', 'Ford'))
print(x)

```

The output will be as follows.

```python
<map object at 0x7fe0c0e9e4f0>

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
Since map() expects a method to be passed in, lambda methods are commonly used while working with map() methods.

A lambda method is a short method without a name. Visit this page to learn more about Python lambda methods.

### Example 2: How to use the lambda method with map()?

```python
numbers = (1, 2, 3, 4)
result = map(lambda x: x*x, numbers)
print(result)

# converting map object to set
numbersSquare = set(result)
print(numbersSquare)

```

The output will be as follows.

```python
<map 0x7fafc21ccb00>
{16, 1, 4, 9}

```

## Rules of map() method

* The map() method applies a given method to each item of an iterable and returns a list of the results.  
    
* The returned value from the map() (map object) can then be passed to methods like list() (to create a list), set() (to create a set), and so on.