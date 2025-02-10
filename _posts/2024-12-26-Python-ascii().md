---
title: Python ascii() Method
description: In this tutorial we will learn about the python ascii() method and its uses.
date: 2024-12-26 21:11:00 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python ascii() Method.png
  alt: Python ascii() Method

---


The ascii() method will return a readable version of a string containing a printable representation of an object.

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
The ascii() method will replace non-ASCII like å with escape characters like \\x and \\u.

The syntax of ascii() is as follows.

```python
ascii(object)
```

## Python ascii() Parameter

The ascii() method will have a single parameter as an object like String, List, Tuple, Dictionary, etc.

Let's see some examples of ascii() method.

Example 1: How to use ascii() method in the list.

```python
my_list = ['Pythön','¥',2,'ASCII']

print(ascii(my_list))
```

Output:

```python
['Pyth\xf6n', '\xa5', 2, 'ASCII']
```

Example 2: using ascii() method with strings.

```python
my_string = "µ"
print(ascii(my_string))

my_string = "Pythön is Awësome"
print(ascii(my_string))
```
The output will be as follow:

```python
'\xb5'
'Pyth\xf6n is Aw\xebsome'
```

As you can see, all the non-ascii values are replaced by escape characters.

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
## Rules of ascii() method

* It will return a readable string representation of an object.  
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
* It will not return anything when we use an integer as an object.

