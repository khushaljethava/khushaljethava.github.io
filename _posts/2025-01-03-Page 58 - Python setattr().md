---
title: Python setattr()
description: The python setattr() functions set the specific value of the specified attribute of the object.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python setattr().png
 alt: Python setattr()
---

The syntax of the setattr() function is :

```python
setattr(object, name, value)
```

## setattr() Parameters

The setattr() functions take three parameters as argument:

<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
* **object** \- the name of the object whose attribute has to set.   
* **name** \- The name of the attribute  
<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
* **value** \- value to be assigned to the attribute.

### Example 1: How to use setattr() function in python?

```python
class Dog:
    name = 'Coco'
    
dog = Dog()
print('Before modification:', dog.name)

# setting name to 'John'
setattr(dog, 'name', 'Rick')

print('After modification:', dog.name)

```

Output:

```python
Before modification: Coco
After modification: Rick

```

## Rules of setattr()

<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
If you want to get the value of the specific attribute, we recommend getatt() function.