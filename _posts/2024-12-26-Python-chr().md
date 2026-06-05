---
title: Python chr() Method
description: In this tutorial, we will learn all about python chr() method.
date: 2024-12-26 23:24:00 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python chr() Method.webp
  alt: Python chr() Method
---

Python's `chr()` function converts an integer representing a Unicode code point into its corresponding single-character string. It accepts a single argument — an integer in the range 0 to 1,114,111 (0x10FFFF) — and returns the character that the Unicode standard maps to that number. For example, `chr(65)` returns `"A"`, `chr(8364)` returns the euro sign `"€"`, and `chr(128013)` returns an emoji. If the integer falls outside the valid Unicode range, Python raises a `ValueError`. The `chr()` function is the inverse of [Python ord()](/posts/Page-49-Python-ord()/), which converts a character back to its integer code point. This function is commonly used when generating characters dynamically, building encryption or encoding algorithms, processing text at the byte level, and creating character-based test data. It is particularly useful in competitive programming, text transformation utilities, and any scenario where you need to work with the numeric representation of characters.

This guide covers the full syntax, parameters, multiple code examples, real-world use cases, edge cases, tips, and frequently asked questions about `chr()`.

## What does chr() return?

The `chr()` function returns a **single-character string** corresponding to the Unicode code point of the given integer argument. The returned string has a length of exactly 1 and is a valid Python `str` object.

---

## When should you use chr()?

Use `chr()` when you need to convert a numeric code point into a readable character. This is common in:

- Encryption algorithms such as Caesar ciphers and XOR encoding.
- Generating alphabetical sequences programmatically without hard-coding strings.
- Working with ASCII art or character-based table rendering.
- Decoding data that arrives as integer code points from network sockets or binary files.
- Processing Unicode ranges for language support, emoji handling, or mathematical symbol generation.

---

## Syntax of chr()

The chr() method in python returns a string character from an integer. It will represent the Unicode code point that corresponds to the specific character.

```python
chr(num)
```

### chr() Parameters

`chr()` method takes a single parameter:

| Parameter | Description |
|-----------|-------------|
| `num` | An integer representing a Unicode code point. Must be in the range `0` to `1,114,111` (inclusive). |

The `chr()` method can only accept integers in the valid Unicode range from `0` to `1,114,111` (hexadecimal `0x10FFFF`).

### Return Value

A string of length 1 — the single character whose Unicode code point equals `num`.

---

## Example 1: How chr() works?

```python
print(chr(98))
print(chr(483))
print(chr(1274))
```

Output:

```
b
ǣ
Ӻ
```

- `chr(98)` returns `'b'`, the lowercase letter b (ASCII code 98).
- `chr(483)` returns `'ǣ'`, a Latin Extended character.
- `chr(1274)` returns `'Ӻ'`, a Cyrillic character from the Unicode range for Slavic languages.

---

## Example 2: Using a negative number with chr() method

```python
print(chr(-1))
print(chr(-43))
print(chr(-224))
```

Output:

```
Traceback (most recent call last):
  File "", line 1, in <module>
    print(chr(-1))
ValueError: chr() arg not in range(0x110000)
```

The above program throws an error because negative numbers are outside the valid Unicode code point range. The `chr()` function only accepts integers from `0` to `1,114,111`.

---

## Example 3: Generating the alphabet dynamically with chr()

Instead of hard-coding the alphabet, you can generate it using a loop and `chr()`. Uppercase letters A–Z have code points 65–90, and lowercase letters a–z have code points 97–122.

```python
# Generate uppercase alphabet
uppercase = [chr(i) for i in range(65, 91)]
print(''.join(uppercase))

# Generate lowercase alphabet
lowercase = [chr(i) for i in range(97, 123)]
print(''.join(lowercase))
```

Output:

```
ABCDEFGHIJKLMNOPQRSTUVWXYZ
abcdefghijklmnopqrstuvwxyz
```

This is useful for spreadsheet column labels, indexing systems, and test data generators where the number of columns or labels is dynamic.

---

## Example 4: Building a Caesar cipher with chr() and ord()

The Caesar cipher shifts each letter by a fixed number of positions. `chr()` and `ord()` work together to implement this classic encoding technique.

```python
def caesar_encrypt(text, shift):
    result = []
    for char in text:
        if char.isalpha():
            base = 65 if char.isupper() else 97
            shifted = (ord(char) - base + shift) % 26 + base
            result.append(chr(shifted))
        else:
            result.append(char)
    return ''.join(result)

def caesar_decrypt(text, shift):
    return caesar_encrypt(text, -shift)

message = "Hello, World!"
encrypted = caesar_encrypt(message, 3)
decrypted = caesar_decrypt(encrypted, 3)

print(f"Original:  {message}")
print(f"Encrypted: {encrypted}")
print(f"Decrypted: {decrypted}")
```

Output:

```
Original:  Hello, World!
Encrypted: Khoor, Zruog!
Decrypted: Hello, World!
```

This demonstrates the core pattern: convert a character to its code point with `ord()`, perform arithmetic, and convert back to a character with `chr()`.

---

## Example 5: Working with Unicode symbols and emoji

`chr()` can produce any Unicode character, including mathematical symbols, currency signs, and emoji.

```python
# Currency symbols
print(chr(8364))   # Euro sign
print(chr(163))    # Pound Sterling
print(chr(165))    # Yen

# Mathematical symbols
print(chr(8721))   # Summation
print(chr(960))    # Pi
print(chr(8734))   # Infinity

# Emoji
print(chr(128512)) # Grinning face
print(chr(128013)) # Snake
```

Output:

```
€
£
¥
∑
π
∞
😀
🐍
```

---

## Common Use Cases

**Building a Caesar cipher or simple encryption.** By converting characters to their code points with `ord()`, shifting the value, and converting back with `chr()`, you can implement basic text encryption and decryption routines.

**Generating alphabetical sequences dynamically.** Instead of hard-coding the alphabet, `[chr(i) for i in range(65, 91)]` produces all uppercase letters A through Z. This is useful for column labels, indexing systems, and test data generation.

**Decoding binary or numeric data into readable text.** When reading data from network sockets, binary files, or encoded streams, you may receive character data as integers. The `chr()` function converts each integer back into the corresponding readable character.

**Generating Unicode test data.** When testing internationalization support in applications, you can use `chr()` to generate characters from specific Unicode ranges without typing or looking them up manually.

---

## Edge Cases and Pitfalls

**1. Values outside 0–1,114,111 raise ValueError.**
Any integer below 0 or above 1,114,111 raises `ValueError: chr() arg not in range(0x110000)`. Validate input when the integer comes from user data or external sources.

**2. Control characters (0–31) are valid but invisible.**
`chr(0)` returns the null character, `chr(10)` returns a newline, `chr(27)` returns the ESC character. These are valid Unicode code points but may cause unexpected display or parsing behavior.

**3. `chr()` always returns a `str`, never `bytes`.**
If you need bytes, encode the result: `chr(65).encode('utf-8')` returns `b'A'`.

**4. Passing a float raises TypeError.**
`chr(65.0)` raises `TypeError: integer argument expected, got float`. Convert floats with `int()` first: `chr(int(65.0))`.

---

## Rules of Python chr()

- It will only return a string character whose Unicode code point is the given integer.
- It will take only integers as an argument; passing a float raises `TypeError`.
- If the integer is outside the range 0 to 1,114,111, it will raise `ValueError`.
- The returned string always has a length of exactly 1.

---

## Tips and Best Practices

- **Pair `chr()` with `ord()`** for round-trip character-to-integer-to-character conversions. `chr(ord(c)) == c` is always `True` for any single character `c`.
- **Use list comprehensions** to generate ranges of characters: `[chr(i) for i in range(97, 123)]` is the lowercase alphabet.
- **Validate input before calling `chr()`** when the integer comes from untrusted sources to avoid `ValueError` crashes.
- **Combine with `join()`** when building strings from multiple code points: `''.join(chr(i) for i in code_points)`.

---

## Frequently Asked Questions

**Q1: What is the difference between `chr()` and `ord()`?**
`chr()` and `ord()` are inverses of each other. `chr(n)` takes an integer `n` and returns the single-character string whose Unicode code point is `n`. `ord(c)` takes a single-character string `c` and returns its Unicode code point as an integer. Together they let you convert between the human-readable character and its numeric representation: `ord(chr(65)) == 65` and `chr(ord('A')) == 'A'` are both `True`.

**Q2: Can chr() handle emoji and non-ASCII characters?**
Yes. `chr()` supports the full Unicode range (0 to 1,114,111), which includes all Latin, Cyrillic, Arabic, Chinese, Japanese, and Korean characters, mathematical symbols, currency signs, and emoji. For example, `chr(128013)` returns the snake emoji 🐍 and `chr(8364)` returns the euro sign €. Python `str` natively handles Unicode, so the returned character integrates seamlessly with all standard string operations.

**Q3: What happens if I pass a float to chr()?**
Passing a float raises `TypeError: integer argument expected, got float`. The `chr()` function strictly requires an integer argument. If you have a float that represents a code point, convert it first with `int()`: `chr(int(65.0))` returns `'A'`.

---

## Related Functions

- [Python ord()](/posts/Page-49-Python-ord()/) — the inverse of `chr()`, converts a character to its Unicode code point.
- [Python str()](/posts/Page-62-Python-str()/) — convert an object to its string representation.