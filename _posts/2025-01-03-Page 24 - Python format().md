---
title: Python format() Method
description: In this tutorial , we will learn about python format() method and its uses.
date: 2025-01-03 22:15:55 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python format() Method.webp
  alt: Python format() Method
---

The Python `format()` function is a built-in that returns a formatted string representation of a given value according to a specified format specification. As a string method, `str.format()` accepts one or more positional or keyword arguments that are inserted into placeholder positions marked by curly braces `{}` within the string. Placeholders can use positional indexes like `{0}`, keyword names like `{name}`, or remain empty for sequential filling. The format specification mini-language supports alignment, padding, sign handling, width, precision, and type codes for integers, floats, percentages, and more. The function returns a new formatted string. A common real-world use case is generating formatted output for reports, receipts, and dashboards where numbers need specific decimal precision, currency formatting, or column alignment.

## What does format() return?

The `format()` method returns a new string where the placeholder fields are replaced with the formatted values of the provided arguments.

## When should you use format()?

Use `format()` when you need to construct strings with dynamic values and specific formatting requirements, such as controlling decimal places, padding, alignment, or converting numbers to binary, hex, or percentage representations.

## What is the Python format() Method?

The `format()` function is a built-in Python method that returns a formatted representation of the specified value. It is the foundation of Python's string formatting system and closely related to f-strings introduced in Python 3.6. Understanding `format()` gives you full control over how numbers, strings, and other data types appear in your program output.

Both the `format()` built-in and the `str.format()` method rely on the same underlying format specification mini-language. Mastering this mini-language is an essential Python skill for producing polished, readable output in reports, dashboards, logs, and command-line applications.

## Syntax of format()

```python
format(value, format_spec)
```

Or as a string method with multiple values:

```python
"template string".format(value1, value2, ...)
```

## format() Parameters

* **value** — The value to be formatted (number, string, or any object with a `__format__` method).
* **format_spec** — A string describing the desired output format. If omitted, the default string representation is used.

## format() Placeholders

Placeholders in the template string can be written in three ways:

* **Empty** `{}` — values filled in order from the argument list.
* **Positional** `{0}`, `{1}` — filled by argument index.
* **Named** `{name}` — filled by matching keyword argument.

---

## Examples of format()

### Example 1: Simple formatting using format()

```python
my_string = "Python"

print("We are learning {} from Pythonscholar.com".format("Python"))
print("We are learning {} from Pythonscholar.com".format(my_string))
print("We are learning {1} from {0}".format("Pythonscholar.com", "Python"))
```

Output:

```
We are learning Python from Pythonscholar.com
We are learning Python from Pythonscholar.com
We are learning Python from Pythonscholar.com
```

The third line uses positional indexes — `{1}` maps to the second argument `"Python"` and `{0}` maps to the first argument `"Pythonscholar.com"`.

### Example 2: Using format specifiers

```python
print("The value is: {:x}".format(500))
print("The value is: {:%}".format(0.80))
print("The value is: {:5}".format(40))
```

Output:

```
The value is: 1f4
The value is: 80.000000%
The value is:    40
```

- `{:x}` converts the integer to lowercase hexadecimal.
- `{:%}` multiplies by 100 and appends a `%` sign.
- `{:5}` pads the number to a minimum width of 5 characters.

### Example 3: Controlling decimal precision

```python
price = 19.999
print("Price: {:.2f}".format(price))
print("Price: {:.4f}".format(price))
print("Pi is approximately {:.5f}".format(3.14159265358979))
```

Output:

```
Price: 20.00
Price: 19.9990
Pi is approximately 3.14159
```

The `:.2f` specifier rounds to 2 decimal places — essential for currency and scientific output.

### Example 4: Alignment and padding

```python
print("{:<15}".format("left"))
print("{:>15}".format("right"))
print("{:^15}".format("center"))
print("{:*^20}".format(" TITLE "))
```

Output:

```
left           
          right
     center    
******* TITLE ********
```

Alignment specifiers are invaluable for generating neatly formatted tables in terminal output.

### Example 5: Named arguments

```python
template = "Hello, {name}! You have {count} new messages."
print(template.format(name="Alice", count=5))
print(template.format(name="Bob", count=12))
```

Output:

```
Hello, Alice! You have 5 new messages.
Hello, Bob! You have 12 new messages.
```

Named placeholders make templates readable and reusable across different data sets.

### Example 6: Number formatting — thousands separator and base conversion

```python
big_number = 1000000
print("Formatted: {:,}".format(big_number))
print("With underscore: {:_}".format(big_number))
print("Binary of 42: {:b}".format(42))
print("Octal of 42: {:o}".format(42))
print("Hex of 255: {:X}".format(255))
```

Output:

```
Formatted: 1,000,000
With underscore: 1_000_000
Binary of 42: 101010
Octal of 42: 52
Hex of 255: FF
```

---

## Formatting Specifiers Reference

The `format()` method supports a rich set of format specifiers:

| Specifier | Description |
| :-------- | :---------- |
| `:<` | Left-align result |
| `:>` | Right-align result |
| `:^` | Center-align result |
| `:=` | Place sign to the leftmost position |
| `:+` | Show plus sign for positive numbers |
| `:-` | Show minus sign for negative numbers only |
| `:,` | Use comma as thousands separator |
| `:_` | Use underscore as thousands separator |
| `:b` | Binary format |
| `:c` | Convert integer to Unicode character |
| `:d` | Decimal (integer) format |
| `:e` | Scientific notation (lowercase e) |
| `:E` | Scientific notation (uppercase E) |
| `:f` | Fixed-point number format |
| `:F` | Fixed-point (INF and NAN in uppercase) |
| `:g` | General format (auto-selects e or f) |
| `:o` | Octal format |
| `:x` | Hex format, lowercase |
| `:X` | Hex format, uppercase |
| `:n` | Number format (locale-aware) |
| `:%` | Percentage format |

---

## Real-World Use Cases

### Currency and financial output

```python
revenue = 1234567.8910
print("Monthly revenue: ${:,.2f}".format(revenue))
# Monthly revenue: $1,234,567.89
```

### Generating aligned tables

```python
header = "{:<20} {:>10} {:>10}".format("Product", "Price", "Stock")
row1 = "{:<20} {:>10.2f} {:>10}".format("Laptop", 999.99, 15)
row2 = "{:<20} {:>10.2f} {:>10}".format("Wireless Mouse", 29.95, 142)
print(header)
print("-" * 42)
print(row1)
print(row2)
```

### Structured logging

```python
log_entry = "[{level}] User '{user}' performed '{action}' from {ip}".format(
    level="INFO", user="alice", action="login", ip="192.168.1.10"
)
print(log_entry)
```

---

## Edge Cases and Gotchas

- **Literal braces**: To include `{` or `}` in the output, double them: `{{` and `}}`.
- **f-strings vs `.format()`**: F-strings are evaluated immediately where defined; `.format()` is better for reusable templates stored in variables or config files.
- **Missing arguments**: Referencing `{0}` with only one argument raises `IndexError`.
- **Type mismatch**: Passing a string to a numeric format spec like `{:d}` raises `ValueError`.

---

## Tips and Best Practices

1. **Use named placeholders** for reusable templates — more readable than positional indexes.
2. **Use `:.2f` for currency** to always show exactly two decimal places.
3. **Prefer f-strings for simple inline formatting** in Python 3.6+ — they are faster and cleaner.
4. **Use `.format()` for templates in variables** since f-strings evaluate immediately at definition.
5. **Escape braces with doubling** (`{{`, `}}`) when the output needs literal curly brace characters.

---

## Common Use Cases

A frequent use of `format()` is generating user-facing output with consistent number formatting, such as displaying prices with exactly two decimal places using `"{:.2f}".format(price)`. Another practical scenario is creating aligned table output in command-line tools, where fixed-width format specifiers ensure columns line up properly. It is also commonly used in logging and debugging to construct descriptive messages with variable data.

Related functions include the [Python float() method](/posts/Page-23-Python-float()/) for converting values before formatting and the [Python eval() method](/posts/Page-20-Python-eval()/) for dynamic expression evaluation.

---

## Frequently Asked Questions

**Q1: What is the difference between `format()` and f-strings?**

Both use the same format specification mini-language. F-strings (`f"Hello {name}"`) are evaluated immediately where they appear — the variable must already exist. `str.format()` accepts the values as arguments, making it ideal for reusable template strings defined separately from the data. For simple one-off formatting, f-strings are usually cleaner; for stored templates, `.format()` is more appropriate.

**Q2: How do I include a literal `{` or `}` in a formatted string?**

Double the brace: `{{` produces `{` and `}}` produces `}`. For example, `"{{score: {}}}".format(42)` produces `"{score: 42}"`.

**Q3: Can I use `format()` to format dates and times?**

Not directly — `format()` is designed for numbers and strings. For date/time formatting, use `datetime.strftime()` which provides its own format codes (e.g., `%Y-%m-%d` for ISO dates). You can combine both: `"Date: {}".format(dt.strftime("%Y-%m-%d"))` to embed a formatted date inside a broader template string.