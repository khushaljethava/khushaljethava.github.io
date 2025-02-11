---
title: Python Set discard() Method 
description: In this tutorial, we will understand about the python set discard() method and its uses.
date: 2025-01-24 22:02:00 +0800
categories: [Python Set Reference]
tags: [Python Set Reference]
image:
  path: /commons/Python Set discard() Method.png
  alt: Python Set discard() Method 

---

The Python set discard() method removes a specified element from a set if it exists. Unlike remove(), discard() doesn't raise a KeyError if the element is not found in the set. This makes it safer when you're not sure if an element exists.

The syntax of the discard() method is:

```python
set.discard(element)
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
## Python set discard() Parameters

The discard() method takes one parameter:

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
* **element:** The item to be removed from the set. Can be of any type that's hashable.

Here are examples demonstrating the discard() method:

```python
# Example 1: Basic usage
numbers = {1, 2, 3, 4, 5}
numbers.discard(3)
print(numbers)  # Output: {1, 2, 4, 5}

# Example 2: Discarding non-existent element
fruits = {'apple', 'banana', 'orange'}
fruits.discard('grape')  # No error raised
print(fruits)  # Output: {'apple', 'banana', 'orange'}

# Example 3: Discarding different types
mixed_set = {1, 'hello', (1, 2)}
mixed_set.discard((1, 2))
print(mixed_set)  # Output: {1, 'hello'}
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
The discard() method is particularly useful in situations where you want to remove elements without checking their existence first.