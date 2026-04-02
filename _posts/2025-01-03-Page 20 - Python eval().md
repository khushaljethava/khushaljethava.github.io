---
title: Python eval() Method
description: In this tutorial we will learn about python eval() method and it uses.
date: 2025-01-03 22:15:55 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python eval() Method.webp
  alt: Python eval() Method
---

The Python `eval()` function is a built-in that parses and evaluates a single Python expression passed as a string, returning the result. It takes three parameters: an expression string (required), which must be a valid Python expression; a globals dictionary (optional) that defines the global namespace for evaluation; and a locals dictionary (optional) that defines the local namespace. The function evaluates the expression and returns whatever value the expression produces, which can be any Python type. Unlike `exec()`, which can run arbitrary statements, `eval()` is limited to expressions that produce a value. A real-world use case is building calculator applications or configuration systems where mathematical or logical expressions are stored as strings and need to be evaluated at runtime, though caution is required since `eval()` can execute arbitrary code if the input is not sanitized.

## What does eval() return?

The `eval()` function returns the result of evaluating the given Python expression string, which can be any Python object depending on the expression.

## When should you use eval()?

Use `eval()` when you need to dynamically evaluate a Python expression from a string at runtime, such as in configuration parsers or formula evaluators, but only with trusted input since it poses security risks with untrusted data.

## Common Use Cases

A common use of `eval()` is building simple expression evaluators where users enter mathematical formulas like `"2 * (3 + 4)"` and the application computes the result. Another practical scenario is evaluating condition strings stored in configuration files, such as feature flags defined as `"version >= 2.0 and platform == 'linux'"`. It is also used in data analysis to dynamically apply pandas query expressions to DataFrames. Related functions include the [Python exec() method](/posts/Python-exec()-Method/) for executing full Python statements and the [Python format() method](/posts/Python-format()-Method/) for safer string interpolation without code execution risks.

## What is Python eval() Method? 

The python eval() method helps execute the specified expression; it can execute the legal python statement. 

The syntax of eval() method is:

```python
eval(expression, globals, locals)

```

## eval() Parameters

The eval() method takes three parameters:

* expression \- The simple python statement can be evaluated as a python expression.  
* globals(Optional) \- A dictionary containing global variable parameters.  
* locals(Optional) \- A dictionary containing local variable parameters. 

Let's check some examples of eval() method.

### Example 1: How to use eval() method.

```python
num1 = 2
num2 = 4

print(eval("num1 + num2"))

```

The output will be as follow

```python
6

```


In the above example, the eval() method evaluates the expression num1 \+ num2 then we are using the print method to print the result.

### Example 2: Using eval() method with user-defined method 

```python
def User_Func():

	# expression to be evaluated
	x = int(input("Enter the value for x:"))

	# variable used in expression
	y = int(input("Enter the value of y:"))
	expr = 'x * y'

        # evaluating expression
	result = eval(expr)

	# printing evaluated result
	print("result = {}".format(result))

User_Func()

```

When we run the above program, we will get the following output.

Output:

```python
Enter the value for x:5
Enter the value of y:5
result = 25

```

In the above program, we create a user-defined method in which we ask users to input the value for x and y; then, we are using eval() in-built method to multiply the x and y, which is passed using expr as an argument.

## eval() method with globals parameter

In eval() method, we can pass a dictionary as an argument using global parameters. It's an optional argument that can pass a dictionary with global variables. 

Global variables are all those variables that were defined in current global scope and can be accessed from anywhere in your program.  
Let's check an example of eval() with global parameters.

### Example 3: eval() method with globals parameter

```python
x = 5
print(eval("x + 10",{"x":x}))

y = 5
print(eval("x + y",{"x":x}))

```

Output:

```python
15
Traceback (most recent call last):
  File "", line 5, in <module>
    print(eval("x + y",{"x":x}))
  File "<string>", line 1, in <module>
NameError: name 'Y' is not defined

```

In the eval() method, we are passing a custom dictionary to a globals parameter as an argument. The eval() method will take only those variables which are declared as globals only.   

In the above program, we declare x in the dictionary. That’s why it gives us the output, but when we are taking y, it is throwing us an error because we have not declared y in the dictionary.

## Rules of eval() method.

In the eval() method, we only execute the statement if it is a string.