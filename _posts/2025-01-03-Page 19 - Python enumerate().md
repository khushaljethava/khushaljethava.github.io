---
title: Python enumerate() Method
description: In this tutorial we will learn about python enumerate() method and its uses.
date: 2025-01-03 22:15:55 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python enumerate() Method.png
 alt: Python enumerate() Method
---

The enumerate() method adds a counter to an iterable and returns its enumerated object.

The syntax of enumerate() is:

```python
enumerate(iterable, start=0)

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
## enumerate() Parameters

enumerate() method takes two parameters:
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

iterable \- A sequence, an iterator, or an object that supports iteration.

start \- Starts counting from this number. If start is omitted, 0 is taken as a start. This is an Optional.

Let's check some examples of python enumerate().

### Example 1: How enumerate() works in python?

```python
cars = ['BMW','Audi','Toyota']
enumerateCars = enumerate(cars)

print(type(enumerateCars))

print(list(enumerateCars))

# changing the default counter

enumerateCars = enumerate(cars, 10)
print(list(enumerateCars))

```
The output will be as follows.

```python
<class 'enumerate'>
[(0, 'BMW'), (1, 'Audi'), (2, 'Toyota')]
[(10, 'BMW'), (11, 'Audi'), (12, 'Toyota')]

```

### 

### Example 2: Looping with an Enumerate object.

```python
cars = ['BMW','Audi','Toyota']

for item in enumerate(cars):
    print(item)

```

Output:

```python
(0, 'BMW')
(1, 'Audi')
(2, 'Toyota')

```

## Rules of enumerate()

The enumerate() method takes a collection(e.g. a list) and returns it as an enumerate object.
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

The enumerate() method adds a counter as the key of the enumerate object.