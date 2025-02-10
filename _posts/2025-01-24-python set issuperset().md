---
title: Python Set issuperset() Method 
description: In this tutorial, we will understand about the python set issuperset() method and its uses.
date: 2025-01-24 22:02:00 +0800
categories: [Python Set Reference]
tags: [Python Set Reference]
image:
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
  path: /commons/Python Set issuperset() Method.png
  alt: Python Set issuperset() Method 

---

The Python set issuperset() method returns True if a set contains all elements of another set, and False otherwise. It can also be written using the >= operator.

The syntax of the issuperset() method is:

```python
set.issuperset(set2)
# or
set1 >= set2
```

## Python set issuperset() Parameters

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
The issuperset() method takes one parameter:

* **set2:** Another set or iterable to check if the original set is its superset.

Here are examples demonstrating the issuperset() method:

```python
# Example 1: Basic superset check
set1 = {1, 2, 3, 4, 5}
set2 = {2, 3, 4}
result = set1.issuperset(set2)
print(result)  # Output: True

# Example 2: Using operator syntax
numbers1 = {1, 2, 3}
numbers2 = {1, 2}
result = numbers1 >= numbers2
print(result)  # Output: True

# Example 3: Equal sets are supersets
set1 = {1, 2, 3}
set2 = {1, 2, 3}
result = set1.issuperset(set2)
print(result)  # Output: True
```

The issuperset() method is useful for checking if one set contains another set entirely.