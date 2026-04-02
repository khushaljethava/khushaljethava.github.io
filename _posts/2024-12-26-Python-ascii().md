---
title: Python ascii() Method
description: In this tutorial we will learn about the python ascii() method and its uses.
date: 2024-12-26 21:11:00 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python ascii() Method.webp
  alt: Python ascii() Method

---

The Python `ascii()` function is a built-in that takes any Python object as its single parameter and returns a string containing a printable, ASCII-only representation of that object. Any non-ASCII characters in strings, such as accented letters, currency symbols, or emoji, are escaped using `\x`, `\u`, or `\U` escape sequences. The function accepts any object type including strings, lists, tuples, and dictionaries. It returns a string value that is guaranteed to contain only ASCII characters, making it safe for logging, debugging, and transmitting data across systems that do not support Unicode. A common real-world use case is sanitizing user-generated content before writing it to log files or sending it over protocols that only support 7-bit ASCII, ensuring that no encoding errors occur during transmission.

## What does ascii() return?

The `ascii()` function returns a string with all non-ASCII characters replaced by their corresponding escape sequences, while ASCII characters remain unchanged.

## When should you use ascii()?

Use `ascii()` when you need a safe, printable representation of text that may contain Unicode characters, especially for debugging output, logging, or data serialization to ASCII-only systems.

## Common Use Cases

When working with multilingual applications, `ascii()` helps developers inspect string contents without worrying about terminal or editor encoding issues. For example, if a user submits a form with characters like umlauts or accented letters, calling `ascii()` on the input lets you see the exact escape codes in your debug logs. Another practical use is when generating Python source code or configuration files programmatically where non-ASCII characters need to be escaped. You can also combine `ascii()` with the [Python chr() method](/posts/Python-chr()-Method/) to convert between character representations, or use it alongside the [Python bin() method](/posts/Python-bin()-Method/) when examining different representations of data.

The ascii() method will return a readable version of a string containing a printable representation of an object.


The ascii() method will replace non-ASCII like å with escape characters like \\x and \\u.

The syntax of ascii() is as follows.

```python
ascii(object)
```

## Python ascii() Parameter

The ascii() method will have a single parameter as an object like String, List, Tuple, Dictionary, etc.

Let's see some examples of ascii() method.

Example 1: How to use ascii() method in the list.

```python
my_list = ['Pythön','¥',2,'ASCII']

print(ascii(my_list))
```

Output:

```python
['Pyth\xf6n', '\xa5', 2, 'ASCII']
```

Example 2: using ascii() method with strings.

```python
my_string = "µ"
print(ascii(my_string))

my_string = "Pythön is Awësome"
print(ascii(my_string))
```
The output will be as follow:

```python
'\xb5'
'Pyth\xf6n is Aw\xebsome'
```

As you can see, all the non-ascii values are replaced by escape characters.


## Rules of ascii() method

* It will return a readable string representation of an object.  

* It will not return anything when we use an integer as an object.

