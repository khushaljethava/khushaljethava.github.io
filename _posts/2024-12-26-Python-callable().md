---
title: Python callable() Method
description: In this tutorial we will learn about python callable() method and it uses.
date: 2024-12-26 22:06:00 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python callable() Method.png
  alt: Python callable() Method

---


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

## Rules of Python callable()

* If the object appears to be callable, it will return True.  
* If the object appears not to be callable, it will return False.  
* Even if callable() is True, it is not important that a given object may fail while calling.