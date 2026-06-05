---
title: Python Set intersection() Method 
description: In this tutorial, we will understand about the python set intersection() method and its uses.
date: 2025-01-24 22:02:00 +0800
categories: [Python Set Reference]
tags: [Python Set Reference]
image:
  path: /commons/Python Set intersection() Method.webp
  alt: Python Set intersection() Method 
---

The `intersection()` method returns a **new set** containing only the elements that are common to all the sets involved. It can also be written using the `&` operator. The original sets remain unchanged.

## Syntax

```python
set.intersection(set2)
# or
set1 & set2
```

## Parameters

| Parameter | Description |
|-----------|-------------|
| `set2` | One or more sets or iterables whose common elements are found. |

## Return Value

A new set containing elements present in every set. The original sets are not modified.

---

## Example 1: Basic Intersection

```python
set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7, 8}
result = set1.intersection(set2)
print(result)  # {4, 5}
```

Only `4` and `5` appear in both sets.

---

## Example 2: Using the `&` Operator

```python
numbers1 = {1, 2, 3, 4}
numbers2 = {3, 4, 5, 6}
print(numbers1 & numbers2)  # {3, 4}
```

---

## Example 3: Multiple Sets

```python
set1 = {1, 2, 3, 4}
set2 = {2, 3, 4, 5}
set3 = {3, 4, 5, 6}
result = set1.intersection(set2, set3)
print(result)  # {3, 4}
```

The result contains only elements common to **all** sets.

---

## Example 4: No Common Elements

```python
a = {1, 2, 3}
b = {4, 5, 6}
print(a.intersection(b))  # set()
```

---

## Example 5: Intersection with a List

```python
s = {"apple", "banana", "cherry"}
result = s.intersection(["banana", "cherry", "date"])
print(result)  # {'banana', 'cherry'}
```

---

## Example 6: Intersection Does Not Modify Originals

```python
a = {1, 2, 3}
b = {2, 3, 4}
c = a.intersection(b)
print(a)  # {1, 2, 3} — unchanged
print(b)  # {2, 3, 4} — unchanged
print(c)  # {2, 3}
```

---

## intersection() vs intersection_update()

| Method | Modifies original? | Returns |
|--------|-------------------|---------|
| `intersection(set2)` | No | New set |
| `intersection_update(set2)` | Yes | `None` |

---

## Real-World Use Cases

**1. Finding mutual friends:**
```python
alice_friends = {"bob", "carol", "dave"}
bob_friends   = {"alice", "carol", "dave", "eve"}
mutual = alice_friends.intersection(bob_friends)
print(mutual)  # {'carol', 'dave'}
```

**2. Finding products available in all warehouses:**
```python
warehouse1 = {"laptop", "mouse", "keyboard"}
warehouse2 = {"mouse", "keyboard", "monitor"}
common = warehouse1 & warehouse2
print(common)  # {'mouse', 'keyboard'}
```

**3. Matching skills between a job and a candidate:**
```python
job_skills       = {"python", "sql", "docker"}
candidate_skills = {"python", "java", "sql"}
matched = job_skills.intersection(candidate_skills)
print(matched)  # {'python', 'sql'}
```

---

## Common Mistakes

- **Confusing with `union()`** — `intersection()` keeps only shared elements; `union()` combines all elements.
- **Expecting in-place modification** — `intersection()` returns a new set; use `intersection_update()` to modify in place.
- **Forgetting it accepts iterables** — you can pass a list or tuple, not just a set.

---

## FAQ

**Q: Is intersection commutative?**
Yes — `A & B == B & A`.

**Q: Can I intersect more than two sets at once?**
Yes — `a.intersection(b, c, d)` or `a & b & c & d`.

**Q: Does the argument have to be a set?**
For the method form, any iterable works. For the `&` operator, both operands must be sets.

---

## Performance and Time Complexity

`intersection()` is optimised to iterate over the smallest input set and test membership against the others, giving excellent average-case performance near **O(min length)**. Because set membership tests are average **O(1)**, intersecting even large sets is fast. The originals are never modified, so the only cost is constructing the result.

## Related Methods

- **`intersection_update()`** — the in-place variant that returns `None`.
- **`union()`** — combines all elements rather than keeping shared ones.
- **`difference()`** — keeps elements unique to the first set.

## Best Practices

1. Use `&` for readability when intersecting sets.
2. Use the method form to intersect a set with lists or tuples.
3. Intersect the smallest set first conceptually — Python already optimises this internally.

## Key Takeaways

`intersection()` returns a new set of elements common to all inputs, is commutative, leaves the originals untouched, and accepts any iterables in its method form — making it the standard tool for finding overlap between collections.

## A Mental Model for intersection()

Visualise two overlapping circles in a Venn diagram; `intersection()` returns only the shaded region where they meet. This makes it the natural tool for "what do these have in common?" questions — mutual friends, shared tags, products stocked in every warehouse, or skills a candidate and a job both list. Since the inputs are never modified, you can compute overlaps across many pairings from the same base sets safely.

## Conclusion

The `intersection()` method is a small but powerful part of Python's set toolkit. In short, it returns only the values common to every input set. Sets are one of Python's most underrated data structures: they offer average constant-time membership tests, automatic de-duplication, and a rich family of mathematical operations that map directly onto everyday programming problems such as filtering, matching, grouping, and change detection. Mastering methods like `intersection()` lets you replace verbose loops and manual bookkeeping with a single, expressive call that communicates intent clearly to anyone reading your code. Whenever you are juggling collections of unique items and find yourself writing nested conditionals to compare them, pause and ask whether a set operation would express the same logic more concisely. More often than not, the answer is yes — and `intersection()` may be exactly the tool you need.
