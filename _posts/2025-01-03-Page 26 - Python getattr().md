---
title: Python getattr() Method
description: In this tutorial we will learn about python getattr() method and its uses.
date: 2025-01-03 22:15:55 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python getattr() Method.webp
  alt: Python getattr() Method
---

The Python `getattr()` function is a built-in that retrieves the value of a named attribute from an object. It takes three parameters: the object to inspect (required), the attribute name as a string (required), and a default value (optional) to return if the attribute does not exist. If the attribute is found, its value is returned. If the attribute is not found and no default is provided, an `AttributeError` is raised. The function is equivalent to using dot notation (`object.attribute`) but allows the attribute name to be a variable, enabling dynamic attribute access. A common real-world use case is building flexible configuration systems or plugin architectures where attribute names are determined at runtime, such as dispatching to handler methods based on user input or reading settings from objects where some fields may be optional.

## What does getattr() return?

The `getattr()` function returns the value of the named attribute on the given object, or the default value if the attribute does not exist and a default was provided.

## When should you use getattr()?

Use `getattr()` when you need to access object attributes dynamically using variable names, especially in plugin systems, serializers, or configuration handlers where attribute names are not known at write time.

## Common Use Cases

A frequent use of `getattr()` is implementing command dispatchers where a string command name is mapped to a method on a handler object, such as `getattr(handler, command_name, default_handler)`. Another practical scenario is building serializers that convert objects to dictionaries by iterating over a list of field names and calling `getattr()` for each one, with sensible defaults for optional fields. It is also commonly used in test frameworks and mock libraries to dynamically inspect and verify object state. Related functions include the [Python dir() method](/posts/Page-17-Python-dir()/) for discovering available attribute names and the [Python hasattr() method](/posts/Page-28-Python-hasattr()/) for checking attribute existence before access.

## What is python getattr() method?

Python `getattr()` method is used to access the values of attributes of Python objects. If a specified object has no attributes matching the given name, it will return the default value provided to the method. This built-in function is one of the most powerful introspection tools in Python, and it plays a key role in building dynamic, flexible, and extensible software systems.

Unlike direct attribute access using dot notation, `getattr()` allows you to supply the attribute name as a runtime variable — something you simply cannot do with the standard `obj.attr` syntax. This distinction makes `getattr()` invaluable whenever the attribute you want to access is not known until the program is actually running.

## Syntax of getattr()

The syntax of Python `getattr()` is:

```python
getattr(object, name, default)
```

## getattr() Parameters

The `getattr()` method takes 3 parameters:

* **object** — The object whose attribute value you want to access.
* **name** — A string containing the name of the attribute to look up.
* **default (optional)** — A fallback value returned when the named attribute is not found. If this is omitted and the attribute does not exist, Python raises an `AttributeError`.

`getattr()` is also equivalent to:

```python
object.name
```

Both `getattr(object, “name”)` and `object.name` will do the same thing when the attribute name is known at write time. The real power of `getattr()` emerges when the name comes from a variable.

---

## Examples of getattr()

Let's explore several practical examples that show the full range of what `getattr()` can do.

### Example 1: How to use the getattr() method on a Python class?

```python
class Dog:
    name = “Rocky”
    age = 6
    color = “White”

dog = Dog()

print(“The age is:”, getattr(dog, “age”))
print(“The color is:”, getattr(dog, “color”))
print(“The breed is:”, getattr(dog, “breed”, “Husky”))
```

Output:

```
The age is: 6
The color is: White
The breed is: Husky
```

Here the third example shows the default value in action. Because the `Dog` class has no `breed` attribute, `getattr()` returns the fallback string `”Husky”` instead of raising an error.

### Example 2: Accessing attributes that are not declared

```python
class Dog:
    name = “Rocky”
    age = 6
    color = “White”

dog = Dog()

print(“The breed is:”, getattr(dog, “breed”))
```

Output:

```
Traceback (most recent call last):
  File “”, line 8, in <module>
    print(“The breed is:”, getattr(dog, “breed”))
AttributeError: 'Dog' object has no attribute 'breed'
```

As you can see, accessing an attribute that is not present in the object — without providing a default — throws an `AttributeError`. If you add a third argument (the default), no error is raised.

### Example 3: Accessing object values without getattr()

```python
class Dog:
    name = “Rocky”
    age = 6
    color = “White”

dog = Dog()

print(“The age is:”, dog.age)
print(“The color is:”, dog.color)
```

Output:

```
The age is: 6
The color is: White
```

This is exactly equivalent to using `getattr()` with a literal string. However, this approach breaks the moment you need to look up an attribute whose name is stored in a variable.

### Example 4: Dynamic attribute access with a variable

One of the most practical uses of `getattr()` is iterating over a list of attribute names and reading each one dynamically:

```python
class Config:
    host = “localhost”
    port = 8080
    debug = True
    timeout = 30

config = Config()
fields = [“host”, “port”, “debug”, “timeout”, “retries”]

for field in fields:
    value = getattr(config, field, “NOT SET”)
    print(f”{field}: {value}”)
```

Output:

```
host: localhost
port: 8080
debug: True
timeout: 30
retries: NOT SET
```

This pattern is extremely common in serialization libraries, REST API frameworks, and configuration loaders.

### Example 5: Dynamic method dispatch

`getattr()` is not limited to data attributes — it works just as well for methods. This makes it ideal for building command dispatchers:

```python
class CommandHandler:
    def start(self):
        print(“Server starting...”)

    def stop(self):
        print(“Server stopping...”)

    def restart(self):
        print(“Server restarting...”)

    def unknown(self):
        print(“Unknown command received.”)

handler = CommandHandler()
commands = [“start”, “restart”, “shutdown”, “stop”]

for cmd in commands:
    method = getattr(handler, cmd, handler.unknown)
    method()
```

Output:

```
Server starting...
Server restarting...
Unknown command received.
Server stopping...
```

Notice how `”shutdown”` falls back to `handler.unknown` because no such method exists on the class.

---

## Real-World Use Cases

### Building Serializers

ORM frameworks and REST APIs often need to convert model instances to dictionaries. `getattr()` makes this clean and generic:

```python
def serialize(obj, fields):
    return {field: getattr(obj, field, None) for field in fields}
```

This single function works for any class and any set of fields.

### Plugin and Hook Systems

Plugin architectures often load modules dynamically and call functions by name. For example, a test runner might look for `setup`, `teardown`, and `test_*` methods on a test class by name, using `getattr()` to retrieve each one at runtime.

### Configuration Management

When reading environment-based configurations, some keys may not exist on the config object. Using `getattr()` with sensible defaults prevents crashes and simplifies optional settings handling.

---

## Edge Cases and Gotchas

- **Properties and descriptors**: `getattr()` respects Python's descriptor protocol, so it will invoke property getters just as dot notation would.
- **`__getattr__` override**: If an object defines a custom `__getattr__` method, `getattr()` will invoke it for missing attributes, which can produce unexpected results.
- **None as a valid attribute value**: When an attribute exists but its value is `None`, `getattr()` returns `None` — this is different from the attribute not existing at all. Never confuse a `None` value with a missing attribute.
- **Performance**: For hot code paths called millions of times, caching `getattr()` results is better than calling it repeatedly with the same name.

---

## Tips and Best Practices

1. **Always provide a default when the attribute may be absent** — this avoids unexpected `AttributeError` exceptions in production.
2. **Use `hasattr()` for guard checks** when you only want to take action if the attribute truly exists, not just retrieve it.
3. **Prefer `getattr()` over `try/except AttributeError`** when a default value is sufficient — it is shorter and more idiomatic.
4. **Combine with `callable()`** to check whether a dynamically retrieved attribute is a method before calling it.
5. **Document dynamic dispatch patterns** clearly in your codebase — logic based on `getattr()` can be hard to follow for new contributors.

---

## Rules of getattr() method

* It will only return the value of the attribute if it is found.
* If the attribute is not present and the default value is not given, an `AttributeError` exception will occur.
* It will return the default if no named attribute is found.
* It works with any Python object, including modules, classes, and instances.

---

## Frequently Asked Questions

**Q1: What is the difference between `getattr(obj, “x”)` and `obj.x`?**

Both retrieve the attribute `x` from `obj`. The key difference is that `getattr()` accepts the attribute name as a runtime string variable, making dynamic attribute access possible. `obj.x` requires the name to be a literal identifier known at write time.

**Q2: What happens if I call `getattr()` on a module?**

`getattr()` works perfectly on module objects. For example, `getattr(math, “sqrt”)` returns the `math.sqrt` function. This is how some plugin loaders dynamically import and call functions from modules.

**Q3: Is `getattr()` safe to use with user-supplied input?**

You should be cautious. If the attribute name comes from untrusted user input, an attacker could potentially access private or sensitive attributes like `__class__`, `__dict__`, or dunder methods. Always validate or whitelist attribute names before passing them to `getattr()` in security-sensitive code.  