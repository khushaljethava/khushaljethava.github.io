---
title: "Python Sets: The Complete Guide with All Methods"
description: "Master Python sets — creation, uniqueness, set algebra, and every built-in method (union, intersection, difference, symmetric_difference, and more) with runnable examples and the mutating-vs-returning distinction."
date: 2026-07-09 12:00:00 +0530
categories: [Python]
tags: [python, set, data-structures]
translations: [ru]
image:
  path: /commons/Python Set.webp
  alt: "Python sets complete guide with all methods"
redirect_from:
  - /posts/Python-set-clear()-Method/
  - /posts/Python-set-copy()-Method/
  - /posts/Python-set-difference()/
  - /posts/Python-set-difference_update()/
  - /posts/Python-set-discard()/
  - /posts/python-set-intersection()/
  - /posts/python-set-intersection_update()/
  - /posts/python-set-isdisjoint()/
  - /posts/python-set-issubset()/
  - /posts/python-set-issuperset()/
  - /posts/python-set-pop()/
  - /posts/python-set-remove()/
  - /posts/python-set-symmetric_difference()/
  - /posts/python-set-symmetric_difference_update()/
  - /posts/python-set-union()/
  - /posts/python-set-update()/
  - /posts/Python-Set/
---

Python's `set` is an unordered collection of unique, hashable elements. It's the tool you reach for whenever you need fast membership tests, need to strip duplicates from a sequence, or want to perform mathematical set operations like union and intersection directly in code. This guide covers everything from how sets are created to a full method-by-method reference with runnable examples.

## Set Fundamentals

### Uniqueness and hashability

A set can never contain duplicate elements — adding a value that's already present is a silent no-op. Every element of a set must also be **hashable**, which means immutable types like `int`, `str`, `float`, and `tuple` (of hashable items) work fine, but mutable types like `list`, `dict`, and other `set` objects cannot be stored inside a set.

```python
s = {1, 2, 2, 3}
print(s)          # {1, 2, 3}

# s.add([1, 2])   # TypeError: unhashable type: 'list'
```

### Creating sets

There are three common ways to build a set:

```python
literal = {1, 2, 3}
from_constructor = set([1, 2, 2, 3])          # {1, 2, 3}
from_comprehension = {x * x for x in range(5)} # {0, 1, 4, 9, 16}

empty = set()   # NOT {} — that creates an empty dict
```

### frozenset — the immutable sibling

`frozenset` behaves like `set` but cannot be mutated after creation, which makes it hashable and usable as a dictionary key or as an element inside another set.

```python
fs = frozenset([1, 2, 3])
d = {fs: "immutable key works"}
```

### Membership and iteration

Membership tests on a set run in average O(1) time, versus O(n) for a list, which is the main reason to reach for a set when checking "is this value present" repeatedly.

```python
colors = {"red", "green", "blue"}
print("red" in colors)   # True

for c in colors:         # order is not guaranteed
    print(c)
```

### Sets are unordered

Because sets are hash-based, they don't preserve insertion order and don't support indexing (`colors[0]` raises `TypeError`). If you need order, use a `list` or, since Python 3.7, rely on `dict` (which preserves insertion order) instead.

## Set Methods

Below is every core set method, grouped with its signature, a short runnable example, and — critically — whether it returns a **new set** or **mutates the set in place**.

### set.add()

Adds a single element to the set. Mutates in place; returns `None`.

```python
s = {1, 2}
s.add(3)
print(s)   # {1, 2, 3}
```

### set.clear()

Removes all elements from the set. Mutates in place; returns `None`.

```python
s = {1, 2, 3}
s.clear()
print(s)   # set()
```

### set.copy()

Returns a shallow copy of the set — a genuinely new object, so mutating the copy does not affect the original.

```python
s = {1, 2, 3}
c = s.copy()
c.add(4)
print(s, c)   # {1, 2, 3} {1, 2, 3, 4}
```

### set.difference()

`set.difference(*others)` — returns a **new** set of elements in `set` that are not in any of `others`. Equivalent to `-`.

```python
a = {1, 2, 3}
b = {2, 3, 4}
print(a.difference(b))   # {1}
print(a - b)             # {1}
```

### set.difference_update()

Same computation as `difference()`, but **mutates** `set` in place instead of returning a new one.

```python
a = {1, 2, 3}
b = {2, 3, 4}
a.difference_update(b)
print(a)   # {1}
```

### set.discard()

Removes an element if present; unlike `remove()`, does **not** raise if the element is missing. Mutates in place; returns `None`.

```python
s = {1, 2, 3}
s.discard(5)   # no error
s.discard(2)
print(s)       # {1, 3}
```

### set.intersection()

`set.intersection(*others)` — returns a **new** set of elements common to `set` and all `others`. Equivalent to `&`.

```python
a = {1, 2, 3}
b = {2, 3, 4}
print(a.intersection(b))   # {2, 3}
print(a & b)                # {2, 3}
```

### set.intersection_update()

Same computation as `intersection()`, but **mutates** `set` in place.

```python
a = {1, 2, 3}
b = {2, 3, 4}
a.intersection_update(b)
print(a)   # {2, 3}
```

### set.isdisjoint()

Returns `True` if `set` and `other` share no elements. Read-only — never mutates.

```python
a = {1, 2}
b = {3, 4}
print(a.isdisjoint(b))   # True
```

### set.issubset()

Returns `True` if every element of `set` is also in `other`. Equivalent to `<=`. Read-only.

```python
a = {1, 2}
b = {1, 2, 3}
print(a.issubset(b))   # True
print(a <= b)          # True
```

### set.issuperset()

Returns `True` if `set` contains every element of `other`. Equivalent to `>=`. Read-only.

```python
a = {1, 2, 3}
b = {1, 2}
print(a.issuperset(b))   # True
print(a >= b)            # True
```

### set.pop()

Removes and returns an **arbitrary** element. Mutates in place; raises `KeyError` on an empty set.

```python
s = {1, 2, 3}
x = s.pop()
print(x, s)   # e.g. 1 {2, 3} — the popped value isn't guaranteed
```

### set.remove()

Removes a specific element. Mutates in place; raises `KeyError` if the element is absent (use `discard()` if you want a silent no-op).

```python
s = {1, 2, 3}
s.remove(2)
print(s)   # {1, 3}
```

### set.symmetric_difference()

Returns a **new** set of elements in exactly one of the two sets (present in either, not both). Equivalent to `^`.

```python
a = {1, 2, 3}
b = {2, 3, 4}
print(a.symmetric_difference(b))   # {1, 4}
print(a ^ b)                        # {1, 4}
```

### set.symmetric_difference_update()

Same computation as `symmetric_difference()`, but **mutates** `set` in place.

```python
a = {1, 2, 3}
b = {2, 3, 4}
a.symmetric_difference_update(b)
print(a)   # {1, 4}
```

### set.union()

`set.union(*others)` — returns a **new** set containing every element from `set` and all `others`. Equivalent to `|`.

```python
a = {1, 2}
b = {2, 3}
print(a.union(b))   # {1, 2, 3}
print(a | b)         # {1, 2, 3}
```

### set.update()

Same computation as `union()`, but **mutates** `set` in place, adding elements from the other iterables.

```python
a = {1, 2}
b = {2, 3}
a.update(b)
print(a)   # {1, 2, 3}
```

## Method vs. Operator Cheat Sheet

| Method | Operator equivalent | Returns new or mutates |
|---|---|---|
| `union()` | `\|` | Returns new |
| `update()` | `\|=` | Mutates |
| `intersection()` | `&` | Returns new |
| `intersection_update()` | `&=` | Mutates |
| `difference()` | `-` | Returns new |
| `difference_update()` | `-=` | Mutates |
| `symmetric_difference()` | `^` | Returns new |
| `symmetric_difference_update()` | `^=` | Mutates |
| `issubset()` | `<=` | Returns bool |
| `issuperset()` | `>=` | Returns bool |
| `add()` | — | Mutates |
| `remove()` | — | Mutates (raises if missing) |
| `discard()` | — | Mutates (silent if missing) |
| `pop()` | — | Mutates, returns removed item |
| `clear()` | — | Mutates |
| `copy()` | — | Returns new |
| `isdisjoint()` | — | Returns bool |

The pattern to remember: the operator forms (`|`, `&`, `-`, `^`) and their plain method names always return a **new** set, while the `_update` (or `=`-suffixed operator) forms mutate the original in place — mirroring how `+` vs `+=` behaves for lists.

## Common Use Cases

**Deduplicating a list.** The fastest way to remove duplicates while discarding order is `list(set(my_list))`. If you need to preserve order, use `dict.fromkeys(my_list)` instead, since sets don't guarantee ordering.

```python
raw = [3, 1, 2, 3, 1, 4]
unique = list(set(raw))   # order not guaranteed
```

**Fast membership checks.** Converting a large list to a set before running many `in` checks turns an O(n) lookup into an O(1) one, which matters a lot in loops.

```python
allowed = set(load_allowed_ids())   # once
for record in records:
    if record.id in allowed:        # O(1) each time
        process(record)
```

**Finding overlaps and differences between datasets.** Set algebra is the natural fit whenever you're comparing two collections — for example, which tags appear in both of two articles, or which users unsubscribed since last month.

```python
tags_a = {"python", "ai", "tutorial"}
tags_b = {"python", "ml"}
shared = tags_a & tags_b        # {'python'}
only_in_a = tags_a - tags_b     # {'ai', 'tutorial'}
```

## Performance Notes

Sets in CPython are implemented as hash tables, the same underlying structure as dictionaries (minus the values). That gives `add`, `remove`, `discard`, and `in` average O(1) time complexity, compared to O(n) for the equivalent list operations. The tradeoff is memory overhead — a set generally uses more memory per element than a list holding the same items — and the loss of ordering and indexing. For small collections (a handful of items) the difference is negligible; for anything processed in a hot loop or checked against repeatedly, sets are almost always the better choice over lists.

## Common Pitfalls

- **Empty set literal.** `{}` creates a `dict`, not a `set`. Always use `set()` for an empty set.
- **Unhashable elements.** Trying to put a `list` or `dict` inside a set raises `TypeError: unhashable type`. Convert nested lists to tuples first if you need to store them.
- **Assuming order.** Because sets are unordered, don't rely on iteration order or the value returned by `pop()` being predictable — if you need determinism, sort the set or use a list.
- **Confusing `remove()` and `discard()`.** Use `discard()` when the element might not be present and you don't want an exception; use `remove()` when its absence indicates a bug you want surfaced.

## Frequently Asked Questions

**Which method removes and returns an arbitrary element from a set?** `pop()`. It takes no arguments — there is no "pop by name" and no pop by index, because a set has neither positions nor keys. To remove one *specific* element use `remove()` (raises `KeyError` if absent) or `discard()` (silent no-op if absent).

**Is `set.pop()` random?** No — arbitrary is not the same as random. CPython returns the first element in the set's internal hash table, which is deterministic for a given set but depends on hash values and insertion history, so you must not rely on which element you get. If you need a genuinely random pick, use `random.choice(tuple(s))` instead.

**What does `add()` do if the element already exists?** Nothing, and it does not raise. The set hashes the value, finds a slot already holding an equal element, and returns `None` without changing anything — the same `None` it returns on a successful insert. Comparing `len(s)` before and after is the only reliable way to tell whether an `add()` actually inserted something.

**What is the purpose of `discard()`, and does it remove duplicates?** `discard(x)` removes `x` if present and does nothing if it isn't. It cannot remove "all copies" of an element, because a set never holds duplicates in the first place — there is at most one of anything in a set.

**What happens if you try to add to or remove from a frozenset?** An `AttributeError`. A `frozenset` is immutable, so it simply has no `add`, `remove`, `discard`, `pop`, `clear`, or `*_update` methods. It is not converted to a regular set and it is not cleared — the call fails. Build a new frozenset instead: `fs | {new_item}`.

**Sets are called unchangeable, so how can you add and remove items?** Two different things are being described. The *set* is mutable — you can add and remove items freely. The *elements* are not: they must be hashable, and a hashable object's value must not change while it sits in the set. That is why a list can never be a set element but a tuple of immutable values can.

**Does `difference_update()` return the new set?** No, it returns `None` — like every `*_update` method (`intersection_update`, `symmetric_difference_update`, `update`), it mutates in place. `result = s.difference_update(t)` leaves `result` as `None`; use `s.difference(t)` when you want a value back.

**How do I clear a set?** `s.clear()` empties it in place, so every other reference to that same set object sees it empty too. Rebinding with `s = set()` instead creates a *new* empty set and leaves any other reference pointing at the old, still-populated one.

## Where sets fit with the rest of Python

If you're comparing sets against Python's other core containers, the [Python Lists: The Complete Guide]({% link _posts/2026-07-09-python-lists-complete-guide.md %}) covers ordered, index-based collections, and many set operations (like `sorted(some_set)`) lean on the [Python built-in functions reference]({% link _posts/2026-07-09-python-built-in-functions-reference.md %}) for things like `len()`, `sorted()`, and `map()`. Sets are also the natural structure for deduplicating tokens or vocabulary when building retrieval pipelines — see the [Beginner's Guide to LangChain in Python]({% link _posts/2024-11-27-Beginner-Guide-to-LangChain-in-Python.md %}) for a practical case where fast membership checks matter.
