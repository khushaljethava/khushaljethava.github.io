---
title: Python Set issubset() Method 
description: In this tutorial, we will understand about the python set issubset() method and its uses.
date: 2025-01-24 22:02:00 +0800
categories: [Python Set Reference]
tags: [Python Set Reference]
image:
  path: /commons/Python Set issubset() Method.png
  alt: Python Set issubset() Method 

---

The Python set issubset() method returns True if all elements of a set are present in another set, and False otherwise. It can also be written using the <= operator.

The syntax of the issubset() method is:

```python
set.issubset(set2)
# or
set1 <= set2
```

## Python set issubset() Parameters

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
The issubset() method takes one parameter:

* **set2:** Another set or iterable to check if the original set is its subset.

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
Here are examples demonstrating the issubset() method:

```python
# Example 1: Basic subset check
set1 = {1, 2}
set2 = {1, 2, 3, 4, 5}
result = set1.issubset(set2)
print(result)  # Output: True

# Example 2: Using operator syntax
numbers1 = {1, 2, 3}
numbers2 = {1, 2}
result = numbers2 <= numbers1
print(result)  # Output: True

# Example 3: Equal sets are subsets
set1 = {1, 2, 3}
set2 = {1, 2, 3}
result = set1.issubset(set2)
print(result)  # Output: True
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
```

The issubset() method is useful for checking if one set is contained within another.