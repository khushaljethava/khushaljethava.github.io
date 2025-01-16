---
title: Python sum()
description: The sum() is a built-in python function which sums all the items of a given iterable.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python sum().png
 alt: Python sum()
---

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

## Rules of sum()

* sum() function takes on iterable as parameters.  
* All the iterable must contain numbers as all items.