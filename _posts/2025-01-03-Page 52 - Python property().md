---
title: Python property()
description: The property() is a built-in python function that is used to define specific properties in the python class.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python property().webp
  alt: Python property()
---

The Python `property()` built-in function creates and returns a property object that manages attribute access on a class. It accepts up to four optional parameters: `fget` (a function for getting the attribute), `fset` (a function for setting it), `fdel` (a function for deleting it), and `doc` (a docstring for the property). The function returns a property descriptor that intercepts attribute access, enabling you to define getter, setter, and deleter logic while maintaining a clean attribute-style syntax for class users. This is a cornerstone of Python's object-oriented design, allowing classes to enforce validation rules, compute derived values on the fly, trigger side effects on attribute changes, and maintain backward compatibility when refactoring public attributes into managed properties. In modern Python, `property()` is most commonly used as a decorator (`@property`), but the function form remains useful when building properties programmatically or when getter, setter, and deleter functions are defined separately.

## What does property() return?

The `property()` function returns a property attribute object that delegates attribute access to the specified getter, setter, and deleter functions, enabling managed attribute behavior on class instances.

## When should you use property()?

Use `property()` when you want to add validation, computation, or side effects to attribute access on a class while preserving a simple `obj.attribute` syntax for callers, or when you need to refactor a plain attribute into a managed property without breaking existing code.

## Syntax of property()

```python
property(fget=None, fset=None, fdel=None, doc=None)
```

## property() Parameters

The `property()` function takes up to four optional parameters:

- **fget** (optional) — A function called when the attribute is read. Defaults to `None`.
- **fset** (optional) — A function called when the attribute is assigned a new value. Defaults to `None`.
- **fdel** (optional) — A function called when the attribute is deleted with `del`. Defaults to `None`.
- **doc** (optional) — A docstring describing the property. If omitted, the docstring of `fget` is used automatically.

## Example 1: Using property() the traditional function form

The most explicit way to use `property()` is to define separate getter, setter, and deleter methods and then combine them using the function call directly inside the class body.

```python
# Python program to explain property() function

class Alphabet:
    def __init__(self, value):
        self._value = value

    # getting the values
    def getValue(self):
        print('Getting value')
        return self._value

    # setting the values
    def setValue(self, value):
        print('Setting value to ' + value)
        self._value = value

    # deleting the values
    def delValue(self):
        print('Deleting value')
        del self._value

    value = property(getValue, setValue, delValue)

# passing the value
x = Alphabet('PythonScholar')
print(x.value)

x.value = 'Python'

del x.value
```

**Output:**

```
Getting value
PythonScholar
Setting value to Python
Deleting value
```

Every time `x.value` is read, `getValue` is called. Every time a new value is assigned, `setValue` intercepts it. When `del x.value` is executed, `delValue` cleans up the underlying `_value` attribute.

## Example 2: Using property() as a decorator (@property)

The decorator syntax is the most Pythonic and widely used approach. The `@property` decorator turns a method into a getter, `@attribute.setter` registers the setter, and `@attribute.deleter` registers the deleter.

```python
class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius

    @property
    def celsius(self):
        """Get the temperature in Celsius."""
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Temperature cannot be below absolute zero (-273.15 C).")
        self._celsius = value

    @property
    def fahrenheit(self):
        """Derived read-only property: converts Celsius to Fahrenheit."""
        return self._celsius * 9 / 5 + 32


temp = Temperature(25)
print(temp.celsius)      # 25
print(temp.fahrenheit)   # 77.0

temp.celsius = 100
print(temp.fahrenheit)   # 212.0

# This will raise a ValueError
try:
    temp.celsius = -300
except ValueError as e:
    print(e)
```

**Output:**

```
25
77.0
212.0
Temperature cannot be below absolute zero (-273.15 C).
```

The `fahrenheit` property is read-only because no setter is defined for it. Any attempt to assign `temp.fahrenheit = 90` will raise an `AttributeError`.

## Example 3: Validation with property() in a data model

A very common real-world pattern is using `property()` to validate user input before storing it in the object's internal state.

```python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance  # triggers the setter

    @property
    def balance(self):
        return self._balance

    @balance.setter
    def balance(self, amount):
        if not isinstance(amount, (int, float)):
            raise TypeError("Balance must be a numeric value.")
        if amount < 0:
            raise ValueError("Balance cannot be negative.")
        self._balance = round(amount, 2)

    def deposit(self, amount):
        self.balance += amount  # setter is called here too

    def __repr__(self):
        return f"BankAccount(owner={self.owner!r}, balance={self.balance})"


account = BankAccount("Alice", 1000)
account.deposit(250.50)
print(account)          # BankAccount(owner='Alice', balance=1250.5)

try:
    account.balance = -50
except ValueError as e:
    print(e)            # Balance cannot be negative.
```

The setter is invoked not just during direct assignment but also inside `deposit()`, because `self.balance += amount` is syntactic sugar for `self.balance = self.balance + amount`.

## Real-World Use Cases

**Data validation models** — Classes that represent entities like users, products, or financial records benefit greatly from property setters that enforce type and range constraints, removing the need for external validation utilities.

**Computed or cached attributes** — A `Circle` class might expose a `diameter` property that always equals `2 * self.radius`, or a `FullName` property on a `Person` class that concatenates first and last names. There is no need to store these values separately; they are always derived on demand.

**Backward-compatible refactoring** — If you have a class with a plain public attribute and you later need to add logging, unit conversion, or access control, wrapping it in a `property()` preserves the existing interface for all callers while adding new behaviour transparently.

**ORM-style descriptors** — Web frameworks and database libraries often use `property()`-based descriptors to map class attributes to database columns, REST fields, or configuration keys. Django model fields and SQLAlchemy mapped columns both rely on descriptor protocols that `property()` is a direct expression of.

**Lazy initialization** — A property getter can compute and cache an expensive value the first time it is accessed, storing the result in the instance dictionary for subsequent reads without re-computing it every time.

## Edge Cases and Gotchas

**Forgetting to use a private backing attribute** — If you name the property `name` and the backing attribute also `name` (instead of `_name`), the setter will call itself recursively and raise a `RecursionError`. Always prefix the internal attribute with an underscore.

**Read-only properties** — Defining only a getter makes the property read-only. Attempting to set it raises `AttributeError: can't set attribute`. This is intentional and useful for exposing computed values that should not be modified directly.

**Class-level access** — Accessing a property on the class itself (for example `Temperature.celsius`) returns the property object, not a value. To inspect the docstring, use `Temperature.celsius.__doc__` or `help(Temperature.celsius)`.

**Inheritance** — Properties defined in a parent class are inherited by subclasses. If a subclass needs to override only the setter while keeping the parent's getter, it must re-declare the property using the parent's getter explicitly: `celsius = ParentClass.celsius.setter(new_setter)`.

**`__slots__` and properties** — When a class uses `__slots__`, properties still work correctly because they are class-level descriptors, not instance attributes. However, you cannot use a slot name that conflicts with a property name.

## Tips for Using property() Effectively

- Always name the backing store with a leading underscore (for example `_value`) to signal that it is private and should not be accessed directly.
- Use `@property` for read-only computed attributes instead of zero-argument methods to keep the interface clean and consistent.
- Provide a meaningful `doc` string (or docstring on the getter) so that `help()` displays useful information about the property.
- Avoid placing heavy computation inside getters that are called frequently; consider caching the result with `functools.cached_property` when the value is expensive to compute and the underlying data does not change.
- When only a setter is needed without a getter, use `property(fset=my_setter)` directly rather than the decorator form to avoid boilerplate.

## Rules of property()

- If no arguments are given, `property()` returns a base property attribute that contains no getter, setter, or deleter.
- If `doc` is not provided, `property()` automatically adopts the docstring of the getter function (`fget.__doc__`).
- A property defined without a setter is read-only; attempting to assign to it raises `AttributeError`.
- A property defined without a deleter cannot be deleted; attempting `del obj.attr` raises `AttributeError`.

## Frequently Asked Questions

**Q: What is the difference between using `property()` as a function and using `@property` as a decorator?**

A: They are functionally identical. The decorator form `@property` is just syntactic sugar — Python transforms `@property def foo(self): ...` into `foo = property(foo)` automatically. The decorator form is preferred in modern Python because it keeps the getter, setter, and deleter visually grouped together in the class body.

**Q: Can I use `property()` in any Python class?**

A: In Python 3, all classes are new-style classes by default, so `property()` works everywhere without any special base class. In Python 2, you had to explicitly inherit from `object` (that is, `class MyClass(object):`) to use `property()` correctly. In Python 2 classic classes that did not inherit from `object`, properties were silently ignored.

**Q: When should I use `property()` versus `__getattr__` and `__setattr__`?**

A: Use `property()` when you want to manage a specific, known attribute with well-defined getter and setter logic. Use `__getattr__` and `__setattr__` when you need to intercept access to any attribute dynamically — for example in proxy objects, auto-generated attribute patterns, or ORMs where column names are not known at class-definition time. `property()` is faster and more explicit for individual attributes, while the dunder methods provide broader but less targeted control.

For getting and setting attributes dynamically by name, see the [Python getattr()](/posts/Page-26-Python-getattr()/) and [Python setattr()](/posts/Page-58-Python-setattr()/) functions, which complement `property()` for reflective programming patterns.
