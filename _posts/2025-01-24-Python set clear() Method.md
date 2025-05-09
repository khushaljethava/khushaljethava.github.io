---
title: Python Set clear() Method 
description: In this tutorial, we will understand about the python set clear() method and its uses.
date: 2025-01-24 22:02:00 +0800
categories: [Python Set Reference]
tags: [Python Set Reference]
image:
  path: /commons/Python Set clear() Method.png
  alt: Python Set clear() Method 

---

The Python set clear() method removes all elements from a set, making it empty. This method modifies the set in place and doesn't return any value. Once cleared, the set still exists but contains no elements.

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
The syntax of the clear() method is:

```python
set.clear()
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
## Python set clear() Parameters

The clear() method doesn't take any parameters. It simply removes all elements from the set, regardless of their type or value.

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
Since sets are mutable, the clear() method modifies the original set rather than creating a new empty set. This is memory efficient when you need to empty a large set.

Let's explore some examples to understand how the clear() method works:

```python
# Example 1: Clearing a simple set
numbers = {1, 2, 3, 4, 5}
numbers.clear()
print(numbers)  # Output: set()

# Example 2: Clearing a set with mixed types
mixed_set = {1, 'hello', (2, 3), 3.14}
mixed_set.clear()
print(mixed_set)  # Output: set()

# Example 3: Difference between clear() and reassignment
set1 = {1, 2, 3}
set2 = set1
set1.clear()
print(set1)  # Output: set()
print(set2)  # Output: set()
```

Note that using clear() is different from assigning an empty set. When you clear a set, all references to that set will see the change, while reassignment only affects the reassigned variable.