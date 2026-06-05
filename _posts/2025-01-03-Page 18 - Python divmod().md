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

The `divmod()` method takes two numbers and returns a pair of numbers inside a tuple consisting of their quotient and remainder. It is one of Python's most convenient built-in functions for arithmetic operations that involve both division and remainder computation. Rather than calling two separate operators, you get both results in a single, readable function call. This makes your code cleaner, reduces the chance of mistakes from using mismatched operands in two separate expressions, and can even offer a minor performance advantage by computing both values in one pass.

Understanding `divmod()` thoroughly is important for anyone working with number systems, pagination, time calculations, or any domain where splitting a quantity into groups plus a leftover is required. It embodies Python's philosophy of writing expressive code that clearly communicates intent.

The syntax of divmod() is:

```python
divmod(x, y)
```

## divmod() Parameters

`divmod()` takes two parameters:

- **x** — a non-complex number that acts as the dividend (numerator). This can be an integer or a float.
- **y** — a non-complex number that acts as the divisor (denominator). This can be an integer or a float. Passing `0` raises a `ZeroDivisionError`.

### Return Value

`divmod(x, y)` returns a tuple `(q, r)` where:
- `q` is the **floor quotient** — equivalent to `x // y`
- `r` is the **remainder** — equivalent to `x % y`

The relationship between them always satisfies: `x == q * y + r`

When both `x` and `y` are integers, both elements of the returned tuple are integers. When either operand is a float, both elements of the tuple will be floats.

---

## Example 1: How divmod() works with integers

```python
print('divmod(1, 3) = ', divmod(1, 3))
print('divmod(5, 8) = ', divmod(5, 8))
print('divmod(4, 4) = ', divmod(4, 4))
print('divmod(9, 4) = ', divmod(9, 4))
print('divmod(15, 6) = ', divmod(15, 6))
```

Output:

```
divmod(1, 3) =  (0, 1)
divmod(5, 8) =  (0, 5)
divmod(4, 4) =  (1, 0)
divmod(9, 4) =  (2, 1)
divmod(15, 6) =  (2, 3)
```

Notice that when the dividend is smaller than the divisor (as in `divmod(1, 3)` and `divmod(5, 8)`), the quotient is 0 and the remainder is simply the dividend itself. When the two numbers are equal (as in `divmod(4, 4)`), the quotient is 1 and the remainder is 0.

---

## Example 2: divmod() with floating-point numbers

```python
# divmod() with Floats
print('divmod(4.0, 3) = ', divmod(4.0, 3))
print('divmod(7, 9.0) = ', divmod(7, 9.0))
print('divmod(2.6, 0.5) = ', divmod(2.6, 0.5))
print('divmod(-7, 3) = ', divmod(-7, 3))
print('divmod(7, -3) = ', divmod(7, -3))
```

Output:

```
divmod(4.0, 3) =  (1.0, 1.0)
divmod(7, 9.0) =  (0.0, 7.0)
divmod(2.6, 0.5) =  (5.0, 0.10000000000000009)
divmod(-7, 3) =  (-3, 2)
divmod(7, -3) =  (-3, -2)
```

The float result for `divmod(2.6, 0.5)` shows a tiny floating-point imprecision — a normal artifact of how binary floating-point arithmetic works. The negative examples demonstrate that Python uses **floor division** (rounds toward negative infinity), so `divmod(-7, 3)` returns `(-3, 2)` rather than `(-2, -1)`.

---

## Example 3: Real-world use case — Time conversion

One of the most common practical uses of `divmod()` is converting a duration given in seconds into hours, minutes, and seconds.

```python
def seconds_to_hms(total_seconds):
    minutes, seconds = divmod(total_seconds, 60)
    hours, minutes = divmod(minutes, 60)
    return hours, minutes, seconds

total = 3723  # 1 hour, 2 minutes, 3 seconds
h, m, s = seconds_to_hms(total)
print(f"{h} hour(s), {m} minute(s), {s} second(s)")
# Output: 1 hour(s), 2 minute(s), 3 second(s)
```

This cascading use of `divmod()` is elegant and avoids intermediate calculations that could introduce errors. The function first splits total seconds into minutes and remaining seconds, then splits minutes into hours and remaining minutes.

---

## Example 4: Pagination logic

Another practical scenario is building pagination systems where you want to know how many full pages there are and whether a partial page exists.

```python
def paginate(total_items, per_page):
    full_pages, remaining = divmod(total_items, per_page)
    total_pages = full_pages + (1 if remaining > 0 else 0)
    print(f"Total pages: {total_pages} ({full_pages} full, {'1 partial' if remaining else 'no partial'})")

paginate(100, 10)   # 10 full pages, no partial
paginate(105, 10)   # 10 full + 1 partial = 11 pages
paginate(7, 10)     # 0 full + 1 partial = 1 page
```

Output:

```
Total pages: 10 (10 full, no partial)
Total pages: 11 (10 full, 1 partial)
Total pages: 1 (0 full, 1 partial)
```

---

## Example 5: Base conversion using divmod()

`divmod()` is extremely useful in base-conversion algorithms. Here is a function that converts a decimal integer to any target base:

```python
def to_base(number, base):
    if number == 0:
        return '0'
    digits = []
    while number > 0:
        number, remainder = divmod(number, base)
        digits.append(str(remainder))
    return ''.join(reversed(digits))

print(to_base(255, 2))   # Binary:  11111111
print(to_base(255, 8))   # Octal:   377
```

Each loop iteration uses `divmod()` to simultaneously update the number and collect the next digit in the target base.

---

## Rules of divmod()

`(q, r)` — a pair of numbers will be a tuple consisting of quotient `q` and a remainder `r`.

If `x` and `y` are integers, the return values from `divmod()` is same as `(x // y, x % y)`.

Additional rules:
- If either `x` or `y` is a float, both values in the returned tuple will be floats.
- The mathematical relationship `x == q * y + r` always holds true.
- Passing `0` as the second argument always raises `ZeroDivisionError`.
- Complex numbers are **not** supported; passing a complex number raises `TypeError`.

---

## Edge Cases and Gotchas

**Negative numbers:** Python's floor division always rounds toward negative infinity. This means:

```python
divmod(-7, 3)   # (-3, 2)  — NOT (-2, -1)
divmod(7, -3)   # (-3, -2) — remainder shares sign with divisor
```

The remainder always has the same sign as the divisor in Python, which differs from C or Java-style truncation division.

**Floating-point precision:** Due to binary representation, floats may produce tiny rounding errors in the remainder, as seen in `divmod(2.6, 0.5)`. This is expected behavior and not a bug in Python.

**Zero divisor:**

```python
divmod(5, 0)    # ZeroDivisionError: integer division or modulo by zero
divmod(5.0, 0)  # ZeroDivisionError: float divmod()
```

Always guard against zero divisors when using `divmod()` in production code.

---

## Comparison with Related Operations

| Operation | Syntax | Returns |
|-----------|--------|---------|
| Floor division only | `x // y` | Single integer/float |
| Modulo only | `x % y` | Single integer/float |
| Both at once | `divmod(x, y)` | Tuple `(quotient, remainder)` |

Using `divmod()` is preferred over computing `x // y` and `x % y` separately when you need both values, because it is more readable and avoids evaluating the operands twice — which matters when the operands are expressions with side effects.

---

## FAQ

**Q1: Can divmod() handle negative numbers?**

Yes. `divmod()` works with negative numbers, but the results follow Python's floor-division semantics. The remainder will always carry the sign of the divisor. For example, `divmod(-7, 3)` returns `(-3, 2)` because `(-3) * 3 + 2 = -7`. This behavior is consistent with Python's `//` and `%` operators.

**Q2: What happens if I pass a float to divmod()?**

If either argument is a float, both elements of the returned tuple will be floats. Be aware that floating-point precision limitations may cause the remainder to have a tiny error, such as `0.10000000000000009` instead of `0.1`. This is inherent to floating-point representation and is not specific to `divmod()`.

**Q3: Is divmod() faster than using // and % separately?**

For CPython, `divmod()` can be slightly faster because the underlying C implementation computes both values in one division operation. However, the primary reason to prefer it is readability and correctness — using one call with a single shared pair of operands is less error-prone than writing two separate expressions that must stay in sync.
