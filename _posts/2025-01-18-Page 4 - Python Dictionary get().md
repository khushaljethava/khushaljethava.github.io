---
title: Python Dictionary get()
description: The get() method returns the specified value of the given key if it's present in the dictionary.
date: 2025-01-18 21:38:03 +0800
categories: [Python Dictionary Reference]
tags: [Python Dictionary Reference]
image:
 path: /commons/Python Dictionary get().png
 alt: Python Dictionary get()
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
The syntax of get() is:

```python
dictionary.get(key, value)

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
## get() Parameters

The get() method takes two parameters as argument :

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
* key  \- Name of the key you want to return the value from dictionary.  
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

Output:

```python
Name:  Coco
Age:  6
Bread:  None
Bread:  0.0

```