---
title: Python hasattr() Method
description: In this tutorial, we will learn about the python hasattr() method and its uses with examples.
date: 2025-01-03 22:15:55 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python hasattr() Method.webp
  alt: Python hasattr() Method
---

The Python `hasattr()` function is a built-in that checks whether an object possesses a given attribute and returns a boolean result. It accepts two required parameters: the object to inspect and a string containing the attribute name. Internally, `hasattr()` works by calling `getattr()` on the object and returning `True` if no `AttributeError` is raised, or `False` if one is. This makes it a safe, exception-free way to test for the existence of attributes before accessing them. A common real-world use case is in duck typing, where you check whether an object supports a particular method or property before calling it, rather than enforcing strict type checks. For instance, a serialization library might use `hasattr(obj, 'to_dict')` to determine whether an object provides its own dictionary conversion method. It is also widely used in plugin systems and frameworks that need to detect optional capabilities on user-provided objects.

## What does hasattr() return?

The `hasattr()` function returns `True` if the specified object has the named attribute, and `False` otherwise.

## When should you use hasattr()?

Use `hasattr()` when you need to safely check whether an object supports a particular attribute or method before accessing it, especially in duck-typing scenarios or when working with objects of unknown structure.

## What is Python hasattr() method? 

The Python hasattr() method returns true if the given attribute is present in the objects, and if it doesn't present, it will return false.

The syntax of hasatter() method is

```python
hasattr(object, name)

```

## Python hasattr() method parameters.

The hasattr() method takes two parameters:

* **object** \- object name in which attribute has to be checked.   

* **name** \- The name of the attribute to be checked if it exists.

Let’s check some examples of hasattr() in python.

### Example 1: How to use the hasattr() python method?

```python
class Dog:
    age = 6
    name = 'coco'

dog = Dog()

print("Does a dog have age?", hasattr(dog,'age'))
print("Does a dog have bread?", hasattr(dog, 'bread'))

```

Output:

```python
Does a dog have an age? True
Does a dog have bread? False

```

As we can see, first, we have checked the age attribute which is present in the given object that is returning us **True**, then we are checking the bread attribute which is not present in the given object, then it is returning **False**. 

We can also check if the specified string attribute is present or not in the given sentence. For this, we will use python’s built-in class str to identify it as a string.


### Example 2: How to use hasattr() with a string in python?

```python
print('str has title: ', hasattr(str, 'title'))
print('str has __len__: ', hasattr(str, '__len__'))
print('str has isupper method: ', hasattr(str, 'isupper'))
print('str has isstring method: ', hasattr(str, 'isstring'))

```

The output will be as follow:

```python
str has title:  True
str has __len__:  True
str has isupper method:  True
str has isstring method:  False

```


Here the hasattr() method is checking whether the given string is present in the object.

## Common Use Cases

A frequent use of `hasattr()` is in API design where your code needs to handle multiple object types gracefully. For example, a logging framework might check `hasattr(record, 'extra_context')` before attempting to include additional context in the log output. Another practical scenario is feature detection in third-party libraries, where you verify that a module or class exposes a certain method before calling it, which helps maintain backward compatibility across library versions. It is also useful when writing generic utility functions that operate on diverse objects, such as a deep-copy helper that checks for a custom `__copy__` method before falling back to the default copy behavior.

For retrieving the actual attribute value rather than just checking its existence, see the [Python getattr() method](/posts/Page-26-Python-getattr()/). If you need to check whether an object is an instance of a specific class, consider using [Python isinstance()](/posts/Page-35-Python-isinstance()-method/).

## Rules of hasattr()

* It will return **True** if the given attribute is present in the object.  
* It will return **False** if the given attribute is not present in the object.

hasattr() is the same as getattr(), but the getattr() method will raise Attribute Error if the given attribute is not present in the object.