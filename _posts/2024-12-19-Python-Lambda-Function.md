---
title: Python Lambda Function
description: In this tutorial, we will learn about the python lambda function, also known as the Anonymous function in python. We will learn about lambda functions, their syntax, and how to use them.
date: 2024-12-19 02:57:00 +0800
categories: [Python]
tags: [python]
image:
  path: /commons/Python Lambda Function.png
  alt: Python Lambda Function
---

## What is Python Lambda Function?

In Python, the lambda function is used to make an anonymous function that can be defined without any name.

## How to define python lambda functions?

We can define the lambda function in python using the lambda function.

Syntax of the lambda function.

```python
lambda arguments: statements 

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
Lambda functions can have any number of arguments but only one expression. The expression is evaluated and returned. Lambda functions can be used wherever function objects are required.

Let us see an example of the lambda function.

Example of python lambda example:

```python
x = 21

lambda_fun = lambda x: x * x * x

print(lambda_fun(2))

```

The output will be as follows.

```python
8

```

Here we are defining the lambda function inside lambda\_fun to illustrate the cube of a number.  
 And the program is doing the calculations of  2 \* 2 \*2 in the lambda function. Here x: is the argument, and x\*x\*x is the expression that gets evaluated and returned.

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
### Why use the lambda in python?

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
The Lambda function is a potent function in python that can be declared inside the conditional statement, loops, and even lambda function inside the normal function.

Let's see the type of lambda.

Example of using type() function in lambda function:

```python
x = 21

lambda_fun = lambda x: x * x * x

print("The of of Lambda function is: ",type(lambda_fun))

print("When we use lambda without argument:", lambda_fun)

```

When we run the above program, we will get the following result.

Output:

```python
The of of Lambda function is:  <class 'function'>
When we use lambda without argument: <function <lambda> at 0x7f536c58d9d0>

```

Let us see the example and understand the difference between defining a function using def and the same with a lambda function.

Example:

```python
# Normal function declaration

def calcu(y):
    return y + 2

# lambda function declaration

lambda_calcu = lambda y: y + 2


#printing result by calling normal function

print(calcu(10))

#printing result by calling lambda function

print(lambda_calcu(10))

```

The output will be as follows.

```python
12
12
```

As we can see in the above program, both calcu() and lambda\_calcu() functions behave the same and as intended.

* **Without using Lambda:** Here, both of them return the cube of a given number. But, while using def, we needed to define a function with a name cube and required to pass a value to it. After execution, we were also required to return the result from where the function was called using the *return* keyword.  
* **Using Lambda:** Lambda’s definition does not include a “return” statement. It always contains an expression that is returned. We can also put a lambda definition anywhere a function is expected, and we don’t have to assign it to a variable at all. This is the simplicity of lambda functions.
