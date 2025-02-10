---
title: Python Recursion Function
description: In this tutorial, we will learn about the recursion function and create a recursive function in python that can call itself. 
date: 2024-12-19 23:01:00 +0800
categories: [Python]
tags: [python]
image:
  path: /commons/Python Recursion Function.png
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
  alt: Python Recursion Function
---

## What is the recursion Function in Python?

**Recursion** in python is a process by which a function calls *itself* directly or indirectly.

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
Recursion is a common mathematical and programming concept. It means that a function calls itself. This has the benefit of meaning that you can loop through data to reach a result. The Python recursion function is also known as python recursive function

Syntax of recursion function.

```python
def function_name():
	.
	.
	.
	.
	function_name()

```

Let see an example of the python recursion function.

Example of python recursion example:

```python
def factorial(n):
    if n==1:
        print(n)
        return 1
    else:
        print(n,'*', end = ' ')
        return n* factorial(n-1)

print(factorial(10))

```

When we execute the above program, we will get the following output.  
Output:

```python
10 * 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1
3628800

```

When the factorial function is called with 10 as an argument, successive calls to the same function are placed while reducing 10\. Functions start returning to their earlier call after the argument reaches 1\. The return value of the first call is a cumulative product of the return values of all calls.

## 

## Advantages of Recursion Function:

Recursion makes our program:

1\. Easier to write.

2\. Readable – Code is easier to read and understand.

3\. Reduce the code – It takes fewer lines of code to solve a problem using recursion.
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

## Disadvantages of recursion Function:

1\. Not all problems can be solved using recursion.

2\. If you don’t define the base case, then the code would run indefinitely.

3\. Debugging is difficult in recursive functions as the function is calling itself in a loop, and it is hard to understand which call is causing the issue.

4\. Memory overhead – Call to the recursive function is not memory efficient.

