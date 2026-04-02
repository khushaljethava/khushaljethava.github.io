---
title: Python callable() Method
description: In this tutorial we will learn about python callable() method and it uses.
date: 2024-12-26 22:06:00 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python callable() Method.webp
  alt: Python callable() Method

---

Python's `callable()` function checks whether an object appears to be callable -- that is, whether it can be invoked using parentheses like a function call. It accepts a single argument of any type and returns `True` if the object has a `__call__()` method, or `False` otherwise. Functions, methods, classes, and instances of classes that define `__call__()` are all callable. Simple data types like integers, strings, and lists are not callable. However, it is important to note that `callable()` returning `True` does not guarantee that calling the object will succeed -- it only indicates that the object has the structural capability to be called. This function is useful for defensive programming, plugin architectures, callback validation, and dynamic dispatch systems where you need to verify that a given object can be invoked before attempting to call it. For checking the type of an object more broadly, see [Python type()](/posts/Page-66-Python-type()/) and [Python isinstance()](/posts/Page-35-Python-isinstance()/).

## What does callable() return?

The `callable()` function returns `True` if the object appears callable (has a `__call__` method), and `False` otherwise.

## When should you use callable()?

Use `callable()` when you need to verify that an object can be called as a function before actually invoking it. This is common in plugin systems, event handlers, callback registrations, and any code that accepts functions or function-like objects as arguments.

The callable() method returns True if the specified object is callable. Otherwise, it will return False.

The syntax of callable() method is:

```python
callable(object)
```


## Python callable() Method Parameters


The callable() method will take only a single argument which can be any object.

Let’s see some examples of callable() python.

Example 1: How callable() methods work?

```python
X = 4
print(callable(X))

my_list = [1,2,3,4,5]
print(callable(my_list))


def my_function():
    print("Hello World")

Y = my_function
print(callable(Y))
```

The output will be as follows.

```python
False
False
True
```

Here the object X and my\_list are not callable; hence it is sending False, but the object Y appears to be callable, returning False.


Example 2: Object Appears to be Callable but isn't callable.

```python
class Sum:
    def printNumber(self):
        print("Number is here")

print(callable(Sum))
```

Output:

```python
True
```

Here in the above example, the class appears to be callable, but it's not callable; this code will raise an error when we call class in python.

```python
class Sum:
    def printNumber(self):
        print("Number is here")

print(callable(Sum))

X = Sum()

X()
```

The output will be as follows.

```python
True
Traceback (most recent call last):
  File "", line 9, in <module>
    X()
TypeError: 'Sum' object is not callable
```

## Common Use Cases

**Validating callbacks before registration.** In event-driven systems, you often accept callback functions from external code. Checking `callable(callback)` before adding it to an event listener list prevents runtime errors when the event fires and the system tries to invoke a non-callable object.

**Building plugin architectures.** When loading plugins dynamically from modules or configuration, `callable()` helps verify that the loaded object is actually a function or class that can be instantiated, rather than a misconfigured constant or data structure.

**Implementing safe dynamic dispatch.** In APIs that accept either a value or a factory function, `callable(arg)` lets you distinguish between the two: if callable, invoke it to get the value; if not, use it directly. This pattern is common in configuration systems and dependency injection frameworks.

## Rules of Python callable()

* If the object appears to be callable, it will return True.  
* If the object appears not to be callable, it will return False.  
* Even if callable() is True, it is not important that a given object may fail while calling.

## Related Functions

* [Python type()](/posts/Page-66-Python-type()/) -- check the type of an object.
* [Python isinstance()](/posts/Page-35-Python-isinstance()/) -- check if an object is an instance of a specific class.
* [Python bool()](/posts/Python-bool()/) -- convert a value to Boolean.