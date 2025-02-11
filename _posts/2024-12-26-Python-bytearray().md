---
title: Python bytearray() Method
description: In this tutorial, we will learn about python bytearray() and its uses.
date: 2024-12-26 21:22:00 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python bytearray() Method.png
  alt: Python bytearray() Method

---

The bytearray() method will return a form of bytearray object, an array of given objects, or create an empty bytearray object of the specified size.

bytearray() method returns a bytearray object which is  a sequence of mutable(which can be modified) integers in the range  0 \<= x \<256.

The syntax of bytearray() method is:

```python
bytearray([source, encoding, errors)
```
## Python bytearray() Parameters

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
bytearray() takes three optional parameters:

* **source (Optional) \-** A source to Initialize the array of bytes.  
* **encoding (Optional) \-** Encoding of the string when the source is a string.  
* **errors (Optional) \-** if the source is a string, it will take a specific action when encoding fails.

Let's see some examples of the bytearray() method in python.

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
Example 1: Using bytearray() with an integer.

```python
number = 4

print(bytearray(number))
```

Output:

```python
bytearray(b'\x00\x00\x00\x00')
```

Example 2: using bytearray() with a string.

```python
string = "Python is Awesome."

# encoding the string with unicode 8
array = bytearray(string,'utf-8')
print(array)

# encoding the string with unicode 16
array = bytearray(string,'utf-16')
print(array)
```
The output will be as follows.

```python
bytearray(b'Python is Awesome.')
bytearray(b'\xff\xfeP\x00y\x00t\x00h\x00o\x00n\x00 \x00i\x00s\x00 \x00A\x00w\x00e\x00s\x00o\x00m\x00e\x00.\x00')
```

Example 3:  Using bytearray() with an iterable list.

```python
my_list = [1,2,3,4,5]

print(bytearray(my_list))
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
Output:

```python
bytearray(b'\x01\x02\x03\x04\x05')
```

## Rules of bytearray()

* It will return an array of bytes of the given size and initialization value.  
* If it is an integer, it will create an empty bytearray object of the specified size.