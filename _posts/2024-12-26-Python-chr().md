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

## Rules of Python chr() 

* It will only return a string character whose Unicode code points are the integer of a given number.  
* It will take only integers as an argument.  
* If the integer is outside the range, it will throw a ValueError error.