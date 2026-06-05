---
title: Python list() Method
description: In this tutorial we will learn about the python list() method and its uses with examples.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python list() Method.webp
  alt: Python list() Method
---

The Python `list()` function is a built-in constructor that creates a new list object. It is one of the most commonly used built-in functions in Python, and understanding it thoroughly will make you a more effective Python programmer. Whether you are converting other data types into lists, materializing lazy iterators, or simply creating an empty list to populate later, `list()` is the tool you need.

Lists are one of Python's four fundamental built-in data structures, alongside tuples, sets, and dictionaries. What makes lists unique is that they are **ordered**, **mutable**, and allow **duplicate elements**. This combination of features makes them incredibly flexible for storing and manipulating collections of data. The `list()` constructor gives you a direct and explicit way to create list objects from a wide variety of sources.

## What is the Python list() Method?

The Python `list()` method is a built-in constructor used to create a list. It can also be used for typecasting — converting other iterable data types such as strings, tuples, sets, dictionaries, and generator objects into a list. A list is a Python built-in data structure that is a collection of ordered and mutable objects. Unlike tuples, lists can be modified after creation, which is why they are preferred when the data is expected to change.

The `list()` function accepts a single optional parameter: an iterable whose elements will become the items of the new list. When called without arguments, it returns an empty list `[]`. This explicit constructor style is often preferred over the literal `[]` syntax when you want to make it clear that you are intentionally creating an empty list or converting from another type.

## Syntax

```python
list(iterable)
```

## Python list() Method Parameters

The `list()` method takes only one parameter as argument:

- **iterable (optional)** — an iterable object that can be a sequence or collection of objects. This can include strings, tuples, sets, dictionaries, ranges, generators, and any other object that implements the `__iter__` method. If no argument is provided, an empty list is returned.

## What does list() return?

The `list()` function returns a new list object. If an iterable is passed, the list contains all the elements of that iterable in the same order (for ordered iterables). If no argument is passed, it returns an empty list `[]`.

---

### Example 1: How to use the list() method in Python?

```python
# empty list
print(list())

# vowel string
vowel_string = 'aeiou'
print(list(vowel_string))

# vowel tuple
vowel_tuple = ('a', 'e', 'i', 'o', 'u')
print(list(vowel_tuple))

# vowel list
vowel_list = ['a', 'e', 'i', 'o', 'u']
print(list(vowel_list))
```

Output:

```
[]
['a', 'e', 'i', 'o', 'u']
['a', 'e', 'i', 'o', 'u']
['a', 'e', 'i', 'o', 'u']
```

When converting a string, each individual character becomes a separate element in the resulting list. When converting a tuple, each element of the tuple becomes a list element in the same position.

---

### Example 2: How to convert a dictionary to a list using list() method?

```python
# fruit dictionary
fruits = {1: 'banana', 2: 'mango', 3: 'apple'}
print(fruits)

fruits_list = list(fruits)
print(fruits_list)
```

Output:

```
{1: 'banana', 2: 'mango', 3: 'apple'}
[1, 2, 3]
```

When you pass a dictionary to `list()`, only the **keys** are included in the resulting list. The values are not included. If you want the values instead, use `list(fruits.values())`. If you want both keys and values, use `list(fruits.items())` which will give you a list of tuples.

---

### Example 3: How to create an empty list in Python?

```python
# Empty List using list()
lst = list()
print(lst)

# Check Type of variable
print(type(lst))
```

Output:

```
[]
<class 'list'>
```

Creating an empty list with `list()` is functionally identical to writing `[]`. However, `list()` is more explicit and sometimes preferred in code where clarity is important. Both approaches produce an object of type `<class 'list'>`.

---

### Example 4: Converting a range and a generator to a list

```python
# Converting range to list
number_range = range(1, 11)
number_list = list(number_range)
print(number_list)

# Converting a generator expression to list
squares = list(x ** 2 for x in range(1, 6))
print(squares)

# Using list() with map()
doubled = list(map(lambda x: x * 2, [1, 2, 3, 4, 5]))
print(doubled)
```

Output:

```
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
[1, 4, 9, 16, 25]
[2, 4, 6, 8, 10]
```

This example demonstrates one of the most practical uses of `list()` in modern Python: materializing lazy iterables. Functions like `range()`, `map()`, and `filter()` return iterator objects that produce values on demand. When you need to access elements by index, iterate multiple times, or serialize to JSON, you must first convert them to a concrete list.

---

### Example 5: Making a shallow copy of a list

```python
original = [1, 2, 3, 4, 5]
copy = list(original)

# Modifying the copy does not affect the original
copy.append(6)

print("Original:", original)
print("Copy:", copy)
```

Output:

```
Original: [1, 2, 3, 4, 5]
Copy: [1, 2, 3, 4, 5, 6]
```

Using `list(original)` creates a **shallow copy** of the list. This means a new list object is created, and the original list is not affected by changes to the copy as long as the elements themselves are immutable. However, if the list contains mutable objects like nested lists, changes to those nested objects will be reflected in both the original and the copy.

---

## Real-World Use Cases

### 1. Processing CSV or database results

When reading data from a database cursor or CSV reader, the results are often returned as iterators. Converting them to a list allows random access and multiple iterations:

```python
import csv

with open('data.csv', 'r') as f:
    reader = csv.reader(f)
    rows = list(reader)

# Now rows can be accessed by index
print(rows[0])   # header row
print(rows[1])   # first data row
```

### 2. Extracting dictionary keys for display

```python
config = {
    'host': 'localhost',
    'port': 8080,
    'debug': True,
    'database': 'mydb'
}

keys = list(config.keys())
print("Available settings:", keys)
# Output: Available settings: ['host', 'port', 'debug', 'database']
```

### 3. Splitting input into characters for validation

```python
password = "Secure@123"
characters = list(password)
has_digit = any(c.isdigit() for c in characters)
has_upper = any(c.isupper() for c in characters)
print("Has digit:", has_digit)
print("Has uppercase:", has_upper)
```

---

## Edge Cases and Gotchas

**1. Passing a non-iterable raises a TypeError:**

```python
list(42)
# TypeError: 'int' object is not iterable
```

You cannot pass a plain integer, float, or boolean to `list()`. It only accepts objects that implement the iteration protocol.

**2. Shallow copy caveat with nested lists:**

```python
nested = [[1, 2], [3, 4]]
copy = list(nested)
copy[0].append(99)

print(nested)  # [[1, 2, 99], [3, 4]] — original is also modified!
```

Because `list()` creates only a shallow copy, the inner lists are still shared between the original and the copy. Use `copy.deepcopy()` if you need truly independent nested structures.

**3. Dictionary only yields keys:**

As demonstrated earlier, `list(my_dict)` gives you only the keys. This is a common source of confusion for beginners who expect both keys and values to appear.

**4. Sets are unordered:**

```python
my_set = {3, 1, 4, 1, 5, 9}
print(list(my_set))
# Output order is not guaranteed, e.g.: [1, 3, 4, 5, 9]
```

Since sets have no defined order, converting a set to a list may produce elements in a different order each time.

---

## Comparison with Related Functions

| Function | Purpose | Returns |
|----------|---------|---------|
| `list()` | Creates a mutable list from an iterable | `list` |
| `tuple()` | Creates an immutable sequence from an iterable | `tuple` |
| `set()` | Creates an unordered collection with no duplicates | `set` |
| `dict()` | Creates a dictionary from key-value pairs | `dict` |

The key distinction is mutability. If you need a sequence that can be modified (appended to, sorted, reversed, etc.), use `list()`. If you need an immutable sequence, use `tuple()`. If you need uniqueness and don't care about order, use `set()`.

---

## When Should You Use list()?

Use `list()` when you need to:

- Convert an iterable (tuple, set, string, generator, map object, filter object) into a list.
- Create an empty list to populate later.
- Make a shallow copy of an existing list.
- Access elements of a lazy iterator by index or multiple times.
- Serialize data to JSON (which requires concrete lists, not generators).

---

## FAQ

**Q1: What is the difference between `list()` and `[]`?**

A: Both create a list, but `[]` is a list literal and is slightly faster for creating empty lists because it does not require a function call. `list()` is more explicit and is preferred when converting from another iterable type. For empty lists, `[]` is idiomatic Python, but both are perfectly valid.

**Q2: Can `list()` handle nested structures?**

A: Yes, but only at the top level. `list([[1, 2], [3, 4]])` will produce `[[1, 2], [3, 4]]` — a list containing two inner lists. It does not flatten nested structures. To flatten, you would need additional logic such as a list comprehension or `itertools.chain.from_iterable()`.

**Q3: Is `list()` the same as calling `.copy()` on a list?**

A: Functionally, `list(my_list)` and `my_list.copy()` both produce a shallow copy of the list. The `.copy()` method is more explicit about intent (it clearly signals you are copying), while `list()` is more general (it also works on non-list iterables). Both create a new list object with the same top-level elements.

---

## Rules of list() Method

- If the `list()` method is called without a parameter, it returns an empty list.
- A dictionary passed to `list()` will only return its keys as list elements.
- Only sequences or iterable collections of objects can be used with the `list()` method.
- Passing a non-iterable such as an integer will raise a `TypeError`.
- The resulting list is a shallow copy — changes to mutable nested elements affect both the original and the copy.

To create an immutable sequence instead, see the [Python tuple() function](/posts/Page-65-Python-tuple()/). If you need to apply a transformation to each element before collecting into a list, the [Python map() method](/posts/Page-41-Python-map()/) is commonly used in combination with `list()`.
