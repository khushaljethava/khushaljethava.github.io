---
title: Python Input and Output
description: In this tutorial, we will learn about the input function.
date: 2024-12-3 07:25:00 +0800
categories: [Python]
tags: [python]
image:
  path: /commons/Python Input and Output.png
  alt: Python Input and Output

---


The input function is used to input the user and store it into variables. Input function can store a string or a numeric value.

The Input function can be defined with the input() function.

Syntax of input  
   
Name = input(message)

As we can see in the above syntax, first, we declare a variable, then assign the input function to that variable, and in between brackets, we add a string as a message which will be print when we run the program. By default, I will store all the given values in a String. If we want to take value in integer, we need to use int() function and float, and we need to use float() function.

Example:

```python
X = input()

print(X)

```

Output:

```python
25
25 
```

Let run it one more time and use string as an input.

Output:

```python
Apple
Apple
```

As you can see, we don’t need to specify any data type in the input function; it will store what every user has given.

Example:

```python
X = int(input("Enter a number:"))

print(X)
```

Output

```python
Enter a number:	22
22
```

Here we ask the user to enter a number, and then the input function is storing it in a variable as an integer using the int() function.

Example:

```python
X = float(input("Enter a number:"))

print(X)
```

Output:

```python
Enter a number:2.5
2.5
```

Here we are storing a value into a float.

### How the input function works in Python : 

* When the input() function is called at the time of the program’s execution, it will stop the program’s flow until the user has given any input in a string or numerical.  
    
* The text or message displayed on the output screen to ask a user to enter the input value is optional, i.e., the prompt printed on the screen is optional.  
* Whatever you enter as input, the input function converts it into a string. If you enter an integer value, the still input() function converts it into a string.

Example 3 

```python
X = input("Enter your name:")

print(X)

```

Output:

```python
Enter your name:	 Python 
Python 
```

Example 4:

```python
X = input("Enter Your Name Here:")
Y = input("Enter Your Age Here:")

print("Your Name is " + X + " and Your Age is " + Y)
```

Output:

```python
Enter Your Name Here: Python
Enter Your Age Here:24
Your Name is Python, and Your Age is 24
```

As we can see here, we have used two input functions, and we can use as many as we need.

## 

## Operations using the input function

We can also do different operations using operators(Operator page link) like Addition, substation, and many more.

Let take an example with the python operator.

Example 5:

```python
X = int(input("Add a First Number:"))
Y = int(input("Add a Second Number:"))

print("Addition of two number is:", X+Y)
```

Output:

```python
Add a First Number:25
Add a Second Number:25
Addition of two number is: 50
```

In the same way, we can also create our calculator program using python.

Example:

```python
X = int(input("Add a First Number:"))
Y = int(input("Add a Second Number:"))

print("Addition of two number is:", X+Y)

print("Subtraction of two number is:", X-Y)

print("Multiplication of two number is:", X*Y)

print("Division of two number is:", X/Y)

print("Modulus of two number is:", X%Y)

print("Exponent of two number is:", X**Y)

print("Floor Division of two number is:", X//Y)
```

Output:

```python
Add a First Number:25
Add a Second Number:12
Addition of two number is: 37
Subtraction of two number is: 13
Multiplication of two number is: 300
Division of two number is: 2.0833333333333335
Modulus of two number is: 1
Exponent of two number is: 59604644775390625
Floor Division of two number is: 2

```

## 

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4181667199679058"
     crossorigin="anonymous"></script>