---
title: Python abs() Function
description: The abs() is a built-in function available in python. Python abs() functions are used to return the python absolute value of the given number.
date: 2024-12-26 21:01:00 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python abs() Function.webp
  alt: Python abs() Function

---

Python's `abs()` function returns the absolute value of a number, converting any negative value to its positive equivalent. It accepts a single argument -- an integer, float, or complex number -- and always returns a non-negative result. For complex numbers, `abs()` returns the magnitude (the distance from zero in the complex plane), calculated as the square root of the sum of the squares of the real and imaginary parts. This is one of Python's most fundamental built-in functions, commonly used in mathematical computations, data validation, distance calculations, and error measurement. Whether you are calculating the difference between two values regardless of direction, implementing loss functions in machine learning, or normalizing data in scientific computing, `abs()` provides a clean, readable way to ensure non-negative results. If you need to convert between number types, see also [Python int()](/posts/Page-34-Python-int()/) and [Python float()](/posts/Page-23-Python-float()/).

## What does abs() return?

The `abs()` function returns the absolute value of the given number. For integers it returns an integer, for floats it returns a float, and for complex numbers it returns the magnitude as a float.

## When should you use abs()?

Use `abs()` whenever you need a non-negative version of a number. This is essential when computing distances, differences, or deviations where direction does not matter. It is also the correct approach when you need the magnitude of a complex number.

The syntax of abs() method:

```python
abs(number)
```


## Python abs() Parameters

We can only give a single argument in the abs() function.

**number** \- A number can be an integer, floating number, or complex number whose absolute value of python will return. 

Let see an example of the abs() function.

Example 1:

```python
#Integer Number
integer = -32
print("The Absolute value of the integer variable is:", abs(integer))

#Floating Number
floating = -12.54
print("The Absolute value of the floating variable is:", abs(floating))

```

The output will be as follow:

```python
The Absolute value of the integer variable is: 32
The Absolute value of the floating variable is: 12.54
```

Unlike integer and floating numbers, complex numbers will not return any absolute value in python, but instead, they will return a magnitude of the complex number.

Example 2:
```python
#Complex Number

complex = (10 - 7j)

print("The Magnitude of 10 - 7j is:", abs(complex))
```

The output is as follows:

```python
The Magnitude of 10 - 7j is: 12.206555615733702
```

## Common Use Cases

**Calculating distance between two points.** When working with coordinates or numerical positions, you often need the distance between two values without caring which is larger. For example, `abs(a - b)` gives the unsigned difference, which is useful in geometry, physics simulations, and UI layout calculations.

**Error measurement and tolerance checking.** In scientific computing and data analysis, `abs()` helps you measure how far a computed result deviates from an expected value. You can check whether an error is within acceptable bounds using something like `abs(actual - expected) < tolerance`.

**Normalizing financial data.** When processing transactions where debits may be stored as negative numbers, `abs()` lets you convert all values to positive amounts for reporting, aggregation, or display purposes.

## Rules of abs()


* If the integer value is passed it will return an integer value only.  
* If the floating value is passed it will return an absolute floating value.  
* If the complex number is passed it will return a magnitude of the given number.

## Related Functions

* [Python round()](/posts/Page-56-Python-round()/) -- round a number to a given precision.
* [Python int()](/posts/Page-34-Python-int()/) -- convert a value to an integer.
* [Python float()](/posts/Page-23-Python-float()/) -- convert a value to a floating-point number.