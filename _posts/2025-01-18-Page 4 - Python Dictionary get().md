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
title: Python Dictionary get()
description: The get() method returns the specified value of the given key if it's present in the dictionary.
date: 2025-01-18 21:38:03 +0800
categories: [Python Dictionary Reference]
tags: [Python Dictionary Reference]
image:
 path: /commons/Python Dictionary get().png
 alt: Python Dictionary get()
---

The syntax of get() is:

```python
dictionary.get(key, value)

```

## get() Parameters

The get() method takes two parameters as argument :

* key  \- Name of the key you want to return the value from dictionary.  
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
* value (Optional) \- The value to be returned if the given key is not found in the dictionary .The default value if None.

Lets see some examples of get() method  in python dictionaries?

### Example 1: How to use get() in python dictionaries?

```python
person = {'name': 'Coco', 'age': 6}

print('Name: ', person.get('name'))
print('Age: ', person.get('age'))

# value is not provided
print('Bread: ', person.get('bread'))

# value is provided
print('Bread: ', person.get('bread', 0.0))

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
Name:  Coco
Age:  6
Bread:  None
Bread:  0.0

```