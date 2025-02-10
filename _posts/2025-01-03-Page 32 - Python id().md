---
title: Python id() Method
description: In this tutorial, we will learn about python id() method and its uses with examples.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python id() Method.png
 alt: Python id() Method
---

## What is python id() method?

The id() method in python returns the unique identity number of an object. All the objects in python have a unique integer number.

<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
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

<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
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

## Rules of id() method 

<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
* id() method will always return a unique integer number of given objects.  
* Unique numbers will remain constant during its lifetime, once assing.