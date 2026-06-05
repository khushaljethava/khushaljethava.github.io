---
title: Python hex() Method
description: In this tutorial we will learn about python hex() method and it uses with examples.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python hex() Method.webp
  alt: Python hex() Method
---

The Python `hex()` function is a built-in that converts an integer into its hexadecimal string representation, prefixed with `0x`. It takes a single required parameter, which must be an integer (or an object that implements the `__index__()` method), and returns a lowercase hexadecimal string. For negative integers, the result includes a minus sign before the `0x` prefix, such as `-0x11` for the integer `-17`. A common real-world use case is in low-level programming and systems work, where developers need to display memory addresses, color codes, or binary protocol fields in hexadecimal notation. For example, web developers converting RGB color values to hex strings for CSS often use `hex()` as a starting point. The function is also useful when examining byte-level data in network packet analysis or embedded systems debugging.

Hexadecimal (base-16) is one of the most widely used number systems in computing because it maps cleanly to binary: every four binary digits (bits) correspond to exactly one hex digit. This makes it far more compact and readable than binary while still being easy to convert back and forth. Understanding how Python's `hex()` function works gives you a practical tool for everyday tasks such as formatting color values, inspecting memory, and working with low-level protocols.

## What is Python hex() Method?

The `hex()` is the built-in Python method used to convert an integer number into its corresponding lowercase hexadecimal string prefixed with `"0x"`. The prefix `0x` is a standard convention across most programming languages to distinguish hexadecimal literals from decimal ones.

The syntax of the `hex()` method is:

```python
hex(integer)
```

## Python hex() Method Parameters

The `hex()` method takes only one parameter:

| Parameter | Type | Description |
|-----------|------|-------------|
| `integer` | int (or `__index__` implementor) | The integer number whose hexadecimal representation you want |

The function raises a `TypeError` if you pass a float or any other type that does not implement `__index__()`.

## What does hex() Return?

The `hex()` function returns a **lowercase hexadecimal string** prefixed with `0x` that represents the given integer value. The return type is always `str`, not `int`.

## When should you use hex()?

Use `hex()` when you need to:
- Display or store an integer in hexadecimal format
- Work with memory addresses in systems programming or debugging
- Convert color values to their hex CSS equivalents
- Inspect byte values and protocol fields in network programming
- Output register or port addresses in embedded systems work

---

## Example 1: Basic Usage of hex() in Python

```python
number = 4
print("The Hexadecimal of number 4 is:", hex(number))

number = 896
print("The Hexadecimal of number 896 is:", hex(number))

number = 0
print("The Hexadecimal of number 0 is:", hex(number))

number = -17
print("The Hexadecimal of number -17 is:", hex(number))

return_type = type(hex(number))
print('Return type from hex() is', return_type)
```

**Output:**

```
The Hexadecimal of number 4 is: 0x4
The Hexadecimal of number 896 is: 0x380
The Hexadecimal of number 0 is: 0x0
The Hexadecimal of number -17 is: -0x11
Return type from hex() is <class 'str'>
```

In the above program we convert a positive integer, zero, and a negative integer to hexadecimal. Notice that small values like `4` produce short strings (`0x4`), larger values like `896` produce multi-digit hex strings (`0x380`), zero maps to `0x0`, negative values carry a minus sign before the prefix (`-0x11`), and the return type is always `str`.

---

## Example 2: Converting RGB Color Values to Hex

A classic real-world application of `hex()` is building CSS color strings from RGB tuples. Web colors are expressed as `#RRGGBB`, where each component is a two-digit hex value.

```python
def rgb_to_hex(r, g, b):
    """Convert an (R, G, B) tuple to a CSS hex color string."""
    r_hex = hex(r)[2:].zfill(2)
    g_hex = hex(g)[2:].zfill(2)
    b_hex = hex(b)[2:].zfill(2)
    return f"#{r_hex}{g_hex}{b_hex}"

print(rgb_to_hex(255, 128, 0))    # Orange
print(rgb_to_hex(0, 255, 127))    # Spring green
print(rgb_to_hex(30, 144, 255))   # Dodger blue
print(rgb_to_hex(0, 0, 0))        # Black
print(rgb_to_hex(255, 255, 255))  # White
```

**Output:**

```
#ff8000
#00ff7f
#1e90ff
#000000
#ffffff
```

Here `hex(r)[2:]` strips the `0x` prefix and `.zfill(2)` ensures we always get at least two digits, so values below 16 (like `0x a`) are correctly padded to `0a`. This pattern is extremely common in graphics programming, data visualisation libraries, and web automation scripts.

---

## Example 3: Using hex() with Custom Objects via __index__()

Any object that implements the `__index__()` dunder method can be passed to `hex()`. This is useful when you have domain-specific integer-like types.

```python
class MemoryAddress:
    """Represents a memory address as an integer."""

    def __init__(self, address: int):
        self.address = address

    def __index__(self):
        return self.address

    def __repr__(self):
        return f"MemoryAddress({hex(self.address)})"


addr = MemoryAddress(4026531840)
print(hex(addr))
print(repr(addr))

class Byte:
    def __init__(self, value: int):
        if not (0 <= value <= 255):
            raise ValueError("Byte value must be between 0 and 255")
        self.value = value

    def __index__(self):
        return self.value


b = Byte(200)
print(hex(b))
```

**Output:**

```
0xf0000000
MemoryAddress(0xf0000000)
0xc8
```

This makes `hex()` composable with your own abstractions without any extra conversion step.

---

## Real-World Use Cases

### Memory Addresses and Debugging

In systems programming or when using `ctypes`, memory addresses are conventionally shown in hex:

```python
import ctypes

value = ctypes.c_int(42)
address = ctypes.addressof(value)
print(f"Variable stored at: {hex(address)}")
# e.g. Variable stored at: 0x7ffd3a2b1c40
```

### Network Protocol Fields

Network protocols often define fields as fixed-width hex values. Converting integers to hex makes packet dumps far more readable:

```python
ether_type_ip  = 0x0800
ether_type_arp = 0x0806

print(f"EtherType for IP : {hex(ether_type_ip)}")
print(f"EtherType for ARP: {hex(ether_type_arp)}")
```

### Bitmasking and Flag Inspection

When working with bitmasks (permissions, hardware registers, file modes), hex is more intuitive than decimal:

```python
READ    = 0b100
WRITE   = 0b010
EXECUTE = 0b001

permissions = READ | WRITE
print(f"Permission bits: {hex(permissions)}")  # 0x6
```

---

## Edge Cases and Important Notes

### Floats Are Not Accepted

```python
hex(3.14)  # TypeError: 'float' object cannot be interpreted as an integer
```

If you need the binary representation of a float, use the float's own `.hex()` method:

```python
print((3.14).hex())   # '0x1.91eb851eb851fp+1'
```

### Stripping the `0x` Prefix

If you need just the hex digits without the prefix, slice from index 2:

```python
value = 255
raw   = hex(value)[2:]          # 'ff'
upper = hex(value)[2:].upper()  # 'FF'
print(raw, upper)
```

### Zero-Padding for Fixed-Width Output

`hex()` does not zero-pad by default. Use `.zfill()` or f-string formatting for fixed-width output:

```python
value = 10
print(hex(value))           # 0xa
print(f"{value:#06x}")      # 0x000a
print(format(value, '04x')) # 000a
```

### Large Integers

Python integers have arbitrary precision, so `hex()` handles very large numbers without overflow:

```python
big = 2 ** 128
print(hex(big))
# 0x100000000000000000000000000000000
```

---

## hex() vs format() vs f-strings

| Method | Example | Output | Notes |
|--------|---------|--------|-------|
| `hex(n)` | `hex(255)` | `'0xff'` | Always lowercase, always has `0x` |
| `format(n, 'x')` | `format(255, 'x')` | `'ff'` | No prefix, lowercase |
| `format(n, 'X')` | `format(255, 'X')` | `'FF'` | No prefix, uppercase |
| `format(n, '#x')` | `format(255, '#x')` | `'0xff'` | With prefix, lowercase |
| f-string | `f"{255:04x}"` | `'00ff'` | Zero-padded, no prefix |

For most display purposes `format()` or f-strings offer more control; `hex()` is best when you specifically want the `0x`-prefixed string with minimal code.

---

## Rules of hex() Method

- `hex()` converts an integer to the corresponding hexadecimal number in string form and returns it.
- The returned hexadecimal string starts with the prefix `0x`, indicating it is in hexadecimal form.
- For negative integers, the result is prefixed with `-0x`.
- The returned string always uses lowercase hex digits (`a`–`f`).
- Passing a non-integer type that does not implement `__index__()` raises a `TypeError`.

---

## Frequently Asked Questions

**Q1: Can I use hex() on a float in Python?**

No. `hex()` only works with integers or objects implementing `__index__()`. For a float, use the float's own `.hex()` method: `(3.14).hex()` returns `'0x1.91eb851eb851fp+1'`, which is the IEEE 754 representation of the float value.

**Q2: How do I convert a hex string back to an integer?**

Use `int()` with base 16: `int('0xff', 16)` returns `255`. The `0x` prefix is optional when using `int()` with an explicit base. See the [Python int() function](/posts/Page-34-Python-int()/) for more details.

**Q3: What is the difference between hex() and format() for hex conversion?**

`hex(n)` always returns a lowercase string with the `0x` prefix (e.g., `'0xff'`). `format(n, 'x')` gives just the digits without the prefix (`'ff'`), and `format(n, 'X')` gives uppercase digits (`'FF'`). f-strings using `{n:x}` or `{n:#x}` provide similar flexibility. Use `hex()` when you want the prefixed form with minimal code; use `format()` or f-strings when you need precise control over width, padding, case, or prefix.

---

If you need to convert an integer to its octal representation instead, see the [Python oct() method](/posts/Page-47-Python-oct()/). To convert a hexadecimal string back into an integer, the [Python int() function](/posts/Page-34-Python-int()/) with base 16 is the standard approach.
