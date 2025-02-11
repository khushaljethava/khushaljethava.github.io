---
title: Python Function
description: In this tutorial, we will learn about python functions and how to create custom functions in python.
date: 2024-12-19 12:03:00 +0800
categories: [Python]
tags: [python]
image:
  path: /commons/Python Function.png
  alt: Python Function
---

## What is a function in python?

A python function is a set of statements of codes that are organized and reusable that are used to perform related actions, and a function is only run when it is called.

The function is used to break a large code into smaller and modular pieces and reused many times in a program.

Also, functions make the program more readable, organized, and manageable. A function can be both built-in or user-defined in which the user can create its custom functions.

## How to define a function in python?

A python function can be created using the python def keyword followed by the function name and closed by brackets with a colon: and a set of statements inside the function, which we only are executed when we call the function.

Syntax of a user-defined function.

```python
def function_name():
	statements1
	statements2

```

## how to call a function in python?

A Function can be called or used in a program by calling the function name followed by brackets.

Syntax on how to call a function.

```python
function_name()

```
Let see an example of how to make a python function.

Python function example:

```python
def my_function():
    print("Hello Python")

my_function()

```

The output will be as follow.

```python
Hello Python

```

This way, we can create a function in python.

Lets check it function type using type()  method.

<script type="text/javascript">
	atOptions = {
		'key' : '98858c4e91885e00ea9926beee01c03e',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
</script>
<script type="text/javascript" src="https://www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
Example

```python
def my_function():
    print("Hello Python")

print(type(my_function))

```
Output:

```python
<class 'function'>

```

As we can see, we got the result as a class function.

## Return statement inside the python function

The **return**()  is used to exit the function and return output based on the code implemented with the return() statement.

Syntax of return

```python
return statement

```

Let see an example of using the return statement in python.

Example:

```python
def my_function():
    return "This is a return statement."

print(my_function())

```

<script type="text/javascript">
	atOptions = {
		'key' : '98858c4e91885e00ea9926beee01c03e',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
</script>
<script type="text/javascript" src="https://www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
Here we are returning a string using a return statement. As we can see, we don't need to use the print() statement to print the string.

The output will be as follows.

```python
This is a return statement.

```
We can also add arithmetic operations in the python function.

Example of arithmetic operations.

```python
def my_function():
    x = 2
    y = 2
    return x+y

print(my_function())

```

<script type="text/javascript">
	atOptions = {
		'key' : '98858c4e91885e00ea9926beee01c03e',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
</script>
<script type="text/javascript" src="https://www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
The output will be as follow.

```python
4

```

pass() statement in Python function.

We can use the pass() statement to pass the null statement in the function. When we use the pass() method in python functions, it will not give any output. It will just run an empty statement.

Let see an example of the pass() statement in functions.

```python
def my_function():
    pass

print(my_function())
```
When we run this program, we will get nothing as an output as we are using the pass() statement here.

