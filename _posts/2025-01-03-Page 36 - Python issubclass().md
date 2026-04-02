---
title: Python issubclass() Method
description: In this tutorial, we will learn about the python issubclass() method and its use with examples.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python issubclass() Method.webp
  alt: Python issubclass() Method
---

The Python `issubclass()` function is a built-in that checks whether a class is a subclass of another class or a tuple of classes. It takes two required parameters: the class to check and the class (or tuple of classes) to test against. It returns `True` if the first class is a subclass of the second, including the case where both arguments are the same class, since every class is considered a subclass of itself. A `TypeError` is raised if the first argument is not a class. This function is particularly useful in object-oriented programming when you need to verify class hierarchies at runtime. A common real-world use case is in plugin architectures and framework code where you need to confirm that user-provided classes correctly extend a required base class before registering them. For example, a web framework might use `issubclass(UserView, BaseView)` to validate that custom view classes inherit from the framework's base view.

## What does issubclass() return?

The `issubclass()` function returns `True` if the first class is a subclass of the second class (or any class in the provided tuple), and `False` otherwise.

## When should you use issubclass()?

Use `issubclass()` when you need to verify class inheritance relationships at runtime, such as validating that plugin or extension classes properly extend a required base class.

## What is the Python issubclass() Method?

The python issubclass() method returns True if the specified object is an instance or subclass; otherwise, it will return False.

The syntax of issubclass() is:

```python
issubclass(object, class)

```

## Python issubclass() Method Parameters


issubclass() method takes two parameters as arguments:


* **object** \- Name of the object to be checked  
* **class** \- Type of the class.

Let’s see some examples of the python issubclass() method.


### Example 1: How to Use issubclass() python method?

```python
class Polygon:
  def __init__(polygonType):
    print('Polygon is a ', polygonType)

class Triangle(Polygon):
  def __init__(self):

    Polygon.__init__('triangle')
    
print(issubclass(Triangle, Polygon))
print(issubclass(Triangle, list))
print(issubclass(Triangle, (list, Polygon)))
print(issubclass(Polygon, (list, Polygon)))

```

The output will be as follow:

```python
True
False
True
True

```

## Common Use Cases

A frequent use of `issubclass()` is in factory patterns where a registry of handler classes is maintained, and each registered class must be verified as a subclass of a particular abstract base class before being accepted. Another practical scenario is in testing frameworks that automatically discover test classes by scanning modules and checking `issubclass(cls, TestCase)` to identify which classes should be collected and run. It is also useful in serialization systems that need to determine whether a given class inherits from a serializable base in order to decide which encoding strategy to apply.

To check whether a specific object (not a class) is an instance of a class, use [Python isinstance()](/posts/Page-35-Python-isinstance()-method/). If you need to inspect the attributes of a class rather than its inheritance tree, the [Python dir() method](/posts/Page-17-Python-dir()/) is a helpful tool.

## Rules of issubclass()

* True if the class is a subclass of a class or any element of the tuple, False otherwise.