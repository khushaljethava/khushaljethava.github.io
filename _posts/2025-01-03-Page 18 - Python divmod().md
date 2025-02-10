---
title: Python divmod() Method
description: In this tutorial we will learn about the python divmod() method and how to use it.
date: 2025-01-03 22:15:55 +0800
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
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python divmod() Method.png
 alt: Python divmod() Method
---

## 

## What is Python divmod() Method?

The divmod() method takes two numbers and returns a pair of numbers inside a tuple consisting of their quotient and remainder.

The syntax of divmod() is:

```python
divmod(x,y)

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
## divmod() Parameters 

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
divmod() takes two parameters:  
x \- a non-complex number that can be referred to as a numerator.  
y \- a non-complex number that can be referred to as denominator

Let see an example of divmod() method.

### Example: How divmod() works in python?

```python
print('divmod(1, 3) = ', divmod(1, 3))
print('divmod(5, 8) = ', divmod(5, 8))
print('divmod(4, 4) = ', divmod(4, 4))

# divmod() with Floats
print('divmod(4.0, 3) = ', divmod(4.0, 3))
print('divmod(7, 9.0) = ', divmod(7, 9.0))
print('divmod(2.6, 0.5) = ', divmod(2.6, 0.5))

```

The output will be as follows.

```python
divmod(1, 3) =  (0, 1)
divmod(5, 8) =  (0, 5)
divmod(4, 4) =  (1, 0)
divmod(4.0, 3) =  (1.0, 1.0)
divmod(7, 9.0) =  (0.0, 7.0)
divmod(2.6, 0.5) =  (5.0, 0.10000000000000009)

```

## Rules of divmod()

(q, r) \- a pair of numbers will be a tuple consisting of quotient q and a remainder r.

If x and y are integers, the return values from divmod() is same as (a //b , x % y).