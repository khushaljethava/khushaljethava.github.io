---
title: Python bytearray() Method
description: In this tutorial, we will learn about python bytearray() and its uses.
date: 2024-12-26 21:22:00 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python bytearray() Method.webp
  alt: Python bytearray() Method

---

The Python `bytearray()` function is a built-in constructor that creates and returns a mutable sequence of bytes. It accepts three optional parameters: a source (which can be an integer, string, iterable, or bytes-like object), an encoding (required when the source is a string), and an errors argument that specifies how encoding errors should be handled. When called with an integer, it creates a zero-filled bytearray of that size. When called with a string and encoding, it encodes the string into bytes. When called with an iterable, each element must be an integer in the range 0 to 255. The function returns a `bytearray` object, which unlike the immutable `bytes` type can be modified in place. A real-world use case is building binary protocols or file formats where you need to construct a byte buffer incrementally, modifying specific byte positions as you assemble headers, payloads, and checksums.

## What does bytearray() return?

The `bytearray()` function returns a mutable array of bytes, where each element is an integer in the range 0 to 255 that can be read and modified by index.

## When should you use bytearray()?

Use `bytearray()` when you need a mutable byte sequence, such as when building binary data buffers, manipulating file contents at the byte level, or implementing network protocols that require in-place byte modifications.

## Common Use Cases

One common use of `bytearray()` is reading a binary file into memory and patching specific bytes before writing it back, since the mutable nature avoids creating new copies for each change. Another scenario is implementing serial communication protocols where you build command frames byte by byte and need to update checksum fields after assembling the rest of the packet. You can also use `bytearray()` alongside the [Python bytes() method](/posts/Python-bytes()-Method/) when you need both mutable and immutable byte representations, or combine it with the [Python int() method](/posts/Python-int()-Method/) to convert individual bytes to integer values for arithmetic.

The bytearray() method will return a form of bytearray object, an array of given objects, or create an empty bytearray object of the specified size.

bytearray() method returns a bytearray object which is  a sequence of mutable(which can be modified) integers in the range  0 \<= x \<256.

The syntax of bytearray() method is:

```python
bytearray([source, encoding, errors)
```
## Python bytearray() Parameters


bytearray() takes three optional parameters:

* **source (Optional) \-** A source to Initialize the array of bytes.  
* **encoding (Optional) \-** Encoding of the string when the source is a string.  
* **errors (Optional) \-** if the source is a string, it will take a specific action when encoding fails.

Let's see some examples of the bytearray() method in python.


Example 1: Using bytearray() with an integer.

```python
number = 4

print(bytearray(number))
```

Output:

```python
bytearray(b'\x00\x00\x00\x00')
```

Example 2: using bytearray() with a string.

```python
string = "Python is Awesome."

# encoding the string with unicode 8
array = bytearray(string,'utf-8')
print(array)

# encoding the string with unicode 16
array = bytearray(string,'utf-16')
print(array)
```
The output will be as follows.

```python
bytearray(b'Python is Awesome.')
bytearray(b'\xff\xfeP\x00y\x00t\x00h\x00o\x00n\x00 \x00i\x00s\x00 \x00A\x00w\x00e\x00s\x00o\x00m\x00e\x00.\x00')
```

Example 3:  Using bytearray() with an iterable list.

```python
my_list = [1,2,3,4,5]

print(bytearray(my_list))
```


Output:

```python
bytearray(b'\x01\x02\x03\x04\x05')
```

## Rules of bytearray()

* It will return an array of bytes of the given size and initialization value.  
* If it is an integer, it will create an empty bytearray object of the specified size.