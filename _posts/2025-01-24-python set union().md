---
title: Python Set union() Method 
description: In this tutorial, we will understand about the python set union() method and its uses.
date: 2025-01-24 22:02:00 +0800
categories: [Python Set Reference]
tags: [Python Set Reference]
image:
  path: /commons/Python Set union() Method.webp
  alt: Python Set union() Method 
---

The `union()` method returns a **new set** containing all unique elements from all the sets involved. Duplicate elements appear only once. It can also be written using the `|` operator. The original sets are not modified.

## Syntax

```python
set.union(set2, set3, ...)
# or
set1 | set2 | set3
```

## Parameters

| Parameter | Description |
|-----------|-------------|
| `set2, set3, ...` | One or more sets or iterables to combine. |

## Return Value

A new set with all unique elements from every set.

---

## Example 1: Basic Union

```python
set1 = {1, 2, 3}
set2 = {3, 4, 5}
print(set1.union(set2))  # {1, 2, 3, 4, 5}
```

The shared element `3` appears only once.

---

## Example 2: Using the `|` Operator

```python
numbers1 = {1, 2}
numbers2 = {3, 4}
numbers3 = {5, 6}
print(numbers1 | numbers2 | numbers3)  # {1, 2, 3, 4, 5, 6}
```

---

## Example 3: Union with Different Iterables

```python
set1 = {1, 2, 3}
list1 = [3, 4, 5]
tuple1 = (5, 6, 7)
print(set1.union(list1, tuple1))  # {1, 2, 3, 4, 5, 6, 7}
```

The method form accepts any iterable, not just sets.

---

## Example 4: Union Does Not Modify Originals

```python
a = {1, 2}
b = {2, 3}
c = a.union(b)
print(a)  # {1, 2} — unchanged
print(c)  # {1, 2, 3}
```

---

## Example 5: Union with an Empty Set

```python
s = {1, 2, 3}
print(s.union(set()))  # {1, 2, 3}
```

---

## union() vs update()

| Method | Modifies original? | Returns |
|--------|-------------------|---------|
| `union(other)` | No | New set |
| `update(other)` | Yes | `None` |

Use `union()` when you need a new combined set; use `update()` to merge into an existing set in place.

---

## Real-World Use Cases

**1. Combining tags from multiple posts:**
```python
post1_tags = {"python", "coding"}
post2_tags = {"coding", "tutorial"}
all_tags = post1_tags.union(post2_tags)
print(all_tags)  # {'python', 'coding', 'tutorial'}
```

**2. Merging unique visitors from multiple days:**
```python
day1 = {"alice", "bob"}
day2 = {"bob", "carol"}
day3 = {"dave"}
unique = day1.union(day2, day3)
print(unique)  # {'alice', 'bob', 'carol', 'dave'}
```

**3. Combining allowed permissions from multiple roles:**
```python
editor_perms = {"read", "write"}
admin_perms  = {"read", "write", "delete"}
combined = editor_perms | admin_perms
print(combined)  # {'read', 'write', 'delete'}
```

---

## Common Mistakes

- **Expecting in-place modification** — `union()` returns a new set; use `update()` to modify in place.
- **Confusing with `intersection()`** — union combines all elements; intersection keeps only shared ones.
- **Using `|` with a non-set** — the operator requires both operands to be sets; the method form accepts any iterable.

---

## FAQ

**Q: Is union commutative?**
Yes — `A | B == B | A`.

**Q: Can I union more than two sets?**
Yes — `a.union(b, c, d)` or `a | b | c | d`.

**Q: Are duplicates removed automatically?**
Yes — sets only store unique values, so duplicates collapse into one.

---

## Performance and Time Complexity

`union()` builds a new set whose size is at most the combined length of all inputs, giving it roughly **O(sum of lengths)** time. Membership de-duplication is handled by the set's hash table, so duplicates collapse in constant time per element. Because the originals are untouched, `union()` is safe to use inside expressions without side effects.

## Related Methods

- **`update()`** — merges other iterables into the set in place and returns `None`.
- **`intersection()`** — keeps only shared elements rather than all of them.
- **`symmetric_difference()`** — keeps elements unique to either side.

## Best Practices

1. Use `|` for clean syntax when combining sets.
2. Use the method form to combine a set with lists, tuples, or generators.
3. Reach for `update()` when you want to grow an existing set rather than create a new one.

## Key Takeaways

`union()` combines all unique elements from every input into a brand-new set, leaves the originals unchanged, is commutative, and removes duplicates automatically — making it the go-to for merging collections without mutating your sources.

## A Mental Model for union()

Imagine pouring the contents of several jars into one and letting duplicates dissolve away. That is `union()`: it gathers everything from every input and guarantees each distinct value appears exactly once. Because the result is brand new, `union()` is perfect for aggregations where the sources must stay untouched — merging tag clouds, combining permission grants across roles, or assembling a master list of unique identifiers from many feeds.

## Conclusion

The `union()` method is a small but powerful part of Python's set toolkit. In short, it merges all unique values from every input into a fresh, independent set. Sets are one of Python's most underrated data structures: they offer average constant-time membership tests, automatic de-duplication, and a rich family of mathematical operations that map directly onto everyday programming problems such as filtering, matching, grouping, and change detection. Mastering methods like `union()` lets you replace verbose loops and manual bookkeeping with a single, expressive call that communicates intent clearly to anyone reading your code. Whenever you are juggling collections of unique items and find yourself writing nested conditionals to compare them, pause and ask whether a set operation would express the same logic more concisely. More often than not, the answer is yes — and `union()` may be exactly the tool you need.
