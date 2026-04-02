---
title: Python type()
description: The type() is a built-in function of python that returns the type of given object.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python type().webp
  alt: Python type()
---

Python's `type()` function serves two distinct purposes depending on how many arguments you pass. With a single argument, it returns the type of the given object as a type object (for example, `<class 'int'>` or `<class 'str'>`). With three arguments -- a name, a tuple of base classes, and a dictionary of attributes -- it dynamically creates and returns a new type (class) at runtime. The single-argument form is by far the most common and is used for debugging, logging, input validation, and understanding what kind of data you are working with. The three-argument form is an advanced feature used in metaprogramming, framework construction, and dynamic class generation. For type checking in production code, [Python isinstance()](/posts/Page-35-Python-isinstance()/) is generally preferred over `type()` because it respects inheritance hierarchies. If you need to convert a value to a specific type, see [Python int()](/posts/Page-34-Python-int()/), [Python str()](/posts/Page-62-Python-str()/), or [Python float()](/posts/Page-23-Python-float()/).

## What does type() return?

With one argument, `type()` returns the type of the object as a class. With three arguments (name, bases, dict), it returns a newly created type object that acts as a class definition.

## When should you use type()?

Use `type()` when you need to inspect the exact type of an object during debugging or logging. For conditional type checking in application logic, prefer `isinstance()` since it handles subclasses correctly. Use the three-argument form only when you need to create classes dynamically at runtime.

The type() function has two separate syntax to return different results  
The syntax of type() function is:

```python
type(object)
type(name, bases, dict)

```

## type() with single parameter

* object \- Name of the object whose type has to return.


### Example 1: type() function with object parameter.

```python
a = 1
print(type(a))

b = 3.14
print(type(b))

c = "Python"
print(type(c))

my_list = [1,2,3]
print(type(my_list))

my_dict = { "a" : 1, "b" : 2, "c" : 3}
print(type(my_dict))

```


Output:

```python
<class 'int'>
<class 'float'>
<class 'str'>
<class 'list'>
<class 'dict'>

```


## type() with multiple parameters


When we pass these parameters to the type() function it will return a new type object.

* name \- A name of the class which later becomes the \_\_name\_\_ attribute.  
* bases (Optional) \- A tuple that specifies the base classes.  
* dict \- A dictionary that specifies the namespace with the definition for the class.

### Example 2: type() function with multiple parameters.

```python
o1 = type('X', (object,), dict(a='Coco', b=4))

print(type(o1))
print(vars(o1))

class test:
  a = 'Coco'
  b = 4
  
o2 = type('Y', (test,), dict(a='Coco', b=4))
print(type(o2))
print(vars(o2))

```

Output:

```python
<class 'type'>
{'a': 'Coco', 'b': 4, '__module__': '__main__', '__dict__': <attribute '__dict__' of 'X' objects>, '__weakref__': <attribute '__weakref__' of 'X' objects>, '__doc__': None}
<class 'type'>
{'a': 'Coco', 'b': 4, '__module__': '__main__', '__doc__': None}

```

In the program, we have used the Python vars() function which returns the \_\_dict\_\_ attribute. \_\_dict\_\_ is used to store an object's writable attributes.

## Common Use Cases

**Debugging and logging.** During development, `type()` helps you quickly identify what kind of data a variable holds. Printing `type(variable)` in a log statement can reveal unexpected types that cause bugs, especially when working with data from external APIs or user input.

**Dynamic class creation in frameworks.** ORMs (Object-Relational Mappers) and web frameworks use the three-argument form of `type()` to generate model classes or form classes dynamically based on configuration files or database schemas, avoiding repetitive boilerplate code.

**Type-based dispatching.** In situations where you need to handle different types differently (and `isinstance()` is not appropriate), `type()` lets you compare exact types. For example, `if type(value) is int` ensures the value is exactly an integer and not a Boolean (since `bool` is a subclass of `int`).

## Related Functions

* [Python isinstance()](/posts/Page-35-Python-isinstance()/) -- check if an object is an instance of a class or its subclasses.
* [Python callable()](/posts/Python-callable()/) -- check if an object appears to be callable.
* [Python bool()](/posts/Python-bool()/) -- convert a value to Boolean (`bool` is a subclass of `int`).