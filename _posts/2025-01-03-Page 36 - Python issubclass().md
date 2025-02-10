---
title: Python issubclass() Method
description: In this tutorial, we will learn about the python issubclass() method and its use with examples.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python issubclass() Method.png
 alt: Python issubclass() Method
---

## What is the Python issubclass() Method?

The python issubclass() method returns True if the specified object is an instance or subclass; otherwise, it will return False.

The syntax of issubclass() is:

```python
issubclass(object, class)

```

## Python issubclass() Method Parameters

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
issubclass() method takes two parameters as arguments:

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
* **object** \- Name of the object to be checked  
* **class** \- Type of the class.

Let’s see some examples of the python issubclass() method.

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
### Example 1: How to Use issubclass() python method?

```python
class Polygon:
  def __init__(polygonType):
    print('Polygon is a ', polygonType)

class Triangle(Polygon):
  def __init__(self):

    Polygon.__init__('triangle')
    
print(issubclass(Triangle, Polygon))
print(issubclass(Triangle, list))
print(issubclass(Triangle, (list, Polygon)))
print(issubclass(Polygon, (list, Polygon)))

```

The output will be as follow:

```python
True
False
True
True

```

## Rules of issubclass()

* True if the class is a subclass of a class or any element of the tuple, False otherwise.