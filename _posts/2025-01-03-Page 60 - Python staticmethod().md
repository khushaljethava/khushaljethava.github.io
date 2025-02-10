---
title: Python staticmethod()
description: The staticmethod() is a built-in python function that returns a static method of a given function.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python staticmethod().png
 alt: Python staticmethod()
---

The syntax of staticmethod() is:

```python
staticmethod(function)

```

## staticmethod() Parameters

The staticmethod() takes only one argument as parameters:

* function \- Name of the function that needs to be converted to a sciatic method.

Lets check an example of staticmethod() in python

### Example 1: How to use the staticmethod() function in python ?

```python
class Mathematics:

    def addNumbers(x, y):
        return x + y

# create addNumbers static method
Mathematics.addNumbers = staticmethod(Mathematics.addNumbers)

print('The sum is:', Mathematics.addNumbers(5, 10))

```

Output:

```python
The sum is: 15

```

## What is a static method?