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

## What does ord() return?

The `ord()` function returns an integer representing the Unicode code point of the given single character, such as 65 for `'A'` or 8364 for the euro sign `'€'`.

## When should you use ord()?

Use `ord()` when you need to obtain the numeric Unicode code point of a character, such as for character-level arithmetic in cipher algorithms, validating character ranges, or converting characters to their integer representations for binary protocols.

The syntax of ord() is:

```python
ord("string")

```

## ord() Parameters

The ord() function takes only one parameter as an argument:

* **string** \- A simple string.

Let see an example of ord() in python.

### Example 1: how to use the ord() function in python?

```python
print(ord('A')) # 65

print(ord('4')) # 52

print(ord('$')) # 36

```

Output:

```python
65
52
36

```


## Common Use Cases

Implementing basic encryption algorithms like the Caesar cipher is a classic use of `ord()`. By converting each character to its code point with `ord()`, shifting the value by a fixed amount, and converting back with `chr()`, you can encode and decode messages character by character.

Validating input characters is another practical application. You can check whether a character is a digit, uppercase letter, or lowercase letter by comparing `ord()` values against known ranges, such as verifying that `ord('0') <= ord(char) <= ord('9')` to confirm a character is a digit.

Character frequency analysis in text processing benefits from `ord()` as well. When building frequency tables or histograms of characters in a document, converting characters to their integer codes provides a consistent, language-independent way to index and compare characters across different alphabets and writing systems.

The inverse of `ord()` is the [Python chr()](/posts/Python-chr()/) function, which converts an integer code point back to its character representation. For converting objects to their string form, see the [Python str()](/posts/Page-62-Python-str()/) function.

## Rules of ord()

* The ord() function will only return an integer when a single string is passed.


You can also check the Python chr() function that does the total inverse from the Python ord() function.