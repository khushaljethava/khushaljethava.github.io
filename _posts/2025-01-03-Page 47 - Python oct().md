---
title: Python oct() Method
description: The python oct() is a built-in function of python that returns the octal string of a given integer. Octal strings start with 0o prefix when converted.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python oct() Method.webp
  alt: Python oct() Method
---

The Python `oct()` built-in function converts an integer to its octal (base-8) string representation. It accepts a single parameter, an integer value, which can be specified in decimal, binary, or hexadecimal notation. The function returns a string prefixed with `0o` that represents the octal equivalent of the given integer. If the argument is not an `int`, the object must implement the `__index__()` method to return an integer. Octal representation is commonly used in Unix and Linux file permission systems, where permission modes like `0o755` or `0o644` define read, write, and execute access for owner, group, and others. It is also used in low-level programming, embedded systems, and legacy codebases that rely on base-8 encoding for compact representation of binary data groups of three bits each.

## What does oct() return?

The `oct()` function returns a string representing the octal value of the given integer, prefixed with `0o` to indicate base-8 notation.

## When should you use oct()?

Use `oct()` when you need to convert an integer to its octal string representation, such as when working with Unix file permissions, low-level bit manipulation, or displaying numbers in base-8 format for debugging or educational purposes.

## Syntax Breakdown

The syntax of oct() is:

```python
oct(integer)
```

The `0o` prefix in the result is Python's octal literal prefix. Any value prefixed with `0o` can be used directly as an integer literal in Python source code. The function always returns a string, never a numeric type. To get bare octal digits without the prefix, use `oct(n)[2:]` or `format(n, 'o')`.

## oct() Parameters

The `oct()` function takes only one parameter:

* **integer** — an integer number that can be expressed in binary (`0b`), decimal, or hexadecimal (`0x`) notation.

Let's check the examples of oct() in Python.

### Example 1: How to use oct() function in python?

```python
# decimal to octal
print('oct(10) is:', oct(4))

# binary to octal
print('oct(0b101) is:', oct(0b10))

# hexadecimal to octal
print('oct(0XA) is:', oct(0XC))

```

Output:

```python
oct(10) is: 0o4
oct(0b101) is: 0o2
oct(0XA) is: 0o14

```

### Example 2: How to use the oct() function with a custom object?

```python
class Person:
    age = 23

    def __index__(self):
        return self.age

    def __int__(self):
        return self.age

person = Person()
print('The oct is:', oct(person))

```


Output:

```python
The oct is: 0o27

```

Here, the `Person` class implements `__index__()` and `__int__()`. That is why we can use `oct()` on objects of `Person`.

### Example 3: Stripping the 0o prefix

```python
number = 255
octal_with_prefix = oct(number)        # '0o377'
octal_bare = oct(number)[2:]           # '377'
octal_formatted = format(number, 'o')  # '377'

print(octal_with_prefix)
print(octal_bare)
print(octal_formatted)
```

Output:

```python
0o377
377
377
```

### Example 4: Real-world Unix file permissions

```python
import os
import stat

# Standard permission values as octal
OWNER_RWX = 0o700    # owner: read, write, execute
GROUP_RX  = 0o050    # group: read, execute
OTHER_RX  = 0o005    # others: read, execute

combined = OWNER_RWX | GROUP_RX | OTHER_RX
print(oct(combined))    # 0o755

# Setting file permissions
# os.chmod('myfile.txt', 0o644)

# Reading permissions back
for name, mode in [('rwxr-xr-x', 0o755), ('rw-r--r--', 0o644), ('rw-------', 0o600)]:
    print(f'{name} = {oct(mode)} = decimal {mode}')
```

Output:

```python
0o755
rwxr-xr-x = 0o755 = decimal 493
rw-r--r-- = 0o644 = decimal 420
rw------- = 0o600 = decimal 384
```

### Example 5: Converting octal string back to integer

```python
# Convert octal string back to integer using int() with base 8
octal_str = '0o377'
value = int(octal_str, 8)
print(value)  # 255

# Alternatively strip prefix first
bare = '377'
value2 = int(bare, 8)
print(value2)  # 255
```

### Example 6: Negative numbers

```python
print(oct(-8))    # -0o10
print(oct(-255))  # -0o377
print(oct(0))     # 0o0
```

## Real-World Use Cases

**Working with Unix file permissions** is the most common real-world application of `oct()`. When you retrieve file permission modes using `os.stat()`, the result is an integer that you can pass to `oct()` to display the familiar octal permission format like `0o755`, making it easy to understand and communicate access rights.

**Converting between number bases for educational or debugging purposes** is another frequent use case. Developers often use `oct()` alongside `bin()` and `hex()` to visualize how the same integer looks in different bases, which is helpful when learning about number systems or troubleshooting bitwise operations.

**Encoding data in legacy systems** that use octal notation is a more specialized application. Some older protocols, serial communication formats, and mainframe systems use octal encoding, and `oct()` provides a straightforward way to produce the required format from standard Python integers.

**Embedded systems and hardware programming** sometimes represent device register values or memory addresses in octal. Since each octal digit maps to exactly three bits, octal notation can make bit groupings easier to reason about than hexadecimal or decimal.

## Edge Cases and Gotchas

**Floats are not accepted** — passing a float raises `TypeError: 'float' object cannot be interpreted as an integer`. Use `int()` to convert first if needed.

**The return value is always a string**, not an integer. If you need to perform arithmetic with the octal value, convert it back with `int(value, 8)`.

**Custom objects must implement `__index__()`**, not just `__int__()`. While Python 2 accepted `__int__()`, Python 3 requires `__index__()` for functions that interpret an object as an exact integer index.

## Comparison with Similar Base-Conversion Functions

| Function | Base | Prefix | Example: 255 |
|---|---|---|---|
| `oct(255)` | 8 | `0o` | `'0o377'` |
| `bin(255)` | 2 | `0b` | `'0b11111111'` |
| `hex(255)` | 16 | `0x` | `'0xff'` |
| `str(255)` | 10 | none | `'255'` |

## Frequently Asked Questions

**Q: How do I convert an octal string back to an integer?**  
A: Use `int('0o377', 8)` or `int('377', 8)`. Both forms return 255.

**Q: Why does Python use the `0o` prefix instead of a leading zero?**  
A: Python 3 adopted the explicit `0o` prefix to remove ambiguity. In C and Python 2, a leading zero (`077`) indicated octal, which was a frequent source of confusion. The `0o` prefix makes the base unambiguous.

**Q: Can I use `oct()` with boolean values?**  
A: Yes, because `bool` is a subclass of `int`. `oct(True)` returns `'0o1'` and `oct(False)` returns `'0o0'`.

**Q: What is the largest octal number Python can handle?**  
A: Python integers have arbitrary precision, so `oct()` works with numbers of any size. The result string simply grows longer.

For related base conversion functions, see the [Python hex()](/posts/Page-31-Python-hex()/) function for hexadecimal conversion and the [Python bin()](/posts/Python-bin()/) function for binary conversion.

## Rules of oct()

* If not an integer, the object must implement `__index__()` to return an integer.
* The `oct()` function will raise a `TypeError` when a non-integer value such as a float is passed.
* The returned string always starts with the `0o` prefix.
* Negative integers produce strings beginning with `-0o`.