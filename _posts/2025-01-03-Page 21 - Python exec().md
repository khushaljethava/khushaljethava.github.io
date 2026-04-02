---
title: Python exec() Method
description: In this tutorial we will learn about python exec() method and its uses with examples.
date: 2025-01-03 22:15:55 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python exec() Method.webp
  alt: Python exec() Method
---

The Python `exec()` function is a built-in that dynamically executes Python code provided as a string or compiled code object. It takes three parameters: an object (required), which is the string or code object to execute; a globals dictionary (optional) that defines the global namespace; and a locals dictionary (optional) that defines the local namespace. Unlike `eval()`, which only evaluates expressions, `exec()` can execute any valid Python statements including imports, class definitions, function definitions, loops, and conditionals. The function always returns `None`, since its purpose is to execute code for its side effects rather than to produce a value. A common real-world use case is implementing plugin systems where user-provided scripts are loaded and executed at runtime, or building interactive coding environments where code submitted by users needs to be run dynamically.

## What does exec() return?

The `exec()` function always returns `None`, because it executes statements for their side effects rather than evaluating an expression to produce a result.

## When should you use exec()?

Use `exec()` when you need to execute dynamically generated Python statements, such as running user scripts in a plugin system or applying code patches at runtime, and always restrict the namespace with globals and locals dictionaries for security.

## Common Use Cases

One common use of `exec()` is in educational platforms and online coding judges where student-submitted code needs to be executed in a controlled environment. Another practical scenario is implementing configuration files written in Python syntax, where `exec()` runs the config file and populates a namespace dictionary with the defined variables. It is also used in code generation pipelines where templates produce Python source code that is then executed. Related functions include the [Python eval() method](/posts/Page-20-Python-eval()/) for evaluating single expressions and the [Python globals() method](/posts/Page-27-Python-globals()/) for inspecting the global namespace that `exec()` modifies.

The exec() is a built-in python function that executes the specified python code dynamically. Can be a string or a code object.

Python exec() syntax :

```python
exec(object, globals, locals)

```

## exec() Parameters

exec() takes three parameters as argument:


* object \-  A string or code object.  
* globals (optional) \- A dictionary containing global parameters.  
* locals (optional) \-  A dictionary containing local parameters.

Lets see an example of python exec() function.


### Example 1: How to use exec() function in python?

```python
code = 'print("Hello Python")'

exec(code)

```

Output:

```python
Hello Python 

```


### Example 2 : exec() function with user input function.

```python
code = 'a = int(input("Enter a Number: "))\nprint(a)'

exec(code)

```

Output:

```python
Enter a Number: 25
25

```
