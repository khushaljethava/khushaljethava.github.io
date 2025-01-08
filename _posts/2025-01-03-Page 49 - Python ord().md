---
title: Python ord()
description: The ord() is a built-in python function that returns an integer representation of the specified Unicode character.
date: 2025-01-03 22:42:23 +0800
categories: [Python]
tags: [python]
image:
 path: /commons/Python ord().png
 alt: Python ord()
---

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

## Rules of ord()

* The ord() function will only return an integer when a single string is passed.

You can also check the Python chr() function that does the total inverse from the Python ord() function.