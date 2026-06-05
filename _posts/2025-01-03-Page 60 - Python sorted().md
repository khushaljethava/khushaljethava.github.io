---
title: Python sorted()
description: The sorted() is a built-in python function that returns a sorted list of the given iterable object.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python sorted().webp
  alt: Python sorted()
---

The Python `sorted()` function is a built-in function that returns a new sorted list from the items of any iterable. It accepts three parameters: `iterable` (the sequence to sort), an optional `key` function that extracts a comparison key from each element, and an optional `reverse` boolean that sorts in descending order when set to `True`. The function always returns a new list, leaving the original iterable unchanged, which makes it safe to use without worrying about mutating your source data. Unlike the `list.sort()` method, `sorted()` works on any iterable including tuples, sets, dictionaries, and generators. This makes it invaluable for tasks like ranking search results, ordering database records by a specific field, or alphabetizing user input. The `key` parameter is particularly powerful, allowing you to sort complex objects by any attribute or computed value. It works well with [min()](/posts/Page-44-Python-min()/) and [max()](/posts/Page-42-Python-max()/) for finding extreme values in collections.

## What does sorted() return?

The `sorted()` function always returns a new list containing all items from the input iterable arranged in ascending order by default, or descending order if `reverse=True`.

## When should you use sorted()?

Use `sorted()` when you need a sorted copy of any iterable without modifying the original, or when sorting non-list iterables like tuples, sets, or dictionary keys.

The syntax of sorted() is:

```python
sorted(iterable, key, reverse)

```

## sorted() Parameters

The sorted() function takes three parameters as argument:

* iterable \- an iterable object like string, list,set, etc.  
* key (Optional) \- A Function to execute to decide the order. Default is None.  
* reverse (Optional) \- 

Let see an example of the sorted()   function.


### Example 1: How to use sorted() function in python?

```python
a = (2, 5, 3)
x = sorted(a)
print(x)

```


Output:

```python
[2, 3, 5]

```


### Example 2: sorted() function with python string.

```python
a = ("h", "b", "a", "c", "f", "d", "e", "g")
x = sorted(a)
print(x)

```

Output:

```python
['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

```

## Common Use Cases

A common use case for `sorted()` is sorting a list of dictionaries by a specific key, such as ordering a list of products by price using `sorted(products, key=lambda x: x['price'])`. Another practical scenario is sorting user-generated content alphabetically for display, such as sorting names in a contact list or tags on a blog. It is also frequently used to sort the results of [filter()](/posts/Page-22-Python-filter()/) or [map()](/posts/Page-41-Python-map()/) operations in data processing pipelines where the output needs to be presented in a deterministic order.
---

## More Examples

### Sorting with a key function

```python
words = ["banana", "kiwi", "apple", "fig"]
print(sorted(words, key=len))        # ['fig', 'kiwi', 'apple', 'banana']
print(sorted(words, key=len, reverse=True))
```

The `key` parameter lets you sort by any derived value — length, a dictionary field, or a computed score.

### Sorting a list of dictionaries

```python
people = [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25},
    {"name": "Carol", "age": 35},
]
by_age = sorted(people, key=lambda p: p["age"])
print([p["name"] for p in by_age])   # ['Bob', 'Alice', 'Carol']
```

## sorted() vs list.sort()

| Feature | `sorted()` | `list.sort()` |
|---------|-----------|---------------|
| Returns | A new list | `None` |
| Works on | Any iterable | Lists only |
| Original | Unchanged | Modified in place |

Use `sorted()` when you need a new sorted sequence and want to keep the original; use `list.sort()` to sort a list in place.

## Real-World Use Cases

- **Ranking** — ordering scores, prices, or timestamps.
- **Display** — alphabetising names or sorting search results.
- **Pre-processing** — sorting before binary search or grouping.

## Common Mistakes

- **Expecting in-place sorting** — `sorted()` returns a new list; the original is untouched.
- **Comparing incompatible types** — sorting a mix of strings and numbers raises `TypeError`.
- **Overusing `reverse` with a key** — you can often invert the key instead for clarity.

## FAQ

**Q: Is `sorted()` stable?**
Yes — equal elements keep their original relative order, which is useful for multi-key sorting.

**Q: Can I sort in descending order?**
Yes — pass `reverse=True`, or negate a numeric key.

## Conclusion

`sorted()` returns a new sorted list from any iterable, leaving the source unchanged. With its `key` and `reverse` parameters it can express almost any ordering you need, from simple alphabetical sorts to complex multi-field rankings. Because it is stable and works on any iterable, `sorted()` is one of the most versatile built-ins in Python.
