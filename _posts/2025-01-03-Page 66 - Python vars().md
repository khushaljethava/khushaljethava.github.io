---
title: Python vars()
description: The vars() is a built-in python function that returns the \_\_dict\_\_ attribute of an object.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python vars().png
 alt: Python vars()
---

The syntax of the vars() function is :

```python
vars(object)

```

## vars() parameters

vars() function takes only one parameter as argument:

* object \- Any object having the \_\_dict\_\_ attribute or module,class ,instance.

### Example 1: How to use vars() function on python?

```python
class Dog:
  def __init__(self, a = 4, b = 8):
    self.a = a
    self.b = b
  
object = Dog()
print(vars(object))

```

Output:

```python
{'a': 4, 'b': 8}

```

The \_\_dict\_\_ attribute is a dictionary containing the specific object’s changeable attributes.

## Rules of vars()

* If called without any parameters, it will return a dictionary containing the local symbol table.  
* vars() will return the \_\_dict\_\_ attributes of the given object.  
* If the object passed to vars() doesn't have the \_\_dict\_\_ attribute, it raises a TypeError exception.