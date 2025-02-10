---
title: Python super()
description: The super() is a built-in python function that gives access to methods and properties of a parent or sibling class object.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python super().png
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

Output:

```python
Hello, and welcome!

```