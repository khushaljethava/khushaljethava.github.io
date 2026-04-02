---
title: Python input() Method
description: In this tutorial, we will learn about python input() method and its uses with  examples.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python input() Method.webp
  alt: Python input() Method
---

The Python `input()` function is a built-in that reads a line of text from standard input and returns it as a string. It accepts a single optional parameter called `prompt`, which is a string displayed to the user before waiting for input. The function reads characters until the user presses Enter, strips the trailing newline, and returns the resulting string. If end-of-file (EOF) is encountered, it raises an `EOFError`. Because `input()` always returns a string, you must explicitly convert the result using functions like `int()` or `float()` if you need a numeric type. A real-world use case is building command-line tools and interactive scripts that require user confirmation, menu selection, or data entry. For example, a deployment script might use `input("Are you sure? (y/n): ")` to confirm a destructive action before proceeding. It is also the foundation for educational programs and coding exercises where learners practice handling user-provided data.

## What does input() return?

The `input()` function returns a string containing the line read from standard input, with the trailing newline character removed.

## When should you use input()?

Use `input()` when building interactive command-line programs that need to collect data, confirmations, or choices from the user during execution.

The python input() method allows users to take input and store the imputed value in a variable as a string.

The syntax of input() method is:

```python
input(prompt)

```


## Python input() Method Parameters

The input() method takes only one optional argument:

* **prompt (Optional)** \- a setting that represents a message before the input. (By default, it will take input as a string.


Let’s see the same example of the input() method in python.

### Example 1: How to use the input() method in python?

```python
# Taking input from a user without any message

user_Input = input()

print("The inputted value is:", user_Input)

```

Output:

```python
Python
The inputted value is: Python

```

### Example 2: Input() method with prompt message.

```python
# Taking input from the user with a message

user_Input = input("Enter anything:")

print("The inputted value is:", user_Input)
```

The output will be as follow:

```python
Enter anything: Python
The inputted value is: Python
```

In the above program, we can see that when we run the program is returning a prompt, and in the same line, we can input the value, and after that, it is storing it in the user\_Input variable.

The input() will automatically take input as a string, but we can use int() and float() to take input as in an integer and float. 

### Example 3: Taking input as integer and float in input() method.

```python
# Taking input in integer and float

user_Input = int(input("Enter anything:"))

print("The inputted value is:", user_Input)
print(type(user_Input))


user_Input = float(input("Enter anything:"))

print("The inputted value is:", user_Input)
print(type(user_Input))

```

The output will be as follows.

```python
Enter anything:25
The inputted value is: 25
<class 'int'>
Enter anything:25
The inputted value is: 25.0
<class 'float'>
```

This is how you can take input from users into different data types.

## Common Use Cases

A common use of `input()` is building interactive menus in command-line applications, where the program presents numbered options and the user types their choice. Another practical scenario is collecting form-like data in scripts, such as asking for a username and password during initial setup or configuration. Developers also use `input()` combined with a `while` loop to create input validation loops that repeatedly prompt until the user provides a value in the expected format.

To convert the string returned by `input()` into an integer, use the [Python int() function](/posts/Page-34-Python-int()/). For displaying output back to the user, see the [Python print() function](/posts/Page-51-Python-print()/).

## Rules of input() method


* The input() method reads a line from the input (usually from the user), converts the line into a string by removing the trailing newline, and returns it.  
    
* If EOF is read, it raises an EOFError exception.