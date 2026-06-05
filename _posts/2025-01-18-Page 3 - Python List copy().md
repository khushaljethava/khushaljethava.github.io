---
title: Python List copy()
description: In this tutorial, we will learn about the python list copy() method, which will return the copy of the given list.
date: 2025-01-18 23:28:25 +0800
categories: [Python List reference]
tags: [Python List reference]
image:
  path: /commons/Python List copy().webp
  alt: Python List copy()
---

The `copy()` method in Python creates a **shallow copy** of a list. It returns a new list containing the same elements as the original, without modifying the original list. This is especially useful when you need to work with a duplicate of a list without affecting the source data.

## Syntax

```python
new_list = my_list.copy()
```

## copy() Parameters

The `copy()` method does not take any parameters. It simply returns a new list that is a shallow copy of the original.

## Return Value

Returns a new list object that contains the same elements as the original list.

---

## Example 1: Basic Usage of copy()

```python
my_list = [1, 2, 3, 4, 5]
new_list = my_list.copy()

print("Original:", my_list)
print("Copied:  ", new_list)
```

**Output:**
```
Original: [1, 2, 3, 4, 5]
Copied:   [1, 2, 3, 4, 5]
```

The two lists look identical, but they are separate objects in memory.

---

## Example 2: Modifying the Copy Does Not Affect the Original

```python
original = [10, 20, 30, 40]
duplicate = original.copy()

duplicate.append(50)
duplicate[0] = 99

print("Original: ", original)
print("Duplicate:", duplicate)
```

**Output:**
```
Original:  [10, 20, 30, 40]
Duplicate: [99, 20, 30, 40, 50]
```

Appending to or modifying the copy leaves the original list untouched. This is the primary reason to use `copy()`.

---

## Example 3: copy() vs Assignment

A common beginner mistake is using `=` to "copy" a list. This does **not** create a copy — it creates a second reference to the same list.

```python
# Wrong way — both variables point to the same list
a = [1, 2, 3]
b = a          # b is NOT a copy; it's the same list
b.append(4)

print("a:", a)  # [1, 2, 3, 4] — original was changed!
print("b:", b)  # [1, 2, 3, 4]

# Right way — use copy()
c = [1, 2, 3]
d = c.copy()   # d is a real copy
d.append(4)

print("c:", c)  # [1, 2, 3] — original is safe
print("d:", d)  # [1, 2, 3, 4]
```

---

## Example 4: Copying a List of Strings

```python
fruits = ["apple", "banana", "cherry"]
fruits_backup = fruits.copy()

fruits.clear()

print("Original (cleared):", fruits)
print("Backup:", fruits_backup)
```

**Output:**
```
Original (cleared): []
Backup: ['apple', 'banana', 'cherry']
```

This pattern is handy when you need to clear a working list but retain the original data.

---

## Shallow Copy vs Deep Copy

`copy()` performs a **shallow copy**. This means:
- Top-level elements are duplicated.
- Nested objects (like lists inside lists) are **not** duplicated — both copies share a reference to the same nested object.

```python
nested = [[1, 2], [3, 4]]
shallow = nested.copy()

shallow[0].append(99)

print("nested: ", nested)   # [[1, 2, 99], [3, 4]] — nested list was affected!
print("shallow:", shallow)  # [[1, 2, 99], [3, 4]]
```

If you need to fully duplicate nested structures, use `copy.deepcopy()` from the `copy` module:

```python
import copy

nested = [[1, 2], [3, 4]]
deep = copy.deepcopy(nested)

deep[0].append(99)

print("nested:", nested)  # [[1, 2], [3, 4]] — unaffected
print("deep:  ", deep)    # [[1, 2, 99], [3, 4]]
```

---

## Alternative Ways to Copy a List

Python offers several other ways to create a shallow copy:

| Method | Example | Notes |
|--------|---------|-------|
| `copy()` | `b = a.copy()` | Clearest and most readable |
| Slice | `b = a[:]` | Common shorthand |
| `list()` | `b = list(a)` | Converts any iterable |
| List comprehension | `b = [x for x in a]` | Verbose but flexible |

All four produce a shallow copy. `copy()` is preferred for readability.

---

## Real-World Use Cases

**1. Safe sorting without changing the original:**
```python
scores = [42, 7, 95, 13, 60]
sorted_scores = scores.copy()
sorted_scores.sort()

print("Original:", scores)
print("Sorted:  ", sorted_scores)
```

**2. Maintaining a default state:**
```python
DEFAULT_CONFIG = ["debug", "verbose", "log"]
session_config = DEFAULT_CONFIG.copy()
session_config.remove("verbose")
```

**3. Passing to a function without side effects:**
```python
def process(data):
    data.append("processed")
    return data

original = ["a", "b", "c"]
result = process(original.copy())  # original is not modified
```

---

## Common Mistakes

- **Using `=` instead of `.copy()`** — creates an alias, not a copy.
- **Expecting deep copy behaviour** — nested lists are still shared; use `copy.deepcopy()` when needed.
- **Calling `copy()` on a non-list** — `copy()` is a list method; for other types use the `copy` module.

---

## FAQ

**Q: Does `copy()` work on lists with mixed data types?**
Yes. It copies any list regardless of the element types — integers, strings, objects, or other lists.

**Q: Is `list.copy()` the same as `copy.copy(list)`?**
They produce the same result (a shallow copy), but `list.copy()` is more idiomatic and slightly more efficient for lists.

**Q: When should I use `deepcopy` instead of `copy()`?**
Use `deepcopy` whenever your list contains mutable objects (other lists, dicts, custom objects) and you need fully independent copies of those nested objects.

## Performance Considerations

Understanding the cost of `copy()` helps you write efficient code at scale. For small collections the difference is negligible, but inside tight loops or when processing large datasets, choosing the right method matters. Python's built-in container methods are implemented in C, so they are almost always faster than an equivalent hand-written Python loop that does the same work. Whenever a single method call can replace several lines of manual iteration, prefer the method — it is faster, less error-prone, and communicates intent more clearly to other developers reading your code.

## Conclusion

The `copy()` method returns an independent shallow copy of a list so changes to one do not affect the other. It is one of the everyday building blocks that make Python's dictionaries and lists so pleasant to work with, and using it correctly leads to shorter, clearer, and more reliable programs. As you practise, try to recognise the situations where `copy()` is the natural fit rather than reaching for a longer manual alternative. Combine it with the related methods covered above, keep the common mistakes in mind, and you will handle real-world data manipulation tasks with confidence. Bookmark this reference and revisit the examples whenever you need a quick reminder of the syntax, parameters, return value, and behaviour of `copy()`.
