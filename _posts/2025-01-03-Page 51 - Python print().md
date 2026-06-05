---
title: Python print()
description: The print() function prints the given message to the screen of the output device, which can be a python interpreter, Terminal, or an IDE (integrated development environment), and the message can be a string or any other object like a list, tuple, set and dictionary.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python print().webp
  alt: Python print()
---

The Python `print()` built-in function outputs text and other objects to the console or a specified file stream. It accepts any number of positional arguments (the objects to print), along with optional keyword parameters: `sep` (the separator between objects, defaulting to a single space), `end` (the string appended after the last object, defaulting to a newline), `file` (a writable stream object, defaulting to `sys.stdout`), and `flush` (a boolean controlling whether the output buffer is immediately flushed). The function returns `None` since its purpose is to produce a side effect rather than compute a value. As the most commonly used function in Python, `print()` is essential for debugging, logging quick status messages, displaying program output to users, writing formatted reports to files, and providing feedback during interactive sessions. It handles automatic type conversion by calling `str()` on each argument, making it convenient to output integers, floats, lists, and other objects without manual conversion.

## What does print() return?

The `print()` function always returns `None`; its purpose is the side effect of writing the string representation of the given objects to the specified output stream.

## When should you use print()?

Use `print()` for displaying output to users, quick debugging during development, writing formatted text to files via the `file` parameter, and any situation where you need to send human-readable text to an output stream.

## Understanding the print() Function

The `print()` function is arguably the first function every Python developer learns, yet it has several powerful parameters that many developers overlook. While `print("Hello World")` covers the basics, mastering `sep`, `end`, `file`, and `flush` lets you build progress bars, write reports to files, print CSV-style data, and control buffered output in long-running processes.

Python 3 made `print()` a proper function (previously a statement in Python 2), which means it can be passed as an argument, used in comprehensions, and patched like any other callable. Every object passed to `print()` is automatically converted to a string via `str()`, so you can print integers, floats, lists, and custom objects directly without manual conversion.

## Syntax of print()

```python
print(object(s), sep=separator, end=end, file=file, flush=flush)
```

## Python print() Parameters

* **object(s)** — One or more objects to print. Each is converted to a string using `str()`. Multiple objects are separated by `sep`.
* **sep** — The separator string placed between objects. Defaults to a single space `' '`. (Optional)
* **end** — The string appended after the last object. Defaults to newline `'\n'`. (Optional)
* **file** — A writable stream object. Defaults to `sys.stdout`. Pass a file object to redirect output. (Optional)
* **flush** — If `True`, the output buffer is forcibly flushed after printing. Defaults to `False`. (Optional)

---

## Examples of print()

### Example 1: Basic usage

```python
print("Hello World!")
```

Output:

```
Hello World!
```

### Example 2: Printing multiple objects

```python
print("Hello World!", "We are using Python3.")
```

Output:

```
Hello World! We are using Python3.
```

By default, multiple objects are joined with a single space character.

### Example 3: Using the sep parameter

The `sep` parameter controls what character (or string) appears between items:

```python
print("String1", "String2", "String3")
print("String1", "String2", "String3", sep='/')
print("String1", "String2", "String3", sep='-')
print("String1", "String2", "String3", sep='#')
```

Output:

```
String1 String2 String3
String1/String2/String3
String1-String2-String3
String1#String2#String3
```

A practical application is printing CSV-style rows: `print(*row, sep=',')` outputs list items separated by commas.

### Example 4: Using the end parameter

By default, `print()` adds a newline after each call. You can override this:

```python
print("Hello World", end='!')
print(" Python3 is Awesome", end='\n')
```

Output:

```
Hello World! Python3 is Awesome
```

Setting `end=''` is useful for printing on the same line across multiple calls:

```python
for i in range(5):
    print(i, end=' ')
print()  # final newline
```

Output:

```
0 1 2 3 4 
```

### Example 5: Printing to a file with the file parameter

```python
my_file = open('output.txt', 'w')
print('Hello World!', file=my_file)
print('Second line of output.', file=my_file)
my_file.close()
```

This creates (or overwrites) `output.txt` and writes both lines to it. The `file` parameter accepts any object with a `.write()` method, including `sys.stderr` for error output.

### Example 6: Printing to stderr

```python
import sys

print("This is a normal message.")
print("This is an error message.", file=sys.stderr)
```

Using `sys.stderr` is the correct approach for error messages in command-line tools, keeping them separate from standard output in pipelines.

### Example 7: Using flush for real-time output

```python
import time

for i in range(5):
    print(f"Processing step {i + 1}...", end='\r', flush=True)
    time.sleep(0.3)

print("Done!                    ")
```

`flush=True` ensures each update is displayed immediately rather than being held in a buffer. Combined with `end='\r'`, it creates an in-place updating status line.

---

## Real-World Use Cases

### Quick debugging

```python
def calculate_discount(price, rate):
    discount = price * rate
    print(f"Debug: price={price}, rate={rate}, discount={discount}")
    return price - discount

final = calculate_discount(100, 0.15)
```

Inserting `print()` calls is the fastest way to trace variable values during development before setting up a proper debugger or structured logging.

### Generating formatted console tables

```python
data = [("Alice", 88), ("Bob", 95), ("Carol", 79)]
print(f"{'Name':<10} {'Score':>6}")
print("-" * 18)
for name, score in data:
    print(f"{name:<10} {score:>6}")
```

Output:

```
Name        Score
------------------
Alice          88
Bob            95
Carol          79
```

### Writing a simple text report to a file

```python
report_lines = ["Sales Report", "=" * 30, "Product A: $1,200", "Product B: $850"]

with open("report.txt", "w") as f:
    for line in report_lines:
        print(line, file=f)
```

### Printing CSV rows without import

```python
rows = [["name", "age", "city"], ["Alice", 30, "NYC"], ["Bob", 25, "LA"]]
for row in rows:
    print(*row, sep=',')
```

Output:

```
name,age,city
Alice,30,NYC
Bob,25,LA
```

---

## Edge Cases and Gotchas

- **`print()` with no arguments**: Outputs just an empty line — it prints only the `end` character, which is `'\n'` by default.
- **Printing `None`**: `print(None)` outputs the string `"None"`, it does not suppress output.
- **`flush=True` performance**: Flushing on every call in a tight loop bypasses buffering and slows output significantly.
- **`end='\r'` on Windows**: Carriage return behavior can differ across terminals and IDEs — test in-place updates in the actual target environment.
- **`print()` always returns `None`**: Assigning `x = print("hi")` gives `None`, not the printed string.

---

## Tips and Best Practices

1. **Use f-strings for formatted output** — `print(f"Name: {name}, Score: {score:.2f}")` is cleaner than concatenation.
2. **Use `sep=','` for quick CSV output** — `print(*row, sep=',')` prints list items as CSV with no imports.
3. **Use `file=sys.stderr` for error messages** — separate errors from standard output in pipeline-friendly scripts.
4. **Avoid `print()` for production logging** — use the `logging` module instead, which supports levels, formatting, and file rotation.
5. **Use `end=''` to build output incrementally** — essential for progress bars and status displays that overwrite the same line.

---

## Common Use Cases

Debugging during development is the most frequent use of `print()`. Inserting `print()` calls to inspect variable values, execution flow, and intermediate results is the quickest way to diagnose issues in small scripts and during prototyping.

Generating formatted console output for command-line applications is another core use case. By combining `sep` and `end`, you can produce neatly formatted tables, progress indicators, and status messages.

Writing structured output to files using the `file` parameter allows `print()` to serve as a simple report generator, directing formatted output to log files or text reports.

For reading user input from the console, see the [Python input()](/posts/Page-33-Python-input()/) function. To open files for writing with the `file` parameter, the [Python open()](/posts/Page-48-Python-open()/) function provides the necessary file object.

---

## Frequently Asked Questions

**Q1: What is the difference between `print()` and `sys.stdout.write()`?**

`print()` automatically converts objects to strings using `str()`, adds the separator between multiple items, and appends the `end` string (newline by default). `sys.stdout.write()` requires a string argument and writes it exactly as-is — no automatic newline or separator. `print()` is more convenient for general use, while `sys.stdout.write()` gives finer control when you need precise output without extra characters.

**Q2: How do I print without a newline at the end?**

Set the `end` parameter to an empty string: `print("no newline", end='')`. This is commonly used to print multiple pieces of output on the same line across several `print()` calls, or to build progress indicators that overwrite the current line with `end='\r'`.

**Q3: Can `print()` write directly to a file?**

Yes. Pass an open file object to the `file` parameter: `print("content", file=my_file)`. The file must be opened in a write mode (`'w'`, `'a'`, etc.) before passing it to `print()`. This is a convenient way to write human-readable text to files without calling `my_file.write()` and manually managing newlines.