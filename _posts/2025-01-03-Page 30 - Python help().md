---
title: Python help() method
description: In this tutorial we will learn about the python help() method and its use with examples
date: 2025-01-03 22:15:55 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python help() method.png
 alt: Python help() method
---

## What is python help() method?

<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="https://www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
Python help() method has to call the built-in python help documentation. Python help() method will return the manual of all the built-in python modules, methods, classes, libraries, keywords, etc.

## The syntax of the help() method is:

```python
help(object_name)

```

## Python help() method parameters

The help() method only takes a single parameter.

* **object\_name (optional)** \- Name of the object which documentation you want to display.

## How to use the help() method in python?

The python help() method can be used with the python interpreter for interactive use. 

Let's see how we can use the help() method.

To try these examples, you need to open a python interpreter; if you don't know how to use a python interpreter, you can check this to learn more about python interpreters.

```python
>>>help()

```

Output

```python
Welcome to Python 3.8's help utility!

If this is your first time using Python, you should definitely check out
the tutorial on the Internet at https://docs.python.org/3.8/tutorial/.

Enter the name of any module, keyword, or topic to get help on writing
Python programs and using Python modules.  To quit this help utility and
return to the interpreter, just type "quit".

To get a list of available modules, keywords, symbols, or topics, type
"modules", "keywords", "symbols", or "topics".  Each module also comes
with a one-line summary of what it does; to list the modules whose name
or summary contains a given string such as "spam", type "modules spam".

```

The empty help() method will give you basic information about the python version and about the python interpreter.

You can also check out some of the examples below for more information.

```python
>>>help(print)

```

```python
>>> help(list)

```

```python
>>> help(for)
```

```python
>>> help(range)
```

Or you can just type help() to access the python help shell in which you can directly type the object name without including it inside the help() method.

```python
help> print
```

```python
help> list
```

```python
help> for 

```

To quit the help method in the python interpreter and return to the python shell, you just need to type quit and press enter or just press CTRL \+ Q key together.

```python
help> quit

```

You can also pass the argument in the string, and it will check if the given string name matches with any of the python modules, method, class, method, keywords, or any other documentation topics. It will return that particular name documentation; otherwise, it will simply return the string documentation.

Try these on a python interpreter.

```python
>>> help('print')

```

```python
>>>help(globals())

```

```python
>>>help('Random String')

```

```python
>>>help('Python Scholar')
```
<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="https://www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
## Rules of Python help()

<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="https://www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
There are no such rules to use the python help() method. It is just for displaying python documentation.