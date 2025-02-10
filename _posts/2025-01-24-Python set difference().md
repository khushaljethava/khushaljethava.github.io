---
title: Python Set difference() Method 
description: In this tutorial, we will understand about the python set difference() method and its uses.
date: 2025-01-24 22:02:00 +0800
categories: [Python Set Reference]
tags: [Python Set Reference]
image:
  path: /commons/Python Set difference() Method.png
  alt: Python Set difference() Method 

---

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
The Python set difference() method returns a new set containing elements that exist in the first set but not in the second set. It can also be written using the minus operator (-). The original sets remain unchanged.

The syntax of the difference() method is:

```python
set.difference(set2)
# or
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
set1 - set2
```

## Python set difference() Parameters

The difference() method takes one parameter:

* **set2:** Another set, or any iterable (list, tuple, etc.) whose elements will be removed from the first set.

Here are examples demonstrating the difference() method:

```python
# Example 1: Basic set difference
set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7, 8}
result = set1.difference(set2)
print(result)  # Output: {1, 2, 3}

# Example 2: Using operator syntax
numbers1 = {1, 2, 3, 4}
numbers2 = {3, 4, 5, 6}
result = numbers1 - numbers2
print(result)  # Output: {1, 2}

# Example 3: Multiple set difference
set1 = {1, 2, 3, 4}
set2 = {2, 4}
set3 = {3}
result = set1.difference(set2, set3)
print(result)  # Output: {1}
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
The difference() method is particularly useful when you need to find elements that are unique to one set.