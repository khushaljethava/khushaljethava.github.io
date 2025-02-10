---
title: Python hex() Method
description: In this tutorial we will learn about python hex() method and it uses with examples.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python hex() Method.png
 alt: Python hex() Method
---

## What is Python hax() method?

The hex()  is the built-in python method used to convert an integer number into their corresponding lowercase hexadecimal string prefixed with “0x”.

The syntax of hex() method is:

```python
hex(integer)
```

## Python hex() Method Parameters

The hex() method takes only one parameter.

* Integer \- An integer number of which hexadecimal wants to return.

Let's check some examples of the hex() method in python.

### Example 1: How to use hex() method in python?

```python
number = 4
print("The Hexadecimal of number 4 is:",hex(number))

number = 896
print("The Hexadecimal of number 896 is:",hex(number))

number = 0
print("The Hexadecimal of number 0 is:",hex(number))

number = -17
print("The Hexadecimal of number -17 is:",hex(number))

returnType = type(hex(number))
print('Return type from hex() is', returnType)

```

The output will be as follow:

```python
The Hexadecimal of number 4 is: 0x4
The Hexadecimal of number 896 is: 0x380
The Hexadecimal of number 0 is: 0x0
The Hexadecimal of number -17 is: -0x11
Return type from hex() is <class 'str'>

```

We are returning a hexadecimal value on an integer, a zero, and a negative integer in the above program. Based on the integer value, you can see the hexadecimal string as shown in the output. Also, you can see that we are using the type method to check the data type of the hex() method output, which is a string.

## Rules of hex() method

Hex () method converts an integer to the corresponding hexadecimal number in string form and returns it.

The returned hexadecimal string starts with the prefix 0x, indicating it's in hexadecimal form.