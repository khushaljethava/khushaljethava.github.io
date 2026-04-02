---
title: Python sum()
description: The sum() is a built-in python function which sums all the items of a given iterable.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python sum().webp
  alt: Python sum()
---

The Python `sum()` function is a built-in function that computes the total of all numeric items in an iterable. It accepts two parameters: `iterable` (a sequence of numbers such as a list, tuple, or set) and an optional `start` value that is added to the total (defaulting to 0). The function returns the sum of `start` plus all the numbers in the iterable. It works with integers, floats, and any objects that support the addition operator, but it explicitly does not support strings (use `str.join()` instead). The `sum()` function is essential for financial calculations, statistical computations, and data aggregation tasks. A real-world example is calculating the total price of items in a shopping cart or computing the average of a list of scores by dividing `sum(scores)` by [len()](/posts/Page-38-Python-len()/). It pairs well with list comprehensions and generator expressions for filtered summation.

## What does sum() return?

The `sum()` function returns the arithmetic total of all items in the iterable plus the `start` value. The return type matches the type of the elements being summed (integer, float, etc.).

## When should you use sum()?

Use `sum()` when you need to compute the total of a collection of numbers, such as adding up prices, scores, measurements, or any other numeric data stored in a list, tuple, or generator.

The syntax of the sum() function is:

```python
sum(iterable, start)

```

## sum() Parameters

The sum() functions takes two parameters as argument:

* iterable \- Any iterable or sequence which contains numbers. For Example list, tuple, dict, etc)   
* start (Optional)  \- A value that is added to the return value. Default it will take 0\.  
  


Let see some examples of sum() in python.

### Example 1: How to use sum() with python list?

```python
numbers = [2,8,4,3,7,1]

# start parameter is not provided
numbers_sum = sum(numbers)
print(numbers_sum)

# start = 10
numbers_sum = sum(numbers, 10)
print(numbers_sum)

```


Output:

```python
25
35

```

### Example 2: Using floating numbers with sum() function.

```python
numbers = [4.6,6.2,0.4,5.3]

# start parameter is not provided
numbers_sum = sum(numbers)
print(numbers_sum)

```

Output:

```python
16.5

```

### Example 3 : Using negative numbers with sum() functions.

```python
numbers = [-2,-9,-4,-3,-5]

# start parameter is not provided
numbers_sum = sum(numbers)
print(numbers_sum)

```


Output:

```python
-23

```


## Common Use Cases

A common use case for `sum()` is totaling a list of prices in an e-commerce application, such as `sum(item['price'] for item in cart)`. Another practical scenario is computing running totals or aggregates in data analysis, such as summing monthly revenue figures or sensor readings. It is also frequently combined with [len()](/posts/Page-38-Python-len()/) to calculate averages, or used with the `start` parameter to add a base value like a shipping fee to a subtotal.

## Rules of sum()

* sum() function takes on iterable as parameters.  
* All the iterable must contain numbers as all items.