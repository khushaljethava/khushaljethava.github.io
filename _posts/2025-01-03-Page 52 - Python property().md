---
title: Python property()
description: The property() is a built-in python function that is used to define specific properties in the python class.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python property().png
 alt: Python property()
---

The syntax of property()  is:

```python
property(fget=None, fset=None, fdel=None, doc=None)

```

## property() Parameters 

The property() takes multiple optional parameters:

* fget (optional) \- To get the attribute value. Defaults are None.  
* fset (optional) \- For setting up the attribute value. Defaults are None.  
* fdel (optional) \- For deleting the attribute’s value.Defaults are None.  
* doc (optional) \- A string representation that contains the documentation for the attribute. For example a docstring )

### Example 1: How to use property() function in python?

```python
# Python program to explain property() function

# Alphabet class
class Alphabet:
	def __init__(self, value):
		self._value = value
		
	# getting the values
	def getValue(self):
		print('Getting value')
		return self._value
		
	# setting the values
	def setValue(self, value):
		print('Setting value to ' + value)
		self._value = value
		
	# deleting the values
	def delValue(self):
		print('Deleting value')
		del self._value
	
	value = property(getValue, setValue, delValue, )

# passing the value
x = Alphabet('PythonScholar')
print(x.value)

x.value = 'Python'

del x.value

```

Output:

```python
Getting value
PythonScholar
Setting value to Python
Deleting value

```

## Rules of property()

* If no arguments are given, property() returns a base property attribute that doesn't contain any getter, setter or deleter.  
* If doc isn't provided, property() takes the docstring of the getter function.