---
title: Python pow()
description: The pow() is the built-in function of python that returns the power of a given number.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python pow().webp
  alt: Python pow()
---

The Python `pow()` built-in function computes the power of a number by raising a base to an exponent. It accepts two or three parameters: the base number `x`, the exponent `y`, and an optional modulus `z`. When called with two arguments, `pow(x, y)` returns `x` raised to the power of `y`, equivalent to `x**y`. When the third argument is provided, `pow(x, y, z)` efficiently computes `(x**y) % z` using modular exponentiation, which is significantly faster than computing the full power and then taking the modulus. The function returns an integer when all arguments are integers and the exponent is non-negative, or a float when the exponent is negative. Modular exponentiation with `pow()` is heavily used in cryptographic algorithms such as RSA encryption, Diffie-Hellman key exchange, and digital signatures, where computing large powers modulo a prime number is a core operation. It is also used in mathematical simulations, competitive programming, and scientific computing.

## What does pow() return?

The `pow()` function returns the result of raising the base to the given exponent, optionally reduced by the modulus, returning an integer for non-negative integer exponents or a float for negative exponents.

## When should you use pow()?

Use `pow()` when you need to compute exponentiation, especially with the three-argument form for modular arithmetic in cryptography, number theory, or any scenario where computing `(x**y) % z` efficiently matters.

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

## Common Use Cases

Cryptographic computations are the most important real-world application of `pow()` with three arguments. RSA encryption relies on modular exponentiation to encrypt and decrypt messages, and Python's built-in `pow(base, exp, mod)` uses an optimized algorithm that handles very large numbers efficiently without computing the full intermediate result.

Scientific and engineering calculations frequently use `pow()` for exponentiation. Whether computing compound interest with `pow(1 + rate, years)`, calculating signal attenuation in decibels, or modeling exponential growth and decay, `pow()` provides a clean and readable alternative to the `**` operator.

Competitive programming and number theory problems often require modular arithmetic. Computing Fibonacci numbers modulo a prime, solving modular inverse problems, or checking divisibility patterns all benefit from the three-argument form of `pow()`, which avoids overflow issues and runs in logarithmic time relative to the exponent.

For related mathematical operations, see the [Python round()](/posts/Page-56-Python-round/) function for rounding results, and the [Python divmod()](/posts/Page-18-Python-divmod/) function for combined division and modulus operations.