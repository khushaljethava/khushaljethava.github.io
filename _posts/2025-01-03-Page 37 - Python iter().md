---
title: Python iter() Method
description: In this tutorial we will learn about the python iter() method and its uses with examples.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python iter() Method.webp
  alt: Python iter() Method
---

The Python `iter()` function is a built-in that returns an iterator object from an iterable. It accepts two parameters: the required `object` parameter, which must be a collection or an object implementing the `__iter__()` method, and an optional `sentinel` value that defines a termination condition when calling the object as a callable. When used with a single argument, `iter()` calls the object's `__iter__()` method and returns the resulting iterator. When used with a sentinel, the first argument must be a callable, and the iterator will keep calling it until the sentinel value is returned. The function is fundamental to Python's iteration protocol, which powers `for` loops, list comprehensions, and generator expressions. A common real-world use case is reading lines from a file or socket until a specific termination marker is encountered, using the two-argument sentinel form like `iter(socket.recv, b'')`.

## What does iter() return?

The `iter()` function returns an iterator object that produces successive items from the given iterable when passed to `next()`.

## When should you use iter()?

Use `iter()` when you need explicit control over iteration, such as manually stepping through items with `next()`, or when using the sentinel form to read data until a stop condition is met.

## What is Python iter() Method?

The iter() is a Python built-in method that returns an iterator for the given object.


The syntax of the iter() method is:

```python
iter(object, sentinel)

```

## Python iter() Method Parameters

The iter() methods take two parameters as an argument:

* object \- the name of the object whose iterator has to be returned.  
* sentinel (optional) \-  A numeric value that is used to represent the end of the sequence.


Let's check some examples of the python iter() method.

### Example 1: How to use the iter() method in python?

```python
cars = ['BMW','AUDI','FORD']

My_iter = iter(cars)

print(My_iter)

print(type(My_iter))

print(next(My_iter)) # BMW
print(next(My_iter)) # AUDI
print(next(My_iter)) # FORD

```

Output:

```python
<list_iterator object at 0x7fddb59cb820>
<class 'list_iterator'>
BMW
AUDI
FORD
```
We can use the next() method to print the elements of iteration, and the iteration will remember the next count via the internal count variable. Once the iteration is complete, it raises a StopIteration exception, and the iteration count cannot be reassigned to 0\.


We can also use \_\_next\_\_() method with ithe ter() method to print the iterator.

### Example 2: Using \_\_next\_\_() method in python iter() method.

```python
cars = ['BMW','AUDI','FORD']

My_iter = iter(cars)

print(My_iter.__next__()) # BMW
print(My_iter.__next__()) # AUDI
print(My_iter.__next__()) # FORD

```
The output will be as follows.

```python
BMW
AUDI
FORD

```

### Example 3: Using iter() with custom objects.

```python
class PrintNumber:
    def __init__(self, max):
        self.max = max

    def __iter__(self):
        self.num = 0
        return self

    def __next__(self):
        if(self.num >= self.max):
            raise StopIteration
        self.num += 1
        return self.num

print_num = PrintNumber(3)

print_num_iter = iter(print_num)
print(next(print_num_iter))  # 1
print(next(print_num_iter))  # 2
print(next(print_num_iter))  # 3

# raises StopIteration
print(next(print_num_iter))

```

The output will be as follows.

```python
1
2
3
Traceback (most recent call last):
  File "", line 23, in <module>
    print(next(print_num_iter))
  File "", line 11, in __next__
    raise StopIteration
StopIteration

```

## Common Use Cases

A common use of `iter()` is implementing custom iteration in classes by defining `__iter__()` and `__next__()` methods, then using `iter()` to obtain the iterator for use in loops. Another practical scenario is the sentinel pattern for reading blocks of data from a file: `iter(lambda: file.read(4096), b'')` reads 4KB chunks until the file is exhausted, which is memory-efficient for processing large files. Developers also use `iter()` when they need to manually control iteration stepping, such as consuming items from an iterator at different rates in interleaved processing pipelines.

To advance an iterator by one step and retrieve the next value, use the [Python next() method](/posts/Page-45-Python-next()/). If you need to create a list from an iterable instead of an iterator, see the [Python list() method](/posts/Page-39-Python-list()/).

## Rules of iter() 

* If the user-defined object doesn't implement \_\_iter\_\_(), and \_\_next\_\_() or \_\_getitem()\_\_, the TypeError exception is raised.  
* If the sentinel parameter is also provided, iter() returns an iterator until the sentinel character isn't found.