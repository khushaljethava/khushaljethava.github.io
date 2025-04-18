---
title: Python set()
description: The set() function in python helps to create a python set object.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python set().png
 alt: Python set()
---

The syntax of set() function is:

```python
set(iterable)

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
## set() Parameters

set() takes only one parameter as an argument:

* **iterable (optional)** \- an iterable object can be a sequence or collection of objects. (Like list, string tuple, dictionary etc.)

Let see some examples of the set() in python.

### Example 1:  How to use the set() function in python?

```python
# empty set
print(set())

# from string
print(set('Python'))

# from tuple
print(set((1,2,3,4,5)))

# from list
print(set(['a', 'e', 'i', 'o', 'u']))

# from range
print(set(range(5)))

```

Output:

```python
set()
{'y', 'P', 't', 'o', 'h', 'n'}
{1, 2, 3, 4, 5}
{'i', 'e', 'o', 'a', 'u'}
{0, 1, 2, 3, 4}

```

Here we are converting a string, tuple, list and range into a set using the set() function, and as the set is an unordered sequence, we are getting output according to it. Also, note that when creating an empty set, you must use the set() function and if your building an empty set using { } syntax, it will create a dictionary, not a set.

### Example 2: How to use a set() function with dictionary and frozenset in python?

```python
# from dictionary
print(set({'a':1, 'e': 2, 'i':3, 'o':4, 'u':5}))

# from frozen set
frozen_set = frozenset(('a', 'e', 'i', 'o', 'u'))
print(set(frozen_set))

```

Output

```python
{'i', 'a', 'u', 'o', 'e'}
{'i', 'a', 'u', 'o', 'e'}

```

## Rules of the set()

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
* A set() function will take only an iterable object as a parameter.  
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
* An empty set can be created with no parameter if passed.