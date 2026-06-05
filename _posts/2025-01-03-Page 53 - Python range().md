---
title: Python range()
description: The Python range() function is used to generate a sequence of numbers. The sequence will start from 0 by default, increment by 1, and stop before a specified number.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python range().webp
  alt: Python range()
---

Python's `range()` function generates an immutable sequence of integers, commonly used for looping a specific number of times. It accepts one to three arguments: `stop` (required), and optionally `start` and `step`. When called with a single argument, `range(stop)` produces numbers from 0 up to but not including `stop`. With two arguments, `range(start, stop)` begins at `start`. With three arguments, `range(start, stop, step)` increments by `step` instead of the default 1. The function returns a `range` object, which is memory-efficient because it calculates values on demand rather than storing them all in memory. This makes it suitable for iterating over millions of values without consuming significant memory. `range()` is the backbone of `for` loops in Python and is also used for generating indices, slicing patterns, and creating numeric test data. You can measure the length of a range with [Python len()](/posts/Page-38-Python-len()/) and convert it to a list if you need the full sequence in memory.

## What does range() return?

The `range()` function returns an immutable `range` object that generates integers on demand. It does not return a list -- you must pass the result to `list()` if you need an actual list of numbers.

## When should you use range()?

Use `range()` when you need to iterate a specific number of times in a `for` loop, generate a sequence of indices for accessing list elements by position, or create evenly spaced numeric sequences for calculations, sampling, or test data generation.

## Understanding the range() Syntax

`range()` supports two main forms:

**Syntax 1 — stop only:**

```python
range(stop)
```

**Syntax 2 — start, stop, and optional step:**

```python
range(start, stop, step)
```

The parameters inside the parentheses control the exact sequence that is generated. All parameters must be integers. Let's look at each one in detail.

## Python range() Parameters

* **start** — An integer indicating where the sequence begins. Defaults to `0` if not provided.
* **stop** — An integer indicating where the sequence ends. The stop value itself is **not** included in the sequence (exclusive upper bound).
* **step** — An integer determining the increment (or decrement) between each value. Defaults to `1`. Can be negative for countdown sequences.

---

## Examples of range()

### Example 1: range() with only a stop parameter

```python
x = range(5)  # equivalent to range(0, 5, 1)

for i in x:
    print(i)
```

Output:

```
0
1
2
3
4
```

The sequence starts at `0` (default start) and stops before `5`. The value `5` itself is never printed.

### Example 2: range() with start and stop

```python
for i in range(3, 8):
    print(i)
```

Output:

```
3
4
5
6
7
```

The sequence begins at `3` and ends at `7` (stop `8` is excluded).

### Example 3: range() with a custom step

```python
for i in range(0, 20, 4):
    print(i)
```

Output:

```
0
4
8
12
16
```

The step of `4` causes every fourth integer to be included.

### Example 4: Countdown with a negative step

```python
for i in range(10, 0, -1):
    print(i)
```

Output:

```
10
9
8
7
6
5
4
3
2
1
```

A negative step produces a descending sequence — useful for countdowns and reverse iteration.

### Example 5: Converting range to a list

Since `range()` returns a lazy sequence object, convert it to a list when you need all values at once:

```python
numbers = list(range(1, 11))
print(numbers)

evens = list(range(2, 21, 2))
print(evens)
```

Output:

```
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
[2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
```

---

## Real-World Use Cases

### Running a loop a fixed number of times

```python
for attempt in range(3):
    print(f"Attempt {attempt + 1}: connecting to server...")
```

Output:

```
Attempt 1: connecting to server...
Attempt 2: connecting to server...
Attempt 3: connecting to server...
```

### Accessing list elements by index

```python
fruits = ["apple", "banana", "cherry", "date"]

for i in range(len(fruits)):
    print(f"Index {i}: {fruits[i]}")
```

Output:

```
Index 0: apple
Index 1: banana
Index 2: cherry
Index 3: date
```

### Building multiplication tables

```python
n = 7
for i in range(1, 11):
    print(f"{n} x {i} = {n * i}")
```

### Generating test IDs

```python
test_ids = list(range(1001, 1011))
print("Test IDs:", test_ids)
# Test IDs: [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010]
```

---

## Edge Cases and Gotchas

- **Empty range**: `range(5, 5)` and `range(5, 3)` (with default positive step) both produce empty sequences with no iterations.
- **No floats**: `range(0, 1, 0.1)` raises a `TypeError`. Use a list comprehension or `numpy.arange()` for floating-point sequences.
- **Memory efficiency**: A `range` object always uses a constant, tiny amount of memory. `range(10**9)` is fine — `list(range(10**9))` is not.
- **O(1) membership**: `x in range(n)` checks membership mathematically in constant time — no iteration required.

---

## Tips and Best Practices

1. **Prefer `enumerate()` over `range(len(...))`** when you need both index and value — it is more readable and Pythonic.
2. **Use negative steps for reverse iteration** rather than creating a reversed copy of a list.
3. **Keep as a `range` object** — only convert to a list if you actually need a list.
4. **Use `range()` for explicit index arithmetic** such as binary search, bubble sort, or sliding window algorithms.
5. **Check for empty ranges** when `start` and `stop` are computed — an unexpected empty range causes silent no-ops.

---

## Common Use Cases

**Iterating a fixed number of times.** The most common use of `range()` is in `for` loops where you need to repeat an action a known number of times. For example, `for i in range(10)` executes the loop body exactly ten times, with `i` taking values 0 through 9.

**Generating indices for list access.** When you need to access list elements by position, `range(len(my_list))` gives you the valid indices. However, using `enumerate()` is generally preferred as it is more Pythonic.

**Creating countdown or custom-step sequences.** With the three-argument form, you can count backwards (`range(10, 0, -1)`) or skip values (`range(0, 100, 5)` for multiples of 5). This is useful for implementing timers, generating grid coordinates, or sampling data at regular intervals.

---

## Rules of range()

* The `stop` value is never included in the generated sequence.
* All arguments must be integers (no floats).
* If `step` is positive, the sequence increases; if negative, it decreases.
* An empty range is produced when `start >= stop` with a positive step, or `start <= stop` with a negative step.

---

## Frequently Asked Questions

**Q1: Why does `range(5)` start at 0 and not 1?**

Python uses zero-based indexing throughout the language. Starting `range()` at 0 by default aligns naturally with list indices — `range(len(my_list))` produces exactly the valid indices for a list without any adjustment.

**Q2: Can I use `range()` with floats?**

No. `range()` only accepts integers. For a sequence of floats, use a list comprehension: `[i * 0.1 for i in range(10)]`, or use `numpy.arange(0, 1, 0.1)` if NumPy is available.

**Q3: How is `range()` more memory-efficient than a list?**

A `range` object stores only three integers — start, stop, and step — regardless of how large the sequence is. It computes each value on demand. A list, by contrast, stores every element in memory. `range(10**9)` takes about 48 bytes; `list(range(10**9))` would require several gigabytes of RAM.

## Related Functions

* [Python len()](/posts/Page-38-Python-len()/) — measure the length of a range or any sequence.
* [Python int()](/posts/Page-34-Python-int()/) — convert values to integers for use as range arguments.
* [Python all()](/posts/Python-all()/) — check if all values in a range-based iterable meet a condition.