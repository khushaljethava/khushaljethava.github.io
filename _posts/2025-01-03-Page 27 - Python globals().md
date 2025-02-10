<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 300,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
---
title: Python globals() Method
description: In this tutorial we will learn about python globals() method and its uses with examples.
date: 2025-01-03 22:15:55 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 300,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
 path: /commons/Python globals() Method.png
 alt: Python globals() Method
---

## What is Python globals() Method?

The python globals() method returns the dictionary of the current global symbol table.

## What is the symbol table in python?
<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 300,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>

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

## Rules of Python globals()

The python globals() method returns the result in dictionary format of the current global symbol table.