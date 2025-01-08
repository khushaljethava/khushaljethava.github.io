---
title: Python locals() Method
description: In this tutorial, we will learn about the python locals() method and its uses with examples.
date: 2025-01-03 22:42:23 +0800
categories: [Python]
tags: [python]
image:
 path: /commons/Python locals() Method.png
 alt: Python locals() Method
---

## 

## What is the Python locals() method?

The python locals() method returns the dictionary of the current local symbol table.

## What is the symbol table in python?

A symbol table is a data structure containing all the necessary information regarding the program, including variable names, methods, methods, classes, etc.

The syntax of locals() method is:

locals()

The syntax of globals() method is:

globals()

locals() parameters

## locals() parameters

The locals() method does not take any parameter.

Let us check some examples of the locals() method.

Using the locals() method in the python interpreter will show all the local variables and other default symbols declared by python. 

### Example 1: Using locals() with a python interpreter.

```python
>>>locals()

```

When you run the above program, it will display the following output on the python interpreter.

Output:

```python
{'__name__': '__main__', '__doc__': None, '__package__': None, '__loader__': <class '_frozen_importlib.BuiltinImporter'>, '__spec__': None, '__annotations__': {}, '__builtins__': <module 'builtins' (built-in)>}

```

python locals globals symbol tables for the global environment are the same.

### Example 2: How to use the locals() method in python?

```python
def localsNotPresent():
    return locals()

def localsPresent():
    present = True
    return locals()

print('localsNotPresent:', localsNotPresent())
print('localsPresent:', localsPresent())

```

The output will be as follow.

```python
localsNotPresent: {}
localsPresent: {'present': True}

```

### 

### Example 3: Updating locals() dictionary values

```python
def localsNotPresent():
    return locals()

def localsPresent():
    present = True
    return locals()

print('localsNotPresent:', localsNotPresent())
print('localsPresent:', localsPresent())def localsPresent():
    present = True
    print(present)
    locals()['present'] = False;
    print(present)

localsPresent()

```

Output:

```python
True
True
```

## Rules of locals()

* Python locals() method updates and returns a dictionary associated with the current local symbol table.