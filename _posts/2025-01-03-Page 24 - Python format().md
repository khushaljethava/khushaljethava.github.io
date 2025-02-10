<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 300,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
---
title: Python format() Method
description: In this tutorial , we will learn about python format() method and its uses.
date: 2025-01-03 22:15:55 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python format() Method.png
 alt: Python format() Method
---

## What is python format() method?

<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 300,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
The format() is a built-in pythonmethod that returns a formatted representation of the specified value.

The syntax of format() is:

```python
format(value1, value2)

```

## format() Parameters

The format()methods takes single parameters but multiple arguments:

* **values** \- one or more values that needed to be formatted.

## format() Placeholders

The placeholders can be identified using names indexes {value}, numbered indexes like {0} , {1},etc. Or even empty {} placeholder.

Let's check a simple example of the format()method.

### Example 1: Simple formatting using format() method.

```python
my_string = "Python"

print("We are learning {} from Pythonscholar.com".format("Python"))

print("We are learning {} from Pythonscholar.com".format(my_string))

print("We are learning {1} from {0}".format("Pythonscholar.com","Python"))

```

Output:

```python
We are learning Python from Pythonscholar.com
We are learning Python from Pythonscholar.com
We are learning Python from Pythonscholar.com

```

## Formatting Specifiers

format() method also supports different types for formatting specifiers that helps to manipulate the results.

| :\< | Result will be aligned left |
| :---- | :---- |
| :\> | Result will be aligned right |
| :^ | Result will be aligned center |
| := | Places the sign to the left most position |
| :+ | Use a plus sign to indicate if the result is positive or negative |
| :- | Use a minus sign for negative values only |
| : | Use a space to insert an extra space before positive numbers (and a minus sign before negative numbers) |
| :, | Use a comma as a thousand separator |
| :\_ | Use a underscore as a thousand separator |
| :b | Binary format |
| :c | Converts the value into the corresponding unicode character |
| :d | Decimal format |
| :e | Scientific format, with a lowercase e |
| :E | Scientific format, with an uppercase E |
| :f | Fix point number format |
| :F | Fix point number format, in uppercase format (show inf and nan as INF and NAN) |
| :g | General format |
| :G | General format (using a upper case E for scientific notations) |
| :o | Octal format |
| :x | Hex format, lower case |
| :X | Hex format, upper case |
| :n | Number format |
<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 300,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
| :% | Percentage format |

### Example 2: Using format specifiers with format() method.

```python
print("The value is : {:x}".format(500))
print("The value is : {:%}".format(0.80))
print("The value is: {:5}".format(40))

```

Output:

```python
The value is : 1f4
The value is : 80.000000%
The value is:    40

```

## Rules of format()

There are no such rules to follow in the format() method.