---
title: Python ord()
description: The ord() is a built-in python function that returns an integer representation of the specified Unicode character.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python ord().webp
  alt: Python ord()
---

The Python `ord()` built-in function returns the Unicode code point for a given single-character string. It accepts exactly one parameter, a string of length one, and returns an integer representing the Unicode code point of that character. For standard ASCII characters, the returned value falls within the range 0 to 127, while extended Unicode characters can return values up to 1,114,111. This function is essential in text processing, cryptography, and character encoding tasks. Real-world use cases include implementing Caesar cipher encryption by shifting character codes, validating that input characters fall within specific Unicode ranges, sorting characters by their code points, building custom text encoding schemes, and converting between character representations when interfacing with low-level protocols or binary formats that expect numeric character codes.

Understanding `ord()` requires a basic grasp of Unicode. Every character in every writing system — from basic Latin letters to Chinese ideographs, mathematical symbols, and emoji — is assigned a unique integer called a code point. The `ord()` function is Python's direct gateway to reading those code points. Its counterpart, `chr()`, performs the reverse operation, converting an integer back into the corresponding character. Together, `ord()` and `chr()` allow Python programmers to perform arithmetic directly on character data, which underpins everything from simple text transformations to complex encoding systems.

## What does ord() return?

The `ord()` function returns an integer representing the Unicode code point of the given single character, such as 65 for `'A'` or 8364 for the euro sign `'€'`.

## When should you use ord()?

Use `ord()` when you need to obtain the numeric Unicode code point of a character, such as for character-level arithmetic in cipher algorithms, validating character ranges, or converting characters to their integer representations for binary protocols.

## Syntax Breakdown

The syntax of `ord()` is:

```python
ord(character)
```

The function takes exactly one argument: a string of length one. If you pass an empty string or a string with more than one character, Python raises `TypeError`. The returned integer is always a non-negative number in the range 0 to 1,114,111 (the full Unicode range). For standard ASCII characters, the value is in the range 0–127.

## ord() Parameters

The `ord()` function takes only one parameter:

* **character** — A single-character string. Must have a length of exactly 1. It can be any valid Unicode character — ASCII, extended Latin, CJK, emoji, symbols, or control characters.

Let's see examples of `ord()` in Python.

### Example 1: Basic usage of ord()

The simplest use of `ord()` is to retrieve the code point of common ASCII characters. Letters, digits, and punctuation all map to well-known integer values.

```python
print(ord('A'))  # 65
print(ord('a'))  # 97
print(ord('4'))  # 52
print(ord('$'))  # 36
print(ord(' '))  # 32 (space character)
print(ord('\n')) # 10 (newline)
```

Output:

```
65
97
52
36
32
10
```

Notice that uppercase and lowercase letters have different code points. `'A'` is 65 while `'a'` is 97 — a difference of exactly 32. This consistent offset is the basis for many simple character-case conversion algorithms.

### Example 2: Caesar Cipher using ord() and chr()

The Caesar cipher is a classic encryption technique that shifts each letter by a fixed number of positions in the alphabet. `ord()` and `chr()` make implementing it straightforward.

```python
def caesar_encrypt(text, shift):
    result = []
    for char in text:
        if char.isalpha():
            base = ord('A') if char.isupper() else ord('a')
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

In this example, `ord(char) - base` converts each letter to a zero-based index (0 for 'A', 1 for 'B', etc.), the shift is applied with modular arithmetic to wrap around the alphabet, and `chr()` converts the result back to a character.

### Example 3: Character Validation Using Code Point Ranges

Rather than relying solely on string methods like `isdigit()` or `isalpha()`, you can validate characters by checking their code point ranges. This is useful in contexts where you need precise Unicode-level control.

```python
def classify_character(char):
    code = ord(char)
    if 48 <= code <= 57:
        return f"'{char}' is a digit (ASCII {code})"
    elif 65 <= code <= 90:
        return f"'{char}' is an uppercase letter (ASCII {code})"
    elif 97 <= code <= 122:
        return f"'{char}' is a lowercase letter (ASCII {code})"
    elif code < 32 or code == 127:
        return f"'{char}' is a control character (code point {code})"
    elif code > 127:
        return f"'{char}' is a non-ASCII character (code point {code})"
    else:
        return f"'{char}' is a printable symbol (ASCII {code})"

for ch in ['G', 'z', '7', '€', '\t', '@']:
    print(classify_character(ch))
```

Output:

```
'G' is an uppercase letter (ASCII 71)
'z' is a lowercase letter (ASCII 122)
'7' is a digit (ASCII 55)
'€' is a non-ASCII character (code point 8364)
'	' is a control character (code point 9)
'@' is a printable symbol (ASCII 64)
```

### Example 4: Sorting Characters by Unicode Code Point

When you sort a list of characters in Python, the default ordering uses Unicode code points. You can make this explicit using `ord()` as a sort key, or use it to build a custom sort order.

```python
chars = ['z', 'A', 'M', 'a', '1', '!', 'Z']

# Default sort (uses Unicode order internally)
default_sorted = sorted(chars)

# Explicit sort using ord() as the key (same result, but makes intent clear)
explicit_sorted = sorted(chars, key=ord)

print("Default sort:  ", default_sorted)
print("Explicit sort: ", explicit_sorted)
print()

# Print code points alongside characters
print("Character  Code Point")
print("-" * 22)
for char in sorted(chars, key=ord):
    print(f"    {char!r:<8}  {ord(char)}")
```

Output:

```
Default sort:   ['!', '1', 'A', 'M', 'Z', 'a', 'z']
Explicit sort:  ['!', '1', 'A', 'M', 'Z', 'a', 'z']

Character  Code Point
----------------------
    '!'       33
    '1'       49
    'A'       65
    'M'       77
    'Z'       90
    'a'       97
    'z'       122
```

## Real-World Use Cases

**Cryptography and encoding algorithms** are among the most practical applications of `ord()`. Any cipher that operates at the character level — Caesar, Vigenère, ROT13, or custom schemes — relies on converting characters to integers, performing arithmetic, and converting back with `chr()`. The integer representation makes modular arithmetic and key mixing straightforward.

**Input validation and sanitization** benefit from `ord()` when you need precise control over which characters are allowed. For example, an API that only accepts printable ASCII can use `ord()` to check that every character's code point falls in the range 32–126. This is more reliable than relying on locale-dependent string methods.

**Binary protocol handling** often requires converting text characters to their byte values. Many network protocols, file formats, and legacy systems represent characters as their ASCII byte values. `ord()` provides those byte values directly for single characters, though `bytes` and `encode()` are more appropriate for strings of multiple characters.

**Text analysis and natural language processing** can use `ord()` to build language-agnostic character frequency tables. Since code points are consistent across all Python installations and platforms, building histograms or feature vectors based on `ord()` values produces reproducible results regardless of locale settings.

**Checksum and hash computation** for simple data integrity checks sometimes involve summing or XORing the `ord()` values of characters in a string. While not a replacement for cryptographic hashes, such checksums are useful in embedded systems or protocol validation where computational resources are limited.

## Edge Cases and Gotchas

**Passing a string longer than one character raises TypeError.** `ord('AB')` raises `TypeError: ord() expected a character, but string of length 2 found`. If you need to process a string, iterate over it and call `ord()` on each character separately.

**Passing an empty string raises TypeError.** `ord('')` raises `TypeError: ord() expected a character, but string of length 0 found`.

**Non-string types are not accepted.** `ord(65)` raises `TypeError`. If you have a byte value (integer) and want the character, use `chr(65)` directly. `ord()` strictly requires a single-character string.

**Bytes objects require indexing differently.** When you index a `bytes` object like `b'Hello'[0]`, Python already returns an integer (104), so `ord()` is not needed. Applying `ord()` to a byte is actually `ord(chr(byte_val))`, which is unnecessary indirection.

**Unicode vs. ASCII confusion.** All 128 ASCII characters map one-to-one to their Unicode code points, so `ord('A')` is always 65. However, when working with non-ASCII Unicode characters (code points above 127), the `ord()` value does not correspond to any single-byte encoding like Latin-1 directly, though it does match ISO 8859-1 for code points 0–255.

## Comparison with Related Functions

| Function | Direction | Input | Output | Example |
|---|---|---|---|---|
| `ord(c)` | char → int | single char string | integer code point | `ord('A')` → `65` |
| `chr(i)` | int → char | integer code point | single char string | `chr(65)` → `'A'` |
| `bytes([n])` | int → byte | list of integers | bytes object | `bytes([65])` → `b'A'` |
| `str.encode()` | str → bytes | string | bytes object | `'A'.encode()` → `b'A'` |
| `hex(ord(c))` | char → hex | single char string | hex string | `hex(ord('A'))` → `'0x41'` |

The most important pairing is `ord()` with `chr()`. They are exact inverses for all valid Unicode code points: `chr(ord(c)) == c` is always `True` for any single character `c`, and `ord(chr(n)) == n` is always `True` for any integer `n` in the range 0–1,114,111.

## Frequently Asked Questions

**Q: What is the difference between ord() and chr()?**
A: They are inverse operations. `ord()` takes a single-character string and returns its integer Unicode code point. `chr()` takes an integer and returns the corresponding single-character string. For example, `ord('A')` returns `65` and `chr(65)` returns `'A'`.

**Q: Can ord() handle emoji and non-ASCII characters?**
A: Yes. `ord()` works with any Unicode character, regardless of whether it falls in the ASCII range. For example, `ord('€')` returns `8364`, `ord('中')` returns `20013`, and `ord('😀')` returns `128512`. As long as you pass a single character, `ord()` returns the correct code point.

**Q: How can I apply ord() to every character in a string?**
A: Use a list comprehension or `map()`. For example, `[ord(c) for c in 'Hello']` returns `[72, 101, 108, 108, 111]`. Equivalently, `list(map(ord, 'Hello'))` produces the same result. To reverse this, use `''.join(chr(n) for n in [72, 101, 108, 108, 111])` to get back `'Hello'`.

## Rules of ord()

* The `ord()` function only accepts a string of exactly one character.
* Passing a string of length 0 or 2+ raises `TypeError`.
* Non-string types such as integers or bytes raise `TypeError`.
* The return value is always a non-negative integer in the range 0–1,114,111.
* For ASCII characters, the return value is in the range 0–127.

The inverse of `ord()` is the [Python chr()](/posts/Python-chr()/) function, which converts an integer code point back to its character representation. For converting objects to their string form, see the [Python str()](/posts/Page-62-Python-str()/) function.