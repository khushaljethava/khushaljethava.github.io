---
title: Python Set discard() Method 
description: In this tutorial, we will understand about the python set discard() method and its uses.
date: 2025-01-24 22:02:00 +0800
categories: [Python Set Reference]
tags: [Python Set Reference]
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
image:
  path: /commons/Python Set discard() Method.png
  alt: Python Set discard() Method 

---

The Python set discard() method removes a specified element from a set if it exists. Unlike remove(), discard() doesn't raise a KeyError if the element is not found in the set. This makes it safer when you're not sure if an element exists.
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

The syntax of the discard() method is:

```python
set.discard(element)
```

## Python set discard() Parameters

The discard() method takes one parameter:

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

The discard() method is particularly useful in situations where you want to remove elements without checking their existence first.