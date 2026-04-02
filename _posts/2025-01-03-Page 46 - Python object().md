---
title: Python object() Method
description: The object() is a built-in method of python that returns an empty object that is the base for all the classes.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python object() Method.webp
  alt: Python object() Method
---

The Python `object()` built-in function creates and returns a new featureless object that serves as the base class for all Python classes. It takes no parameters and returns an instance of the `object` class, which is the root of the Python class hierarchy. Every class in Python implicitly or explicitly inherits from `object`, making it the foundation of Python's object-oriented programming model. The returned object has a small set of default methods such as `__repr__()`, `__str__()`, `__eq__()`, and `__hash__()`, but it does not allow adding custom attributes. A common real-world use case for `object()` is creating unique sentinel values that are guaranteed to be distinct from any other object, which is useful as default parameter values in functions where `None` is a valid input. It is also used in multiple inheritance scenarios to ensure proper method resolution order (MRO) through cooperative super() calls.

## What does object() return?

The `object()` function returns a new, featureless instance of the base `object` class that has default dunder methods but does not support custom attribute assignment.

## When should you use object()?

Use `object()` when you need a unique sentinel value that is distinct from `None` and all other objects, or when you want to understand the base methods available to every Python class through the class hierarchy.

The syntax of object() method is:

```python
object()
```

## object() Method

The object() method doesn't take any parameter.

Let see an example of an object() method in python.

### Example 1: How to use object() method?

```python
test = object()

print(type(test))
print(dir(test))

```

Output:

```python
<class 'object'>
['__class__', '__delattr__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__']

```

### Example 2: How python get size of object?

In objects are store in pythin so to get the sixe of python object we are going to ose sys.getsizeof() function from the sys python moduel.

```python
import sys

# Create an object
my_list = [1, 2, 3, 4, 5]

# Get the size of the object
size = sys.getsizeof(my_list)

print(f"Size of my_list in bytes: {size} bytes")


```

Output:

```python
Size of my_list in bytes: 104 bytes

```

### Example 3: python convert object to string


To convert an object to a string in python we can use python str() method.This function attempts to return a string representation of the object.

```python
my_object = 42
my_string = str(my_object)
print(my_string)

```


The output will be as follow:

```python
42

```

### Example 4: list attributes of object python

```python
# Create an example object
class MyClass:
    def __init__(self, value):
        self.value = value

    def say_hello(self):
        print("Hello!")

my_object = MyClass(42)

# List attributes of the object
attributes = dir(my_object)

print(attributes)

```

Output:

```python
['__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', 'say_hello', 'value']

```

Here we have python print object attributes using object() method.

## Common Use Cases

Creating sentinel values is the most practical use of `object()`. When writing a function where `None` is a valid argument, you can define `_MISSING = object()` and use it as the default parameter. Since each `object()` call produces a unique instance, you can reliably check whether the caller provided an argument using `if param is _MISSING`.

Exploring the Python class hierarchy is another educational use case. By calling `dir(object())` you can inspect the baseline set of methods that every Python object inherits, which helps you understand what dunder methods are available by default and which ones your custom classes override.

Testing and mocking in unit tests sometimes benefits from `object()` as well. When you need a placeholder object that has no behavior and no attributes, `object()` provides the simplest possible stand-in, ensuring your test isolates the specific behavior you are verifying.

For inspecting object types, see the [Python type()](/posts/Page-66-Python-type/) function. To list all attributes of an object, the [Python dir()](/posts/Page-17-Python-dir/) function is a useful companion.

## Rules of the object()

* The object() method will only return an empty object.