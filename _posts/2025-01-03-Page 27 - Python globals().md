---
title: Python globals() Method
description: In this tutorial we will learn about python globals() method and its uses with examples.
date: 2025-01-03 22:15:55 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python globals() Method.webp
  alt: Python globals() Method
---

The Python `globals()` function is a built-in that returns a dictionary representing the current global symbol table. It takes no parameters and always returns a `dict` object containing every variable, function, class, and imported module available at the module level. The keys in this dictionary are the names of global symbols as strings, and the values are the corresponding objects. Because the returned dictionary is mutable, you can both read and modify global variables through it, making `globals()` a powerful tool for dynamic programming. A common real-world use case is in template engines and configuration systems where you need to look up or inject variables by name at runtime. For example, a plugin system might use `globals()` to register new functions dynamically without hardcoding their names. It is also useful for debugging, as calling `globals()` inside the Python interpreter instantly reveals all currently defined global names and their values.

## What does globals() return?

The `globals()` function returns a dictionary of the current module's global symbol table, including all global variables, functions, classes, and imports currently in scope.

## When should you use globals()?

Use `globals()` when you need to dynamically access or modify global variables by name at runtime, such as in metaprogramming, debugging, or building plugin architectures.

## What is Python globals() Method?

The python globals() method returns the dictionary of the current global symbol table.


## What is the symbol table in python?

A symbol table is a data structure that contains all the necessary information regarding the program that includes variable names, functions, methods, classes, etc.

## The syntax of globals() method is:

```python
globals()

```

## globals() Parameters

The globals() method does not take any parameter.


Let us check some examples of globals() method.

If we use the globals() method in the python interpreter, it will show as all the global variables and other default symbols declared by python. 

### Example 1: Using globals() with python interpreter.

```python
>>> globals()

```

When you run the above program, it will display the following output on the python interpreter.

Output:

```python
{'__name__': '__main__', '__doc__': None, '__package__': None, '__loader__': <class '_frozen_importlib.BuiltinImporter'>, '__spec__': None, '__annotations__': {}, '__builtins__': <module 'builtins' (built-in)>}

```

### Example 2: How to use globals() method in python?

```python
# global variable
num  = 10

def User_Func():
    a = 5
    b = a + num

    # Calling globals() method
    globals()['num'] = b
    print(b)

# Calling the User_Func

User_Func()

```

Output:

```python
15

```

We can also modify the global variable using the globals() method. 

### Example 3: Modify global variable using globals() method.

```python
name = "Python"

globals()['name'] = 'PythonScholar'
print('The new name is:', name)
```

The output will be as follow:

```python
The new name is: PythonScholar

```

We can also check global variables of other python libraries using the globals() method.

### Example 4: using globals() method with python libraries.

```python
import math
from pprint import pprint

pprint(globals())

```

The output will be as follow:

```python
{'__annotations__': {},
 '__builtins__': <module 'builtins' (built-in)>,
 '__doc__': None,
 '__file__': 'Globals_With_libraries.py',
 '__loader__': <class '_frozen_importlib.BuiltinImporter'>,
 '__name__': '__main__',
 '__package__': None,
 '__spec__': None,
 'math': <module 'math' (built-in)>,
 'pprint': <function pprint at 0x7f340321b1f0>}

```

As you can see, it returns all the global variables and default symbols of imported python libraries. 

## Common Use Cases

One practical use of `globals()` is in configuration management, where settings loaded from a file or environment are injected into the global namespace so that other parts of the program can access them without passing configuration objects around. Another common scenario is dynamic dispatch: if you have a set of handler functions named `handle_event_a`, `handle_event_b`, and so on, you can use `globals()` to look up and call the right handler based on a string constructed at runtime. Developers also use `globals()` during interactive debugging sessions to quickly inspect all variables defined at the module level and confirm that imports and assignments have taken effect.

If you want to inspect variables within a function's local scope instead, see the [Python locals() method](/posts/Page-40-Python-locals()/). You may also find the [Python dir() method](/posts/Page-17-Python-dir()/) helpful for listing the names in the current scope without their values.

## Rules of Python globals()

The python globals() method returns the result in dictionary format of the current global symbol table.