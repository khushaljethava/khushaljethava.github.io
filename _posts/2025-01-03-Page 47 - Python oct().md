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

The syntax of oct() is:

```python
oct(integer)

```

## oct() Parameters

The oct() function takes only one parameter argument.


* integer \- an integer number that can be binary, decimal or hexadecimal.


  
Let check the example of oct() in python.

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

Here, the Person class implements \_\_index\_\_() and \_\_int\_\_(). That's why we can use oct() on the objects of Person.

## Common Use Cases

Working with Unix file permissions is the most common real-world application of `oct()`. When you retrieve file permission modes using `os.stat()`, the result is an integer that you can pass to `oct()` to display the familiar octal permission format like `0o755`, making it easy to understand and communicate access rights.

Converting between number bases for educational or debugging purposes is another frequent use case. Developers often use `oct()` alongside `bin()` and `hex()` to visualize how the same integer looks in different bases, which is helpful when learning about number systems or troubleshooting bitwise operations.

Encoding data in legacy systems that use octal notation is a more specialized application. Some older protocols, serial communication formats, and mainframe systems use octal encoding, and `oct()` provides a straightforward way to produce the required format from standard Python integers.

For related base conversion functions, see the [Python hex()](/posts/Page-31-Python-hex()/) function for hexadecimal conversion and the [Python bin()](/posts/Python-bin()/) function for binary conversion.

## Rules of oct()

* If not an integer, it should implement \_\_index\_\_() to return an integer.  
* The oct() function will raise an error when a non-integer value is passed.