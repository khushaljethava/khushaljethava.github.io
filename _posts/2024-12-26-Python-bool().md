---
title: Python bool() Method
description: The bool() is a built-in Python method that returns the boolean(True or False)  value of a specified given object using python’s standard truth testing procedure.
date: 2024-12-26 21:19:00 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python bool() Method.webp
  alt: Python bool() Method

---

Python's `bool()` function converts a value to a Boolean -- either `True` or `False` -- using Python's standard truth-testing procedure. It accepts a single optional argument of any type and returns `True` if the value is considered truthy, or `False` if it is falsy. When called with no arguments, `bool()` returns `False`. Values considered falsy include `None`, numeric zeros (`0`, `0.0`, `0j`), empty sequences and collections (`""`, `()`, `[]`, `{}`), and objects whose `__bool__()` or `__len__()` methods return `0` or `False`. Every other value is considered truthy. This function is essential for writing clear conditional logic, validating user input, filtering data, and converting values from external sources into explicit Boolean flags. It is closely related to [Python int()](/posts/Page-34-Python-int()/), since `bool` is actually a subclass of `int` in Python, where `True` equals `1` and `False` equals `0`.

## What does bool() return?

The `bool()` function always returns either `True` or `False`. It evaluates the given value according to Python's truth-testing rules and returns the corresponding Boolean.

## When should you use bool()?

Use `bool()` when you need to explicitly convert a value to a Boolean, such as when storing flags in a database, serializing data to JSON, or making the truthiness of a value explicit in your code for readability.

The syntax of bool() method is:

```python
bool(value)
```

## Python bool() parameters

The bool()  has no specified parameter; it is not mandatory to pass a value to the bool() method. 


Let see an example of the bool() method.

Example 1: Using bool() method.

```python
my_bool = []
print(my_bool,'is',bool(my_bool))

my_bool = [0]
print(my_bool,'is',bool(my_bool))

my_bool = 0.0
print(my_bool,'is',bool(my_bool))

my_bool = None
print(my_bool,'is',bool(my_bool))

my_bool = True
print(my_bool,'is',bool(my_bool))

my_bool = 'Easy string'
print(my_bool,'is',bool(my_bool))
```

The output will be as follows.

```python
[] is False
[0] is True
0.0 is False
None is False
True is True
Easy string is True
```


The following values are always considered false in Python:

* None will return False as it is a Null value.  
* False will also return False as output.  
* Empty Sequence  and mapping like (),\[\],’’ and {} will return False.  
* objects of Classes which has \_\_bool\_\_() or \_\_len()\_\_ method which returns 0 or False

All other values except these values are considered true.


## Common Use Cases

**Validating user input before processing.** When accepting data from forms or APIs, `bool()` lets you quickly check whether a field has any meaningful content. For example, `bool(user_input.strip())` returns `False` for empty or whitespace-only strings, making it easy to reject blank submissions.

**Filtering truthy values from a collection.** When working with lists that may contain `None`, zero, or empty strings alongside real data, you can use `bool()` with `filter()` to keep only meaningful values: `list(filter(bool, my_list))` removes all falsy entries.

**Converting database or API values to explicit flags.** External data sources may represent Boolean states as integers (0/1), strings ("true"/"false"), or `None`. Using `bool()` normalizes these into proper Python Booleans for consistent downstream logic.

## Rules of bool() method.

* If the value is not empty and has any true value, it will return True.  
* If the value is empty and has no true value, it will return False.

## Related Functions

* [Python int()](/posts/Page-34-Python-int()/) -- convert a value to an integer (`bool` is a subclass of `int`).
* [Python all()](/posts/Python-all()/) -- return `True` if all elements in an iterable are truthy.
* [Python any()](/posts/Python-any()/) -- return `True` if any element in an iterable is truthy.