---
title: Python setattr()
description: The python setattr() functions set the specific value of the specified attribute of the object.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python setattr().webp
  alt: Python setattr()
---

The Python `setattr()` function is a built-in function that dynamically sets the value of a named attribute on an object. It accepts three required parameters: the target object, a string representing the attribute name, and the value to assign. The function modifies the object in place and returns `None`. This is the programmatic equivalent of writing `object.name = value`, but with the advantage that the attribute name can be a variable determined at runtime. The `setattr()` function is particularly useful in metaprogramming scenarios, configuration systems, and frameworks that need to assign attributes dynamically based on external data such as JSON payloads, database rows, or user input. It works with any object that supports attribute assignment, including instances of user-defined classes. When paired with [getattr()](/posts/Page-26-Python-getattr()/), it provides a complete interface for dynamic attribute access and modification.

## What does setattr() return?

The `setattr()` function returns `None`. Its purpose is to produce a side effect by setting the specified attribute on the given object rather than returning a value.

## When should you use setattr()?

Use `setattr()` when you need to set object attributes dynamically at runtime, especially when the attribute name is stored in a variable or comes from an external source like a configuration file or API response.

The syntax of the setattr() function is :

```python
setattr(object, name, value)
```

## setattr() Parameters

The setattr() functions take three parameters as argument:


* **object** \- the name of the object whose attribute has to set.   
* **name** \- The name of the attribute  

* **value** \- value to be assigned to the attribute.

### Example 1: How to use setattr() function in python?

```python
class Dog:
    name = 'Coco'
    
dog = Dog()
print('Before modification:', dog.name)

# setting name to 'John'
setattr(dog, 'name', 'Rick')

print('After modification:', dog.name)

```

Output:

```python
Before modification: Coco
After modification: Rick

```

## Common Use Cases

A common use case for `setattr()` is populating object attributes from a dictionary, such as when loading user profile data from a database result and mapping each column to a corresponding attribute on a User instance. Another practical scenario is building plugin systems or configuration managers where attribute names are not known until runtime and must be set based on external input. It is also frequently used in serialization and deserialization libraries to reconstruct objects from stored data formats like JSON or YAML.

## Rules of setattr()

If you want to get the value of the specific attribute, we recommend [getattr()](/posts/Page-26-Python-getattr()/) function. You can also use [hasattr()](/posts/Page-28-Python-hasattr()/) to check whether an attribute exists before setting it.
---

## More Examples

### Setting an attribute dynamically

```python
class Person:
    pass

p = Person()
setattr(p, "name", "Alice")
setattr(p, "age", 30)
print(p.name, p.age)   # Alice 30
```

`setattr(obj, "name", value)` is equivalent to `obj.name = value`, but the attribute name is supplied as a string — perfect when the name is computed at runtime.

### Setting attributes from a dictionary

```python
class Config:
    pass

data = {"host": "localhost", "port": 8080, "debug": True}
cfg = Config()
for key, value in data.items():
    setattr(cfg, key, value)

print(cfg.host, cfg.port, cfg.debug)
```

## setattr() and getattr()

`setattr()` writes attributes; its companion `getattr()` reads them. Together they enable fully dynamic attribute access, which is the basis of many serialization and ORM libraries.

## Real-World Use Cases

- **Deserialization** — turning JSON or form data into object attributes.
- **Configuration objects** — populating settings from a file.
- **Frameworks/ORMs** — mapping database columns to model fields.

## Common Mistakes

- **Using invalid identifiers** — `setattr(obj, "2bad", 1)` works but the attribute can only be reached via `getattr`, not normal dot syntax.
- **Overwriting methods accidentally** — setting an attribute that shadows an existing method.
- **Using it when static attributes suffice** — only reach for `setattr()` when the name is genuinely dynamic.

## FAQ

**Q: Is `setattr(obj, "x", 1)` the same as `obj.x = 1`?**
Yes — but `setattr()` accepts the name as a string, enabling dynamic assignment.

**Q: Can `setattr()` create new attributes?**
Yes — it adds the attribute if it does not already exist (unless the class restricts attributes via `__slots__`).

## Conclusion

`setattr()` assigns a value to an object attribute named by a string, mirroring `getattr()` for reads. It shines whenever attribute names are decided at runtime — deserializing data, building configuration objects, or writing generic frameworks. For fixed attribute names, ordinary dot assignment is clearer, so reserve `setattr()` for genuinely dynamic cases.
