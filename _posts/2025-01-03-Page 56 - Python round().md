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

The Python `round()` built-in function rounds a floating-point number to a specified number of decimal places. It is one of the most frequently used numeric functions in Python, appearing in everything from financial software to scientific data pipelines. Whether you need to trim excess decimal places from a calculation result, snap a value to the nearest integer, or clean up floating-point arithmetic noise, `round()` provides a concise and readable solution.

Understanding `round()` thoroughly goes beyond simply calling it with a number. Python uses a specific rounding strategy called **banker's rounding** (also known as round-half-to-even), which differs from the common "round half up" rule most people learned in school. This distinction becomes critical when building applications where accumulated rounding errors can compound over thousands of calculations, such as billing systems or statistical models.

In this guide you will learn the full syntax of `round()`, explore its parameters in detail, see practical code examples across multiple real-world scenarios, understand edge cases and pitfalls, and get answers to frequently asked questions.

---

## Syntax of round()

```python
round(number, ndigits)
```

The syntax is intentionally simple. The function accepts one required argument and one optional argument, and it returns either an integer or a float depending on how it is called.

---

## round() Parameters

The `round()` function takes two parameters:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `number` | int, float | Yes | The number you want to round. |
| `ndigits` | int | No | The number of decimal places to round to. Defaults to `None`, which rounds to the nearest integer. |

**Key detail about `ndigits`:** When `ndigits` is `None` or omitted, `round()` returns a plain Python `int`. When `ndigits` is supplied (even if it is `0`), `round()` returns a `float`.

```python
print(type(round(3.7)))       # <class 'int'>
print(type(round(3.7, 0)))    # <class 'float'>
```

`ndigits` can also be **negative**, which rounds to the left of the decimal point. For example, `round(1523, -2)` rounds to the nearest hundred, returning `1500`.

---

## What does round() return?

- Without `ndigits`: returns the nearest **integer** (`int` type).
- With `ndigits`: returns a **float** rounded to that many decimal places.
- With negative `ndigits`: returns an **int** rounded to the specified power of ten.

---

## Example 1: Basic usage of round()

```python
# Rounding an integer (no change)
print(round(4))          # 4

# Rounding a float to nearest integer
print(round(13.1))       # 13
print(round(7.7))        # 8

# Rounding to specific decimal places
print(round(3.14159, 2)) # 3.14
print(round(3.14159, 4)) # 3.1416
```

**Output:**
```
4
13
8
3.14
3.1416
```

The first call passes an integer and simply returns it unchanged. The float examples demonstrate basic rounding: `13.1` drops to `13` because the decimal part is below 0.5, while `7.7` rounds up to `8`.

---

## Example 2: Rounding to a given number of decimal places

```python
print(round(4.738, 2))   # 4.74
print(round(4.778, 2))   # 4.78
print(round(1.005, 2))   # May not be 1.01 - see edge cases below
print(round(9.9999, 3))  # 10.0
```

**Output:**
```
4.74
4.78
1.0
10.0
```

Notice `round(1.005, 2)` returns `1.0` rather than the expected `1.01`. Because `1.005` cannot be represented exactly in binary floating-point, the stored value is slightly less than `1.005`, causing it to round down. This is not a bug in `round()`; it is a fundamental property of IEEE 754 floating-point arithmetic.

---

## Example 3: Negative ndigits and banker's rounding

```python
# Negative ndigits rounds to the left of the decimal point
print(round(1523, -1))   # 1520  (nearest ten)
print(round(1523, -2))   # 1500  (nearest hundred)
print(round(1523, -3))   # 2000  (nearest thousand)

# Banker's rounding: round half to even
print(round(0.5))        # 0  (rounds to nearest even: 0)
print(round(1.5))        # 2  (rounds to nearest even: 2)
print(round(2.5))        # 2  (rounds to nearest even: 2)
print(round(3.5))        # 4  (rounds to nearest even: 4)
```

**Output:**
```
1520
1500
2000
0
2
2
4
```

Banker's rounding is the reason `round(0.5)` returns `0` instead of `1`. When a value is exactly halfway between two integers, Python rounds to the nearest **even** integer. This behavior reduces the cumulative upward bias that "always round half up" introduces in large datasets.

---

## Real-World Use Cases

### 1. Financial calculations

Currency values should almost always be displayed with exactly two decimal places. Using `round()` makes totals and line items appear clean on invoices and receipts:

```python
price = 19.99
tax_rate = 0.085

tax = round(price * tax_rate, 2)
total = round(price + tax, 2)

print(f"Price:  ${price}")
print(f"Tax:    ${tax}")
print(f"Total:  ${total}")
```

**Output:**
```
Price:  $19.99
Tax:    $1.69
Total:  $21.68
```

For applications where every cent matters (e.g., accounting systems), prefer Python's `decimal.Decimal` with explicit rounding modes over `round()` on floats.

### 2. Cleaning up floating-point noise

Standard floating-point arithmetic frequently produces tiny errors that are irrelevant to the problem but ugly in output:

```python
result = 0.1 + 0.2
print(result)              # 0.30000000000000004

clean = round(result, 10)
print(clean)               # 0.3
```

Rounding to 10 decimal places eliminates the tiny error while preserving all meaningful precision.

### 3. Data reporting and dashboards

When presenting statistics to non-technical audiences, excessive decimal places reduce readability without adding value:

```python
scores = [88.3456, 91.7812, 76.4923, 95.1100]
average = sum(scores) / len(scores)

print(f"Raw average:     {average}")
print(f"Rounded average: {round(average, 1)}")
```

**Output:**
```
Raw average:     87.93727499999999
Rounded average: 87.9
```

### 4. Bucketing sensor data

In IoT or scientific applications, sensor readings often need to be snapped to a grid for grouping and aggregation:

```python
temperatures = [23.47, 23.51, 24.03, 23.96, 24.48]
bucketed = [round(t) for t in temperatures]
print(bucketed)   # [23, 24, 24, 24, 24]
```

---

## Edge Cases and Pitfalls

### Floating-point representation issues

As shown in Example 2, `round(1.005, 2)` returns `1.0` instead of `1.01`. The literal `1.005` is stored as approximately `1.00499999999999989341...` in double precision. Because the stored value is below the midpoint, rounding goes down. Use `decimal.Decimal('1.005')` when the midpoint case is critical.

### round() on custom objects

If you define a custom class, you can control how `round()` behaves by implementing the `__round__` dunder method:

```python
class Temperature:
    def __init__(self, value):
        self.value = value

    def __round__(self, ndigits=0):
        return round(self.value, ndigits)

t = Temperature(36.6789)
print(round(t, 1))   # 36.7
```

### Negative ndigits with floats

Negative `ndigits` works with floats too, not just integers:

```python
print(round(12345.678, -2))   # 12300.0
```

---

## Tips for Using round()

- **Use `decimal.Decimal` for money.** `round()` on floats is fine for display, but use `Decimal` with `ROUND_HALF_UP` for financial calculations that require auditability.
- **Understand banker's rounding.** If you specifically need "round half up" behavior, use `math.floor(x + 0.5)` or the `decimal` module.
- **Chain with other numeric functions.** Use `abs()` before rounding negative numbers when you want the magnitude, and `pow()` when computing powers before rounding.
- **Avoid comparing rounded floats with `==`.** Even after rounding, floating-point comparison can be unreliable. Use `math.isclose()` for approximate equality checks.

---

## Rules of round() function

- If `ndigits` is not provided, `round()` returns the nearest integer to the given number as an `int`.
- If `ndigits` is given, `round()` returns the number rounded to that many decimal places as a `float`.
- Python uses banker's rounding (round half to even), not the common round-half-up rule.
- Negative `ndigits` rounds to the left of the decimal point (nearest ten, hundred, etc.).
- Custom classes can implement `__round__` to define their own rounding behavior.

---

## Frequently Asked Questions

**Q1: Why does round(2.5) return 2 instead of 3 in Python?**

Python uses banker's rounding (round half to even). When a value is exactly halfway between two integers, it rounds to the nearest even integer. Since `2` is even and `3` is odd, `round(2.5)` returns `2`. This reduces the statistical bias that always-round-up introduces over many calculations. If you need round-half-up behavior, use `math.floor(x + 0.5)` for positive numbers or the `decimal` module with `ROUND_HALF_UP`.

**Q2: Why does round(1.005, 2) return 1.0 instead of 1.01?**

This is a floating-point representation issue, not a bug in `round()`. The literal `1.005` cannot be stored exactly in IEEE 754 binary floating-point; the actual stored value is slightly less than `1.005`. Because the stored value is below the midpoint, `round()` correctly rounds it down. To avoid this, use `decimal.Decimal('1.005')` and round that instead.

**Q3: Can round() handle very large or very small numbers?**

Yes. Python's `round()` works with arbitrarily large integers and with very small floats. For large integers, negative `ndigits` lets you round to significant figures efficiently: `round(1_000_000_789, -6)` returns `1000001000`. For very small floats near the limits of double precision, the same floating-point representation caveats apply, and results may be surprising near the precision boundary of the `float` type.

---

For related numeric built-ins, see the [Python pow()](/posts/Page-50-Python-pow()/) function for exponentiation and the [Python abs()](/posts/Python-abs()/) function for absolute values, both of which are commonly paired with `round()` in numeric processing pipelines.
