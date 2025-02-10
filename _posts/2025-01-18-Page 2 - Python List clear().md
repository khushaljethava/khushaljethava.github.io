---
title: Python List clear()
description: In python list, the clear() method removes all the elements from the given list.
date: 2025-01-18 23:28:25 +0800
categories: [Python List reference]
tags: [Python List reference]
image:
 path: /commons/Python List clear().png
 alt: Python List clear()
---

The syntax of clear() method is:

```python
list.clear()

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
## clear() parameters

The clear method does not take any parameters as arguments.

Let see an example of the python list clear() method.

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
### Example 1: How to use clear() method on python list.

```python
my_cars = ["AUDI","BMW","FORD"]

print(my_cars)

#clearing the list using clear method

my_cars.clear()

print("List after clear method:", my_cars)

```

The output will be as follow:

```python
['AUDI', 'BMW', 'FORD']
List after clear method: []

```

## Rules of clear() 

* The clear() method does not return any value.  
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
* The clear() method only works with python 3.3 \+ versions, in python 2 and python 3.2 del method is used.