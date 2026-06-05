---
title: Python List append()
description: The append() method will add an element at the end of the list.
date: 2025-01-18 23:28:25 +0800
categories: [Python List reference]
tags: [Python List reference]
image:
  path: /commons/Python List append().webp
  alt: Python List append()
---

The `append()` method is one of the most frequently used list methods in Python. It allows you to add a single element to the end of an existing list, modifying the list in place. Whether you are building a list dynamically from user input, collecting results in a loop, or simply growing a dataset one item at a time, `append()` is your go-to tool.

## Syntax of append()

```python
list.append(element)
```

The method is called directly on the list object, and the element you want to add is passed as the argument inside the parentheses.

## append() Parameters

The `append()` method takes exactly one parameter:

* **element** - An element of any data type (integer, float, string, boolean, tuple, set, dictionary, or even another list) to be added at the end of the list.

Unlike `extend()`, which adds each item of an iterable individually, `append()` adds the entire object as a single element. This distinction is important and will be demonstrated in the examples below.

## Return Value

The `append()` method does **not** return any value. It returns `None`. The modification happens directly on the original list.

---

## Examples of Python List append()

### Example 1: Adding a string to a list

```python
my_cars = ["AUDI", "BMW", "FORD"]

# Print original list
print("Before append:", my_cars)

# Adding "TATA" to the cars list
my_cars.append("TATA")

# Print updated list
print("After append:", my_cars)
```

Output:

```python
Before append: [‘AUDI’, ‘BMW’, ‘FORD’]
After append: [‘AUDI’, ‘BMW’, ‘FORD’, ‘TATA’]
```

The string `"TATA"` is added as the last element of the list.

---

### Example 2: Adding an integer to a list

```python
scores = [85, 90, 78]

scores.append(95)

print(scores)
```

Output:

```python
[85, 90, 78, 95]
```

---

### Example 3: Adding a dictionary to a list

```python
my_cars = ["AUDI", "BMW", "FORD"]

new_car = {"TATA": 31}

print("Before:", my_cars)

my_cars.append(new_car)

print("After:", my_cars)
```

Output:

```python
Before: [‘AUDI’, ‘BMW’, ‘FORD’]
After: [‘AUDI’, ‘BMW’, ‘FORD’, {‘TATA’: 31}]
```

The entire dictionary is added as a single element at the end of the list.

---

### Example 4: Appending a list inside a list (nested list)

```python
matrix = [[1, 2], [3, 4]]

matrix.append([5, 6])

print(matrix)
```

Output:

```python
[[1, 2], [3, 4], [5, 6]]
```

When you append a list, it becomes a nested element — not individual items. This is different from `extend()`, which would add `5` and `6` as separate elements.

---

### Example 5: Using append() in a loop

A very common pattern is building a list by appending items one by one inside a loop.

```python
squares = []

for i in range(1, 6):
    squares.append(i ** 2)

print(squares)
```

Output:

```python
[1, 4, 9, 16, 25]
```

This is a fundamental technique for collecting computed values dynamically.

---

### Example 6: Appending user input

```python
names = []

for _ in range(3):
    name = input("Enter a name: ")
    names.append(name)

print("Names collected:", names)
```

This pattern is useful in interactive programs where you collect data one item at a time.

---

## Real-World Use Cases

### Building a task list

```python
tasks = []

tasks.append("Write report")
tasks.append("Send email")
tasks.append("Attend meeting")

for task in tasks:
    print("-", task)
```

Output:

```
- Write report
- Send email
- Attend meeting
```

### Collecting filtered results

```python
numbers = [3, 7, 2, 9, 4, 11, 6]
even_numbers = []

for num in numbers:
    if num % 2 == 0:
        even_numbers.append(num)

print("Even numbers:", even_numbers)
```

Output:

```python
Even numbers: [2, 4, 6]
```

### Logging events

```python
event_log = []

def log_event(event):
    event_log.append(event)

log_event("User logged in")
log_event("File uploaded")
log_event("User logged out")

print(event_log)
```

Output:

```python
[‘User logged in’, ‘File uploaded’, ‘User logged out’]
```

---

## Common Mistakes with append()

### Mistake 1: Using append() when you want extend()

```python
list1 = [1, 2, 3]
list2 = [4, 5, 6]

list1.append(list2)
print(list1)  # [1, 2, 3, [4, 5, 6]]  — nested, not merged
```

If you want to merge the two lists so all elements are at the same level, use `extend()` instead:

```python
list1 = [1, 2, 3]
list2 = [4, 5, 6]

list1.extend(list2)
print(list1)  # [1, 2, 3, 4, 5, 6]
```

### Mistake 2: Assigning the return value

```python
my_list = [1, 2, 3]
result = my_list.append(4)
print(result)  # None
```

`append()` returns `None`. Do not assign its return value — call it as a standalone statement and then read the list directly.

### Mistake 3: Overusing append() when a comprehension is cleaner

```python
# Verbose
squares = []
for i in range(5):
    squares.append(i ** 2)

# Cleaner
squares = [i ** 2 for i in range(5)]
```

Use `append()` when the logic inside the loop is complex or when you need conditional control flow.

---

## append() vs extend() vs insert()

| Method | What it does |
|--------|-------------|
| `append(x)` | Adds `x` as a single element at the end |
| `extend(iterable)` | Adds each item from `iterable` at the end |
| `insert(i, x)` | Adds `x` at index `i` |

---

## Tips for Using append() Effectively

- **append() is O(1) amortized**: Python lists are implemented as dynamic arrays, so appending is generally very fast.
- **Chaining is not possible**: Since `append()` returns `None`, you cannot chain calls like `my_list.append(1).append(2)`. Call it separately each time.
- **Use extend() for merging**: When you need to add all items from another iterable, prefer `extend()` for clarity and correctness.

---

## FAQ

**Q: Can I append multiple elements at once with append()?**
A: No. `append()` only adds one element at a time. To add multiple elements at once, use `extend()` or the `+=` operator with a list.

**Q: Does append() create a new list?**
A: No. It modifies the existing list in place. The original list object is updated directly.

**Q: What happens if I append `None` to a list?**
A: `None` is a valid Python object and will be added to the list just like any other value. For example, `[1, 2].append(None)` results in `[1, 2, None]`.

**Q: Is append() faster than insert()?**
A: Yes. `append()` adds to the end in O(1) amortized time, while `insert()` at an arbitrary index takes O(n) time because elements need to shift.

**Q: Can I append to a list that is a value inside a dictionary?**
A: Yes. As long as the dictionary value is a list, you can call `append()` on it directly: `d["key"].append("new_item")`.

---

## Rules of list append()

* The `append()` method does not return any value (returns `None`).
* It adds the element as a single item at the end of the list.
* It can accept any data type: integer, float, string, set, list, dictionary, tuple, and more.
* It modifies the original list in place — it does not create a new list.