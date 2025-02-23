---
title: Python tuple()
description: The tuple() is a built-in function of python that is used to create a tuple in python.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python tuple().png
 alt: Python tuple()
---

Tuples are immutable sequences  and you can learn more about tuples from here.

The syntax of tuple() function is:

```python
tuple(iterable)

```

## tuple() Parameters

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
The tuple() function takes only one parameter as argument.

* iterable (Optional) \- an iterable or collection of items like list, set, dictionary , etc.


  
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
Lets an example of tuple() function in python:

### Example 1: How to use tuple() function in python?

```python
tuple1 = tuple()
print(tuple1)

# creating a tuple from a list
tuple2 = tuple([1, 4, 6])
print(tuple2)

# creating a tuple from a string
tuple3 = tuple('Python')
print(tuple3)

# creating a tuple from a dictionary
tuple4 = tuple({1: 'one', 2: 'two'})
print(tuple4)

```

Output:

```python
()
(1, 4, 6)
('P', 'y', 't', 'h', 'o', 'n')
(1, 2)

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
## Rules of tuple()

* It will only return when only an iterable is passed.  
* It will return an empty tuple when passed with no parameters.