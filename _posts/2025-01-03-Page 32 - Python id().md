---
title: Python id() Method
description: In this tutorial, we will learn about python id() method and its uses with examples.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python id() Method.webp
  alt: Python id() Method
---

The Python `id()` function is a built-in that returns the unique identity of an object as an integer. It takes a single required parameter — any Python object — and returns an `int` that is guaranteed to be unique and constant for that object during its lifetime. In the CPython implementation, this integer corresponds to the object's memory address. The `id()` function is essential for understanding how Python manages objects internally, particularly when dealing with mutable versus immutable types and variable aliasing.

Understanding `id()` is a gateway to understanding Python's object model at a deeper level. Every time you create a variable in Python, you are not storing a value directly; you are creating a reference to an object that lives somewhere in memory. The `id()` function exposes that memory location in a human-readable form. This knowledge is invaluable when debugging subtle bugs related to mutable default arguments, shared references across function calls, and Python's own caching mechanisms.

## What is the Python id() Method?

The `id()` method in Python returns the unique identity number of an object. Every object in Python has a unique integer identity that is assigned at the time of its creation. This identity remains constant throughout the object's lifetime — from the moment it is created until it is garbage collected.

In CPython (the standard Python interpreter), the identity is simply the memory address of the object. However, in other implementations like PyPy or Jython, the identity may be implemented differently, though it will still be a unique integer. This distinction matters when writing portable Python code that relies on `id()` behavior.

## Syntax

```python
id(object)
```

The syntax is intentionally minimal. There is no optional argument, no keyword argument — just a single positional argument.

## Python id() Method Parameters

The `id()` method accepts exactly one parameter:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `object` | Any Python object | Yes | The object whose identity you want to retrieve. This can be a variable, a literal, a class instance, a function, a module, or any other Python object. |

The function always returns an integer (`int`). The integer is guaranteed to be unique among all currently existing objects. Two objects that exist at the same time will never share the same `id`. However, once an object is destroyed, a new object may be assigned the same id (the memory address is reused).

## Example 1: Using id() with Basic Data Types

The most straightforward use is to check the identity of basic literals and primitive values.

```python
print("id of integer 4 is:", id(4))
print("id of float 67.5 is:", id(67.5))
print("id of single string 'python' is:", id("python"))
print("id of boolean True is:", id(True))
print("id of None is:", id(None))
```

Output (values vary by system and session):

```
id of integer 4 is: 9784992
id of float 67.5 is: 140008364368112
id of single string 'python' is: 140008382164528
id of boolean True is: 9480528
id of None is: 9480688
```

Notice that `None`, `True`, and `False` always return the same `id` within the same Python session. These are singleton objects — Python creates exactly one instance of each and reuses it everywhere.

## Example 2: Using id() with Variables

An id is automatically assigned to a variable whenever it is declared. When you assign one variable to another, both variables point to the same object and therefore share the same `id`.

```python
a = 87
print("id of a is:", id(a))

b = 9.7
print("id of b is:", id(b))

c = [1, 2, 3]
print("id of c is:", id(c))

d = {'a': 1, 'b': 2, 'c': 3}
print("id of d is:", id(d))

# Aliasing: x and y point to the same list object
x = [10, 20, 30]
y = x
print("id of x:", id(x))
print("id of y:", id(y))
print("x and y are the same object:", id(x) == id(y))
```

Output:

```
id of a is: 9787648
id of b is: 140209765336528
id of c is: 140209756669504
id of d is: 140209765321152
id of x: 140209756670912
id of y: 140209756670912
x and y are the same object: True
```

The last two lines illustrate aliasing: `x` and `y` hold the same id, meaning any mutation through `y` also affects `x`. This is a common source of bugs in Python programs for beginners and experienced developers alike.

## Example 3: Using id() with Classes and Functions

In Python, even classes and functions are first-class objects with their own unique identity numbers.

```python
class Dog:
    age = 6
    color = "Black"

dog1 = Dog()
dog2 = Dog()
print("The id of dog1 instance:", id(dog1))
print("The id of dog2 instance:", id(dog2))
print("Are dog1 and dog2 the same object?", id(dog1) == id(dog2))

def greet(name):
    return f"Hello, {name}!"

print("The id of greet function:", id(greet))

# A function object's id remains constant
ref_to_greet = greet
print("Same function object?", id(greet) == id(ref_to_greet))
```

Output:

```
The id of dog1 instance: 139715062134816
The id of dog2 instance: 139715062134960
Are dog1 and dog2 the same object? False
The id of greet function: 140209765410240
Same function object? True
```

Even though `dog1` and `dog2` are both instances of `Dog` and have identical attribute values, they are distinct objects with different ids. The function `greet` and `ref_to_greet` share the same id because `ref_to_greet` is just another name (alias) for the same function object.

## Real-World Use Cases

### 1. Debugging Mutable Default Arguments

One of the most notorious Python gotchas involves mutable default arguments:

```python
def add_item(item, my_list=[]):
    my_list.append(item)
    print(f"List id: {id(my_list)}, Contents: {my_list}")
    return my_list

add_item("apple")
add_item("banana")
add_item("cherry")
```

Output:

```
List id: 140209756670912, Contents: ['apple']
List id: 140209756670912, Contents: ['apple', 'banana']
List id: 140209756670912, Contents: ['apple', 'banana', 'cherry']
```

The same `id` on every call reveals that all three calls are sharing the same list object. This is why mutable default arguments should be avoided. Using `id()` here makes the problem immediately visible.

### 2. Understanding Python's Integer Interning

Python internally caches small integers (typically -5 to 256) as a performance optimization. You can verify this with `id()`:

```python
a = 100
b = 100
print("id(a):", id(a))
print("id(b):", id(b))
print("Same object?", a is b)  # True — interned

x = 1000
y = 1000
print("id(x):", id(x))
print("id(y):", id(y))
print("Same object?", x is y)  # False — not interned (may vary)
```

This demonstration is very useful in teaching environments to explain why `is` comparisons with integers can be unreliable outside the interned range.

### 3. Verifying In-Place vs. Replacement Operations

```python
numbers = [3, 1, 4, 1, 5]
print("Before sort, id:", id(numbers))

numbers.sort()  # In-place sort
print("After sort(), id:", id(numbers))

numbers = sorted(numbers)  # Returns a new list
print("After sorted(), id:", id(numbers))
```

Output:

```
Before sort, id: 140209756670912
After sort(), id: 140209756670912
After sorted(), id: 140209756671040
```

`list.sort()` modifies the list in place (same id), while `sorted()` creates a brand-new list (different id). This pattern is extremely useful when auditing performance-sensitive code.

## Edge Cases and Gotchas

**Reuse of ids after garbage collection:** Once an object is deleted or goes out of scope, its id may be reused by a new object. Never store `id()` values across object lifetimes and expect them to remain meaningful.

```python
a = [1, 2, 3]
old_id = id(a)
del a
b = [4, 5, 6]
print(id(b) == old_id)  # Could be True — same memory address reused
```

**String interning:** Like integers, Python also interns short strings, especially identifiers. Two string variables holding the same short string literal may share the same id without any explicit assignment.

**`id()` vs `==`:** The `id()` function checks identity (same object in memory), not equality (same value). Two different objects can be equal (`==`) without sharing the same `id`.

```python
list1 = [1, 2, 3]
list2 = [1, 2, 3]
print(list1 == list2)          # True — same value
print(id(list1) == id(list2))  # False — different objects
print(list1 is list2)          # False — not the same object
```

## Comparison with Related Functions and Operators

| Tool | Purpose | Example |
|------|---------|---------|
| `id(obj)` | Returns the unique integer identity of an object | `id(x)` returns `140209...` |
| `is` operator | Tests whether two references point to the same object | `x is y` returns `True/False` |
| `==` operator | Tests whether two objects have equal values | `x == y` returns `True/False` |
| `type(obj)` | Returns the type/class of an object | `type(x)` returns `<class 'list'>` |
| `isinstance(obj, cls)` | Tests whether an object is an instance of a class | `isinstance(x, list)` returns `True` |

The `is` operator is internally equivalent to `id(x) == id(y)`, but is more idiomatic and readable. The `id()` function gives you the raw integer, which is useful for logging, debugging output, or custom caching implementations.

To check the type of an object rather than its identity, see the [Python type() function](/posts/Page-66-Python-type/). If you need to test whether two variables point to the same object, the `is` operator is the idiomatic approach, but [Python isinstance()](/posts/Page-35-Python-isinstance/) is better for type checking.

## Rules of id() Method

- `id()` always returns a unique integer number for the given object.
- The unique number remains constant during the object's lifetime, once assigned.
- In CPython, the returned integer is the object's memory address.
- Two live objects will never have the same `id` at the same point in time.
- After an object is destroyed, its `id` may be recycled for a new object.
- `id()` works on any Python object: integers, floats, strings, lists, dicts, functions, classes, modules, and more.

## FAQ

**Q1: Is `id()` the same as a memory address?**

In CPython (the most common Python interpreter), yes — `id()` returns the memory address of the object. However, this is an implementation detail, not a language guarantee. In other Python implementations such as PyPy or IronPython, `id()` returns a unique integer but it may not correspond to an actual memory address. You should rely on `id()` for identity comparison, not for memory management.

**Q2: Can two different objects ever have the same id at the same time?**

No. Python guarantees that two objects that exist simultaneously will always have different ids. However, if an object is garbage collected and a new object is created afterward, the new object may receive the same id as the deleted one, because the underlying memory address is being reused. This is why storing and comparing ids across different points in time can produce misleading results.

**Q3: Why does `id(300) == id(300)` sometimes return `True` and sometimes `False`?**

This behavior depends on Python's optimization and the context in which the expression is evaluated. When executed as a single expression in the interactive interpreter or in a script, CPython may optimize by reusing the same object for both `300` literals, giving them the same id. But when executed in separate statements, two distinct objects may be created. For reliable identity checking, always assign to variables first and compare the variables using `is`.
