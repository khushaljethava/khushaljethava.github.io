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

