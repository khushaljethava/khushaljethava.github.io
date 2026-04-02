---
title: Python property()
description: The property() is a built-in python function that is used to define specific properties in the python class.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python property().webp
  alt: Python property()
---

The Python `property()` built-in function creates and returns a property object that manages attribute access on a class. It accepts up to four optional parameters: `fget` (a function for getting the attribute), `fset` (a function for setting it), `fdel` (a function for deleting it), and `doc` (a docstring for the property). The function returns a property descriptor that intercepts attribute access, enabling you to define getter, setter, and deleter logic while maintaining a clean attribute-style syntax for class users. This is a cornerstone of Python's object-oriented design, allowing classes to enforce validation rules, compute derived values on the fly, trigger side effects on attribute changes, and maintain backward compatibility when refactoring public attributes into managed properties. In modern Python, `property()` is most commonly used as a decorator (`@property`), but the function form remains useful when building properties programmatically or when getter, setter, and deleter functions are defined separately.

## What does property() return?

The `property()` function returns a property attribute object that delegates attribute access to the specified getter, setter, and deleter functions, enabling managed attribute behavior on class instances.

## When should you use property()?

Use `property()` when you want to add validation, computation, or side effects to attribute access on a class while preserving a simple `obj.attribute` syntax for callers, or when you need to refactor a plain attribute into a managed property without breaking existing code.

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


## Common Use Cases

Input validation on attribute assignment is one of the most important applications of `property()`. By defining a setter that checks whether the value meets specific constraints, such as ensuring an age is a positive integer or a name is non-empty, you can enforce data integrity directly within the class rather than relying on external validation.

Computing derived attributes on the fly is another common pattern. For example, a `Rectangle` class can expose an `area` property that multiplies width and height each time it is accessed, ensuring the value is always up to date without requiring the caller to invoke a method explicitly.

Maintaining backward compatibility during refactoring is a more subtle but powerful use case. When a public attribute needs to be replaced with computed logic, such as adding logging when a value is read or converting units on the fly, wrapping it in a `property()` preserves the existing `obj.attribute` interface while adding the new behavior behind the scenes.

For getting and setting attributes dynamically by name, see the [Python getattr()](/posts/Page-26-Python-getattr/) and [Python setattr()](/posts/Page-58-Python-setattr/) functions, which complement `property()` for reflective programming patterns.

## Rules of property()

* If no arguments are given, property() returns a base property attribute that doesn't contain any getter, setter or deleter.  
* If doc isn't provided, property() takes the docstring of the getter function.