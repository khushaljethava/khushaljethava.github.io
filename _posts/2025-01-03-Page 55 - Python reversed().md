---
title: Python reversed()
description: The reversed() function returns the reversed iterator of the given sequence object.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python reversed().webp
  alt: Python reversed()
---

## Introduction

When working with sequences in Python, there are many situations where you need to iterate through elements in reverse order — processing log files from newest to oldest, checking whether a string is a palindrome, traversing a stack, or simply displaying results in descending order. Python's built-in `reversed()` function was designed precisely for this purpose. It returns a reverse iterator over a sequence, allowing you to traverse elements from last to first without ever modifying the original data or creating a memory-expensive copy.

The `reversed()` function is elegant in its simplicity. Rather than reversing a sequence in place (as `list.reverse()` does) or producing a new reversed copy (as the `[::-1]` slice does), `reversed()` creates a lazy iterator that yields elements on demand. This makes it especially powerful when dealing with large datasets where memory efficiency matters. Understanding how and when to use `reversed()` is an important part of writing idiomatic, Pythonic code.

## Syntax

```python
reversed(seq)
```

The function accepts exactly one argument and returns a `reversed` iterator object.

## Parameters

The `reversed()` function takes only one parameter:

- **seq** — The sequence object to be reversed. This must be either:
  - A built-in sequence type: `list`, `tuple`, `str`, or `range`
  - Any object that implements the `__reversed__()` special method
  - Any object that implements both `__len__()` and `__getitem__()` (the sequence protocol)

If the argument does not satisfy any of these conditions, Python raises a `TypeError`.

## Return Value

`reversed()` returns a `reversed` iterator object. This object is lazy — it does not compute or store all reversed elements at once. Instead, it computes each element on demand as you iterate. To get a concrete list or tuple from the iterator, you can wrap it with `list()` or `tuple()`.

---

## Example 1: Using reversed() with Built-in Sequence Types

The most common use of `reversed()` is with Python's built-in sequences: strings, tuples, lists, and ranges.

```python
# Reversing a string
seq_string = 'Python'
print(list(reversed(seq_string)))

# Reversing a tuple
seq_tuple = ('P', 'y', 't', 'h', 'o', 'n')
print(list(reversed(seq_tuple)))

# Reversing a range
seq_range = range(5, 9)
print(list(reversed(seq_range)))

# Reversing a list
seq_list = [1, 2, 4, 3, 5]
print(list(reversed(seq_list)))
```

**Output:**

```
['n', 'o', 'h', 't', 'y', 'P']
['n', 'o', 'h', 't', 'y', 'P']
[8, 7, 6, 5]
[5, 3, 4, 2, 1]
```

In each case, we convert the iterator returned by `reversed()` to a list using `list()`. Notice that the original sequences are left unchanged — `reversed()` does not mutate the data it operates on.

---

## Example 2: Using reversed() with Custom Objects

Any class that defines a `__reversed__()` method can be used with `reversed()`. This is useful when you build your own container types and want to support backward iteration.

```python
class Vowels:
    vowels = ['a', 'e', 'i', 'o', 'u']

    def __reversed__(self):
        return reversed(self.vowels)

v = Vowels()
print(list(reversed(v)))
```

**Output:**

```
['u', 'o', 'i', 'e', 'a']
```

Alternatively, if your class implements `__len__()` and `__getitem__()`, Python's `reversed()` can automatically generate a reverse iterator using the sequence protocol without requiring an explicit `__reversed__()` method.

```python
class CountDown:
    def __init__(self, start):
        self.start = start

    def __len__(self):
        return self.start

    def __getitem__(self, index):
        if index < 0 or index >= self.start:
            raise IndexError("Index out of range")
        return self.start - index

countdown = CountDown(5)
print(list(reversed(countdown)))
```

**Output:**

```
[1, 2, 3, 4, 5]
```

---

## Example 3: Iterating in Reverse Without Converting to a List

Since `reversed()` returns an iterator, you can use it directly in a `for` loop without ever converting it to a list. This is the most memory-efficient approach.

```python
tasks = ['Login', 'Fetch data', 'Process records', 'Save results', 'Logout']

print("Undo sequence:")
for task in reversed(tasks):
    print(f"  Undoing: {task}")
```

**Output:**

```
Undo sequence:
  Undoing: Logout
  Undoing: Save results
  Undoing: Process records
  Undoing: Fetch data
  Undoing: Login
```

This pattern is especially useful in undo/redo systems, rollback procedures, and anywhere you need to process a history stack from the most recent action backward.

---

## Real-World Use Cases

**1. Processing log files in reverse chronological order**

Log files are typically written in chronological order — oldest entry first. When debugging or auditing, you usually want to see the most recent events first. Using `reversed()` on a list of log lines avoids loading and reversing the entire file:

```python
with open("app.log") as f:
    lines = f.readlines()

for line in reversed(lines):
    print(line.strip())
```

**2. Palindrome detection**

Checking whether a word or phrase is a palindrome involves comparing the string with its reverse. `reversed()` provides a clean way to do this:

```python
def is_palindrome(text):
    cleaned = text.replace(" ", "").lower()
    return cleaned == ''.join(reversed(cleaned))

print(is_palindrome("racecar"))   # True
print(is_palindrome("hello"))     # False
```

**3. Displaying breadcrumb navigation**

In web applications, breadcrumb trails often need to be shown from deepest level to root:

```python
path = ['Home', 'Electronics', 'Computers', 'Laptops']
breadcrumb = ' > '.join(reversed(path))
print(breadcrumb)  # Laptops > Computers > Electronics > Home
```

---

## Edge Cases and Gotchas

**Dictionaries are not directly supported before Python 3.8**

Prior to Python 3.8, passing a dictionary to `reversed()` raised a `TypeError`. From Python 3.8 onward, dictionaries maintain insertion order, and `reversed()` works on them:

```python
d = {'a': 1, 'b': 2, 'c': 3}
print(list(reversed(d)))  # ['c', 'b', 'a'] — Python 3.8+
```

**Sets and plain generators are not supported**

Sets are unordered, so reversing them makes no sense, and Python raises a `TypeError`. Similarly, generator objects cannot be passed to `reversed()`.

**The iterator is exhausted after one pass**

Like all iterators, the `reversed` object can only be iterated once. After it is consumed, it yields nothing:

```python
rev = reversed([1, 2, 3])
print(list(rev))  # [3, 2, 1]
print(list(rev))  # [] — already exhausted
```

---

## reversed() vs. [::-1] Slicing

| Feature | `reversed()` | `[::-1]` slicing |
|---|---|---|
| Returns | Lazy iterator | New list/string/tuple |
| Memory usage | Low (no copy) | High (creates a copy) |
| Works on custom objects | Yes (via `__reversed__`) | No |
| Result type | `reversed` iterator | Same type as input |

For large sequences where you only need to iterate once, `reversed()` is the better choice. If you need a new reversed list for further use, `[::-1]` may be more convenient.

## reversed() vs. list.reverse()

`list.reverse()` is an in-place method available only on lists. It reverses the list permanently and returns `None`. `reversed()`, by contrast, works on any sequence, does not modify the original, and returns an iterator.

```python
data = [1, 2, 3, 4, 5]

# In-place reversal — modifies data
data.reverse()
print(data)  # [5, 4, 3, 2, 1]

# Non-destructive reversal — data unchanged
data2 = [1, 2, 3, 4, 5]
for item in reversed(data2):
    print(item, end=' ')  # 5 4 3 2 1
print()
print(data2)  # [1, 2, 3, 4, 5] — unchanged
```

---

## Frequently Asked Questions

**Q1: Can I use reversed() on a string directly?**

Yes. Strings are sequences in Python, so `reversed()` accepts them directly. The result is an iterator over the individual characters in reverse order. To get a reversed string, join the iterator: `''.join(reversed("hello"))` produces `"olleh"`.

**Q2: Does reversed() work on NumPy arrays?**

NumPy arrays support the sequence protocol (`__len__` and `__getitem__`), so `reversed()` works on 1D arrays. However, for NumPy, it is more common to use native slicing (`arr[::-1]`) for performance reasons.

**Q3: How do I reverse a range in Python?**

You can pass a `range` object directly to `reversed()`:

```python
for i in reversed(range(1, 6)):
    print(i, end=' ')  # 5 4 3 2 1
```

Alternatively, you can create a descending range with a negative step: `range(5, 0, -1)`. Both approaches produce the same sequence, but `reversed(range(...))` is often considered more readable.

## Rules of reversed()

* The `reversed()` function can only take sequence objects like list, string, tuple, range, or custom objects implementing `__reversed__()` or the sequence protocol.
* It does not modify the original sequence.
* The returned iterator can only be consumed once.
* Passing an unordered collection like a set or a raw generator raises a `TypeError`.

For sorting sequences in a specific order, see the [Python sorted()](/posts/Page-60-Python-sorted()/) function, which can produce descending results using its `reverse` parameter. To convert a reversed iterator into a list, the [Python list()](/posts/Page-39-Python-list()/) function is commonly used.