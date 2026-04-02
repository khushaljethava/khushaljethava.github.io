---
title: Python locals() Method
description: In this tutorial, we will learn about the python locals() method and its uses with examples.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python locals() Method.webp
  alt: Python locals() Method
---

The Python `locals()` function is a built-in that returns a dictionary representing the current local symbol table. It takes no parameters and returns a `dict` where keys are the names of local variables as strings and values are the corresponding objects. When called at the module level, `locals()` behaves identically to `globals()`, since the local and global scopes are the same at that level. Inside a function, it captures all local variables defined up to the point of the call. An important caveat is that modifying the dictionary returned by `locals()` does not reliably change the actual local variables in CPython, unlike `globals()` which does allow such modifications. A common real-world use case is in debugging and logging, where developers call `locals()` inside a function to quickly inspect all local variable values without adding individual print statements. It is also used in string formatting with `str.format_map(locals())` to dynamically insert local variable values into template strings.

## What does locals() return?

The `locals()` function returns a dictionary containing all local variable names and their current values in the scope where it is called.

## When should you use locals()?

Use `locals()` when you need to inspect or log all local variables at once during debugging, or when dynamically formatting strings using local variable names as keys.

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

## Common Use Cases

A practical use of `locals()` is in template rendering, where you pass `locals()` as a context dictionary to a string formatting function so that all local variables are automatically available as template variables without explicitly constructing a dictionary. Another common scenario is quick debugging inside complex functions: inserting `print(locals())` at a breakpoint location dumps every local variable and its value in a single line, saving time compared to printing each variable individually. Developers also use `locals()` in conjunction with `exec()` to execute dynamically generated code and then inspect what variables the executed code created.

For inspecting global-scope variables instead of local ones, see the [Python globals() method](/posts/Page-27-Python-globals()/). To list all attributes and methods of a specific object, the [Python dir() method](/posts/Page-17-Python-dir()/) is a useful complement.

## Rules of locals()

* Python locals() method updates and returns a dictionary associated with the current local symbol table.