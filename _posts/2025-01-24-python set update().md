---
title: Python Set update() Method 
description: In this tutorial, we will understand about the python set update() method and its uses.
date: 2025-01-24 22:02:00 +0800
categories: [Python Set Reference]
tags: [Python Set Reference]
image:
  path: /commons/Python Set update() Method.png
  alt: Python Set update() Method 

---

The Python set update() method adds elements from another set (or any iterable) to the original set. It can also be written using the |= operator.

The syntax of the update() method is:

```python
set.update(iterable)
# or
set1 |= set2
```

## Python set update() Parameters

The update() method takes one parameter:

* **iterable:** Another set or any iterable whose elements will be added to the original set.

Here are examples demonstrating the update() method:

```python
# Example 1: Basic update
set1 = {1, 2, 3}
set2 = {3, 4, 5}
set1.update(set2)
print(set1)  # Output: {1, 2, 3, 4, 5}

# Example 2: Using operator syntax
numbers = {1, 2, 3}
numbers |= {4, 5}
print(numbers)  # Output: {1, 2, 3, 4, 5}

# Example 3: Update with different iterables
my_set = {1, 2, 3}
my_list = [3, 4]
my_tuple = (5, 6)
my_set.update(my_list, my_tuple)
print(my_set)  # Output: {1, 2, 3, 4, 5, 6}
```

The update() method modifies the original set in place, adding all unique elements.