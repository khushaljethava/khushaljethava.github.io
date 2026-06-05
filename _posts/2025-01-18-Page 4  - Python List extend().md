---
title: Python List extend()
description: We can only take any iterable as argument in extend() method.
date: 2025-01-18 23:28:25 +0800
categories: [Python List reference]
tags: [Python List reference]
image:
  path: /commons/Python List extend().webp
  alt: Python List extend()
---

The `extend()` method adds **all elements** of an iterable (list, tuple, set, string, etc.) to the end of the current list. Unlike `append()`, which adds its argument as a single element, `extend()` unpacks the iterable and adds each element individually.

## Syntax

```python
list.extend(iterable)
```

## Parameters

| Parameter | Description |
|-----------|-------------|
| `iterable` | Any iterable whose elements are added to the list. |

## Return Value

`None` — the list is modified in place.

---

## Example 1: Extending with Another List

```python
first_list = [1, 2, 3, 4, 5]
second_list = ['six', 'seven', 'eight']

first_list.extend(second_list)
print(first_list)
```

**Output:**
```
[1, 2, 3, 4, 5, 'six', 'seven', 'eight']
```

---

## Example 2: Extending with Other Iterables

```python
first_list = [1, 2, 3, 4, 5]
second_tuple = ('six', 'seven', 'eight')
third_set = {9, 10, 11}

first_list.extend(second_tuple)
print("After tuple:", first_list)

first_list.extend(third_set)
print("After set:", first_list)
```

**Output:**
```
After tuple: [1, 2, 3, 4, 5, 'six', 'seven', 'eight']
After set: [1, 2, 3, 4, 5, 'six', 'seven', 'eight', 9, 10, 11]
```

---

## Example 3: extend() vs append()

This is the most important distinction to understand:

```python
# append() adds the whole list as ONE element
a = [1, 2, 3]
a.append([4, 5])
print(a)  # [1, 2, 3, [4, 5]]

# extend() adds each element separately
b = [1, 2, 3]
b.extend([4, 5])
print(b)  # [1, 2, 3, 4, 5]
```

---

## Example 4: Extending with a String

A string is iterable, so each character is added:

```python
letters = ['a', 'b']
letters.extend("cd")
print(letters)  # ['a', 'b', 'c', 'd']
```

Be careful — this is a common surprise when you meant to append the whole string. Use `append("cd")` to add it as a single element.

---

## Example 5: Extending with a Range

```python
nums = [0]
nums.extend(range(1, 5))
print(nums)  # [0, 1, 2, 3, 4]
```

---

## Example 6: Using `+=` as a Shortcut

The `+=` operator behaves like `extend()` for lists:

```python
a = [1, 2, 3]
a += [4, 5]
print(a)  # [1, 2, 3, 4, 5]
```

---

## extend() vs append() vs insert()

| Method | What it does |
|--------|--------------|
| `extend(iterable)` | Adds each element of an iterable at the end |
| `append(x)` | Adds `x` as a single element at the end |
| `insert(i, x)` | Adds `x` at position `i` |

---

## Real-World Use Cases

**1. Merging data from multiple sources:**
```python
all_records = []
all_records.extend(database_records)
all_records.extend(api_records)
all_records.extend(file_records)
```

**2. Flattening a list of results:**
```python
combined = []
for page in pages:
    combined.extend(page["items"])
```

**3. Building a complete word list:**
```python
words = ["hello"]
words.extend("world".split())
words.extend(["foo", "bar"])
```

---

## Common Mistakes

- **Confusing with `append()`** — `append([4,5])` adds a nested list; `extend([4,5])` adds the individual elements.
- **Extending with a string accidentally** — adds each character. Use `append()` for whole strings.
- **Expecting a return value** — `extend()` returns `None`.

---

## FAQ

**Q: What types can I pass to `extend()`?**
Any iterable — lists, tuples, sets, strings, ranges, generators, etc.

**Q: Is `list.extend(x)` the same as `list += x`?**
For lists, yes — both add each element of `x` to the end.

**Q: Does `extend()` modify the iterable argument?**
No — only the list being extended is modified; the argument is unchanged.

## Performance Considerations

Understanding the cost of `extend()` helps you write efficient code at scale. For small collections the difference is negligible, but inside tight loops or when processing large datasets, choosing the right method matters. Python's built-in container methods are implemented in C, so they are almost always faster than an equivalent hand-written Python loop that does the same work. Whenever a single method call can replace several lines of manual iteration, prefer the method — it is faster, less error-prone, and communicates intent more clearly to other developers reading your code.

## Conclusion

The `extend()` method appends every element of an iterable to the end of a list, unpacking it rather than nesting it. It is one of the everyday building blocks that make Python's dictionaries and lists so pleasant to work with, and using it correctly leads to shorter, clearer, and more reliable programs. As you practise, try to recognise the situations where `extend()` is the natural fit rather than reaching for a longer manual alternative. Combine it with the related methods covered above, keep the common mistakes in mind, and you will handle real-world data manipulation tasks with confidence. Bookmark this reference and revisit the examples whenever you need a quick reminder of the syntax, parameters, return value, and behaviour of `extend()`.

## Quick Reference Recap

To summarise the essentials of `extend()`: it is a built-in method you will use constantly when you need to concatenate iterables onto a list. Keep the syntax and return value in mind, remember whether it modifies the object in place or produces a new one, and lean on the worked examples above when you are unsure. Practising with small snippets in the Python interpreter is the fastest way to build an instinct for when `extend()` is the right tool, so try retyping a few of these examples yourself and experiment with variations until the behaviour feels natural.
