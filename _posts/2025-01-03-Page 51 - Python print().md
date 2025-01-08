---
title: Python print()
description: The print() function prints the given message to the screen of the output device, which can be a python interpreter, Terminal, or an IDE (integrated development environment), and the message can be a string or any other object like a list, tuple, set and dictionary.
date: 2025-01-03 22:42:23 +0800
categories: [Python]
tags: [python]
image:
 path: /commons/Python print().png
 alt: Python print()
---

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