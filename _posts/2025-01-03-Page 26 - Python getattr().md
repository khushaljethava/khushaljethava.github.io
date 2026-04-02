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


Python getattr() method is used to access the values of attributes of python objects. If a specified object has no attributes, it will return the default value provided to the method.

The syntax of python getattr() is:

```python
getattr(object, attribute, default)

```


## getattr() Parameters

The getattr() method takes 3 parameters:

* **object** \- Name of the object whose attributes value want to be accessed.  
* **name** \- normal string that contains the name of an attribute.  
* **default (optional)** \- Default value which will be returned when given attributes is not found.

getattr() is also equivalent to:

object.name 

Both getattr() and “object.name” will do the same thing.

Let's check an example of the getattr() method.

### Example 1: How to use the getattr() method on the python class?

```python
class Dog:
    name="Rocky"
    age = 6
    color = "White"

dog = Dog()

print("The age is:", getattr(dog,"age"))
print("The color is:", getattr(dog,"color"))
print("The bread is:", getattr(dog,"bread","Husky"))

```

Output:

```python
The age is: 6
The color is: White
The bread is: Husky

```

### Example 2: Accessing attributes that are not declared.

```python
class Dog:
    name="Rocky"
    age = 6
    color = "White"

dog = Dog()

print("The bread is:", getattr(dog,"bread"))

```

The output will be as follow:

```python
Traceback (most recent call last):
  File "", line 8, in <module>
    print("The bread is:", getattr(dog,"bread"))
AttributeError: 'Dog' object has no attribute 'bread'
```

As you can see we are accessing attributes that are not present in the object, and it throws an error as “object has no attribute” if in the above program we use default parameter, it will not raise any error.

 We can do the same thing by calling the class with the attribute name.

### Example 3: Accessing object value without getatt() method.

```python
class Dog:
    name="Rocky"
    age = 6
    color = "White"

dog = Dog()

print("The age is:", dog.age)
print("The color is:", dog.color)

```


Output:

```python
The age is: 6
The color is: White

```

## Rules of getattr() method

* It will only return the value of the attribute if it is found.  
* If the attribute is not present and the default value is not given AttributeError exception will occur.  
* It will return default if no named attribute is found.  