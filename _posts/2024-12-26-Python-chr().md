---
title: Python chr() Method
description: In this tutorial, we will learn all about python chr() method.
date: 2024-12-26 23:24:00 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python chr() Method.png
  alt: Python chr() Method
---

Python's `chr()` function converts an integer representing a Unicode code point into its corresponding single-character string. It accepts a single argument -- an integer in the range 0 to 1,114,111 (0x10FFFF) -- and returns the character that the Unicode standard maps to that number. For example, `chr(65)` returns `"A"`, `chr(8364)` returns the euro sign `"EUR"`, and `chr(128013)` returns an emoji. If the integer falls outside the valid Unicode range, Python raises a `ValueError`. The `chr()` function is the inverse of [Python ord()](/posts/Page-49-Python-ord()/), which converts a character back to its integer code point. This function is commonly used when generating characters dynamically, building encryption or encoding algorithms, processing text at the byte level, and creating character-based test data. It is particularly useful in competitive programming, text transformation utilities, and any scenario where you need to work with the numeric representation of characters.

## What does chr() return?

The `chr()` function returns a single-character string corresponding to the Unicode code point of the given integer argument.

## When should you use chr()?

Use `chr()` when you need to convert a numeric code point into a readable character. This is common in encryption algorithms (such as Caesar ciphers), generating alphabetical sequences programmatically, working with ASCII art, or decoding data that arrives as integer code points.

The chr() method in python returns a string character from an integer. It will represent unicode code which is pointed to the specific character.


The syntax of chr() is:

```python
chr(num)
```

## chr() Parameters

chr() method takes a single parameter, which is an integer num.  
   

The chr() method can only take a valid range of the integer from 0 to 1,114,111.

Let us see some examples of the chr() method.

### Example 1: How chr() works?

```python
print(chr(98))
print(chr(483))
print(chr(1274))
```


When we execute the above program, we will get the following results.

```python
b
ǣ
Ӻ
```

### Example 2:  Using Negative number with chr() method.

```python
print(chr(-1))
print(chr(-43))
print(chr(-224))
```

Output:

```python
Traceback (most recent call last):
  File "", line 1, in <module>
    print(chr(-1))
ValueError: chr() arg not in range(0x110000)
```

The above program throws an error because we cannot use numbers, not in the chr() method range.

## Common Use Cases

**Building a Caesar cipher or simple encryption.** By converting characters to their code points with `ord()`, shifting the value, and converting back with `chr()`, you can implement basic text encryption and decryption routines.

**Generating alphabetical sequences dynamically.** Instead of hard-coding the alphabet, you can generate it with a loop: `[chr(i) for i in range(65, 91)]` produces all uppercase letters A through Z. This is useful for column labels, indexing systems, and test data generation.

**Decoding binary or numeric data into readable text.** When reading data from network sockets, binary files, or encoded streams, you may receive character data as integers. The `chr()` function converts each integer back into the corresponding readable character.

## Rules of Python chr() 

* It will only return a string character whose Unicode code points are the integer of a given number.  
* It will take only integers as an argument.  
* If the integer is outside the range, it will throw a ValueError error.

## Related Functions

* [Python ord()](/posts/Page-49-Python-ord()/) -- the inverse of `chr()`, converts a character to its Unicode code point.
* [Python str()](/posts/Page-62-Python-str()/) -- convert an object to its string representation.