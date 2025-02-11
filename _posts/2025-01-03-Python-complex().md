---
title: Python complex() Method
description: In this tutorial we will learn about the python complex() method and its uses.
date: 2025-01-03 23:24:00 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python complex() Method.png
  alt: Python complex() Method

---

The complex() method returns a complex number when real and imaginary parts are given and converts a string to a complex number.

<script type="text/javascript">
	atOptions = {
		'key' : '98858c4e91885e00ea9926beee01c03e',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
The syntax of complex() is:

```python
complex([real[, img]])
```

## Python complex() Method  Parameters

<script type="text/javascript">
	atOptions = {
		'key' : '98858c4e91885e00ea9926beee01c03e',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
The complex() method takes two parameters:

**real** \- if real is omitted, it will take default as 0\. real part.  
**img** \- if img is omitted, it will take default as 0\. Imaginary part.

If the first parameter is passed as a string to this method, it will be interpreted as a complex number. In this case, it should not pass the second parameter.

Let’s check examples of complex() methods.

### Example 1: How to use a complex() method is a method.

This method will see how we can create a complex number using the complex() method.

```python
X = complex(4,-1)
print(X)

X = complex(2)
print(X)

X = complex()
print(X)

X = complex('4-7j')
print(X)
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
<script type="text/javascript" src="//www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
 The output will be as follow:

```python
(4-1j)
(2+0j)
0j
(4-7j)
```
## Rules of complex()

As the name suggests by the name, the complex() method returns a complex number.

If the string is passed to this method, which is not a valid complex number, the ValueError exception will be raised.

