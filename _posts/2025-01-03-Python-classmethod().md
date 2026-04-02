---
title: Python classmethod() Method 
description: In this tutorial we will learn about the python classmethod() method and its uses.
date: 2025-01-03 23:24:00 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python classmethod() Method.webp
  alt: Python classmethod() Method 

---

The Python `classmethod()` function is a built-in function that transforms a regular method into a class method. It takes a single parameter: the function to be converted. A class method receives the class itself as its first argument (conventionally named `cls`) rather than an instance, which means it can access and modify class-level state. The function returns a class method object. In modern Python, the `@classmethod` decorator is the preferred and more readable way to define class methods. Class methods are particularly valuable for creating alternative constructors -- factory methods that create instances from different data formats. A practical example is a `Date.from_string("2025-01-03")` method that parses a date string and returns a new `Date` instance. This distinguishes `classmethod()` from [staticmethod()](/posts/Page-61-Python-staticmethod()/), which receives no implicit argument at all, and from regular instance methods which receive `self`.

## What does classmethod() return?

The `classmethod()` function returns a class method object that wraps the given function, causing it to receive the class as its first argument instead of an instance.

## When should you use classmethod()?

Use `classmethod()` (or the `@classmethod` decorator) when you need a method that operates on the class itself rather than an instance, especially for alternative constructors or methods that need to access class-level attributes.

The classmethod() method returns the class function for the given function.

The syntax of the classmethod() method is:

```python
classmethod(function)
```

The classmethod() is considered un-pythonic in newer python versions to use the @classmethod decorator for the classmethod definition.


The syntax of the classmethod decorator is:

```python
@classmethod
def func(cls, args....)
```

## What is a class method?

A class method is a function that is bound to a class rather than its objects, which does not require the creation of a class instance, more like a staticmethod.

The main difference between a staticmethod and a classmethod is:


* Static method knows nothing about the class and just deals with the parameters.  
    
* The class method works with the class since its parameters are always the class itself.

## classmethod() Parameters

classmethod() method only takes a single parameter:

function - function name that needs to be converted into a class method.

### Example 1: How to use classmethod()?

```python
class Dog:
    color = 'Black'

    def printColor(cls):
        print("The color of Dog is", cls.color)

# create printColor class method

Dog.printColor = classmethod(Dog.printColor)

Dog.printColor()
```

The output will be as follow:

```python
The color of Dog is Black

```

Here, we have a class Dog, with a member variable color assigned to black.

We also have a function printColor that takes a parameter cls and not the self we usually take.

cls method accepts the class Dog as a parameter rather than Dog’s object/instance.

Now we pass the method Dog.printColor as an argument to the function classmethod. This will convert the function to a class method to accept the first parameter as a class(i.e., Dog).

In the last line, we call printColor without creating a Dog object as we do for static methods. This prints the class variable color.

## Common Use Cases

A common use case for `classmethod()` is defining alternative constructors, such as `User.from_json(data)` or `Date.from_string("2025-01-03")`, which parse different input formats and return new instances. Another practical scenario is creating methods that need to work with class-level configuration or state, such as a `Database.get_connection()` method that returns a connection using class-level settings. It is also used in inheritance hierarchies where a factory method needs to return an instance of the subclass that called it, which is possible because `cls` refers to the actual calling class rather than a hardcoded one, unlike [staticmethod()](/posts/Page-61-Python-staticmethod()/).

## Rules of classmethod()


classmethod() function will return a class method for a given function.