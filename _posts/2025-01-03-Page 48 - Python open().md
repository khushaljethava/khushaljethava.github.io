---
title: Python open() Method
description: In this tutorial, we will learn about the python open() method and its uses.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python open() Method.png
 alt: Python open() Method
---

## What is the python open() method?

The open() is an I/O function of python that helps to open text files and returns the respected file object.

The syntax of open() is:

```python
open(file, mode='r', buffering=-1, encoding=None, errors=None, newline=None, closefd=True, opener=None)
```

## open() Parameters

The open() takes multiple parameters as argument:

* **file \-** Path to the file with the file name.  
<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
* **mode \-** mode represents the attributes of a file while opening it. More details of mode parameters are explained in the table below.  
* **buffering** (Optional) \- used to set up the buffering policy. Defaults id \-1.  
* **encoding** (Optional) \- The encoding format to encode or decode the file.  
* **errors** (Optional) \- The string specifying how to handle encoding and decoding errors.  
* **newline** (Optional) \- how newlines mode works (available values: None, ' ', '\\n', 'r', and '\\r\\n'.  
* **closefd** (Optional) \- If a filename is given, it must be True. If False, the file descriptor will be kept open when the file is closed.  
* **opener** (Optional) \- A custom file opener that will return an open file descriptor.  
    
    
    
    
    
    
    
    
    
    
    
    
  


More about the mode parameter is listed below.

| Mode | Description |
<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
| :---- | :---- |
| ‘r’ | Read \- Opening a file for reading. It will be the Default mode.  |
| ‘w’ | Write \- Open a file to write, or it will create the new files if it does not exist. |
| ‘x’ | Create \- Creating a new file, if file exists, it will return an error |
| ‘a’ | Append \- Opening a file to append the new content into it. If files do not exist, they will create new ones. |
| ‘t’ | Text \- Open file in text mode. Default. |
| ‘b’ | Binary \- Open file in binary mode. |
| ‘+’ | Open file for updating (reading and writing) |

Let's check some examples of the open() function in python.

### Example 1: How to open a file in python?

```python
# opens test.text file of the current directory
f = open("test.txt")

# specifying the full path
f = open("C:/TEXTFILE.txt")

```

In the ablow example, we are opening a file, and we are not taking any mode as by default; it will take Read as the default mode.

### Example 2: How to use different modes in python open()?

```python
# opens the file in reading mode
f = open("path_to_file", mode='r')

# opens the file in writing mode 
f = open("path_to_file", mode = 'w')

# opens for writing to the end 
f = open("path_to_file", mode = 'a')

```

## Rules of open()

* The open() function will be read as the default mode and the text file as the default file type.  
* If the file is not found, it raises the FileNotFoundError exception.

<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
We recommended reading Python File Input/Output for better understanding.