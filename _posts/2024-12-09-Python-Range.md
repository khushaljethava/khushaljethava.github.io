---
title: Python range() function
description: In this tutorial, we will learn about a fantastic function call range in python.
date: 2024-12-09 09:01:00 +0800
categories: [Python]
tags: [python]
image:
  path: /commons/Python range() function.webp
  alt: Python range() function

---


## Python range() function

The Python `range()` function is one of the most commonly used built-in functions in the language. It generates a sequence of numbers on demand, which makes it extremely memory-efficient compared to creating a full list of numbers. The sequence starts from 0 by default, increments by 1, and stops before a specified number.

Understanding `range()` is essential for anyone learning Python because it powers most loop-based operations — from iterating over indices to creating number sequences for calculations, games, data processing, and much more.

## Syntax of the range() Function

There are two main forms of the `range()` function:

**Syntax 1 — Only stop:**

```python
range(stop)
```

**Syntax 2 — Start, stop, and step:**

```python
range(start, stop, step)
```

All three parameters — `start`, `stop`, and `step` — must be integers. You cannot use floats directly inside `range()`.

## Python range() Parameters Explained

* **start** — The integer value at which the sequence begins. If omitted, it defaults to `0`.
* **stop** — The integer value at which the sequence ends. The stop value itself is **not** included in the sequence; the last value is `stop - 1`.
* **step** — The integer that determines how much to increment (or decrement) between each value. If omitted, it defaults to `1`.

Understanding these three parameters thoroughly will allow you to generate virtually any integer sequence you need in Python.

---

## Basic Example: range() with Only the stop Parameter

The simplest way to use `range()` is to pass a single integer. Python will start the sequence from `0` and go up to (but not including) the given number.

```python
x = range(5)  # Equivalent to range(0, 5, 1)

for i in x:
    print(i)
```

**Output:**

```
0
1
2
3
4
```

Notice that the output goes from `0` to `4`, not `0` to `5`. This is because Python uses zero-based indexing, and the `stop` value is always excluded.

---

## Checking the Type of range()

The `range()` function does not return a list — it returns a special `range` object. This is important for memory efficiency, especially when working with large sequences.

```python
print(type(range(1)))
```

**Output:**

```
<class 'range'>
```

Because `range` is a lazy object, it does not store all numbers in memory at once. It computes each value on demand as you iterate over it. This makes `range(1000000)` just as memory-efficient as `range(10)`.

---

## Example: range() with All Three Parameters

Let's use all three parameters — `start`, `stop`, and `step`.

```python
number = range(1, 5, 1)

for i in number:
    print(i)
```

**Output:**

```
1
2
3
4
```

Here, the sequence starts at `1`, ends before `5`, and increments by `1` each time.

---

## Changing the Step Value

The real power of `range()` comes when you change the `step` value. You can skip numbers, generate even numbers, multiples of any integer, and more.

**Example — Odd numbers from 1 to 9:**

```python
number = range(1, 10, 2)

for i in number:
    print(i)
```

**Output:**

```
1
3
5
7
9
```

**Example — Even numbers from 0 to 20:**

```python
for i in range(0, 21, 2):
    print(i)
```

**Output:**

```
0
2
4
6
8
10
12
14
16
18
20
```

**Example — Multiples of 5:**

```python
for i in range(0, 51, 5):
    print(i)
```

**Output:**

```
0
5
10
15
20
25
30
35
40
45
50
```

---

## Reverse Range in Python

One of the most useful tricks with `range()` is counting backwards. Simply use a negative `step` value and make sure `start` is greater than `stop`.

```python
for i in range(15, 1, -1):
    print(i)
```

**Output:**

```
15
14
13
12
11
10
9
8
7
6
5
4
3
2
```

**Example — Countdown from 10 to 1:**

```python
for i in range(10, 0, -1):
    print(i)
print("Blast off!")
```

**Output:**

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
Blast off!
```

This is a classic use case for reverse ranges — simulating a countdown. It is also useful for iterating over a list in reverse without creating a copy.

---

## Python range() Function with a While Loop

While the `for` loop is the most natural partner for `range()`, you can also use `range()` in a `while` loop with the `in` operator to check membership.

```python
number = 1
while number in range(1, 5):
    print("Python")
    number += 1
```

**Output:**

```
Python
Python
Python
Python
```

The `in` operator checks whether `number` is a valid member of the range object. This is very efficient because Python does not iterate through the whole range — it calculates membership mathematically in O(1) time.

---

## Converting range() to a List

Although `range()` returns a range object, you can easily convert it to a list using the built-in `list()` function. This is handy when you need to store or manipulate the sequence.

```python
print(list(range(1, 5)))
print(type(list(range(1, 5))))
```

**Output:**

```
[1, 2, 3, 4]
<class 'list'>
```

**Example — Creating a list of squares using range():**

```python
squares = [i ** 2 for i in range(1, 6)]
print(squares)
```

**Output:**

```
[1, 4, 9, 16, 25]
```

This is called a list comprehension — one of Python's most elegant features — and `range()` is at the heart of it.

---

## Real-World Applications of range()

### 1. Accessing List Elements by Index

```python
fruits = ["apple", "banana", "cherry", "date"]

for i in range(len(fruits)):
    print(f"Index {i}: {fruits[i]}")
```

**Output:**

```
Index 0: apple
Index 1: banana
Index 2: cherry
Index 3: date
```

### 2. Creating a Multiplication Table

```python
n = 5
for i in range(1, 11):
    print(f"{n} x {i} = {n * i}")
```

**Output:**

```
5 x 1 = 5
5 x 2 = 10
5 x 3 = 15
...
5 x 10 = 50
```

### 3. Summing Numbers in a Range

```python
total = sum(range(1, 101))
print(total)  # Sum of 1 to 100
```

**Output:**

```
5050
```

This is the famous Gauss sum, and Python can compute it instantly using `range()` and `sum()`.

### 4. Repeating an Action N Times

```python
for _ in range(3):
    print("Hello, World!")
```

**Output:**

```
Hello, World!
Hello, World!
Hello, World!
```

Using `_` as the loop variable is a Python convention when you do not need the loop index value.

---

## Common Mistakes with range()

### Mistake 1: Using a Float as a Parameter

```python
# This will raise a TypeError
for i in range(0, 1.5, 0.5):
    print(i)
```

**Fix:** Use the `numpy.arange()` function for float ranges, or multiply and divide integers.

```python
for i in range(0, 15, 5):
    print(i / 10)  # Outputs: 0.0, 0.5, 1.0
```

### Mistake 2: Forgetting That stop is Exclusive

```python
# Trying to include 10 in the output
for i in range(1, 10):  # Wrong — stops at 9
    print(i)
```

**Fix:** Use `range(1, 11)` to include 10.

### Mistake 3: Wrong Direction Without Negative Step

```python
# This produces no output
for i in range(10, 1):
    print(i)
```

**Fix:** Use `range(10, 1, -1)` to count downward.

---

## Tips for Using range() Effectively

- Use `range(len(my_list))` to iterate over list indices, but prefer `enumerate()` when you also need the element.
- Use `list(range(n))` as a quick way to generate a list of integers from 0 to n-1.
- Use `range()` with `sum()` for fast arithmetic calculations.
- Combine `range()` with `zip()` to pair sequences together.
- Always remember that the `stop` parameter is exclusive — think of it as "stop before this number."

---

## Frequently Asked Questions

**Q1: Can range() generate floating-point numbers?**

No, `range()` only works with integers. If you need a sequence of floats, use `numpy.arange(start, stop, step)` or a list comprehension like `[x * 0.1 for x in range(10)]`.

**Q2: What is the difference between range() and list(range())?**

`range()` returns a lazy range object that generates values on demand — it does not store all values in memory. `list(range())` converts that range to a fully-realized list stored in memory. For large sequences, use `range()` directly to save memory.

**Q3: How do I check if a number is inside a range without looping?**

You can use the `in` operator directly:

```python
print(5 in range(1, 10))   # True
print(15 in range(1, 10))  # False
```

Python checks membership in a range object in O(1) constant time, making it very fast regardless of how large the range is.

---

The `range()` function is a cornerstone of Python programming. Once you master its three parameters and understand how to use it with loops, lists, and comprehensions, you will find it appearing in almost every Python program you write. Practice using different combinations of `start`, `stop`, and `step` to build intuition, and soon it will become second nature.
