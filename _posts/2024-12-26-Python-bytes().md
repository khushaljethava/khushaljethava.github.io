---
title: Python bytes() Method 
description: In this tutorial, we will understand about the python bytes() method and its uses.
date: 2024-12-26 22:02:00 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python bytes() Method.png
  alt: Python bytes() Method 

---

Python's `bytes()` function creates an immutable sequence of bytes from a given source. It accepts up to three arguments: a source object (an integer, string, iterable, or no argument), an optional encoding (required when the source is a string), and an optional error-handling scheme. When passed an integer, it creates a zero-filled bytes object of that length. When passed a string with an encoding, it converts the string to its byte representation. When passed an iterable of integers (each in the range 0-255), it creates a bytes object from those values. When called with no arguments, it returns an empty bytes object. The returned `bytes` object is immutable -- once created, its contents cannot be changed. If you need a mutable byte sequence, use [Python bytearray()](/posts/Python-bytearray()/) instead. The `bytes()` function is essential for working with binary data, network protocols, file I/O, cryptographic operations, and encoding text for transmission over the wire. It is a cornerstone of Python's binary data handling alongside [Python str()](/posts/Page-62-Python-str()/) for text data.

## What does bytes() return?

The `bytes()` function returns an immutable `bytes` object. The content depends on the input: zero-filled bytes for an integer, encoded bytes for a string, or a byte sequence from an iterable of integers.

## When should you use bytes()?

Use `bytes()` when you need to convert data into a binary format for storage, transmission, or processing. Common scenarios include encoding strings for network communication, preparing data for cryptographic hashing, writing binary files, and working with APIs that expect raw byte data.

The python bytes() method converts a given object and returns an immutable byte representation of a given object and data.

The syntax of bytes() method is

```python
bytes(given_object, encoding,error)
```

If you like to use the mutable version you can try the bytearray() method.

## Python bytes() Parameters


bytes() takes three optional parameters:


* **given\_object:** The object that has to be converted.  
* **Encoding:** String representation of the encoding method in case the given object is a string.  

* **error:** Method to handle error in case conversion fails.

The given\_object parameter can be used to initialize the byte array in the following ways:

* **Integer:** Returns array of size initialized to null.  
* **String:** Return the bytes of the given string.  
* **Object:** Just the buffer of the given object.   
* **Iterable:** An array of iterable size will return with elements equal to iterable elements.  
* **No Source:** Returns array with size 0\.

Now let's see some examples of the bytes() method.

Example 1: How to convert integer to string using bytes().

```python
int_value = 4

given_object = bytes(int_value)

print(given_object)
```

The output will be as follow.

```python
b'\x00\x00\x00\x00'
```

Example 2: how to use bytes to convert string to bytes.

```python
my_string = "Python Scholar"

given_object = bytes(my_string, 'utf-8')

print(given_object)
```

The output will be as follow.

```python
b'Python Scholar'

```

Example 3: How to convert iterable to bytes.

```python
my_list = [1, 2, 3, 4, 5]

given_object = bytes(my_list)

print(given_object)
```

Output:

```python
b'\x01\x02\x03\x04\x05'
```

## Common Use Cases

**Encoding strings for network transmission.** When sending text data over a network socket or HTTP connection, you must first convert it to bytes. Using `bytes(my_string, 'utf-8')` (or equivalently `my_string.encode('utf-8')`) produces the byte sequence that can be transmitted over the wire.

**Preparing data for cryptographic hashing.** Hash functions like SHA-256 require byte input. Converting a password or message to bytes with `bytes(data, 'utf-8')` is the necessary first step before passing it to `hashlib` functions.

**Creating binary buffers of a specific size.** When working with low-level protocols or file formats, `bytes(1024)` creates a 1024-byte buffer filled with zeros, which can be used as a placeholder or padding in binary data structures.

## Related Functions

* [Python bytearray()](/posts/Python-bytearray()/) -- the mutable counterpart of `bytes()`.
* [Python str()](/posts/Page-62-Python-str()/) -- convert an object to a string (the text counterpart of `bytes()`).
* [Python chr()](/posts/Python-chr()/) -- convert an integer code point to a character.

