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

The Python `pow()` built-in function computes the power of a number by raising a base to an exponent. It accepts two or three parameters: the base number `x`, the exponent `y`, and an optional modulus `z`. When called with two arguments, `pow(x, y)` returns `x` raised to the power of `y`, equivalent to `x**y`. When the third argument is provided, `pow(x, y, z)` efficiently computes `(x**y) % z` using modular exponentiation, which is significantly faster than computing the full power and then taking the modulus.

The function returns an integer when all arguments are integers and the exponent is non-negative, or a float when the exponent is negative. Modular exponentiation with `pow()` is heavily used in cryptographic algorithms such as RSA encryption, Diffie-Hellman key exchange, and digital signatures, where computing large powers modulo a prime number is a core operation. It is also used in mathematical simulations, competitive programming, and scientific computing.

This guide covers the full syntax, parameters, multiple code examples, real-world use cases, edge cases, tips, and frequently asked questions so you can confidently use `pow()` in any Python project.

## What does pow() return?

The `pow()` function returns the result of raising the base to the given exponent, optionally reduced by the modulus:

- **`pow(x, y)`** returns `x ** y`. Returns an `int` if both arguments are integers and `y >= 0`; returns a `float` if `y` is negative or either argument is a float.
- **`pow(x, y, z)`** returns `(x ** y) % z` computed efficiently. Always returns an `int` when all three arguments are integers.

---

## When should you use pow()?

Use `pow()` when you need to compute exponentiation, especially with the three-argument form for modular arithmetic in cryptography, number theory, or any scenario where computing `(x**y) % z` efficiently matters. The three-argument form is substantially faster than `(x**y) % z` when the exponent is large, because it applies the modulus at each step rather than computing the enormous intermediate result first.

---

## Syntax of pow()

```python
pow(x, y, z)
```

## pow() Parameters

The `pow()` function takes three parameters as argument:

| Parameter | Description |
|-----------|-------------|
| `x` | Base number. Required. |
| `y` | Exponent number. Required. |
| `z` | Modulus. Optional. When provided, `pow()` returns `(x**y) % z`. |

`pow()` calculates `x**y` (x raised to the power y), and when `z` is supplied, it computes `(x**y) % z`.

---

## Example 1: How to use the pow() function in python?

```python
# positive x, positive y (x**y)
print(pow(2, 2))    # 4

# negative x, positive y
print(pow(-2, 2))   # 4

# positive x, negative y
print(pow(2, -2))   # 0.25

# negative x, negative y
print(pow(-2, -2))  # 0.25
```

Output:

```
4
4
0.25
0.25
```

When the exponent is negative, Python returns a float because the result is a fractional number. `2**-2` equals `1/4 = 0.25`.

---

## Example 2: How to use pow() with the modulus argument?

```python
x = 7
y = 2
z = 5

print(pow(x, y, z))  # 4
```

Output:

```
4
```

Here we are calculating `(x**y) % z`. The value `7` raised to the power `2` equals `49`. Then `49 % 5 = 4`. The three-argument `pow()` computes this efficiently using Python's built-in fast modular exponentiation.

---

## Example 3: Large modular exponentiation (cryptography use case)

One area where `pow(x, y, z)` shines is cryptography. RSA encryption involves computing values like `message ** public_exp % modulus` where the numbers can be hundreds of digits long.

```python
# Simulated RSA-style modular exponentiation
base = 12345678901234567890
exponent = 65537          # Common RSA public exponent
modulus = 998244353        # A large prime

result = pow(base, exponent, modulus)
print(result)
```

Without the three-argument form, you would have to compute `base ** exponent` — an astronomically large number — before taking the modulus. With `pow(base, exponent, modulus)`, Python uses the square-and-multiply algorithm internally and never materializes the full intermediate value, running in `O(log exponent)` multiplications.

---

## Example 4: Modular inverse using pow()

Since Python 3.8, you can compute the modular inverse of `x` modulo `m` by calling `pow(x, -1, m)`. This finds `y` such that `(x * y) % m == 1`.

```python
# Find modular inverse of 3 modulo 11
inverse = pow(3, -1, 11)
print(inverse)  # 4

# Verify
print((3 * inverse) % 11)  # 1
```

Output:

```
4
1
```

This is extremely useful in number theory and cryptographic algorithms that require division within modular arithmetic.

---

## Example 5: Floating-point exponentiation and compound interest

`pow()` handles float bases and exponents, making it suitable for scientific calculations.

```python
# Compound interest: A = P * (1 + r)^n
principal = 1000
rate = 0.05
years = 10

amount = principal * pow(1 + rate, years)
print(f"Amount after {years} years: ${amount:.2f}")

# Square root using fractional exponent
print(pow(16, 0.5))   # 4.0
print(pow(27, 1/3))   # 3.0
```

Output:

```
Amount after 10 years: $1628.89
4.0
3.0
```

---

## Common Use Cases

### Cryptographic computations

Cryptographic computations are the most important real-world application of `pow()` with three arguments. RSA encryption relies on modular exponentiation to encrypt and decrypt messages, and Python's built-in `pow(base, exp, mod)` uses an optimized algorithm that handles very large numbers efficiently without computing the full intermediate result. The Diffie-Hellman key exchange protocol also depends on efficient modular exponentiation to derive shared secrets.

### Scientific and engineering calculations

Scientific and engineering calculations frequently use `pow()` for exponentiation. Whether computing compound interest with `pow(1 + rate, years)`, calculating signal attenuation in decibels, or modeling exponential growth and decay, `pow()` provides a clean and readable alternative to the `**` operator when the base and exponent are variables rather than literals.

### Competitive programming and number theory

Competitive programming and number theory problems often require modular arithmetic. Computing Fibonacci numbers modulo a prime, solving modular inverse problems, or checking divisibility patterns all benefit from the three-argument form of `pow()`, which avoids overflow issues and runs in logarithmic time relative to the exponent.

---

## Edge Cases and Pitfalls

**1. `pow(0, 0)` returns 1.**
By mathematical convention, any number raised to the power zero equals 1, including `0**0`. Python follows this convention: `pow(0, 0)` returns `1`.

**2. Negative exponents require float results.**
`pow(2, -3)` returns `0.125` (a float). If you need integer division, use `1 // pow(2, 3)` instead.

**3. The three-argument form requires integer arguments.**
`pow(2.0, 3, 5)` raises `TypeError` because the modulus form only works with integers. Ensure all three arguments are integers when using the modular form.

**4. `pow(x, -1, m)` requires `x` and `m` to be coprime.**
If `gcd(x, m) != 1`, Python raises `ValueError: base is not invertible for the given modulus` because the modular inverse does not exist.

**5. Very large non-modular exponentiation is slow.**
`pow(2, 10_000_000)` without a modulus will attempt to create an astronomically large integer and will be extremely slow or run out of memory. Always use the three-argument form with a modulus when working with large exponents in algorithms.

---

## Tips and Best Practices

- **Prefer `pow(x, y, z)` over `(x**y) % z`** whenever `y` is large. The built-in form stays memory-efficient by applying the modulus at each step.
- **Use `pow(x, 0.5)` for square roots**, but prefer `math.sqrt(x)` for clarity and slightly better float performance.
- **Use `math.pow()` when you need a float result.** `math.pow(x, y)` always returns a float, which is useful for consistent return types.
- **For modular inverse**, prefer `pow(a, -1, m)` (Python 3.8+) over implementing the extended Euclidean algorithm manually.
- **Combine with `functools.reduce()`** for chain exponentiation in tower-of-powers calculations.

---

## Frequently Asked Questions

**Q1: What is the difference between `pow(x, y)` and `x**y`?**
For most use cases they are equivalent — both compute `x` raised to the power `y`. The key difference is that `pow()` accepts a third argument (modulus) which `**` does not support. Additionally, `pow()` is a function and can be passed as a callable to higher-order functions like `map()`, while `**` is an operator. For large integer exponents, both use Python's efficient big-integer arithmetic.

**Q2: Why is `pow(x, y, z)` faster than `(x**y) % z`?**
The expression `(x**y) % z` first computes the full value of `x**y` — which can be an enormous integer with thousands of digits — and then takes the modulus. `pow(x, y, z)` uses modular exponentiation (the square-and-multiply algorithm) which applies `% z` after each squaring step, keeping intermediate values small (at most `z**2`). This reduces time complexity from `O(y)` to `O(log y)` multiplications and memory from `O(y * log x)` bits to `O(log z)` bits.

**Q3: Can I use pow() with complex numbers?**
Yes. Python's `pow()` can handle complex number bases when called with two arguments: `pow(1+2j, 3)` returns a complex result. However, the three-argument modular form does not support complex numbers and will raise `TypeError`. For complex exponentiation, you can also use the `cmath` module which provides additional mathematical functions for complex numbers.

---

For related mathematical operations, see the [Python round()](/posts/Page-56-Python-round()/) function for rounding results, and the [Python divmod()](/posts/Page-18-Python-divmod()/) function for combined division and modulus operations.