---
title: Python Dictionary copy()
description: The copy() method returns a copy of the given dictionary.
date: 2025-01-18 21:38:03 +0800
categories: [Python Dictionary Reference]
tags: [Python Dictionary Reference]
image:
  path: /commons/Python Dictionary copy().webp
  alt: Python Dictionary copy()
---

The `copy()` method returns a shallow copy of the given dictionary. This means a new dictionary object is created with the same key-value pairs as the original. Changes to the copy do not affect the original dictionary, but there are important nuances when it comes to nested (mutable) values.

The syntax of copy() is:

```python
dictionary.copy()
```

## copy() Parameters

The `copy()` method does not take any parameters as arguments. It simply creates and returns a new dictionary with the same contents.

## Return Value

The `copy()` method returns a new dictionary. The returned dictionary is a shallow copy — top-level keys and values are duplicated, but nested objects (like lists or dicts inside the dictionary) are still shared by reference.

### Example 1: How to use copy() method in python dictionary?

```python
cars = {1 : "TATA", 2 : "BMW", 3 : "TOYOTA"}
print("First Dictionary is:", cars)

# copying dictionary using copy() method
new_cars = cars.copy()

print("Second Dictionary is:", new_cars)
```

Output:

```python
First Dictionary is: {1: 'TATA', 2: 'BMW', 3: 'TOYOTA'}
Second Dictionary is: {1: 'TATA', 2: 'BMW', 3: 'TOYOTA'}
```

Note: The `copy()` method is entirely different from the `=` operator. The `=` operator creates a new reference to the original dictionary, while `copy()` creates a new dictionary object filled with the same items.

### Example 2: How = operator is different from copy() method in python dictionaries?

```python
cars = {1 : "TATA", 2 : "BMW", 3 : "TOYOTA"}
print("First Dictionary is:", cars)

new_cars = cars

# clearing dictionary using clear() method
new_cars.clear()

print("First Dictionary is:", cars)
print("Second Dictionary is:", new_cars)
```

Output:

```python
First Dictionary is: {1: 'TATA', 2: 'BMW', 3: 'TOYOTA'}
First Dictionary is: {}
Second Dictionary is: {}
```

Here, when the `new_cars` dictionary is cleared, the `cars` dictionary is also cleared because both variables reference the same dictionary object.

## Additional Examples

### Example 3: Modifying the copy does not affect the original

```python
original = {"brand": "Ford", "year": 2020}
copy_dict = original.copy()

# Modify the copy
copy_dict["year"] = 2024
copy_dict["color"] = "Red"

print("Original:", original)
print("Copy:", copy_dict)
```

Output:

```python
Original: {'brand': 'Ford', 'year': 2020}
Copy: {'brand': 'Ford', 'year': 2024, 'color': 'Red'}
```

The original dictionary is unaffected by changes made to the copy.

### Example 4: Shallow copy behavior with nested objects

```python
student = {
    "name": "Ravi",
    "grades": [90, 85, 88]
}

student_copy = student.copy()

# Modifying a nested list in the copy affects the original
student_copy["grades"].append(95)

print("Original:", student)
print("Copy:", student_copy)
```

Output:

```python
Original: {'name': 'Ravi', 'grades': [90, 85, 88, 95]}
Copy: {'name': 'Ravi', 'grades': [90, 85, 88, 95]}
```

Because `copy()` is a shallow copy, the `grades` list is shared between both dictionaries. Modifying it through one dictionary affects the other.

### Example 5: Deep copy for fully independent copies

If you need a completely independent copy (including nested objects), use `copy.deepcopy()`:

```python
import copy

student = {
    "name": "Ravi",
    "grades": [90, 85, 88]
}

deep_copy = copy.deepcopy(student)
deep_copy["grades"].append(100)

print("Original:", student)
print("Deep copy:", deep_copy)
```

Output:

```python
Original: {'name': 'Ravi', 'grades': [90, 85, 88]}
Deep copy: {'name': 'Ravi', 'grades': [90, 85, 88, 100]}
```

## Real-World Use Cases

### Preserving original configuration while experimenting

```python
default_config = {
    "debug": False,
    "timeout": 30,
    "max_retries": 3
}

# Work on a modified config without touching the default
test_config = default_config.copy()
test_config["debug"] = True
test_config["timeout"] = 5

print("Default config:", default_config)
print("Test config:", test_config)
```

### Creating per-user settings from a template

```python
template = {"theme": "light", "notifications": True, "language": "en"}

user1_settings = template.copy()
user1_settings["theme"] = "dark"

user2_settings = template.copy()
user2_settings["language"] = "fr"

print("User 1:", user1_settings)
print("User 2:", user2_settings)
print("Template unchanged:", template)
```

## Common Mistakes

### Mistake 1: Using = instead of copy() when independence is needed

```python
# Wrong: both variables point to the same object
config_a = {"host": "localhost", "port": 8080}
config_b = config_a
config_b["port"] = 9090

print(config_a)  # {'host': 'localhost', 'port': 9090} — unintended change!

# Correct: use copy()
config_a = {"host": "localhost", "port": 8080}
config_b = config_a.copy()
config_b["port"] = 9090

print(config_a)  # {'host': 'localhost', 'port': 8080} — original preserved
```

### Mistake 2: Assuming copy() is deep

Always remember that `copy()` only creates a shallow copy. For nested mutable objects, use `copy.deepcopy()` if you need full independence.

## Performance Notes

The `copy()` method is O(n) where n is the number of keys in the dictionary. It is faster than `copy.deepcopy()` because it does not recurse into nested objects. For flat dictionaries with no nested mutable values, `copy()` is the recommended approach.

## FAQ

**Q: What is a shallow copy?**
A: A shallow copy creates a new container but does not copy the nested objects — they are still shared by reference between the original and the copy.

**Q: When should I use deepcopy instead of copy()?**
A: Use `copy.deepcopy()` when your dictionary contains nested mutable objects (like lists or other dicts) and you need the copy to be completely independent of the original.

**Q: Does copy() work on dict subclasses like defaultdict?**
A: `copy()` is available on all `dict` subclasses. However, the returned object is always a plain `dict`, not a `defaultdict`. Keep this in mind if you rely on default factory behavior.

**Q: Is there a performance difference between dict.copy() and dict(original)?**
A: Both create a shallow copy in O(n) time. `dict.copy()` is slightly more idiomatic and readable.

## Rules of copy()

- The `copy()` method does not take any parameters.
- It returns a new dictionary with the same key-value pairs as the original.
- It creates a shallow copy — nested mutable objects are shared between the original and the copy.
- Given object must be a dictionary, else returns an `AttributeError` exception.