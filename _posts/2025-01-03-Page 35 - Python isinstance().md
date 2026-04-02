---
title: Python isinstance() method
description: The python isinstance() method returns True if the specified object is an instance or subclass; otherwise, it will return False.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python isinstance() method.webp
  alt: Python isinstance() method
---

The Python `isinstance()` function is a built-in that checks whether an object is an instance of a specified class or a tuple of classes. It takes two required parameters: the object to check and the class (or tuple of classes) to test against. It returns `True` if the object is an instance of the class or any of its subclasses, and `False` otherwise. Unlike a direct `type()` comparison, `isinstance()` respects inheritance hierarchies, making it the preferred way to perform type checking in Python. A common real-world use case is input validation in functions that accept multiple types, such as a function that processes both lists and tuples but needs to reject strings. It is also heavily used in serialization libraries, ORMs, and API frameworks that dispatch behavior based on argument types while correctly handling subclass relationships.

## What does isinstance() return?

The `isinstance()` function returns `True` if the object is an instance of the given class or any class in the provided tuple, and `False` otherwise.

## When should you use isinstance()?

Use `isinstance()` when you need to check an object's type while respecting inheritance, which is safer and more Pythonic than comparing types directly with `type()`.

The syntax of isinstance() is:

```python
isinstance(object, class)

```

## isinstance() Parameters

isinstance() method takes two parameters as arguments:

* **object** \- Name of the object to be checked  
* **class** \- Type of the class.

Let us see some examples of the python isinstance() method.


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

## Common Use Cases

A common use of `isinstance()` is in function parameter validation, where you verify that arguments are of expected types before processing them, such as checking that a value is an `int` or `float` before performing arithmetic. Another practical scenario is in recursive data processing functions that handle nested structures differently depending on whether the current element is a `dict`, `list`, or primitive value. It is also widely used in custom `__eq__` methods, where you first check `isinstance(other, MyClass)` before comparing attributes to avoid errors when comparing objects of different types.

To check whether a class is a subclass of another class rather than checking an instance, see the [Python issubclass() method](/posts/Page-36-Python-issubclass()/). If you need to examine an object's attributes rather than its type, the [Python hasattr() method](/posts/Page-28-Python-hasattr()/) is a useful alternative.

## Rules of isinstance()

* True if the object is an instance or subclass of a class or any element of the tuple, False otherwise.  

* If classinfo is not a type or tuple of types, a TypeError exception is raised.