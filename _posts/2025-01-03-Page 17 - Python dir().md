---
title: Python dir() Method
description: In this tutorial we will learn about the python dir() method and its uses.
date: 2025-01-03 22:15:55 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python dir() Method.png
 alt: Python dir() Method
---

The dir() function returns a list of valid attributes of the specific object.

The syntax of dir() is:

```python
dir([object])
```

## Python dir() Method Parameters

dir() takes only a single parameter.

object \- the dir() function attempts to return all attributes of a specific object. It is optional.

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
Let check some example on the usage of dir() function.

### Example 1: How dir() works?

```python
number = [5,6,7]
print(dir(number))

```

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
Output will be as follow:

```python
['__add__', '__class__', '__contains__', '__delattr__', '__delitem__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getitem__', '__gt__', '__hash__', '__iadd__', '__imul__', '__init__', '__init_subclass__', '__iter__', '__le__', '__len__', '__lt__', '__mul__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__reversed__', '__rmul__', '__setattr__', '__setitem__', '__sizeof__', '__str__', '__subclasshook__', 'append', 'clear', 'copy', 'count', 'extend', 'index', 'insert', 'pop', 'remove', 'reverse', 'sort']

```

### 

### Example 2: How to use dir() on User-defined Objects.

```python
class Dog:
    def __dir__(self):
        return['age','color','bread']

dogType = Dog()
print(dir(dogType))

```

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
The output will be as follows.

```python
['age', 'bread', 'color']

```

## Rules of dir() function

dir() function tries to return a list of valid attributes of the object.

If the object has \_\_dir\_\_() method, the method will be called and must return the list of attributes.

If the object doesn't have \_\_dir\_\_() method, this method tries to find information from the \_\_dict\_\_ attribute (if defined) and type object. In this case, the list returned from dir() may not be complete.

If an object is not passed to the dir() method, it returns the list of names in the current local scope.