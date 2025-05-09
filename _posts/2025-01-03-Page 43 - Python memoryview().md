---
title: Python memoryview() Method
description: The memoryview() is a built-in python method that returns a memory allocated by the specified object .
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python memoryview() Method.png
 alt: Python memoryview() Method
---

All the objects in python require storage space at the runtime and memoryview() method will return how much storage passed object will take.

The syntax of memoryview() is:

```python
memoryview(object)

```

## Python memoryview() Parameters

The memoryview() method takes only one parameter as argument:

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
* object \- An object that is exposed using bytes or bytearray.


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
### Example 1: How to use memoryview() in python?

```python
x = memoryview(b"Hello")

print(x)

#return the Unicode of the first character
print(x[0])

#return the Unicode of the second character
print(x[1])

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
<memory at 0x7f9efbddadc0>
72
101

```

## Rules of memoryview() 

* Passed object must be whose internal data is to be exposed