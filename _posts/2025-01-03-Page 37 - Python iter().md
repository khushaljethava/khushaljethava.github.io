---
title: Python iter() Method
description: In this tutorial we will learn about the python iter() method and its uses with examples.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python iter() Method.png
 alt: Python iter() Method
---

## What is Python iter() Method?

The iter() is a Python built-in method that returns an iterator for the given object.

<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="https://www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
The syntax of the iter() method is:

```python
iter(object, sentinel)

```

## Python iter() Method Parameters

The iter() methods take two parameters as an argument:

* object \- the name of the object whose iterator has to be returned.  
* sentinel (optional) \-  A numeric value that is used to represent the end of the sequence.

<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="https://www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
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

<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="https://www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
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

## Rules of iter() 

* If the user-defined object doesn't implement \_\_iter\_\_(), and \_\_next\_\_() or \_\_getitem()\_\_, the TypeError exception is raised.  
* If the sentinel parameter is also provided, iter() returns an iterator until the sentinel character isn't found.