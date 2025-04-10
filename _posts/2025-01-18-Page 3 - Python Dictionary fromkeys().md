---
title: Python Dictionary fromkeys()
description: The fromkeys() method returns a new dictionary with the specified  keys with specified value.
date: 2025-01-18 21:38:03 +0800
categories: [Python Dictionary Reference]
tags: [Python Dictionary Reference]
image:
 path: /commons/Python Dictionary fromkeys().png
 alt: Python Dictionary fromkeys()
---

The syntax of fromkeys() is:

```python
dictionary.fromkeys(key, value)

```

## fromkeys() Parameters 

The fromkeys() method takes two parameters as arguments.

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
* key \- an iterable or collection of items which specify the keys of the new dictionary.   
* value (Optional) \- The Values which are going to be assigned to all the elements of the dictionary. Default is None.

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
### Example 1 : How to use fromkeys() method in a python dictionary?

```python
keys ={ 1,2,3,4}

results = dict.fromkeys(keys)
print(results)

```
Output:

```python
{1: None, 2: None, 3: None, 4: None}
```

### Example 2: How to use fromkeys() method with values in python dictionary?

```python
keys ={'BWM','TOYOTA','AUDI'}
value = 'cars'

results = dict.fromkeys(keys, value)
print(results)

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
Output:

```python
{'BWM': 'cars', 'AUDI': 'cars', 'TOYOTA': 'cars'}

```