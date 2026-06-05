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

Understanding `object()` deeply helps you grasp how Python's entire type system is built. When you write `class MyClass:` in Python 3, it is identical to `class MyClass(object):` — every class automatically inherits from `object`. This means every object in Python, including integers, strings, lists, and custom class instances, has the set of dunder methods provided by `object` at the very bottom of its MRO.

## What does object() return?

The `object()` function returns a new, featureless instance of the base `object` class that has default dunder methods but does not support custom attribute assignment.

## When should you use object()?

Use `object()` when you need a unique sentinel value that is distinct from `None` and all other objects, or when you want to understand the base methods available to every Python class through the class hierarchy.

## Syntax Breakdown

The syntax of object() method is:

```python
object()
```

The function accepts no arguments at all. Every call returns a brand-new, unique instance. Two consecutive calls to `object()` will never return the same object — each call produces a distinct instance with its own identity, which is exactly what makes it valuable as a sentinel value. Attempting to pass any argument raises `TypeError: object() takes no arguments`.

## object() Method Parameters

The `object()` method does not take any parameters. Passing any argument to it raises a `TypeError`:

```python
# This raises TypeError: object() takes no arguments
obj = object(42)
```

## Code Examples

### Example 1: Basic usage of object()

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

### Example 5: Using object() as a sentinel value

The most practical real-world use of `object()` is as a sentinel — a unique placeholder that can never accidentally match any other value, including `None`.

```python
_MISSING = object()

def get_config(key, default=_MISSING):
    config = {"host": "localhost", "port": 8080}
    if key in config:
        return config[key]
    if default is _MISSING:
        raise KeyError(f"Key '{key}' not found and no default provided")
    return default

print(get_config("host"))           # localhost
print(get_config("timeout", None))  # None is a valid default here
```

This pattern is superior to using `None` as a sentinel when `None` itself is a legitimate value the caller might want to pass.

### Example 6: Verifying unique identity

```python
a = object()
b = object()

print(a is b)    # False — each call creates a distinct object
print(a == b)    # False — no two plain object() instances are equal
print(id(a) == id(b))  # False — different memory addresses
```

### Example 7: Demonstrating the MRO base

```python
class Animal:
    pass

class Dog(Animal):
    pass

# Check the MRO
print(Dog.__mro__)
# (<class 'Dog'>, <class 'Animal'>, <class 'object'>)

# object is always at the end
print(issubclass(Dog, object))   # True
print(issubclass(str, object))   # True
print(issubclass(int, object))   # True
```

## Real-World Use Cases

**Creating sentinel values** is the most practical use of `object()`. When writing a function where `None` is a valid argument, you can define `_MISSING = object()` and use it as the default parameter. Since each `object()` call produces a unique instance, you can reliably check whether the caller provided an argument using `if param is _MISSING`. This pattern appears in Python's own standard library (`inspect._empty`, `dataclasses.MISSING`).

**Exploring the Python class hierarchy** is another educational use case. By calling `dir(object())` you can inspect the baseline set of methods that every Python object inherits, which helps you understand what dunder methods are available by default and which ones your custom classes override.

**Testing and mocking in unit tests** sometimes benefits from `object()`. When you need a placeholder object that has no behavior and no attributes, `object()` provides the simplest possible stand-in, ensuring your test isolates the specific behavior you are verifying.

**Multiple inheritance and cooperative calls** use `object` at the end of the MRO chain. When building class hierarchies with `super()`, the chain eventually reaches `object`, which provides default implementations of all fundamental dunder methods including `__init__`, `__repr__`, `__str__`, `__eq__`, and `__hash__`.

## Edge Cases and Gotchas

**You cannot add attributes to a plain object() instance.** Unlike instances of user-defined classes, plain `object()` instances do not have a `__dict__`, so attempting to set an attribute raises `AttributeError`:

```python
obj = object()
obj.name = "test"   # AttributeError: 'object' object has no attribute 'name'
```

**Equality uses identity by default.** Two `object()` instances are never equal because the default `__eq__` implementation compares by identity. Only the exact same object is equal to itself.

**Always use `is` for sentinel comparison**, never `==`, because a custom class could override `__eq__` to return `True` for any comparison.

## Comparison with Other Sentinel Approaches

| Approach | Unique | Hashable | Supports attrs | Recommended |
|---|---|---|---|---|
| `object()` | Yes | Yes | No | Yes, for most sentinel needs |
| `None` | Singleton | Yes | No | Only when None means missing |
| Custom class | Yes | Configurable | Yes | When you need rich behavior |
| `enum.Enum` member | Per name | Yes | Limited | When you want named sentinels |

## Frequently Asked Questions

**Q: Is `object` the same as `object()`?**  
A: No. `object` (without parentheses) is the class itself — the root of the Python class hierarchy. `object()` creates an instance of that class.

**Q: Why can't I set attributes on an object() instance?**  
A: Plain `object` instances deliberately have no `__dict__` slot to keep them as lightweight as possible. If you need attributes, define a simple class.

**Q: When should I use `object()` instead of `None` as a default sentinel?**  
A: Use `object()` when `None` is a valid value for the parameter. If `None` means "no value provided" in your API, use `_MISSING = object()` so callers can explicitly pass `None` without triggering the missing-argument path.

**Q: Can I use `object()` instances as dictionary keys?**  
A: Yes. `object` instances are hashable by default (using their identity as the hash), so they can be used as dictionary keys or set members.

For inspecting object types, see the [Python type()](/posts/Page-66-Python-type()/) function. To list all attributes of an object, the [Python dir()](/posts/Page-17-Python-dir()/) function is a useful companion.

## Rules of the object()

* The `object()` method will only return an empty object.
* You cannot add custom attributes to a plain `object()` instance.
* Each call to `object()` returns a new, unique instance with its own identity.
* `object()` takes no arguments — passing any raises `TypeError`.