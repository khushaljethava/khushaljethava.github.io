---
title: Python super()
description: The super() is a built-in python function that gives access to methods and properties of a parent or sibling class object.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python super().webp
  alt: Python super()
---

The Python `super()` function is a built-in function that returns a proxy object which delegates method calls to a parent or sibling class in the method resolution order (MRO). In Python 3, it takes no required parameters when used inside a class method, automatically determining the current class and instance. The function returns a temporary proxy object of the superclass, allowing you to call its methods. The primary purpose of `super()` is to support cooperative multiple inheritance by ensuring that parent class constructors and methods are called correctly without hardcoding parent class names. A real-world use case is building a class hierarchy for a web application where a base `View` class handles common HTTP logic and child classes like `ListView` or `DetailView` extend it by calling `super().__init__()` to preserve the parent's initialization. It is closely related to [type()](/posts/Page-66-Python-type()/) which inspects an object's class, and [isinstance()](/posts/Page-35-Python-isinstance()/) which checks class membership.

## What does super() return?

The `super()` function returns a proxy object that forwards method calls to the next class in the method resolution order, enabling access to parent class methods and properties.

## When should you use super()?

Use `super()` inside a subclass method when you need to call the parent class's version of that method, especially in `__init__()` to ensure proper initialization of inherited attributes.

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

Output:

```python
Hello, and welcome!

```

## Common Use Cases

A common use case for `super()` is calling the parent class's `__init__()` method in a subclass to ensure all inherited attributes are properly initialized before adding new ones. Another practical scenario is extending the behavior of a parent method without completely replacing it, such as a `LoggingMixin` that calls `super().save()` to preserve the original save logic while adding logging before or after the operation. It is also essential in multiple inheritance situations where the diamond problem would otherwise cause parent constructors to be called multiple times.