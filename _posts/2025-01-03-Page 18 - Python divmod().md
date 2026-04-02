---
title: Python divmod() Method
description: In this tutorial we will learn about the python divmod() method and how to use it.
date: 2025-01-03 22:15:55 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python divmod() Method.webp
  alt: Python divmod() Method
---

The Python `divmod()` function is a built-in that performs both integer division and modulo in a single operation. It takes two non-complex numeric parameters: a dividend (numerator) and a divisor (denominator). The function returns a tuple containing two values: the quotient from floor division and the remainder from the modulo operation, equivalent to `(a // b, a % b)`. Both integer and floating-point arguments are supported. When both arguments are integers, the result tuple contains integers; when either argument is a float, the result contains floats. A common real-world use case is converting units where division and remainder are both needed, such as converting total seconds into minutes and remaining seconds, or converting total inches into feet and leftover inches.

## What does divmod() return?

The `divmod()` function returns a tuple of two numbers: the floor division quotient and the modulo remainder of dividing the first argument by the second.

## When should you use divmod()?

Use `divmod()` when you need both the quotient and remainder of a division simultaneously, which is more efficient and readable than computing `//` and `%` separately.

## Common Use Cases

A frequent use of `divmod()` is time conversion, such as `divmod(3661, 60)` to split total seconds into 61 minutes and 1 second, then applying `divmod()` again on the minutes to get hours and remaining minutes. Another practical scenario is pagination logic, where `divmod(total_items, items_per_page)` tells you the number of full pages and whether a partial final page is needed. You can also use it in base-conversion algorithms where you repeatedly divide by the target base and collect remainders. Related functions include the [Python float() method](/posts/Page-23-Python-float()/) for working with decimal results and the [Python int() method](/posts/Page-34-Python-int()/) for truncating division results.

## What is Python divmod() Method?


The divmod() method takes two numbers and returns a pair of numbers inside a tuple consisting of their quotient and remainder.

The syntax of divmod() is:

```python
divmod(x,y)

```

## divmod() Parameters 


divmod() takes two parameters:  
x \- a non-complex number that can be referred to as a numerator.  
y \- a non-complex number that can be referred to as denominator

Let see an example of divmod() method.

### Example: How divmod() works in python?

```python
print('divmod(1, 3) = ', divmod(1, 3))
print('divmod(5, 8) = ', divmod(5, 8))
print('divmod(4, 4) = ', divmod(4, 4))

# divmod() with Floats
print('divmod(4.0, 3) = ', divmod(4.0, 3))
print('divmod(7, 9.0) = ', divmod(7, 9.0))
print('divmod(2.6, 0.5) = ', divmod(2.6, 0.5))

```

The output will be as follows.

```python
divmod(1, 3) =  (0, 1)
divmod(5, 8) =  (0, 5)
divmod(4, 4) =  (1, 0)
divmod(4.0, 3) =  (1.0, 1.0)
divmod(7, 9.0) =  (0.0, 7.0)
divmod(2.6, 0.5) =  (5.0, 0.10000000000000009)

```


## Rules of divmod()

(q, r) \- a pair of numbers will be a tuple consisting of quotient q and a remainder r.

If x and y are integers, the return values from divmod() is same as (a //b , x % y).