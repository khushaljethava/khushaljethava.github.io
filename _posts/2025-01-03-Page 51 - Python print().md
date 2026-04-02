---
title: Python print()
description: The print() function prints the given message to the screen of the output device, which can be a python interpreter, Terminal, or an IDE (integrated development environment), and the message can be a string or any other object like a list, tuple, set and dictionary.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python print().webp
  alt: Python print()
---

The Python `print()` built-in function outputs text and other objects to the console or a specified file stream. It accepts any number of positional arguments (the objects to print), along with optional keyword parameters: `sep` (the separator between objects, defaulting to a single space), `end` (the string appended after the last object, defaulting to a newline), `file` (a writable stream object, defaulting to `sys.stdout`), and `flush` (a boolean controlling whether the output buffer is immediately flushed). The function returns `None` since its purpose is to produce a side effect rather than compute a value. As the most commonly used function in Python, `print()` is essential for debugging, logging quick status messages, displaying program output to users, writing formatted reports to files, and providing feedback during interactive sessions. It handles automatic type conversion by calling `str()` on each argument, making it convenient to output integers, floats, lists, and other objects without manual conversion.

## What does print() return?

The `print()` function always returns `None`; its purpose is the side effect of writing the string representation of the given objects to the specified output stream.

## When should you use print()?

Use `print()` for displaying output to users, quick debugging during development, writing formatted text to files via the `file` parameter, and any situation where you need to send human-readable text to an output stream.

Syntax of print() function.

```python
print(object(s), sep=separator, end=end, file=file, flush=flush)

```

## Python print() Parameters 

The python print() functions take the following parameters as argument:


* **object**: will print any object.  
* **sep:** will separate objects in more than one way. (Optional)  
* **end**: will specify what to print at the end. (Optional)  
* **file:** will print an object with a write method. (Optional)  
* **flush:** A Boolean specifying if the output is flushed (True) or buffered (False). (Optional)

### Example 1:

```python
print("Hello World!")

```

The output will be as follows.

```python
Hello World!

```

### Example 2:

```python
print("Hello World!", 'We are using Python3.')

```

output :

```python
Hello World! We are using Python3.

```

## Python print() function with sep parameter.

The sep parameter stands for a separator which is used to separate the output of an object. The default value in the sep parameter is '  '.

### Example:

```python
print("String1",'String2','String3')
print("String1",'String2','String3', sep = '/')
print("String1",'String2','String3', sep = '-')
print("String1",'String2','String3', sep = '0')
print("String1",'String2','String3', sep = '#')

```

When we run the above program, we will get the following output.

```python
String1 String2 String3
String1/String2/String3
String1-String2-String3
String10String20String3
String1#String2#String3

```

As we can see, we are using different symbols in a sep parameter, and it is replacing empty space with that specific symbol we used in the sep parameter.

## Python print() function with end parameter.

This parameter is used to specify the end of the printing object.

### Example Python print variable:

```python
print("Hello World", end='!')
print("Python3 is Awesome",end=';')

```

And the output will be as follows. 

```python
Hello World!
Python3 is Awesome;

```


## Python print() function with file parameter.

In python, we can print the content inside a file.

For better understanding, read Python File I/O (link here)

```python
my_file = open('python.txt', 'w')
print('Hello World!', file = my_file)
my_file.close()

```


This program tries to open the python.txt in writing mode. If this file doesn't exist, the python.txt file is created and opened in writing mode.

Here, we have passed the my\_file file object to the file parameter. Then, the string object 'Pretty cool, huh\!' is printed to the python.txt file (check it in your system).

Finally, the file is closed using the close() method.

## Common Use Cases

Debugging during development is the most frequent use of `print()`. Inserting `print()` calls to inspect variable values, execution flow, and intermediate results is the quickest way to diagnose issues in small scripts and during prototyping, before adopting more structured logging solutions.

Generating formatted console output for command-line applications is another core use case. By combining the `sep` and `end` parameters, you can produce neatly formatted tables, progress indicators, and status messages. For example, using `end='\r'` creates an in-place updating progress line on the terminal.

Writing structured output to files using the `file` parameter allows `print()` to serve as a simple report generator. By passing a file object opened in write mode, you can direct formatted output to log files, CSV exports, or text reports without switching to more complex file-writing patterns.

For reading user input from the console, see the [Python input()](/posts/Page-33-Python-input()/) function. To open files for writing with the `file` parameter, the [Python open()](/posts/Page-48-Python-open()/) function provides the necessary file object.