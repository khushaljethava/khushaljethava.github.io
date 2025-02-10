---
title: Python Set intersection_update() Method 
description: In this tutorial, we will understand about the python set intersection_update() method and its uses.
date: 2025-01-24 22:02:00 +0800
categories: [Python Set Reference]
tags: [Python Set Reference]
image:
  path: /commons/Python Set intersection_update() Method.png
  alt: Python Set intersection_update() Method 

---

The Python set intersection_update() method modifies the original set by keeping only elements found in both sets. Unlike intersection(), this method updates the set in place and returns None. It can also be written using the &= operator.

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
The syntax of the intersection_update() method is:

```python
set.intersection_update(set2)
# or
set1 &= set2
```

## Python set intersection_update() Parameters

The intersection_update() method takes one parameter:

* **set2:** Another set or iterable whose common elements will be retained in the original set.

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
Let's explore some examples:

```python
# Example 1: Basic intersection_update
set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7, 8}
set1.intersection_update(set2)
print(set1)  # Output: {4, 5}

# Example 2: Using operator syntax
numbers1 = {1, 2, 3, 4}
numbers2 = {3, 4, 5, 6}
numbers1 &= numbers2
print(numbers1)  # Output: {3, 4}

# Example 3: Multiple set intersection_update
set1 = {1, 2, 3, 4}
set2 = {2, 3, 4, 5}
set3 = {3, 4, 5, 6}
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
set1.intersection_update(set2, set3)
print(set1)  # Output: {3, 4}
```

This method is memory-efficient when working with large sets.