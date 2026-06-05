---
title: Python float() Method
description: In this tutorial we will learn about python float() method and ts uses.
date: 2025-01-03 22:15:55 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python float() Method.webp
  alt: Python float() Method
---

The Python `float()` function is a built-in that converts a number or a string into a floating-point number. It takes a single optional parameter, which can be an integer, a string containing a numeric value, or a boolean. When called with no arguments, it returns `0.0`. The function also accepts the special string values `'nan'` (not a number), `'inf'`, and `'-inf'` for representing IEEE 754 special floating-point values. It returns a `float` object representing the decimal number. Strings with leading and trailing whitespace are handled automatically. A common real-world use case is parsing user input or data from CSV files and APIs where numeric values arrive as strings and need to be converted to floating-point numbers for mathematical operations, financial calculations, or scientific computing.

## What does float() return?

The `float()` function returns a floating-point number converted from the given integer, string, or boolean input, or `0.0` when called with no arguments.

## When should you use float()?

Use `float()` when you need to convert string or integer data to decimal numbers for arithmetic, especially when processing external input from files, forms, or API responses where numbers are represented as strings.

## Common Use Cases

A common use of `float()` is parsing numeric input from command-line arguments or web forms, where all input arrives as strings and must be converted before calculations. Another practical scenario is normalizing data types when reading CSV files, where columns may contain a mix of integer and decimal values that should all become floats for consistent mathematical operations. It is also used for type checking and coercion in data pipelines where incoming JSON values might be integers that need to be floats for division or percentage calculations. Related functions include the [Python int() method](/posts/Page-34-Python-int()/) for converting to integers and the [Python format() method](/posts/Page-24-Python-format()/) for controlling how float values are displayed.

## What is python float() method?


The python float() method returns the floating-point number of a given number or a string; we can also use it for typecasting in python.

The syntax of float() is:

```python
float(variable)

```


## float() Parameters

The float() method takes only one parameter as an argument:

**variable**  \-  a number or string that needs to be typecast to a floating-point number.

Let's check an example of the float() method.

### Example 1: How to use float()  in python

```python
print(float(4))

print(float(6.5))

print(float(-72))

print(float("345"))

print(float("   98      "))

print(float(True))

print(float(False))

```

The output will be as follows.

```python
4.0
6.5
-72.0
345.0
98.0
1.0
0.0

```

In the above program, we take multiple values like integer, string, string with whitespace, negative integer, and boolean. As you can see, we are using the float() method to convert them into a floating-point number. But when we use a boolean value, it will give 1.0 for True and 0.0 for False value.

We need to remember that it should be in numbers or Nan(not a number); otherwise, it will raise an error.

### Example 2: How to use float() with string in python?

```python
print(float("34"))

print(float("67.34"))

print(float("PythonScholar"))

```

Output:

```python
34.0
67.34
Traceback (most recent call last):
  File "", line 5, in <module>
    print(float("PythonScholar"))
ValueError: could not convert string to float: 'PythonScholar.'

```

As you can see in the output, it converts all the strings with numbers but throws an error when using a string with PythonScholar because we cannot convert a string that is not a number.

### Example 3: using float() with infinity and Nan(not a number)?

```python
# NaN in float

print(float("nan"))

print(float("NaN"))

# inf/infinity in float

print(float("inf"))
print(float("InF"))
print(float("InFiNiTy"))
print(float("infinity"))

```

The output will be as follow:

```python
nan
nan
inf
inf
inf
inf

```


## Example 4: Practical conversion in a data processing script

A realistic scenario is reading a list of string values from a CSV column and safely converting each to a float, handling errors gracefully.

```python
raw_prices = ['19.99', '4.50', '', 'N/A', '299.00', '  12.5  ']

def safe_float(value, default=0.0):
    """Convert a string to float, returning default on failure."""
    try:
        return float(value.strip()) if value.strip() else default
    except (ValueError, AttributeError):
        return default

prices = [safe_float(p) for p in raw_prices]
print(prices)
# [19.99, 4.5, 0.0, 0.0, 299.0, 12.5]

total = sum(prices)
print(f"Total: {total:.2f}")
# Total: 336.04
```

The `safe_float` helper strips whitespace and catches `ValueError` so that malformed entries like `'N/A'` or empty strings are replaced with a sensible default rather than crashing the whole pipeline.

## Real-World Use Cases

**Parsing API and JSON responses** — REST APIs often return numeric values as strings inside JSON, especially for currencies or measurements. Using `float()` during deserialization ensures you can perform arithmetic without surprises.

**Scientific and engineering calculations** — Libraries like NumPy and SciPy expect floating-point inputs. Converting integer measurements or string-based sensor readings to `float` is a necessary preprocessing step.

**Financial computations** — When reading price data from spreadsheets or databases, fields may be stored as strings like `'19.99'`. Converting them with `float()` before summing totals, computing averages, or applying discounts is standard practice.

**User input validation** — In command-line tools or web forms, checking whether a user-provided string can be converted with `float()` is a simple way to validate that the input is numeric before further processing.

**Normalization in machine learning pipelines** — Feature values read from CSV files as strings need to be converted to floats before feeding into training algorithms. `float()` combined with error handling forms the basis of many data-cleaning utilities.

## Edge Cases and Gotchas

**Non-numeric strings raise ValueError** — Any string that cannot be interpreted as a number, such as `'hello'`, `'12px'`, or `'1,000'` (with a comma), raises `ValueError`. Strip currency symbols, commas, and units before calling `float()`.

**Integer overflow vs float range** — Python integers have unlimited precision, but Python floats are 64-bit IEEE 754 doubles. Very large integers may lose precision or raise `OverflowError` when converted.

```python
print(float(10**309))   # OverflowError: int too large to convert to float
```

**Boolean inputs** — `float(True)` returns `1.0` and `float(False)` returns `0.0`. This is consistent with Python's treatment of `bool` as a subclass of `int`, but it can be surprising if boolean values end up in a numeric pipeline unintentionally.

**Locale-specific decimal separators** — In some locales, a comma is used as the decimal separator (for example `'3,14'` in many European countries). Python's `float()` does not handle this; you need to replace the comma with a period first: `float('3,14'.replace(',', '.'))`.

**`nan` and `inf` comparisons** — `float('nan') != float('nan')` is `True` because IEEE 754 defines NaN as not equal to anything, including itself. Use `math.isnan()` to check for NaN values rather than equality comparisons.

## Tips for Using float() Effectively

- Always wrap `float()` in a `try/except ValueError` block when processing external input to avoid crashes on unexpected data.
- Use `math.isnan()` and `math.isinf()` from the `math` module to check for special float values after conversion.
- If you need high-precision decimal arithmetic (for example for financial calculations), prefer the `decimal.Decimal` class over `float` to avoid floating-point rounding errors.
- Strip whitespace and remove formatting characters (commas, currency symbols, percent signs) from strings before passing them to `float()`.
- When converting a large collection, consider using a list comprehension with a helper function rather than calling `float()` inline, to handle errors per element rather than aborting the whole operation.

## Rules of float() method

- An argument must be an integer, string representing a number, a boolean, or one of the special string values `'nan'`, `'inf'`, `'-inf'`, `'infinity'` (case-insensitive).
- If no argument is passed, `float()` returns `0.0`.
- Passing a non-numeric string raises `ValueError`.
- Passing a value outside the representable range of a 64-bit float raises `OverflowError`.

## Frequently Asked Questions

**Q: What is the difference between `float()` and `int()` in Python?**

A: `float()` converts a value to a decimal floating-point number (for example `float(4)` returns `4.0`), while `int()` converts to a whole integer and truncates any decimal part (for example `int(4.9)` returns `4`). Use `float()` when decimal precision matters and `int()` when you need a whole number.

**Q: Can `float()` convert a string like `'1,234.56'` with a comma as a thousands separator?**

A: No, not directly. `float('1,234.56')` raises `ValueError`. You must remove the comma first: `float('1,234.56'.replace(',', ''))` returns `1234.56`. For locale-aware parsing, use `locale.atof()` from the `locale` module.

**Q: Why does `float(True)` return `1.0` instead of raising an error?**

A: In Python, `bool` is a subclass of `int`, so `True` has an integer value of `1` and `False` has a value of `0`. Since `float()` accepts integers, it also accepts booleans by the same mechanism, returning `1.0` and `0.0` respectively. This is expected behaviour, not a bug, but be mindful of it when processing data that might contain boolean values mixed with numeric data.