---
title: Python Function with Argument 
description: In the tutorial, we will learn about how to use arguments in user-defined functions.
date: 2024-12-19 12:24:00 +0800
categories: [Python]
tags: [python]
image:
  path: /commons/Python Function with Argument .png
  alt: Python Function with Argument 
---

## Python Function with Argument

We can add user-defined parameters in functions as Arguments.

Python arguments are specified after the function name inside the parentheses. You can add as many arguments as you want; just separate them with a comma.

We can add an argument in between the brackets after the function. Python parameters can be defined in two ways.

Syntax of function with argument.

```python
def function_name(argument)

```

Let see an example of the python function with an argument.

```python
def my_function(name):
    print("Hello",name) 

my_function("Python")

```

Output:

```python
Hello Python

```

As we can see, we are using the name as an argument, and we are printing the argument inside the function. 

Then, we are calling the function with the parameters in python as a string.

## Multiple arguments in a python function

We can also add more than one argument in the python function by adding a comma (,) between two arguments. 

Syntax of multiple arguments.

```python
def function_name(argument1, argument2)

```
Let's check an example of multiple arguments.

Example: 

```python
def my_function(fname, lname):
    print(fname + lname) 

my_function("Elon","Musk")

```

The output will be as follows.

```python
ElonMusk

```

Here we are giving two string arguments as the first name as Elon and last name as Musk, and as we can see the output, there is no space between first and last name because we are not using any space in the argument.

## Python Default Arguments in Function

We can add the default value in the function argument.

We can provide a default value as an argument by using the assignment operator (=).

Syntax of default argument.

```python
def function_name(argument1, argument2 = value)

```

Let's check an example of the default argument in the python function.

Example:

```python
def my_function(name, msg = "Hello"):
    print(msg + name) 

my_function("Python")

```

When we execute the above program, we will get the following output.

Output:

```python
HelloPython

```

As we can see, we have used the default value in the msg argument. When we call the function, we are only using one parameter. The second argument is called automatically, as we already declared. 

## Python Arbitrary Arguments, \*args

Python Arbitrary Argument used too many arguments without knowing the number of arguments passed into your function.

We can use the \* operator before the parameter name in the function definition.

Syntax of Python arbitrary argument.

```python
def function_name(*arguments)

```
Let check an example of Arbitrary Arguments.

Example:

```python
def my_function(*arguments):
    print("This is args arguments", arguments)
    print("We can also slice the args argument:",arguments[2:6])


my_function(1,2,3,5,6,7,8,9,)

```

Output:

```python
This is args arguments (1, 2, 3, 5, 6, 7, 8, 9)
We can also slice the args argument: (3, 5, 6, 7)

```

This way, the function will receive a *tuple* of arguments and can access the items accordingly:

## Arbitrary Keyword Arguments, \*\*kwargs

If we do not know how many keyword arguments will be passed into your function, add two asterisks: \*\* before the parameter name in the function definition.

This way, the function will receive a *dictionary* of arguments and access the items accordingly.

Let see an example of kwargs arguments.

Example:

```python

def my_function(**arguments):
    print("This is args arguments", arguments)
 my_function(Fruit1 = "Banana", Fruit2 = "Apple",Fruit3 = "Cherry")

```

When we run the above program we will get following output:

```python

This is args arguments {'Fruit1': 'Banana', 'Fruit2': 'Apple', 'Fruit3': 'Cherry'}

```

## Passing a List as an Argument using for loop

We can send any data type of argument to a function (string, number, list, dictionary, etc.), and it will be treated as the same data type inside the function.

Example of addition of list using for loop:

```python

def my_function(numbers):
    sum = 0
    for i in numbers:
        print("The Number is: ", i)
        sum = sum + i
    print("The total of list is: ", sum)
numbers_list = [3,6,8,1,0,3,7,2,9]
my_function(numbers_list)

```

The output will be as follow.

```python

The Number is :  3
The Number is:  6
The Number is:  8
The Number is:  1
The Number is :  0
The Number is :  3
The Number is:  7
The Number is:  2
The Number is:  9
The total of the list is:  39

```

## Using if condition in Python Function

We can add if conditional statement inside a python function.

Let us check an example of if condition in the python function.

Example:

```python

def my_function(fruits):
    for fruit in fruits:
        if fruit == "banana":
            print("Banana is present in the list.")


fruits = ["apple", "banana", "cherry"]

my_function(fruits)

```

The output will be as follows.

```python

Banana is present in the list.

```

Here we are adding a for loop inside the function for iterate through the list, and inside the for loop, we are giving the condition to check whether the banana is present in the list.

