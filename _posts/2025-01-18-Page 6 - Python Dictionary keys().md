---
title: Python Dictionary keys()
description: In python dictionary, the key() method will return a view object as a list that contains the keys of the specified dictionary.
date: 2025-01-18 21:38:03 +0800
categories: [Python Dictionary Reference]
tags: [Python Dictionary Reference]
image:
 path: /commons/Python Dictionary keys().png
 alt: Python Dictionary keys()
---

The syntax of keys() is:

```python
dictionary.keys()

```

## keys() Parameters

The keys() method does not take any parameters as arguments.

Let see an example of the keys() method.

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
### Example 1: How to use the keys() method in a python dictionary?

```python
cars = {"BMW" : 1,"TOYOTA" : 2,"TATA" : 3}
print(cars.keys())
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
Output:

```python
dict_keys(['BMW', 'TOYOTA', 'TATA'])

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
The keys() method will return an empty list when an empty dictionary is passed and when any changes are done in the dictionary, the view object will also reflect these changes when passed.

## Rules of keys()

There are no such rules for keys() method.