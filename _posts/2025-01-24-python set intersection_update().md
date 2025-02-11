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

The syntax of the intersection_update() method is:

```python
set.intersection_update(set2)
# or
set1 &= set2
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
<script type="text/javascript" src="https://www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
## Python set intersection_update() Parameters

The intersection_update() method takes one parameter:

* **set2:** Another set or iterable whose common elements will be retained in the original set.

<script type="text/javascript">
	atOptions = {
		'key' : '98858c4e91885e00ea9926beee01c03e',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
</script>
<script type="text/javascript" src="https://www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
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
set1.intersection_update(set2, set3)
print(set1)  # Output: {3, 4}
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
<script type="text/javascript" src="https://www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
This method is memory-efficient when working with large sets.