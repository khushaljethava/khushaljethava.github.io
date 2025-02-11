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
The Python set issubset() method returns True if all elements of a set are present in another set, and False otherwise. It can also be written using the <= operator.

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
The syntax of the issubset() method is:

```python
set.issubset(set2)
# or
set1 <= set2
```

## Python set issubset() Parameters

The issubset() method takes one parameter:

* **set2:** Another set or iterable to check if the original set is its subset.

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
```

The issubset() method is useful for checking if one set is contained within another.