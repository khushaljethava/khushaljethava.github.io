---
title: Python Set difference_update() Method 
description: In this tutorial, we will understand about the python set difference_update() method and its uses.
date: 2025-01-24 22:02:00 +0800
categories: [Python Set Reference]
tags: [Python Set Reference]
image:
  path: /commons/Python Set difference_update() Method.png
  alt: Python Set difference_update() Method 

---

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
The Python set difference_update() method removes all elements of another set from this set. Unlike difference(), this method modifies the original set in place rather than returning a new set. The method returns None.

The syntax of the difference_update() method is:

```python
set.difference_update(set2)
# or
set1 -= set2
```

## Python set difference_update() Parameters

The difference_update() method takes one parameter:

* **set2:** Another set or iterable whose elements will be removed from the original set.

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
Let's see some examples of how difference_update() works:

```python
# Example 1: Basic difference_update
set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7}
set1.difference_update(set2)
print(set1)  # Output: {1, 2, 3}

# Example 2: Using operator syntax
numbers1 = {1, 2, 3, 4}
numbers2 = {3, 4, 5}
numbers1 -= numbers2
print(numbers1)  # Output: {1, 2}

# Example 3: Multiple set difference_update
set1 = {1, 2, 3, 4, 5}
set2 = {2, 4}
set3 = {3}
set1.difference_update(set2, set3)
print(set1)  # Output: {1, 5}
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
This method is memory-efficient when you need to remove elements from a large set.