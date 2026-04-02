---
title: Python dir() Method
description: In this tutorial we will learn about the python dir() method and its uses.
date: 2025-01-03 22:15:55 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python dir() Method.webp
  alt: Python dir() Method
---

The Python `dir()` function is a built-in that returns a list of names in the current scope or a list of valid attributes and methods of any given object. It takes a single optional parameter, which can be any Python object such as a module, class, instance, or built-in type. When called without arguments, it returns the names defined in the current local scope. When called with an object, it attempts to return a comprehensive list of that object's attributes, including inherited ones. The return value is always a sorted list of strings. A common real-world use case is interactive debugging and exploration in the Python REPL, where developers call `dir()` on unfamiliar objects or modules to discover available methods and properties without consulting external documentation.

## What does dir() return?

The `dir()` function returns a sorted list of strings representing the names of attributes, methods, and other identifiers available on the given object or in the current scope.

## When should you use dir()?

Use `dir()` when you need to explore the interface of an object at runtime, such as during interactive debugging, building introspection tools, or writing code that dynamically discovers available methods on plugin objects.

## Common Use Cases

One common use of `dir()` is during interactive Python sessions where you want to quickly see what methods a string, list, or custom object supports without opening documentation. Another practical scenario is building auto-completion features in custom REPLs or IDEs, where `dir()` provides the candidate list for tab completion. It is also useful for writing generic utility functions that inspect objects at runtime, such as serializers that need to discover all public attributes. Related built-in functions include the [Python getattr() method](/posts/Page-26-Python-getattr()/) for accessing discovered attributes by name and the [Python hasattr() method](/posts/Page-28-Python-hasattr()/) for checking if a specific attribute exists.

The dir() function returns a list of valid attributes of the specific object.

The syntax of dir() is:

```python
dir([object])
```

## Python dir() Method Parameters

dir() takes only a single parameter.

object \- the dir() function attempts to return all attributes of a specific object. It is optional.


Let check some example on the usage of dir() function.

### Example 1: How dir() works?

```python
number = [5,6,7]
print(dir(number))

```


Output will be as follow:

```python
['__add__', '__class__', '__contains__', '__delattr__', '__delitem__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getitem__', '__gt__', '__hash__', '__iadd__', '__imul__', '__init__', '__init_subclass__', '__iter__', '__le__', '__len__', '__lt__', '__mul__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__reversed__', '__rmul__', '__setattr__', '__setitem__', '__sizeof__', '__str__', '__subclasshook__', 'append', 'clear', 'copy', 'count', 'extend', 'index', 'insert', 'pop', 'remove', 'reverse', 'sort']

```

### 

### Example 2: How to use dir() on User-defined Objects.

```python
class Dog:
    def __dir__(self):
        return['age','color','bread']

dogType = Dog()
print(dir(dogType))

```


The output will be as follows.

```python
['age', 'bread', 'color']

```

## Rules of dir() function

dir() function tries to return a list of valid attributes of the object.

If the object has \_\_dir\_\_() method, the method will be called and must return the list of attributes.

If the object doesn't have \_\_dir\_\_() method, this method tries to find information from the \_\_dict\_\_ attribute (if defined) and type object. In this case, the list returned from dir() may not be complete.

If an object is not passed to the dir() method, it returns the list of names in the current local scope.