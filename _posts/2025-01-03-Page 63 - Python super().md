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
title: Python super()
description: The super() is a built-in python function that gives access to methods and properties of a parent or sibling class object.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python super().png
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
 alt: Python super()
---

The syntax of super() function is:

```python
super()

```

## super() Parameters 

The super() function does not take any parameters.

### Example 1: How to use super() functions in python?

```python
class Parent:
  def __init__(self, txt):
    self.message = txt

  def printmessage(self):
    print(self.message)

class Child(Parent):
  def __init__(self, txt):
    super().__init__(txt)

x = Child("Hello, and welcome!")

x.printmessage()

```

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
Output:

```python
Hello, and welcome!

```