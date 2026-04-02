---
title: Python round()
description: The round() function returns the floating-point number that will be rounded to the given decimal number.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python round().webp
  alt: Python round()
---

The Python `round()` built-in function rounds a floating-point number to a specified number of decimal places. It accepts two parameters: the number to be rounded and an optional `ndigits` parameter specifying how many decimal places to keep. When `ndigits` is omitted or set to `None`, the function returns the nearest integer as an `int`. When `ndigits` is provided, it returns a float rounded to that many decimal places. Python uses banker's rounding (round half to even) for values exactly halfway between two possible rounded values, which reduces cumulative rounding bias in statistical calculations. Real-world use cases include formatting financial calculations to two decimal places for currency display, rounding scientific measurements to significant digits, cleaning up floating-point arithmetic artifacts like `0.1 + 0.2` producing `0.30000000000000004`, and preparing data for reporting where excessive decimal precision would clutter the output.

## What does round() return?

The `round()` function returns an `int` when called without the `ndigits` parameter, or a `float` rounded to the specified number of decimal places when `ndigits` is provided.

## When should you use round()?

Use `round()` when you need to reduce the precision of a floating-point number for display, reporting, or further computation, keeping in mind that for exact decimal arithmetic in financial applications, the `decimal` module is generally preferred.

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

## Common Use Cases

Formatting financial values for display is one of the most common uses of `round()`. When computing tax amounts, discounts, or totals, rounding to two decimal places with `round(amount, 2)` produces clean currency values suitable for invoices and receipts.

Cleaning up floating-point arithmetic artifacts is another practical application. Since operations like `0.1 + 0.2` produce results like `0.30000000000000004` in floating-point arithmetic, `round()` can eliminate these tiny errors before displaying or comparing values.

Preparing data for summary reports and dashboards frequently involves rounding. When presenting averages, percentages, or statistics to non-technical audiences, rounding to one or two decimal places improves readability without sacrificing meaningful precision.

For computing powers before rounding, see the [Python pow()](/posts/Page-50-Python-pow()/) function. To get the absolute value of a number before or after rounding, the [Python abs()](/posts/Python-abs()/) function is a useful companion.

## Rules of round() function


* If digits are not provided, round() returns the nearest integer to the given number.  
* If digits are given, round() returns the number rounded off to the digits.