---
title: Python Set add() Method 
description: In this tutorial, we will understand about the python set add() method and its uses.
date: 2025-01-24 22:02:00 +0800
categories: [Python Set Reference]
tags: [Python Set Reference]
image:
  path: /commons/Python Set add() Method.png
  alt: Python Set add() Method 

---

The Python set add() method is used to add a single element to an existing set. Since sets only store unique elements, if the element already exists in the set, the add() method has no effect. The add() method modifies the set in place and doesn't return any value.

The syntax of the add() method is:

```python
set.add(element)
```

## Python set add() Parameters

The add() method takes a single required parameter:

* **element:** The item to be added to the set. This can be any immutable type such as numbers, strings, or tuples. Lists and dictionaries cannot be added to sets as they are mutable.

Sets in Python are unordered collections, which means the position of the new element in the set is not guaranteed or predictable.

Let's explore some examples to understand how the add() method works:

```python
# Example 1: Adding a new element
numbers = {1, 2, 3}
numbers.add(4)
print(numbers)  # Output: {1, 2, 3, 4}

# Example 2: Adding a duplicate element
fruits = {'apple', 'banana'}
fruits.add('apple')
print(fruits)  # Output: {'apple', 'banana'}

# Example 3: Adding different types
mixed_set = {1, 'hello'}
mixed_set.add((2, 3))  # Adding a tuple
print(mixed_set)  # Output: {1, 'hello', (2, 3)}
```

If you try to add a mutable object like a list, Python will raise a TypeError:

```python
my_set = {1, 2, 3}
my_set.add([4, 5])  # TypeError: unhashable type: 'list'
```