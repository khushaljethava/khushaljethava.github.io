---
title: Python repr()
description: The repr() function will return the printable representation of all information regarding the given object.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python repr().webp
  alt: Python repr()
---

The Python `repr()` built-in function returns a string containing a printable, unambiguous representation of an object. It accepts a single parameter, the object whose representation you want to obtain, and returns a string that ideally could be used to recreate the object using `eval()`. The key distinction between `repr()` and `str()` is that `repr()` is designed for developers and debugging, producing output that clearly shows the type and value of the object, including quotes around strings and escape characters for special characters. For custom classes, `repr()` calls the object's `__repr__()` method, which you can override to provide meaningful debug output. Real-world use cases include logging object states during debugging, generating diagnostic output in error messages, serializing objects to a human-readable format for inspection, and implementing the `__repr__()` method in custom classes to make them easier to debug in interactive Python sessions and log files.

## What does repr() return?

The `repr()` function returns a string that is an unambiguous, developer-oriented representation of the given object, typically including type information and quotes around string values.

## When should you use repr()?

Use `repr()` when you need an unambiguous string representation of an object for debugging, logging, or diagnostic purposes, especially when `str()` output would be ambiguous or lose important type information like quotes around strings.

The syntax of repr() is:

```python
repr(object_name)

```

## repr() Parameters

The repr() function only take one parameter as an argument:

* **object\_name** \- the name of the object whose information has to be returned.

Let's check some examples of the python repr() function.


### Example 1: How to use the repr() function in python?

```python
object_name = "Python"

print(repr(object_name))

```

Output:

```python
'Python'

```

In the above program, we assign a value “Python” to the object\_name variable. Then the repr() function returns “Python” or ‘Python’ inside double-quotes.


## Common Use Cases

Debugging and logging are the primary applications of `repr()`. When writing log messages that include variable values, using `repr()` ensures that strings are shown with quotes, special characters are escaped, and the exact type and content of the object are clear. This is far more informative than `str()` when diagnosing issues in production logs.

Implementing `__repr__()` in custom classes is a best practice that `repr()` supports. By defining a `__repr__()` method that returns a string like `ClassName(arg1, arg2)`, you make your objects self-documenting in interactive sessions, debuggers, and error tracebacks, which significantly improves development productivity.

Generating test assertions and data snapshots is another practical use. When writing tests, you can use `repr()` to capture the exact state of an object and compare it against expected values, ensuring that subtle differences in type or formatting are caught.

For user-facing string output, see the [Python str()](/posts/Page-62-Python-str/) function, which produces a more readable representation. To format strings with more control over layout and precision, the [Python format()](/posts/Page-24-Python-format/) function is a useful complement.

## Rules of repr()

* repr() will return a string representing a given object; if the integer is given, it will return it as a string.