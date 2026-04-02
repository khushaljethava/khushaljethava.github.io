---
title: Python int()
description: The int() is the built-in method of python, which converts any number or string objects into an integer object; it is also used for typecasting the integer number.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python int().webp
  alt: Python int()
---

The Python `int()` function is a built-in that converts a number or string into an integer object. It accepts two optional parameters: `value`, which is the number or string to convert (defaulting to `0` if omitted), and `base`, which specifies the numeral system of the input string (defaulting to `10`). When given a float, `int()` truncates toward zero, discarding the decimal portion. When given a string, it parses the digits according to the specified base, supporting binary (base 2), octal (base 8), decimal (base 10), and hexadecimal (base 16) representations. A `ValueError` is raised if the string contains characters invalid for the given base. A common real-world use case is processing user input or file data that arrives as strings but needs to be used in arithmetic operations. For instance, reading a port number from a configuration file requires converting the string `"8080"` to the integer `8080`. The `int()` function is also essential for base conversion tasks in data encoding and low-level systems programming.

## What does int() return?

The `int()` function returns an integer object created from the given number or string, or `0` if no arguments are provided.

## When should you use int()?

Use `int()` when you need to convert strings, floats, or values in other numeral systems into Python integers for arithmetic, indexing, or comparison operations.

The syntax of int() is:

```python
int(value, base)

```

## int() Parameters

int() method takes two parameters as an argument:

* **value** \- A number or string object which wants to convert into an integer number. By default, it takes zero as an argument.  
* **base** \- A base number that represents the number format. The default value is 10\.


Let us see some examples of int() methods in python.

### Example 1: How to use the int() method in python?

```python
print(int(123))

print(int(123.456))

print(int("123"))

```

Output:

```python
123
123
123

```


### Example 2: How int() works for decimal, octal, and hexadecimal?

```python
# binary 0b or 0B
print("For 1010, int is:", int('1010', 2))
print("For 0b1010, int is:", int('0b1010', 2))

# octal 0o or 0O
print("For 12, int is:", int('12', 8))
print("For 0o12, int is:", int('0o12', 8))

# hexadecimal
print("For A, int is:", int('A', 16))
print("For 0xA, int is:", int('0xA', 16))

```


Output:

```python
For 1010, int is: 10
For 0b1010, int is: 10
For 12, int is: 10
For 0o12, int is: 10
For A, int is: 10
For 0xA, int is: 10

```

It will cause an “invalid literal for int()” error when using strings with non-numerical values.

```python
print(int("Python"))
```

The output will be as follow:

```python
Traceback (most recent call last):
  File "", line 1, in <module>
    print(int("Python"))
ValueError: invalid literal for int() with base 10: 'Python'

```

## Common Use Cases

A frequent use of `int()` is converting user input from `input()`, which always returns a string, into a numeric type for calculations such as age verification, quantity counting, or mathematical operations. Another common scenario is parsing hexadecimal or binary strings from hardware registers, network protocols, or configuration files using `int('0xff', 16)` or `int('1010', 2)`. Developers also use `int()` to truncate floating-point numbers when they need the integer portion without rounding, such as calculating page numbers from a total item count and page size.

To convert an integer to its hexadecimal representation, see the [Python hex() method](/posts/Page-31-Python-hex()/). For converting to a floating-point number instead, use the [Python float() function](/posts/Page-23-Python-float()/).

## Rules of int() method

* an integer object from the given number or string treats the default base as 10  

* (No parameters) returns 0  
* (If base given) treats the string in the given base (0, 2, 8, 10, 16\)