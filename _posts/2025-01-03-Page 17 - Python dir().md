---
title: Python dir() Method
description: In this tutorial we will learn about the python dir() method and its uses.
date: 2025-01-03 22:15:55 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python dir() Method.webp
  alt: Python dir() Method
---

The Python `dir()` function is a built-in that returns a list of names in the current scope or a list of valid attributes and methods of any given object. It takes a single optional parameter, which can be any Python object such as a module, class, instance, or built-in type. When called without arguments, it returns the names defined in the current local scope. When called with an object, it attempts to return a comprehensive list of that object's attributes, including inherited ones. The return value is always a sorted list of strings.

A common real-world use case is interactive debugging and exploration in the Python REPL, where developers call `dir()` on unfamiliar objects or modules to discover available methods and properties without consulting external documentation. Whether you are exploring a third-party library, introspecting a plugin system, or building an auto-completion engine, `dir()` is one of the most useful introspection tools Python provides. This guide explains everything you need to know about `dir()` — its syntax, parameters, multiple examples, edge cases, real-world applications, and frequently asked questions.

---

## What does dir() return?

The `dir()` function returns a **sorted list of strings** representing the names of attributes, methods, and other identifiers available on the given object or in the current scope. For most objects this includes dunder (double-underscore) methods such as `__init__` and `__repr__`, inherited attributes from parent classes, and all user-defined or built-in methods.

---

## When should you use dir()?

Use `dir()` when you need to explore the interface of an object at runtime — during interactive debugging, building introspection tools, or writing code that dynamically discovers available methods on plugin objects. It is especially helpful in the following scenarios:

- Quickly checking what methods a string, list, or custom object exposes.
- Verifying that a class correctly inherits or overrides attributes.
- Building tab-completion features in custom REPLs or CLI tools.
- Writing generic serializers or descriptors that enumerate all public attributes dynamically.

---

## Syntax of dir()

The dir() function returns a list of valid attributes of the specific object.

```python
dir([object])
```

### Python dir() Method Parameters

`dir()` takes only a single parameter:

| Parameter | Description |
|-----------|-------------|
| `object`  | Optional. Any Python object — a module, class, instance, string, list, dictionary, or any other type. If omitted, `dir()` returns the names in the current local scope. |

### Return Value

A **sorted list of strings**. The exact contents depend on the object:

- For a **module**, it lists the module's attributes and imported names.
- For a **class**, it lists the class's attributes and those of its base classes.
- For an **instance**, it lists the instance's attributes and all class attributes accessible through it.
- With **no argument**, it lists all names defined in the current local namespace.

---

## Example 1: How dir() works with a list

Calling `dir()` on a list reveals all the methods you can call on it, from common ones like `append` and `sort` to dunder methods like `__iter__` and `__len__`.

```python
number = [5, 6, 7]
print(dir(number))
```

Output:

```
['__add__', '__class__', '__contains__', '__delattr__', '__delitem__',
 '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__',
 '__getitem__', '__gt__', '__hash__', '__iadd__', '__imul__', '__init__',
 '__init_subclass__', '__iter__', '__le__', '__len__', '__lt__', '__mul__',
 '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__',
 '__reversed__', '__rmul__', '__setattr__', '__setitem__', '__sizeof__',
 '__str__', '__subclasshook__', 'append', 'clear', 'copy', 'count',
 'extend', 'index', 'insert', 'pop', 'remove', 'reverse', 'sort']
```

This output shows every operation a Python list supports, including the special dunder methods that power operators like `+` (`__add__`), iteration (`__iter__`), and length (`__len__`).

---

## Example 2: How to use dir() on User-defined Objects

You can customize what `dir()` returns for your own classes by implementing the `__dir__()` dunder method. When Python calls `dir()` on an instance, it checks for `__dir__()` first and uses that list if present.

```python
class Dog:
    def __dir__(self):
        return ['age', 'color', 'breed']

dogType = Dog()
print(dir(dogType))
```

Output:

```
['age', 'breed', 'color']
```

Notice that the output is sorted alphabetically even though the list returned by `__dir__()` was not. Python always sorts the final result of `dir()`.

---

## Example 3: Using dir() with no argument (current scope)

When `dir()` is called with no argument inside a function or at the module level, it returns all names available in the current local namespace.

```python
x = 10
greeting = "hello"
numbers = [1, 2, 3]

print(dir())
```

Output (includes your defined names among built-in scope names):

```
['__annotations__', '__builtins__', '__doc__', '__loader__', '__name__',
 '__package__', '__spec__', 'greeting', 'numbers', 'x']
```

This is useful for debugging namespace pollution — checking whether a variable you expect to exist is actually in scope, or whether an import has added unexpected names.

---

## Example 4: Filtering dir() output to find public methods

In practice, you often want only the public methods of an object (excluding dunder methods). A simple list comprehension handles this:

```python
import os

public_methods = [name for name in dir(os) if not name.startswith('_')]
print(public_methods[:10])  # First 10 public names
```

This technique is commonly used when building documentation generators, test harnesses, or plugin systems that need to discover callable entry points on an object.

---

## Example 5: Inspecting class inheritance with dir()

`dir()` includes inherited attributes, making it useful for understanding class hierarchies.

```python
class Animal:
    def breathe(self):
        pass

    def eat(self):
        pass

class Dog(Animal):
    def bark(self):
        pass

print([m for m in dir(Dog) if not m.startswith('_')])
```

Output:

```
['bark', 'breathe', 'eat']
```

`bark` is defined on `Dog`, while `breathe` and `eat` are inherited from `Animal`. `dir()` includes all of them.

---

## Real-World Use Cases

### Interactive exploration in the REPL

When working with an unfamiliar library, `dir(some_object)` gives you an instant list of everything you can do with it. This is faster than searching documentation and works even for dynamically generated objects.

### Building auto-completion features

Command-line tools and custom shells use `dir()` under the hood to generate tab-completion candidates. When a user types `obj.` and presses Tab, the completion engine calls `dir(obj)` and presents the filtered results.

### Writing generic serializers

A serializer that converts arbitrary objects to dictionaries can use `dir()` combined with `getattr()` to enumerate all non-callable, non-private attributes:

```python
def to_dict(obj):
    return {
        key: getattr(obj, key)
        for key in dir(obj)
        if not key.startswith('_') and not callable(getattr(obj, key))
    }
```

### Plugin discovery

Frameworks that load plugins at runtime use `dir()` to discover handler methods on plugin classes, then register them automatically without requiring explicit registration calls.

---

## Edge Cases and Pitfalls

**1. `dir()` is not exhaustive for all objects.**
For objects without a `__dict__` and without a `__dir__()` method, Python falls back to type information, which may not include all attributes. The result may be incomplete for exotic types implemented in C extensions.

**2. The list is sorted, but attribute existence is not guaranteed.**
`dir()` can list names that exist on the type but are not accessible on the specific instance. Always use `hasattr()` before calling `getattr()` to avoid `AttributeError`.

**3. Custom `__dir__()` can return anything.**
If a class implements `__dir__()` and returns misleading names, `dir()` will faithfully report them even if accessing those names raises `AttributeError`. Be cautious when using `dir()` output for automated attribute access.

**4. Module `__all__` is not respected.**
`dir()` on a module ignores `__all__`. It shows all names including those not intended for public use. To respect the public API, check `__all__` directly: `module.__all__`.

---

## Rules of dir() function

- `dir()` tries to return a list of valid attributes of the object.
- If the object has a `__dir__()` method, that method is called and its return value is used (after sorting).
- If the object does not have a `__dir__()` method, Python tries to find information from the `__dict__` attribute and the type object. The list may not be complete in this case.
- If no object is passed, `dir()` returns the list of names in the current local scope.
- The returned list is always sorted alphabetically.

---

## Tips and Best Practices

- **Filter out dunders** with `[x for x in dir(obj) if not x.startswith('_')]` to get a clean list of public attributes.
- **Combine with `callable()`** to list only methods: `[x for x in dir(obj) if callable(getattr(obj, x))]`.
- **Use `help()` after `dir()`**: Once you spot an interesting attribute name, call `help(obj.method_name)` to read its docstring.
- **Do not rely on `dir()` for security checks.** A malicious class can implement `__dir__()` to hide attributes. Always use dedicated security mechanisms for access control.
- **Use `vars(obj)` for instance attributes only**: `vars(obj)` returns only `obj.__dict__`, which contains instance-level attributes set on that specific object, without inherited class attributes.

---

## Frequently Asked Questions

**Q1: What is the difference between `dir()` and `vars()`?**
`dir()` returns a comprehensive sorted list of all accessible names on an object, including inherited attributes from parent classes and type-level attributes. `vars()` returns only the `__dict__` of the object — the dictionary of instance or module attributes that were explicitly set. `vars()` gives you less information but more precisely shows what attributes a specific instance or module owns directly.

**Q2: Why does dir() show dunder methods like `__add__` and `__str__`?**
Dunder methods are special methods that Python uses to implement operators and built-in functions. For example, `__add__` enables the `+` operator, and `__str__` is called by `str()` and `print()`. `dir()` includes them because they are valid attributes of the object. Understanding which dunder methods an object implements tells you which operators and protocols it supports.

**Q3: Can I use dir() to check if a method exists before calling it?**
You can, but it is not the recommended approach. Checking `'method_name' in dir(obj)` is slower and less reliable than using `hasattr(obj, 'method_name')`, which directly tests attribute existence and handles edge cases more correctly. Use `hasattr()` for existence checks and reserve `dir()` for exploration and introspection.

---

Related built-in functions include the [Python getattr() method](/posts/Page-26-Python-getattr()/) for accessing discovered attributes by name and the [Python hasattr() method](/posts/Page-28-Python-hasattr()/) for checking if a specific attribute exists.