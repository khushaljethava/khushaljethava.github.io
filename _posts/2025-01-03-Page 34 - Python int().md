---
title: Python int()
description: The int() is the built-in method of python, which converts any number or string objects into an integer object; it is also used for typecasting the integer number.
date: 2025-01-03 22:42:23 +0800
categories: [Python]
tags: [python]
image:
 path: /commons/Python int().png
 alt: Python int()
---

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

## Rules of int() method

* an integer object from the given number or string treats the default base as 10  
* (No parameters) returns 0  
* (If base given) treats the string in the given base (0, 2, 8, 10, 16\)