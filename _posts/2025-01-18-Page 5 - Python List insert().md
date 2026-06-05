---
title: Python List insert()
description: In this tutorial, we will learn about the python insert() method.
date: 2025-01-18 23:28:25 +0800
categories: [Python List reference]
tags: [Python List reference]
image:
  path: /commons/Python List insert().webp
  alt: Python List insert()
---

The `insert()` method adds an element at a **specified position** in a list, shifting all subsequent elements one position to the right. Unlike `append()`, which always adds to the end, `insert()` lets you place an element anywhere in the list.

## Syntax

```python
list.insert(index, element)
```

## Parameters

| Parameter | Description |
|-----------|-------------|
| `index` | The position where the element should be inserted. |
| `element` | The element to insert (any data type — int, string, list, etc.). |

## Return Value

Returns `None` — the list is modified in place.

---

## Example 1: Basic Insert

```python
nums = [5, 2, 4, 6, 1, 9]
print("Before:", nums)

nums.insert(5, 10)
print("After:", nums)
```

**Output:**
```
Before: [5, 2, 4, 6, 1, 9]
After: [5, 2, 4, 6, 1, 10, 9]
```

The element `10` was inserted at index 5, pushing `9` to the right.

---

## Example 2: Insert at the Beginning

```python
fruits = ["banana", "cherry"]
fruits.insert(0, "apple")
print(fruits)  # ['apple', 'banana', 'cherry']
```

Inserting at index `0` adds the element to the front of the list.

---

## Example 3: Insert in the Middle

```python
letters = ["a", "b", "d", "e"]
letters.insert(2, "c")
print(letters)  # ['a', 'b', 'c', 'd', 'e']
```

---

## Example 4: Index Beyond the List Length

If the index is larger than the list length, the element is added at the end (no error):

```python
nums = [1, 2, 3]
nums.insert(100, 4)
print(nums)  # [1, 2, 3, 4]
```

---

## Example 5: Negative Index

A negative index inserts relative to the end of the list:

```python
nums = [1, 2, 3, 4]
nums.insert(-1, 99)
print(nums)  # [1, 2, 3, 99, 4]
```

`-1` inserts before the last element.

---

## Example 6: Inserting Different Data Types

```python
mixed = [1, "two", 3.0]
mixed.insert(1, ["a", "b"])
print(mixed)  # [1, ['a', 'b'], 'two', 3.0]
```

Note that a list inserted this way becomes a single nested element, not merged.

---

## insert() vs append() vs extend()

| Method | What it does |
|--------|--------------|
| `insert(i, x)` | Adds `x` at position `i` |
| `append(x)` | Adds `x` at the end |
| `extend(iterable)` | Adds each element of an iterable at the end |

```python
lst = [1, 2, 3]
lst.insert(1, 99)   # [1, 99, 2, 3]
lst.append(4)       # [1, 99, 2, 3, 4]
lst.extend([5, 6])  # [1, 99, 2, 3, 4, 5, 6]
```

---

## Real-World Use Cases

**1. Maintaining a sorted list when adding a value:**
```python
import bisect
scores = [10, 30, 50, 70]
position = bisect.bisect(scores, 40)
scores.insert(position, 40)
print(scores)  # [10, 30, 40, 50, 70]
```

**2. Adding a header row to data:**
```python
rows = [["Alice", 25], ["Bob", 30]]
rows.insert(0, ["Name", "Age"])
print(rows)
```

**3. Inserting a priority task at the front of a queue:**
```python
tasks = ["email", "report", "meeting"]
tasks.insert(0, "URGENT: server down")
print(tasks)
```

---

## Performance Note

`insert()` at the beginning or middle of a list is **O(n)** because all elements after the insertion point must shift. For frequent insertions at the front, use `collections.deque` with `appendleft()`, which is O(1).

---

## Common Mistakes

- **Expecting a return value** — `insert()` returns `None`, not the new list.
- **Inserting a list when you meant to merge** — `insert()` adds the whole iterable as one element. Use `extend()` or slicing to merge.
- **Forgetting indices start at 0** — `insert(1, x)` places `x` as the second element.

---

## FAQ

**Q: What happens if the index is out of range?**
No error — Python clamps the index, inserting at the start (very negative) or end (too large).

**Q: Does `insert()` overwrite the element at that index?**
No — it shifts existing elements right; nothing is overwritten.

**Q: How is `insert()` different from slice assignment?**
`insert()` adds one element; slice assignment like `lst[1:1] = [a, b]` can insert multiple elements at once.

## Performance Considerations

Understanding the cost of `insert()` helps you write efficient code at scale. For small collections the difference is negligible, but inside tight loops or when processing large datasets, choosing the right method matters. Python's built-in container methods are implemented in C, so they are almost always faster than an equivalent hand-written Python loop that does the same work. Whenever a single method call can replace several lines of manual iteration, prefer the method — it is faster, less error-prone, and communicates intent more clearly to other developers reading your code.

## Conclusion

The `insert()` method places an element at a chosen index, shifting later elements to the right. It is one of the everyday building blocks that make Python's dictionaries and lists so pleasant to work with, and using it correctly leads to shorter, clearer, and more reliable programs. As you practise, try to recognise the situations where `insert()` is the natural fit rather than reaching for a longer manual alternative. Combine it with the related methods covered above, keep the common mistakes in mind, and you will handle real-world data manipulation tasks with confidence. Bookmark this reference and revisit the examples whenever you need a quick reminder of the syntax, parameters, return value, and behaviour of `insert()`.
