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

The `str()` function returns a string representation of the given object. When called with no arguments, it returns an empty string `""`. The returned value is always of type `str`, regardless of what the original input type was. For built-in types like integers, floats, lists, and dictionaries, Python has predefined string representations. For custom objects, the result depends on whether the class defines a `__str__()` method — if it does, that method's return value is used; if not, Python falls back to the default object representation showing the class name and memory address.

## When should you use str()?

Use `str()` when you need to convert non-string values like integers, floats, or custom objects into their string representations for display, logging, concatenation, or serialization purposes. It is especially important in situations where Python does not perform implicit type conversion — for example, the `+` operator does not automatically convert an integer to a string when concatenating, so you must call `str()` explicitly. You should also use it when decoding bytes objects into human-readable text, particularly when you have control over the encoding type and error handling strategy.

## Syntax of str()

The syntax of str() is:

```python
str(object, encoding, errors)
```

## str() Parameters

The str() function takes three parameters as argument:

* **object** — The value or object whose string representation has to be returned. This can be any Python object: an integer, float, list, dictionary, custom class instance, bytes object, or anything else. If no object is passed, it will return the empty string `""`.
* **encoding** — The encoding type to use when decoding a bytes-like object. This parameter is only relevant when `object` is a bytes or bytearray instance. The default encoding is `'utf-8'`. Common values include `'ascii'`, `'utf-8'`, `'utf-16'`, and `'latin-1'`.
* **errors** — Specifies what to do if the decoding fails due to a character that cannot be represented in the specified encoding. This parameter is only used when `encoding` is provided. The default is `'strict'`. See the full list of error modes below.

> **Note:** If you pass `encoding` or `errors`, then `object` must be a bytes-like object (bytes or bytearray). Passing these parameters with a regular string or integer will raise a `TypeError`.

## Types of errors in str()

There are six types of error handling modes available:

* **strict** — Raises a `UnicodeDecodeError` exception on failure. This is the default error mode, and it is the safest because it alerts you immediately when a character cannot be decoded.
* **ignore** — Silently ignores any characters that cannot be decoded and removes them from the output. Use this when you are okay losing some data in exchange for no exceptions.
* **replace** — Replaces any unencodable character with the Unicode replacement character `?`. This preserves the length of the output and makes it clear where data was lost.
* **xmlcharrefreplace** — Inserts an XML character reference (e.g., `&#246;`) instead of the unencodable character. Useful when the output will be placed inside XML documents.
* **backslashreplace** — Inserts a `\uNNNN` escape sequence instead of the unencodable character. Useful for debugging or when the output needs to remain ASCII-safe.
* **namereplace** — Inserts a `\N{...}` escape sequence using the Unicode character name instead of the unencodable character. Useful for human-readable debugging output.

## Example 1: Basic usage of str()

```python
# Empty string — calling str() with no arguments
s = str()
print(s)          # Output: (empty line)
print(type(s))    # Output: <class 'str'>

# Converting an integer to a string
num = 42
s = str(num)
print(s)          # Output: 42
print(type(s))    # Output: <class 'str'>

# Converting a float to a string
pi = 3.14159
print(str(pi))    # Output: 3.14159

# Converting a list to a string
my_list = [1, 2, 3]
print(str(my_list))  # Output: [1, 2, 3]

# Converting a boolean to a string
print(str(True))   # Output: True
print(str(False))  # Output: False
```

## Example 2: Using str() with encoding and errors parameters

```python
# Create a bytes object with a special character
b = bytes('pythön', encoding='utf-8')

# Attempt to decode with ASCII encoding, ignoring errors
result = str(b, encoding='ascii', errors='ignore')
print(result)  # Output: pythn

# Using 'replace' to substitute unencodable characters
result = str(b, encoding='ascii', errors='replace')
print(result)  # Output: pyth?n

# Using 'backslashreplace' to show escape sequences
result = str(b, encoding='ascii', errors='backslashreplace')
print(result)  # Output: pyth\xc3\xb6n
```

Here, the character `'ö'` cannot be decoded by ASCII. With `errors='ignore'`, it is silently dropped. With `errors='replace'`, it becomes a question mark. With `errors='backslashreplace'`, the raw byte values are shown as escape sequences.

## Example 3: str() with custom objects

```python
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def __str__(self):
        return f"Product: {self.name}, Price: ${self.price:.2f}"

item = Product("Laptop", 999.99)
print(str(item))
# Output: Product: Laptop, Price: $999.99

# Without __str__, you get the default representation
class SimpleObj:
    pass

obj = SimpleObj()
print(str(obj))
# Output: <__main__.SimpleObj object at 0x...>
```

Defining `__str__()` in your class lets you control exactly what `str()` returns for your objects, making your code more readable and user-friendly.

## Real-World Use Cases

**1. Building user-facing messages:**
One of the most common uses of `str()` is constructing messages that include numeric data. Since Python does not automatically convert numbers to strings during concatenation, you need `str()` explicitly:

```python
order_id = 10234
total = 89.99
message = "Thank you! Your order #" + str(order_id) + " totals $" + str(total)
print(message)
# Output: Thank you! Your order #10234 totals $89.99
```

**2. Logging and debugging:**
When writing log messages, you often need to combine variable values with descriptive text. Using `str()` ensures that any data type is safely converted before being written to a log file or printed to the console.

```python
import datetime

event = "User login"
user_id = 5021
timestamp = datetime.datetime.now()
log_entry = "[" + str(timestamp) + "] " + event + " by user " + str(user_id)
print(log_entry)
```

**3. Decoding network or file data:**
When reading data from sockets, APIs, or binary files, you often receive bytes objects that need to be converted to human-readable strings:

```python
raw_data = b'Hello, World!'
text = str(raw_data, encoding='utf-8')
print(text)  # Output: Hello, World!
```

## Edge Cases and Gotchas

- **None converts to the string `"None"`**, not an empty string. Always check for `None` before using `str()` if an empty string is expected.
- **Passing encoding with a non-bytes object raises TypeError.** The `encoding` and `errors` parameters are strictly for bytes/bytearray decoding.
- **str() on a string returns the same string**, so `str("hello") == "hello"` is always `True`. There is no harm in calling it on an already-existing string.
- **Floating-point representation** can sometimes produce surprising results: `str(0.1 + 0.2)` returns `'0.30000000000000004'` due to floating-point precision. Use `format()` or f-strings for controlled decimal output.
- **str() does not format numbers** with commas, currency symbols, or padding. For formatted output, use f-strings or the `format()` built-in.

## Comparison with Related Functions

| Function | Purpose |
|---|---|
| `str()` | Converts any object to a human-readable string using `__str__()` |
| `repr()` | Converts any object to a developer-friendly string using `__repr__()` |
| `format()` | Converts a value to a string with specific formatting rules |
| `bytes()` | Converts a string to a bytes object (opposite of str() with encoding) |
| `int()` | Converts a string or number to an integer |

The key difference between `str()` and `repr()` is their intended audience. `str()` is designed for end users — it produces clean, readable output. `repr()` is designed for developers — it produces output that ideally could be used to recreate the object. For example, `str("hello")` returns `hello` while `repr("hello")` returns `'hello'` (with quotes).

## FAQ

**Q1: Can I use str() to convert a list or dictionary to a string?**
Yes, `str()` works on any Python object, including lists and dictionaries. However, the result is the same as what you would see when printing the object — it is not a JSON string. If you need a proper JSON representation, use the `json` module: `import json; json.dumps(my_dict)`.

**Q2: What is the difference between str(x) and f"{x}"?**
Both convert `x` to its string representation using the same `__str__()` mechanism, so for most cases they produce identical results. However, f-strings offer additional formatting options (e.g., `f"{x:.2f}"` for two decimal places) and are generally more readable when embedding multiple values in a string. `str(x)` is more explicit and sometimes preferred for single-value conversion.

**Q3: Why does str() sometimes return something unexpected for custom objects?**
If your class does not define a `__str__()` method, Python uses the default representation, which looks like `<ClassName object at 0x7f...>`. To get a meaningful string, define `__str__()` in your class that returns a descriptive string. If you also want `repr()` to work nicely, define `__repr__()` separately.

## Rules of str()

* An empty string can be created using `str()` with no parameters.
* The `str()` function will return a simple, printable representation of the given object.
* When `encoding` is specified, `object` must be a bytes-like object.
* The `errors` parameter is only meaningful when `encoding` is also provided.
* Custom classes can control what `str()` returns by implementing the `__str__()` method.