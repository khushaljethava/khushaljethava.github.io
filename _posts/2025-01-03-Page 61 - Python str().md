---
title: Python str()
description: The str() is a built-in python function that converts a given value into a string.
date: 2025-01-03 22:42:23 +0800
categories: [Python]
tags: [python]
image:
 path: /commons/Python str().png
 alt: Python str()
---

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

## Rules of str()

* Empty string can be created using str() with no parameters.  
* str() function will return a simple printable representation of the given object.