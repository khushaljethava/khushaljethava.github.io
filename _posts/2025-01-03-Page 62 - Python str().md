---
title: Python str()
description: The str() is a built-in python function that converts a given value into a string.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python str().webp
  alt: Python str()
---

The Python `str()` function is a built-in function that converts a given value into its string representation. It accepts up to three parameters: `object` (the value to convert), `encoding` (the character encoding to use when decoding bytes, defaulting to UTF-8), and `errors` (the error handling strategy for decoding failures). When called with a non-bytes object, it returns the result of calling that object's `__str__()` method; when called with no arguments, it returns an empty string. The `str()` function is one of the most frequently used built-in functions in Python because virtually every program needs to convert data to strings for display, logging, file writing, or string concatenation. A practical example is converting numeric values to strings for constructing user-facing messages like `"Your balance is " + str(balance)`. It pairs naturally with [int()](/posts/Page-34-Python-int()/) and [float()](/posts/Page-23-Python-float()/) for converting between strings and numeric types.

## What does str() return?

The `str()` function returns a string representation of the given object. When called with no arguments, it returns an empty string `""`.

## When should you use str()?

Use `str()` when you need to convert non-string values like integers, floats, or custom objects into their string representations for display, logging, concatenation, or serialization purposes.

The syntax of str() is:

```python
str(object, encoding, errors)

```

## str() Parameters

The str() function takes three parameters as argument:

* object \- Name of the object whose string representation has to be returned. If no object is passed, it will return the empty string.   
* encoding \- The encoding type of the given object. Default is UTF-8.  
* errors \- Specifies what to do if the decoding fails.

Let's check some examples of  str() in python.

### Example 1: How to use str() function in python?

```python
# Empty string
s = str()
print(s)

# String with values
s = str("Python")
print(s)

```

Output:

```python
Python

```

### Example 2 :  How to use str() with encoding and error parameter?

```python
# bytes
b = bytes('pythön', encoding='utf-8')

print(str(b, encoding='ascii', errors='ignore'))

```

Output:

```python
pythn
```

Here, the character 'ö' cannot be decoded by ASCII. Hence, it should give an error. However, we have set the errors \='ignore'. Hence, Python ignores the character which cannot be decoded by str().


## Types of errors in str() 

There are total six types of errors:

* strict \- It will raise a UnicodeDecodeError exception on failure. It will be the default error type.  

* ignore \- it will ignore the unencodable Unicode from the result.  
* replace \- replaces the unencodable Unicode to a question mark.  
* xmlcharrefreplace \- It inserts XML character reference instead of the unencodable Unicode.  
* backslashreplace \- inserts a \\uNNNN espace sequence instead of unencodable Unicode.  
* namereplace \- inserts a \\N{...} escape sequence instead of unencodable Unicode.

## Common Use Cases

A common use case for `str()` is converting numeric values to strings for building user-facing messages or log entries, such as `"Order #" + str(order_id)`. Another practical scenario is decoding bytes objects received from network sockets or file reads into readable strings using the encoding parameter, which is essential when working with binary protocols or files in specific character sets. It is also commonly used to convert custom objects to strings by triggering their `__str__()` method, which is useful for debugging and display purposes alongside [repr()](/posts/Page-54-Python-repr()/).

## Rules of str()

* Empty string can be created using str() with no parameters.  

* str() function will return a simple printable representation of the given object.