---
title: Python id() Method
description: In this tutorial, we will learn about python id() method and its uses with examples.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python id() Method.webp
  alt: Python id() Method
---

The Python `id()` function is a built-in that returns the unique identity of an object as an integer. It takes a single required parameter -- any Python object -- and returns an `int` that is guaranteed to be unique and constant for that object during its lifetime. In the CPython implementation, this integer corresponds to the object's memory address. The `id()` function is essential for understanding how Python manages objects internally, particularly when dealing with mutable versus immutable types and variable aliasing. A common real-world use case is debugging reference and identity issues: when two variables appear to hold the same value, `id()` reveals whether they point to the same object in memory or to separate copies. This is especially useful when investigating unexpected behavior with mutable default arguments, shared list references, or caching mechanisms like Python's integer interning.

## What does id() return?

The `id()` function returns a unique integer that serves as the identity of the given object, remaining constant for the object's entire lifetime.

## When should you use id()?

Use `id()` when you need to verify whether two variables reference the exact same object in memory, which is particularly helpful for debugging aliasing issues and understanding Python's object model.

## What is python id() method?

The id() method in python returns the unique identity number of an object. All the objects in python have a unique integer number.


These identity numbers are assigned to the object when created and remain constant for this object until the program's execution is ended. 

The syntax of id() is:

```python
id(object)
```

## Python id() method Parameters

id() method only takes only one parameter as an argument.

* **object** \- object name whose id to be returned.

Let's check some examples of python id() methods.

### Example 1: How to use the id() method in python?

```python
print("id of integer 4 is:",id(4))

print("id of float 67.5 is:",id(67.5))

print("id of single string python is:",id("python"))

```

Output:

```python
id of integer 4 is: 9784992
id of float 67.5 is: 140008364368112
id of single string python is: 140008382164528

```

An id will automatically assign to a variable whenever it's declared.


### Example 2: How to use id() method with python variable?

```python
a = 87
print("id of a is:", id(a))

b = 9.7
print("id of b is:", id(b))

c = [1,2,3]
print("id of c is:", id(c))

d = {'a':1, 'b':2,'c':3}
print("id of d is:", id(d))

```

The output will be as follows:

```python
id of a is: 9787648
id of b is: 140209765336528
id of c is: 140209756669504
id of d is: 140209765321152

```

In python, even classes and methods have their unique identity number.

### Example 3: How to use id() method with python classes and methods?

```python
class Dog:
    age = 6
    color = "Black"

dog = Dog()
print("The id of Dog class is:",id(dog))

def User_Func():
    a = 1
    b = 3
    c = a + b

my_func = User_Func()
print("This if of User_Func function is :",id(my_func))

```

Output:

```python
The id of Dog class is: 139715062134816
This if of User_Func function is: 9480720
```

## Common Use Cases

A frequent use of `id()` is verifying object identity during debugging. For example, when a list is passed to multiple functions, calling `id()` on the list before and after each function call confirms whether the original list was modified in place or replaced with a new one. Another practical scenario is understanding Python's integer interning: small integers (typically -5 to 256) are cached, so `id(5) == id(5)` is always `True`, which can be demonstrated with `id()` to teach how Python optimizes memory for frequently used values. Developers also use `id()` when building custom caching or memoization systems where object identity matters more than equality.

To check the type of an object rather than its identity, see the [Python type() function](/posts/Page-66-Python-type()/). If you need to test whether two variables point to the same object, the `is` operator is the idiomatic approach, but [Python isinstance()](/posts/Page-35-Python-isinstance()/) is better for type checking.

## Rules of id() method 


* id() method will always return a unique integer number of given objects.  
* Unique numbers will remain constant during its lifetime, once assing.