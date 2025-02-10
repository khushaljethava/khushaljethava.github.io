---
title: Python Set intersection() Method 
description: In this tutorial, we will understand about the python set intersection() method and its uses.
date: 2025-01-24 22:02:00 +0800
categories: [Python Set Reference]
tags: [Python Set Reference]
image:
  path: /commons/Python Set intersection() Method.png
  alt: Python Set intersection() Method 

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
---

The Python set intersection() method returns a new set containing elements that are common to both sets. It can also be written using the ampersand operator (&). The original sets remain unchanged.

The syntax of the intersection() method is:

```python
set.intersection(set2)
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
set1 & set2
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
## Python set intersection() Parameters

The intersection() method takes one parameter:

* **set2:** Another set, or any iterable whose common elements will be found.

Here are examples demonstrating the intersection() method:

```python
# Example 1: Basic intersection
set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7, 8}
result = set1.intersection(set2)
print(result)  # Output: {4, 5}

# Example 2: Using operator syntax
numbers1 = {1, 2, 3, 4}
numbers2 = {3, 4, 5, 6}
result = numbers1 & numbers2
print(result)  # Output: {3, 4}

# Example 3: Multiple set intersection
set1 = {1, 2, 3, 4}
set2 = {2, 3, 4, 5}
set3 = {3, 4, 5, 6}
result = set1.intersection(set2, set3)
print(result)  # Output: {3, 4}
```

The intersection() method is useful when you need to find common elements between sets.