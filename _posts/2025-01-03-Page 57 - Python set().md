---
title: Python set()
description: The set() function in python helps to create a python set object.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python set().webp
  alt: Python set()
---

The Python `set()` built-in function creates a new set object, which is an unordered collection of unique, hashable elements. It accepts an optional iterable parameter such as a list, tuple, string, dictionary, or range, and returns a set containing the unique elements from that iterable. When called without arguments, it returns an empty set. Sets automatically eliminate duplicate values, making `set()` the go-to tool for deduplication tasks. The returned set supports mathematical set operations including union, intersection, difference, and symmetric difference. Real-world use cases include removing duplicates from a list of email addresses, finding common elements between two datasets, checking membership efficiently with O(1) average lookup time, filtering unique tags or categories from a collection, and computing set differences to identify new or removed items between two snapshots of data. Because sets are mutable, you can add and remove elements after creation, which distinguishes them from the immutable `frozenset`.

## What does set() return?

The `set()` function returns a new set object containing unique elements from the given iterable, or an empty set if no argument is provided.

## When should you use set()?

Use `set()` when you need to eliminate duplicates from a collection, perform set operations like union and intersection, or check membership efficiently, since sets provide O(1) average-time lookups compared to O(n) for lists.

## Syntax of set()

```python
set(iterable)
```

## set() Parameters

`set()` takes only one optional parameter:

- **iterable** (optional) — Any iterable object such as a list, tuple, string, dictionary, range, or another set. If omitted, an empty set is returned.

## Example 1: Creating sets from different iterables

```python
# empty set
print(set())

# from string
print(set('Python'))

# from tuple
print(set((1, 2, 3, 4, 5)))

# from list
print(set(['a', 'e', 'i', 'o', 'u']))

# from range
print(set(range(5)))
```

**Output:**

```
set()
{'y', 'P', 't', 'o', 'h', 'n'}
{1, 2, 3, 4, 5}
{'i', 'e', 'o', 'a', 'u'}
{0, 1, 2, 3, 4}
```

Here each iterable is converted into a set. Because sets are unordered, the printed order of elements may differ on each run. Note that when creating an empty set, you must use `set()` rather than `{}` — the curly brace syntax creates an empty dictionary, not an empty set.

## Example 2: Creating a set from a dictionary and a frozenset

When a dictionary is passed to `set()`, only the keys are included in the resulting set, not the values.

```python
# from dictionary — only keys are extracted
print(set({'a': 1, 'e': 2, 'i': 3, 'o': 4, 'u': 5}))

# from frozen set
frozen_set = frozenset(('a', 'e', 'i', 'o', 'u'))
print(set(frozen_set))
```

**Output:**

```
{'i', 'a', 'u', 'o', 'e'}
{'i', 'a', 'u', 'o', 'e'}
```

Converting a `frozenset` to a `set` produces a mutable copy with the same elements. This is useful when you need to modify an otherwise immutable set.

## Example 3: Set operations for data comparison

Sets shine when you need to compare two collections using mathematical set operations. The union, intersection, difference, and symmetric difference operators work directly on set objects.

```python
students_python = {'Alice', 'Bob', 'Charlie', 'Diana'}
students_java   = {'Bob', 'Diana', 'Eve', 'Frank'}

# Union: all students in either course
print(students_python | students_java)
# {'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank'}

# Intersection: students enrolled in both courses
print(students_python & students_java)
# {'Bob', 'Diana'}

# Difference: students only in Python course
print(students_python - students_java)
# {'Alice', 'Charlie'}

# Symmetric difference: students in exactly one course
print(students_python ^ students_java)
# {'Alice', 'Charlie', 'Eve', 'Frank'}
```

These operations are far more readable and efficient than using nested loops or list comprehensions to compare two collections.

## Example 4: Removing duplicates and checking membership

```python
# Deduplication
raw_tags = ['python', 'tutorial', 'python', 'beginner', 'tutorial', 'code']
unique_tags = list(set(raw_tags))
print(unique_tags)  # order is not guaranteed

# Fast membership test
allowed_extensions = set(['.jpg', '.jpeg', '.png', '.gif', '.webp'])
user_file = 'photo.png'
extension = '.' + user_file.rsplit('.', 1)[-1]

if extension in allowed_extensions:
    print(f"{user_file} is a valid image file.")
else:
    print(f"{user_file} is not allowed.")
```

**Output:**

```
['beginner', 'code', 'python', 'tutorial']   # order varies
photo.png is a valid image file.
```

Checking `extension in allowed_extensions` with a set is O(1) on average, whereas checking against a list of the same size would be O(n).

## Real-World Use Cases

**Deduplication pipelines** — When processing log files, CSV imports, or API responses, it is common to receive records with repeated entries. Passing the raw list through `set()` and converting back produces a clean, deduplicated collection in a single line of code.

**Permission and role checks** — Access control systems often store user permissions as sets. Checking whether a required permission is present (`'admin' in user_permissions`) or computing the intersection of required and granted permissions is natural and efficient with sets.

**Tracking visited nodes in graph algorithms** — Depth-first search, breadth-first search, and web crawlers maintain a `visited` set to avoid processing the same node twice. The O(1) membership test keeps traversal fast even for very large graphs.

**Finding unique words in a document** — Text processing tasks such as building a vocabulary, computing the unique word count, or identifying words that appear in one document but not another are all straightforward with `set()`.

**Database result deduplication** — When joining tables or aggregating results, duplicate rows may appear. Converting a list of result tuples to a set removes duplicates before further processing, although order is not preserved.

## Mutating a Set After Creation

Unlike tuples and frozensets, a set is mutable. You can add and remove elements after creation:

```python
colors = set(['red', 'green', 'blue'])

colors.add('yellow')               # add a single element
colors.update(['black', 'white'])  # add multiple elements
colors.discard('green')            # remove if present; no error if absent
colors.remove('blue')              # remove; raises KeyError if absent

print(colors)
# {'red', 'yellow', 'black', 'white'}
```

`discard()` is safer than `remove()` when you are not certain whether the element exists.

## Edge Cases and Gotchas

**Unhashable elements cause TypeError** — Sets require all elements to be hashable. Trying to create a set from a list of lists (`set([[1, 2], [3, 4]])`) raises `TypeError: unhashable type: 'list'`. Convert inner lists to tuples first if you need to work with nested sequences.

**Order is not preserved** — Sets are unordered. If you need unique elements in a predictable order, use `dict.fromkeys(iterable)` in Python 3.7+ which preserves insertion order while removing duplicates: `list(dict.fromkeys(data))`.

**Empty set vs empty dict** — `{}` creates an empty dictionary. Always use `set()` to create an empty set.

**Set of characters from a string** — `set('hello')` creates a set of individual characters `{'h', 'e', 'l', 'o'}`, not a set containing the string `'hello'`. To create a one-element set from a string, use `{'hello'}` or `set(['hello'])`.

## Tips for Using set() Effectively

- Use set literals (`{1, 2, 3}`) for non-empty sets to keep code concise, but always use `set()` for empty sets.
- Prefer `discard()` over `remove()` when deleting elements to avoid unintended `KeyError` exceptions.
- Convert to a set only when you actually need deduplication or set operations; for simple iteration, keep the original list to preserve order.
- Use `frozenset` when you need an immutable set, such as when using a set as a dictionary key or storing it inside another set.
- The `issubset()`, `issuperset()`, and `isdisjoint()` methods are useful for relationship checks and are often clearer than using operators alone.

## Rules of set()

- `set()` accepts only a single iterable argument. Passing multiple arguments raises `TypeError`.
- All elements in the iterable must be hashable; mutable objects like lists and dicts cannot be set members.
- An empty set is created by calling `set()` with no arguments. Using `{}` creates an empty dictionary instead.
- Duplicate values in the iterable are silently discarded; no error is raised.

## Frequently Asked Questions

**Q: What is the difference between `set()` and `frozenset()`?**

A: Both create collections of unique hashable elements, but a `set` is mutable — you can add or remove elements after creation — while a `frozenset` is immutable. Because `frozenset` is hashable, it can be used as a dictionary key or as an element inside another set. Use `frozenset` when you need an unchangeable set, for example when caching or using sets as composite keys.

**Q: Does `set()` preserve the order of elements?**

A: No. Sets are unordered collections and the iteration order is not guaranteed to match the insertion order. If you need unique elements in a predictable order, use `list(dict.fromkeys(iterable))` which preserves insertion order while removing duplicates, or use `sorted(set(iterable))` if alphabetical or numeric ordering is acceptable.

**Q: How do I convert a set back to a list?**

A: Use `list(my_set)` to convert a set to a list. The resulting list will be in an arbitrary order. If a specific order is required, use `sorted(my_set)` to get a sorted list, or sort with a custom key using `sorted(my_set, key=some_function)`.

For creating immutable sets that can be used as dictionary keys or set elements, see the [Python frozenset()](/posts/Page-25-Python-frozenset()/) function. To convert a set back to an ordered sequence, the [Python sorted()](/posts/Page-60-Python-sorted()/) function returns a sorted list from any iterable.