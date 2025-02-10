---
title: Python repr()
description: The repr() function will return the printable representation of all information regarding the given object.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python repr().png
 alt: Python repr()
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
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
The syntax of repr() is:

```python
repr(object_name)

```

## repr() Parameters

The repr() function only take one parameter as an argument:

* **object\_name** \- the name of the object whose information has to be returned.

Let's check some examples of the python repr() function.

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
### Example 1: How to use the repr() function in python?

```python
object_name = "Python"

print(repr(object_name))

```

Output:

```python
'Python'

```

In the above program, we assign a value “Python” to the object\_name variable. Then the repr() function returns “Python” or ‘Python’ inside double-quotes.

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
## Rules of repr()

* repr() will return a string representing a given object; if the integer is given, it will return it as a string.