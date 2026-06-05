---
title: Python staticmethod()
description: The staticmethod() is a built-in python function that returns a static method of a given function.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python staticmethod().webp
  alt: Python staticmethod()
---

The Python `staticmethod()` function is a built-in function that transforms a regular function defined inside a class into a static method. It takes a single parameter: the function to be converted. A static method does not receive an implicit first argument (neither `self` for instances nor `cls` for the class), which means it behaves like a plain function that happens to live inside a class's namespace. The function returns a static method object. In modern Python, the preferred approach is to use the `@staticmethod` decorator instead of calling `staticmethod()` directly. Static methods are useful for grouping utility functions that are logically related to a class but do not need access to instance or class state. A real-world example is a `MathHelper` class containing methods like `is_prime()` or `celsius_to_fahrenheit()` that perform calculations without depending on any object data. Compare this with [classmethod()](/posts/Python-classmethod()/), which receives the class as its first argument.

## What does staticmethod() return?

The `staticmethod()` function returns a static method object that wraps the given function, allowing it to be called on the class without instantiation and without receiving any implicit arguments.

## When should you use staticmethod()?

Use `staticmethod()` (or the `@staticmethod` decorator) when you have a utility function that belongs logically inside a class but does not need access to the instance (`self`) or the class (`cls`).

The syntax of staticmethod() is:

```python
staticmethod(function)

```

## staticmethod() Parameters


The staticmethod() takes only one argument as parameters:

* function \- Name of the function that needs to be converted to a sciatic method.

Lets check an example of staticmethod() in python

### Example 1: How to use the staticmethod() function in python ?

```python
class Mathematics:

    def addNumbers(x, y):
        return x + y

# create addNumbers static method
Mathematics.addNumbers = staticmethod(Mathematics.addNumbers)

print('The sum is:', Mathematics.addNumbers(5, 10))

```


Output:

```python
The sum is: 15

```

## Common Use Cases

A common use case for `staticmethod()` is defining validation or conversion helpers inside a class, such as a `User.is_valid_email(email)` method that checks email format without needing any user instance data. Another practical scenario is grouping related mathematical or string utility functions under a class namespace for better code organization. It is also useful in factory patterns where a static method serves as an alternative constructor that does not need class-level configuration, distinguishing it from a [classmethod()](/posts/Python-classmethod()/) which would receive the class itself.

## What is a static method?
---

## More Examples

### Defining a static method

```python
class MathUtils:
    @staticmethod
    def add(a, b):
        return a + b

print(MathUtils.add(3, 4))   # 7 — no instance needed
```

A static method belongs to the class namespace but does not receive `self` or `cls`. It behaves like a plain function grouped logically inside a class.

### staticmethod vs classmethod vs instance method

```python
class Demo:
    def instance_method(self):     # receives the instance
        return self
    @classmethod
    def class_method(cls):         # receives the class
        return cls
    @staticmethod
    def static_method():           # receives nothing
        return "independent"
```

Use a static method when the logic is related to the class conceptually but does not need access to instance or class state.

## Real-World Use Cases

- **Utility/helper functions** — validators or formatters grouped under a relevant class.
- **Factory helpers** — small computations used by constructors.
- **Namespacing** — keeping related functions together without polluting the module namespace.

## Common Mistakes

- **Adding `self` by habit** — a static method takes no implicit first argument.
- **Using a static method when you need class data** — use `@classmethod` instead so you receive `cls`.
- **Forgetting the decorator** — without `@staticmethod`, calling `Class.method()` on an instance passes `self` unexpectedly.

## FAQ

**Q: When should I use a static method instead of a module-level function?**
When the function is logically tied to a class and you want to call it as `Class.method()`, improving discoverability and organisation.

**Q: Can a static method access class attributes?**
Not implicitly — it has no `cls`. You would have to reference the class by name, which usually means a `@classmethod` is the better choice.

## Conclusion

`staticmethod()` (used via the `@staticmethod` decorator) defines a method that lives inside a class but receives neither the instance nor the class. It is the right tool for utility logic that belongs conceptually with a class yet does not depend on its state. Choosing correctly between static methods, class methods, and instance methods makes your object-oriented code clearer and more maintainable.
