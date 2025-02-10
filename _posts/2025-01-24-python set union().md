---
title: Python Set union() Method 
description: In this tutorial, we will understand about the python set union() method and its uses.
date: 2025-01-24 22:02:00 +0800
categories: [Python Set Reference]
tags: [Python Set Reference]
image:
  path: /commons/Python Set union() Method.png
  alt: Python Set union() Method 

---

The Python set union() method returns a new set containing all unique elements from all sets. It can also be written using the | operator.

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
The syntax of the union() method is:

```python
set.union(set2, set3, ...)
# or
set1 | set2 | set3
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
## Python set union() Parameters

The union() method takes one or more parameters:

* **set2, set3, ...:** Other sets or iterables to combine with the original set.

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
Here are examples demonstrating the union() method:

```python
# Example 1: Basic union
set1 = {1, 2, 3}
set2 = {3, 4, 5}
result = set1.union(set2)
print(result)  # Output: {1, 2, 3, 4, 5}

# Example 2: Using operator syntax
numbers1 = {1, 2}
numbers2 = {3, 4}
numbers3 = {5, 6}
result = numbers1 | numbers2 | numbers3
print(result)  # Output: {1, 2, 3, 4, 5, 6}

# Example 3: Union with different iterables
set1 = {1, 2, 3}
list1 = [3, 4, 5]
tuple1 = (5, 6, 7)
result = set1.union(list1, tuple1)
print(result)  # Output: {1, 2, 3, 4, 5, 6, 7}
```

The union() method is useful for combining multiple sets into one.