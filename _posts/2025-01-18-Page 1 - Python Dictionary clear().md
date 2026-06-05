---
title: Python Dictionary clear()
description: The clear() method removes all the items from a dictionary.
date: 2025-01-18 21:38:03 +0800
categories: [Python Dictionary Reference]
tags: [Python Dictionary Reference]
image:
  path: /commons/Python Dictionary clear().webp
  alt: Python Dictionary clear()
---

The `clear()` method removes all the items from a dictionary, leaving it as an empty dictionary. Unlike deleting the variable itself, the dictionary object still exists in memory after calling `clear()` — it simply has no key-value pairs.

The syntax of clear() method is:

```python
dictionary.clear()
```

## clear() Parameters

The `clear()` method does not take any parameter as argument. It operates directly on the dictionary it is called on and modifies it in place.

## Return Value

The `clear()` method returns `None`. It does not return the cleared dictionary or any value. The modification is done in-place on the original dictionary.

## Basic Example

Let's see an example of the dictionary `clear()` method.

### Example 1: How to use the clear() method in python dictionaries?

```python
cars = {1 : "TATA", 2 : "BMW", 3 : "TOYOTA"}
print("Dictionary is:", cars)

# clearing dictionary using clear() method
cars.clear()

print("Dictionary is:", cars)
```

Output:

```python
Dictionary is: {1: 'TATA', 2: 'BMW', 3: 'TOYOTA'}
Dictionary is: {}
```

Here we can see that the `clear()` method has completely removed all the items from the dictionary. The variable `cars` still exists and points to an empty dictionary `{}`.

## Additional Examples

### Example 2: Clearing a nested dictionary

```python
profile = {
    "name": "Alice",
    "age": 30,
    "address": {"city": "Mumbai", "pin": "400001"},
    "hobbies": ["reading", "coding"]
}

print("Before clear:", profile)
profile.clear()
print("After clear:", profile)
```

Output:

```python
Before clear: {'name': 'Alice', 'age': 30, 'address': {'city': 'Mumbai', 'pin': '400001'}, 'hobbies': ['reading', 'coding']}
After clear: {}
```

All keys and values — including nested objects — are removed from the top-level dictionary.

### Example 3: Confirming clear() modifies the dictionary in place

```python
inventory = {"apples": 10, "bananas": 5, "oranges": 8}
reference = inventory   # both point to the same object

inventory.clear()

print("inventory:", inventory)
print("reference:", reference)
print("Are they the same object?", inventory is reference)
```

Output:

```python
inventory: {}
reference: {}
Are they the same object? True
```

This confirms that `clear()` modifies the dictionary in place. Since `reference` and `inventory` point to the same object, both reflect the cleared state.

## Real-World Use Cases

### Resetting a cache

In web applications, dictionaries are frequently used as in-memory caches. The `clear()` method makes it easy to flush the entire cache at once.

```python
cache = {}

def fetch_data(key):
    if key not in cache:
        # Simulate fetching from database
        cache[key] = f"data_for_{key}"
    return cache[key]

fetch_data("user_1")
fetch_data("user_2")
print("Cache:", cache)

# Reset the cache at midnight or after a timeout
cache.clear()
print("Cache after reset:", cache)
```

### Reusing a dictionary in a loop

```python
result = {}

datasets = [
    {"a": 1, "b": 2},
    {"x": 10, "y": 20},
]

for data in datasets:
    result.update(data)
    print("Processing:", result)
    result.clear()  # Reset before next iteration
```

Output:

```python
Processing: {'a': 1, 'b': 2}
Processing: {'x': 10, 'y': 20}
```

## Common Mistakes

### Mistake 1: Confusing clear() with del

```python
scores = {"Alice": 95, "Bob": 80}

# Using del removes the variable entirely
del scores
# print(scores)  # This would raise NameError: name 'scores' is not defined

scores2 = {"Alice": 95, "Bob": 80}
# Using clear() keeps the variable but empties it
scores2.clear()
print(scores2)  # Output: {}
```

After `del`, the variable no longer exists. After `clear()`, the variable still exists as an empty dictionary.

### Mistake 2: Expecting clear() to return the old data

```python
data = {"a": 1, "b": 2}
result = data.clear()
print(result)  # Output: None
```

`clear()` returns `None`, not the original contents. If you need to save the contents before clearing, make a copy first.

```python
data = {"a": 1, "b": 2}
backup = data.copy()
data.clear()

print("Backup:", backup)
print("Original:", data)
```

## Edge Cases

### Calling clear() on an already empty dictionary

```python
empty_dict = {}
empty_dict.clear()
print(empty_dict)  # Output: {} — no error raised
```

Calling `clear()` on an already empty dictionary is safe and raises no exception.

### clear() vs assigning a new empty dictionary

```python
d = {"key": "value"}
ref = d

# Option 1: Reassign (ref still points to old dict)
d = {}
print("d:", d)
print("ref:", ref)  # {'key': 'value'} — ref is unchanged

# Option 2: clear() (ref also cleared)
d2 = {"key": "value"}
ref2 = d2
d2.clear()
print("d2:", d2)
print("ref2:", ref2)  # {} — ref2 is also cleared
```

This distinction is important when multiple variables point to the same dictionary.

## Performance Notes

The `clear()` method runs in O(n) time, where n is the number of items in the dictionary, because Python needs to release references to all stored objects. However, for practical use cases, it is extremely fast and always preferred over manual deletion of keys in a loop.

Avoid this pattern:

```python
# Slow — manually removing keys
for key in list(data.keys()):
    del data[key]
```

Use `clear()` instead — it is cleaner and more efficient.

## FAQ

**Q: Does clear() delete nested objects inside the dictionary?**
A: It removes the references to nested objects from the top-level dictionary, but the nested objects themselves are only garbage-collected if no other references to them exist.

**Q: Can I use clear() on a defaultdict or OrderedDict?**
A: Yes. `clear()` is inherited from the base `dict` class and works the same way on all dict subclasses.

**Q: Is clear() thread-safe?**
A: Not by default. If multiple threads access the same dictionary concurrently, you should use a lock (e.g., `threading.Lock`) to ensure safe access.

**Q: What is the difference between clear() and assigning {}?**
A: Assigning `d = {}` creates a new dictionary and makes `d` point to it. Any other variable that referenced the old dictionary is unaffected. Calling `d.clear()` empties the same dictionary object in place, so all references to that object see the empty state.

## Rules of clear()

- The `clear()` method does not take any parameters.
- It modifies the dictionary in place and returns `None`.
- It is safe to call on an empty dictionary.
- All key-value pairs, including those with nested values, are removed from the dictionary.