---
title: Python Print Function

description: This tutorial will learn about python’s print function, which is used for print objects and variables and parameters of the print function.

date: 2024-11-27 11:33:00 +0800
categories: [Python]
tags: [python]
image:
  path: /commons/Python Print Function.png
  alt: Python print function
---



## Python print function

The print() function prints the given message to the screen of the output device, which can be a python interpreter, Terminal, or an IDE (integrated development environment), and the message can be a string or any other object like a list, tuple, set and dictionary.

Syntax of print() function.

```python
print(object(s), sep=separator, end=end, file=file, flush=flush)
```

Example 1:
```python
print("Hello World!")
```

The output will be as follows.

```python
Hello World!
```

Example 2:
```python
print("Hello World!", 'We are using Python3.')
```

output :

```python
Hello World! We are using Python3.
```

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
## Python print() Parameters 

* **Object**: will print any object.  
* **sep:** will separate objects in more than one way. (Optional)  
* **end**: will specify what to print at the end. (Optional)  
* **file:** will print an object with a write method. (Optional)  
* **flush:** A Boolean specifying if the output is flushed (True) or buffered (False). (Optional)

## Python print() function with sep parameter.

The sep parameter stands for a separator which is used to separate the output of an object. The default value in the sep parameter is '  '.

Example:

```python
print("String1", 'String2', 'String3')
print("String1", 'String2', 'String3', sep='/')
print("String1", 'String2', 'String3', sep='-')
print("String1", 'String2', 'String3', sep='0')
print("String1", 'String2', 'String3', sep='#')
```

When we run the above program, we will get the following output.

```python
String1 String2 String3  
String1/String2/String3  
String1-String2-String3  
String10String20String3  
String1#String2#String3
```

As we can see, we are using different symbols in a sep parameter, and it is replacing space with that specific symbol we used in the sep parameter.

## Python print() function with end parameter.
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

This parameter is used to specify the end of the printing object.

Example Python print variable:

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

For better understanding, read Python File I/O (link here)

```python 
my_file = open('python.txt', 'w')
print('Hello World!', file = my_file)
my_file.close()
```

This program tries to open the python.txt in writing mode. If this file doesn't exist, the python.txt file is created and opened in writing mode.

Here, we have passed the my\_file file object to the file parameter. The string object 'Pretty cool, huh\!' is printed to the python.txt file (check it in your system).

Finally, the file is closed using the close() method.


<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4181667199679058"
     crossorigin="anonymous"></script>