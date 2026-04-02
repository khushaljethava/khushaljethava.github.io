---
title: Python range()
description: The Python range() function is used to generate a sequence of numbers. The sequence will start from 0 by default, increment by 1, and stop before a specified number.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python range().png
  alt: Python range()
---

Python's `range()` function generates an immutable sequence of integers, commonly used for looping a specific number of times. It accepts one to three arguments: `stop` (required), and optionally `start` and `step`. When called with a single argument, `range(stop)` produces numbers from 0 up to but not including `stop`. With two arguments, `range(start, stop)` begins at `start`. With three arguments, `range(start, stop, step)` increments by `step` instead of the default 1. The function returns a `range` object, which is memory-efficient because it calculates values on demand rather than storing them all in memory. This makes it suitable for iterating over millions of values without consuming significant memory. `range()` is the backbone of `for` loops in Python and is also used for generating indices, slicing patterns, and creating numeric test data. You can measure the length of a range with [Python len()](/posts/Page-38-Python-len()/) and convert it to a list if you need the full sequence in memory.

## What does range() return?

The `range()` function returns an immutable `range` object that generates integers on demand. It does not return a list -- you must pass the result to `list()` if you need an actual list of numbers.

## When should you use range()?

Use `range()` when you need to iterate a specific number of times in a `for` loop, generate a sequence of indices for accessing list elements by position, or create evenly spaced numeric sequences for calculations, sampling, or test data generation.

Syntax 1

```python
range(stop)

```

Syntax 2 

```python
range(start, stop, step)

```

Based on the syntax, we can see the range is a keyword to implement the range function, and then in between two brackets () we have parameters like start, stop and steps let learn them in detail.

## Python range() parameters


* **start \-** is used to give an integer to start from which sequence of integer to be returned.  
* **stop** \- is used to given an integer to stop the sequence with the last number from the number given in stop like stop \- 1\.  
* **step** \- integer value which determines the increment between each integer in the sequence.


Let see a basic example of the range() function.

Example of range() function with only stop parameters

```python

x = range(5)	# Adding returned value of range function using stop parameters its like start=0,     stop=5, step=1

for i in x: 	# implementing for loop to print the sequence of the range function.

    print(i)	# printing the i variable from the loop

```


The output of the program.

```python
0
1
2
3
4

```


## Common Use Cases

**Iterating a fixed number of times.** The most common use of `range()` is in `for` loops where you need to repeat an action a known number of times. For example, `for i in range(10)` executes the loop body exactly ten times, with `i` taking values 0 through 9.

**Generating indices for list access.** When you need both the index and the value from a list, `range(len(my_list))` gives you the indices. However, using `enumerate()` is generally preferred for this pattern as it is more Pythonic.

**Creating countdown or custom-step sequences.** With the three-argument form, you can count backwards (`range(10, 0, -1)`) or skip values (`range(0, 100, 5)` for multiples of 5). This is useful for implementing timers, generating grid coordinates, or sampling data at regular intervals.

## Rules of range()

* The `stop` value is never included in the generated sequence.
* All arguments must be integers (no floats).
* If `step` is positive, the sequence increases; if negative, it decreases.
* An empty range is produced when `start >= stop` with a positive step, or `start <= stop` with a negative step.

## Related Functions

* [Python len()](/posts/Page-38-Python-len()/) -- measure the length of a range or any sequence.
* [Python int()](/posts/Page-34-Python-int()/) -- convert values to integers for use as range arguments.
* [Python all()](/posts/Python-all()/) -- check if all values in a range-based iterable meet a condition.