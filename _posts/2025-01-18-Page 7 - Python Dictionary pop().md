---
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
title: Python Dictionary pop()
description: In the python dictionary, the pop() method removes a specific item from the dictionary and returns the value of the given item.
date: 2025-01-18 21:38:03 +0800
categories: [Python Dictionary Reference]
tags: [Python Dictionary Reference]
image:
 path: /commons/Python Dictionary pop().png
 alt: Python Dictionary pop()
---

The syntax of pop() is:

```python
dictionary.pop(key, default)

```
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

## pop() Parameters 

The pop() method takes two parameters as arguments.

* key \- name of the key that is to be removed.  
* default (Optional) \- A value that returns when a given key does not exist.

Let's see some examples of the pop() method in the python dictionary.

### Example 1: How to use the pop() method on dictionaries?

```python
cars = { 1 : "BMW", 2 : "TOYOTA", 3 : "TATA"}

print("The popped item is :", cars.pop(2))

print("The new Dictionary is :",cars)

```
Output : 

```python
The popped item is : TOYOTA
The new Dictionary is : {1: 'BMW', 3: 'TATA'}

```

when we try to remove an item which is not present in the dictionary it will return an KeyError exception.

### Example 2: Removing items that are not present in the dictionary?

```python
cars = {"BMW" : 1,"TOYOTA" : 2,"TATA" : 3}

print("The popped item is :", cars.pop("AUDI"))

print("The new Dictionary is :",cars)

```

Output

```python
Traceback (most recent call last):
  File "", line 3, in <module>
    print("The popped item is :", cars.pop("AUDI"))
KeyError: 'AUDI'

```

## Rules of pop()
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

* If key is found \- removed/popped element from the dictionary  
* If key is not found \- value specified as the second argument (default)  
* If key is not found and default argument is not specified \- KeyError exception is raised