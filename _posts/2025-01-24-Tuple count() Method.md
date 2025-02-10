---
title: Python Tuple count() Method
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
description: The count() method returns the number of times a specified value appears in a tuple.
date: 2025-01-24 22:02:00 +0800
categories: [Python Tuple Reference]
tags: [Python Tuple Reference]
image:
  path: /commons/Python Tuple count() Method.png
  alt: Python Tuple count()
---

The count() method is used to count how many times a specific element appears in a tuple.

The syntax of the count() method is:

```python
tuple.count(value)
```

## count() Parameters

The count() method takes only one parameter as argument.
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

* value - the element to be counted in the tuple

### Example 1: How to use count() method in python?

```python
# create a tuple
numbers = (1, 2, 3, 2, 5, 2, 6)

# count number of times 2 appears
count = numbers.count(2)
print(count)

# create a tuple of strings
fruits = ('apple', 'banana', 'apple', 'cherry')

# count number of times 'apple' appears
count = fruits.count('apple')
print(count)
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
3
2
```

## Rules of count()

* It returns 0 if the value is not found in the tuple
* The count is case-sensitive for strings
* It returns the exact count of occurrences of the specified value