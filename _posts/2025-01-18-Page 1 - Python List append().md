---
title: Python List append()
description: The append() method will add an element at the end of the list.
date: 2025-01-18 23:28:25 +0800
categories: [Python List reference]
tags: [Python List reference]
image:
 path: /commons/Python List append().png
 alt: Python List append()
---

The syntax of the append() method is:

```python
list.append(element)

```
## append() parameters

<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
The append() method only takes one argument as a parameter:

* **element** \- An element (integer, string, dictionary, or another list) to be added at the end of the list.

Let’s check some examples of the list append() method.

### Example 1: How to add an element to a list?

```python
my_cars = ["AUDI","BMW","FORD"]

# Old list is

print(my_cars)

# adding TATA to the cars list

my_cars.append("TATA")

#updating list is

print(my_cars)

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
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
The Output will  be as follow

```python
['AUDI', 'BMW', 'FORD']
['AUDI', 'BMW', 'FORD', 'TATA']

```

### Example 2: How to add a dictionary into a python list?

```python
my_cars = ["AUDI","BMW","FORD"]

new_car = {"TATA": 31}
# Old list is

print(my_cars)

# adding TATA to the cars list

my_cars.append(new_car)

#updating list is

print(my_cars)

```
The output will be as follows.

```python
['AUDI', 'BMW', 'FORD']
['AUDI', 'BMW', 'FORD', {'TATA': 31}]

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
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
## Rules of list append()

* The append() method does not return any value.  
* The append() method can insert any data types to list.(Integer, float, set, list , dictionary, etc)