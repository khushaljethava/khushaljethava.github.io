---
title: Python Dictionary update()
description: In python dictionaries, the update() method is used to insert the specified key-value pairs to the dictionary from another dictionary or from an iterable.
date: 2025-01-18 21:56:01 +0800
categories: [Python Dictionary Reference]
tags: [Python Dictionary Reference]
image:
 path: /commons/Python Dictionary update().png
 alt: Python Dictionary update()
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
<script type="text/javascript" src="https://www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
The syntax of update() is:

```python
dictionary.update(object)

```

## update() Parameters

The update() method takes only one parameter as an argument:

* **object** \- Either a dictionary, iterable, or an object of key/value pairs.

Let’s see an example of the update() method in the dictionary.

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
### 

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
### Example 1: How to use the update() method on python dictionary?

```python
car = {"brand": "Ford", "model": "Mustang", "year": 1964}

car.update({"color": "White"})

print(car)

```

Output:

```python
{'brand': 'Ford', 'model': 'Mustang', 'year': 1964, 'color': 'White'}

```

## Rules of update()

* If the update method passed without any value it would return None.  
* It will only take values in key /value pairs.