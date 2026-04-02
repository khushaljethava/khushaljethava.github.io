---
title: Python float() Method
description: In this tutorial we will learn about python float() method and ts uses.
date: 2025-01-03 22:15:55 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python float() Method.webp
  alt: Python float() Method
---

The Python `float()` function is a built-in that converts a number or a string into a floating-point number. It takes a single optional parameter, which can be an integer, a string containing a numeric value, or a boolean. When called with no arguments, it returns `0.0`. The function also accepts the special string values `'nan'` (not a number), `'inf'`, and `'-inf'` for representing IEEE 754 special floating-point values. It returns a `float` object representing the decimal number. Strings with leading and trailing whitespace are handled automatically. A common real-world use case is parsing user input or data from CSV files and APIs where numeric values arrive as strings and need to be converted to floating-point numbers for mathematical operations, financial calculations, or scientific computing.

## What does float() return?

The `float()` function returns a floating-point number converted from the given integer, string, or boolean input, or `0.0` when called with no arguments.

## When should you use float()?

Use `float()` when you need to convert string or integer data to decimal numbers for arithmetic, especially when processing external input from files, forms, or API responses where numbers are represented as strings.

## Common Use Cases

A common use of `float()` is parsing numeric input from command-line arguments or web forms, where all input arrives as strings and must be converted before calculations. Another practical scenario is normalizing data types when reading CSV files, where columns may contain a mix of integer and decimal values that should all become floats for consistent mathematical operations. It is also used for type checking and coercion in data pipelines where incoming JSON values might be integers that need to be floats for division or percentage calculations. Related functions include the [Python int() method](/posts/Python-int()-Method/) for converting to integers and the [Python format() method](/posts/Python-format()-Method/) for controlling how float values are displayed.

## What is python float() method?


The python float() method returns the floating-point number of a given number or a string; we can also use it for typecasting in python.

The syntax of float() is:

```python
float(variable)

```


## float() Parameters

The float() method takes only one parameter as an argument:

**variable**  \-  a number or string that needs to be typecast to a floating-point number.

Let's check an example of the float() method.

### Example 1: How to use float()  in python

```python
print(float(4))

print(float(6.5))

print(float(-72))

print(float("345"))

print(float("   98      "))

print(float(True))

print(float(False))

```

The output will be as follows.

```python
4.0
6.5
-72.0
345.0
98.0
1.0
0.0

```

In the above program, we take multiple values like integer, string, string with whitespace, negative integer, and boolean. As you can see, we are using the float() method to convert them into a floating-point number. But when we use a boolean value, it will give 1.0 for True and 0.0 for False value.

We need to remember that it should be in numbers or Nan(not a number); otherwise, it will raise an error.

### Example 2: How to use float() with string in python?

```python
print(float("34"))

print(float("67.34"))

print(float("PythonScholar"))

```

Output:

```python
34.0
67.34
Traceback (most recent call last):
  File "", line 5, in <module>
    print(float("PythonScholar"))
ValueError: could not convert string to float: 'PythonScholar.'

```

As you can see in the output, it converts all the strings with numbers but throws an error when using a string with PythonScholar because we cannot convert a string that is not a number.

### Example 3: using float() with infinity and Nan(not a number)?

```python
# NaN in float

print(float("nan"))

print(float("NaN"))

# inf/infinity in float

print(float("inf"))
print(float("InF"))
print(float("InFiNiTy"))
print(float("infinity"))

```

The output will be as follow:

```python
nan
nan
inf
inf
inf
inf

```


## Rules of float() method

* An argument must be an integer, string with a number, boolean, or Nan value.   
* If the 0.0 value is passed, it will not return anything.  
* It will cause an OverflowError exception when the argument is passed outside of the range of python float.