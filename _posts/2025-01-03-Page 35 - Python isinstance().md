---
title: Python isinstance() method
description: The python isinstance() method returns True if the specified object is an instance or subclass; otherwise, it will return False.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python isinstance() method.png
 alt: Python isinstance() method
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
The syntax of isinstance() is:

```python
isinstance(object, class)

```

## isinstance() Parameters

isinstance() method takes two parameters as arguments:

* **object** \- Name of the object to be checked  
* **class** \- Type of the class.

Let us see some examples of the python isinstance() method.

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
### Example 1: How to use the isinstance() method in python?

```python
class Foo:
  a = 5
  
fooInstance = Foo()

print(isinstance(fooInstance, Foo))
print(isinstance(fooInstance, (list, tuple)))
print(isinstance(fooInstance, (list, tuple, Foo)))

```

The Output will be as follows:

```python
True
False
True

```

## Rules of isinstance()

* True if the object is an instance or subclass of a class or any element of the tuple, False otherwise.  
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
* If classinfo is not a type or tuple of types, a TypeError exception is raised.