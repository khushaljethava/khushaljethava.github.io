---
title: Python Set isdisjoint() Method 
description: In this tutorial, we will understand about the python set isdisjoint() method and its uses.
date: 2025-01-24 22:02:00 +0800
categories: [Python Set Reference]
tags: [Python Set Reference]
image:
  path: /commons/Python Set isdisjoint() Method.png
  alt: Python Set isdisjoint() Method 

---

The Python set isdisjoint() method returns True if two sets have no elements in common, and False otherwise. Two sets are considered disjoint when their intersection is empty.

<script type="text/javascript">
	atOptions = {
		'key' : '98858c4e91885e00ea9926beee01c03e',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
The syntax of the isdisjoint() method is:

```python
set.isdisjoint(set2)
```

<script type="text/javascript">
	atOptions = {
		'key' : '98858c4e91885e00ea9926beee01c03e',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
## Python set isdisjoint() Parameters

<script type="text/javascript">
	atOptions = {
		'key' : '98858c4e91885e00ea9926beee01c03e',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
The isdisjoint() method takes one parameter:

* **set2:** Another set or iterable to check for common elements.

Here are examples demonstrating the isdisjoint() method:

```python
# Example 1: Sets with no common elements
set1 = {1, 2, 3}
set2 = {4, 5, 6}
result = set1.isdisjoint(set2)
print(result)  # Output: True

# Example 2: Sets with common elements
numbers1 = {1, 2, 3, 4}
numbers2 = {3, 4, 5, 6}
result = numbers1.isdisjoint(numbers2)
print(result)  # Output: False

# Example 3: Using with different iterables
my_set = {1, 2, 3}
my_list = [4, 5, 6]
result = my_set.isdisjoint(my_list)
print(result)  # Output: True
```

The isdisjoint() method is useful for checking if two collections have any elements in common.