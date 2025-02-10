---
title: Python pow()
description: The pow() is the built-in function of python that returns the power of a given number.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python pow().png
 alt: Python pow()
---

The syntax of pow() is:

```python
pow(x, y, z)

```

## pow() Parameters

The pow() function takes three parameters as argument:

* x \- a base number.  
* y \- an exponent number.  
* z (optional) \- a number that can be used as modulus.


pow() function indicates the calculation of the power of a given number that is x\*\*y which is equal to xy , and the calculation with modulus is xy % z.

Let see some examples of pow() functions in python.

### Example 1: How to use the pow() function in python?

```python
# positive x, positive y (x**y)
print(pow(2, 2))    # 4

# negative x, positive y
print(pow(-2, 2))    # 4  

# positive x, negative y
print(pow(2, -2))    # 0.25

# negative x, negative y
print(pow(-2, -2))    # 0.25

```

Output:

```python
4
4
0.25
0.25

```

### Example 2: How to use pow() with modules argument?

```python
x = 7
y = 2
z = 5

print(pow(x, y, z))    # 4

```

Output:

```python
4

```

Here we are calculating (x\*\*y) % z, and that 7 powered by 2 equals 49\. So then, 49 modulus 5 equals 4 in ablow program.