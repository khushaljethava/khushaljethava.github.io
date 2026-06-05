---
title: Python Tuple index() Method
description: The index() method returns the index of the first occurrence of a specified value in a tuple.
date: 2025-01-24 22:02:00 +0800
categories: [Python Tuple Reference]
tags: [Python Tuple Reference]
image:
  path: /commons/Python Tuple index() Method.webp
  alt: Python Tuple index()
---

The `index()` method searches a tuple for a value and returns the **index of its first occurrence**. If the value is not found, it raises a `ValueError`. You can optionally limit the search to a range using `start` and `end` parameters.

## Syntax

```python
tuple.index(value, start, end)
```

## Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `value` | Yes | The element to search for. |
| `start` | No | Starting index (default: `0`). |
| `end` | No | Ending index, exclusive (default: end of tuple). |

## Return Value

Integer index of the first occurrence. Raises `ValueError` if not found.

---

## Example 1: Basic Usage

```python
numbers = (1, 2, 3, 2, 5, 2, 6)
print(numbers.index(2))   # 1
print(numbers.index(2, 2))  # 3 — search from position 2
print(numbers.index(2, 2, 5))  # 3 — search between positions 2–5
```

---

## Example 2: Element Not Found

```python
colors = ("red", "green", "blue")

try:
    pos = colors.index("yellow")
except ValueError:
    print("'yellow' not found in tuple")
```

---

## Example 3: Strings and Mixed Types

```python
info = ("Alice", 30, "London", 30)

print(info.index("Alice"))   # 0
print(info.index(30))        # 1 — first occurrence only
print(info.index("London"))  # 2
```

---

## Example 4: Safe Search Using `in` First

```python
fruits = ("apple", "banana", "cherry")
target = "banana"

if target in fruits:
    pos = fruits.index(target)
    print(f"Found at index {pos}")
```

---

## Example 5: Finding All Occurrences

`index()` only returns the first match. Use `enumerate()` for all positions:

```python
data = (5, 3, 5, 7, 5, 9)
positions = [i for i, v in enumerate(data) if v == 5]
print(positions)  # [0, 2, 4]
```

---

## Example 6: Column Lookup in a Header Tuple

```python
header = ("id", "name", "email", "age")
col = header.index("email")
print(f"email is column {col}")  # email is column 2
```

---

## Real-World Use Cases

**1. Month number from name:**
```python
months = ("Jan","Feb","Mar","Apr","May","Jun",
          "Jul","Aug","Sep","Oct","Nov","Dec")
month_num = months.index("Sep") + 1
print(f"September is month {month_num}")  # 9
```

**2. Player rank in leaderboard:**
```python
leaderboard = ("Alice", "Bob", "Carol", "Dave")
rank = leaderboard.index("Carol") + 1
print(f"Carol is ranked #{rank}")  # #3
```

**3. Validate and locate user input:**
```python
valid_options = ("yes", "no", "maybe")
choice = input("Enter choice: ").lower()
if choice in valid_options:
    print(f"Option index: {valid_options.index(choice)}")
```

---

## index() vs list.index()

Both behave identically. The difference is that tuples are immutable — you can find a position but cannot modify the tuple.

---

## Common Mistakes

- **Not handling `ValueError`** — use `try/except` or check with `in` first when the element may not exist.
- **Expecting all occurrences** — `index()` only returns the first. Use `enumerate()` for all positions.
- **Off-by-one with `end`** — `end` is exclusive, like slice notation.

---

## FAQ

**Q: What if the value appears multiple times?**
Only the first index is returned. Use `[i for i, v in enumerate(t) if v == val]` for all positions.

**Q: Does `index()` work with nested tuples?**
It looks for an exact match at the top level. `(1,2,3).index((1,2))` searches for the sub-tuple as an element.

**Q: Is string search case-sensitive?**
Yes — `"Apple"` and `"apple"` are treated as different values.
