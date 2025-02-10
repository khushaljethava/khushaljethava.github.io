---
title: Python dict() Method
description: In this tutorial we will learn about the python dict() method and its uses.
date: 2025-01-03 22:15:55 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python dict() Method.png
 alt: Python dict() Method
---

<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="https://www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
The dict() method helps to create a Python dictionary.

Different forms of dict() constructors are:

```python
dict(**kwarg)
dict(mapping, **kwarg)
dict(iterable, **kwarg)
```

Note: \*\*kwarg let you take an arbitrary number of keyword arguments.

## dict() Parameters

The dict() method has no parameters.

Let's check some examples of dict() method.

<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="https://www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
### Example 1: Creating a dictionary using dict() method.

```python
numbers = dict(x=5,y=0)
print(numbers)
print(type(numbers))
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
<script type="text/javascript" src="https://www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
Output as follow:

```python
{'x': 5, 'y': 0}
<class 'dict'>
```
### Example 2: Creating an Empty dictionary using the dict() method.

```python
numbers = dict()
print(numbers)
print(type(numbers))

```

Output:

```python
{}
<class 'dict'>

```

### Example 3: Creating dictionary using Iterable

```python
# keyword argument is not passed
numbers1 = dict([('x', 5), ('y', -5)])
print('numbers1 =',numbers1)

# keyword argument is also passed
numbers2 = dict([('x', 5), ('y', -5)], z=8)
print('numbers2 =',numbers2)

# zip() creates an iterable in Python 3
numbers3 = dict(dict(zip(['x', 'y', 'z'], [1, 2, 3])))
print('numbers3 =',numbers3)

```
The output will be as follow:

```python
numbers1 = {'x': 5, 'y': -5}
numbers2 = {'x': 5, 'y': -5, 'z': 8}
numbers3 = {'x': 1, 'y': 2, 'z': 3}

```

### 

### Example 3: Create Dictionary Using Mapping

```python
numbers1 = dict({'x': 4, 'y': 5})
print('numbers1 =',numbers1)

# you don't need to use dict() in above code
numbers2 = {'x': 4, 'y': 5}
print('numbers2 =',numbers2)

# keyword argument is also passed
numbers3 = dict({'x': 4, 'y': 5}, z=8)
print('numbers3 =',numbers3)

```

When we run above from we will get the following result.

```python
numbers1 = {'x': 4, 'y': 5}
numbers2 = {'x': 4, 'y': 5}
numbers3 = {'x': 4, 'z': 8, 'y': 5}

```