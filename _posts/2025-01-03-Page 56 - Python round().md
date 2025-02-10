---
title: Python round()
description: The round() function returns the floating-point number that will be rounded to the given decimal number.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python round().png
 alt: Python round()
---

The syntax of the round() function is :

```python
round(number, digits)
```

## round() Parameters

The round() function takes two parameters as arguments:

* **number** \- number to be rounded floating-point to return.  
* **digits (optional)** \- The number of decimals to use when rounding the number. Default is 0

Let see some examples of the python round() function.

### Example 1: How to use Python round() function?

```python
# for integers
print(round(4))

# for floating point
print(round(13.1))

# even choice
print(round(7.7))

```

Output:

```python
4
13
8

```

### Example 2: How to round a number to the given number of decimal places?

```python
print(round(4.738, 2))
print(round(4.778, 2))

```

Output:

```python
4.74
4.78

```

## Rules of round() function

* If digits are not provided, round() returns the nearest integer to the given number.  
* If digits are given, round() returns the number rounded off to the digits.