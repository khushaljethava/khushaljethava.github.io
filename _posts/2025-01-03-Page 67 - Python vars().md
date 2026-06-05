---
title: Python vars()
description: The vars() is a built-in python function that returns the \_\_dict\_\_ attribute of an object.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python vars().webp
  alt: Python vars()
---

The Python `vars()` function is a built-in function that returns the `__dict__` attribute of a given object, which is a dictionary containing the object's writable attributes. It accepts a single optional parameter: any object that has a `__dict__` attribute, such as a module, class, or instance. When called without arguments, it behaves like `locals()` and returns a dictionary of the current local symbol table. The function returns a dictionary where keys are attribute names (as strings) and values are the corresponding attribute values. The `vars()` function is particularly useful for debugging and introspection, allowing you to inspect all attributes of an object at runtime. A real-world example is logging the state of a configuration object by converting it to a dictionary with `vars(config)` for serialization or display. It complements [dir()](/posts/Page-17-Python-dir()/), which lists all attribute names including inherited ones, while `vars()` only returns the instance's own attributes.

## What does vars() return?

The `vars()` function returns a dictionary (`__dict__`) of the object's writable attributes. When called without arguments, it returns the local symbol table as a dictionary.

## When should you use vars()?

Use `vars()` when you need to inspect or iterate over the attributes of an object as a dictionary, particularly for debugging, serialization, or dynamically accessing an object's state.

The syntax of the vars() function is :

```python
vars(object)

```

## vars() parameters

vars() function takes only one parameter as argument:


* object \- Any object having the \_\_dict\_\_ attribute or module,class ,instance.


### Example 1: How to use vars() function on python?

```python
class Dog:
  def __init__(self, a = 4, b = 8):
    self.a = a
    self.b = b
  
object = Dog()
print(vars(object))

```

Output:

```python
{'a': 4, 'b': 8}

```

The \_\_dict\_\_ attribute is a dictionary containing the specific object’s changeable attributes.

## Common Use Cases

A common use case for `vars()` is converting an object's attributes into a dictionary for JSON serialization, such as `json.dumps(vars(user))` to send object data over an API. Another practical scenario is debugging by printing the complete state of an object with `print(vars(my_object))` to see all current attribute values at a glance. It is also useful in ORM-like patterns where you need to iterate over an object's fields to generate SQL statements or form fields dynamically, working alongside [setattr()](/posts/Page-58-Python-setattr()/) for attribute modification.

## Rules of vars()

* If called without any parameters, it will return a dictionary containing the local symbol table.  

* vars() will return the \_\_dict\_\_ attributes of the given object.  
* If the object passed to vars() doesn't have the \_\_dict\_\_ attribute, it raises a TypeError exception.
---

## More Examples

### Inspecting an object's attributes

```python
class Car:
    def __init__(self):
        self.make = "Toyota"
        self.year = 2024

c = Car()
print(vars(c))   # {'make': 'Toyota', 'year': 2024}
```

`vars(obj)` returns the object's `__dict__` — a dictionary of its writable attributes.

### vars() with no argument

```python
def demo():
    x = 1
    y = 2
    print(vars())   # acts like locals() inside a function

demo()
```

Called without arguments, `vars()` returns the local symbol table, behaving like `locals()`.

## vars() vs dir()

| Function | Returns |
|----------|---------|
| `vars(obj)` | A dict of the object's own attributes (`__dict__`) |
| `dir(obj)` | A list of all names, including inherited methods |

## Real-World Use Cases

- **Debugging** — quickly dumping an object's state.
- **Serialization** — converting a simple object to a dictionary.
- **Introspection** — examining attributes generically.

## Common Mistakes

- **Calling `vars()` on objects without `__dict__`** — built-ins like `int` or classes using `__slots__` raise `TypeError`.
- **Confusing it with `dir()`** — `vars()` shows only instance attributes, not methods.
- **Mutating the returned dict carelessly** — for objects it is the live `__dict__`, so changes affect the object.

## FAQ

**Q: What does `vars()` return for a module?**
The module's namespace dictionary, the same as `module.__dict__`.

**Q: Why does `vars(5)` fail?**
Integers have no `__dict__`, so `vars()` raises `TypeError`. This is normal for many built-in types.

## Conclusion

`vars()` returns the `__dict__` of an object, module, or class — or the local namespace when called with no argument. It is a handy introspection and debugging tool for examining and even modifying an object's attributes as a dictionary. Just remember that not every object has a `__dict__`, so guard against `TypeError` when working with built-in types or `__slots__`-based classes.
