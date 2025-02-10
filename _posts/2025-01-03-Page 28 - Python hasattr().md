---
title: Python hasattr() Method
description: In this tutorial, we will learn about the python hasattr() method and its uses with examples.
date: 2025-01-03 22:15:55 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python hasattr() Method.png
 alt: Python hasattr() Method
---

## What is Python hasattr() method? 

The Python hasattr() method returns true if the given attribute is present in the objects, and if it doesn't present, it will return false.

The syntax of hasatter() method is

```python
hasattr(object, name)

```

## Python hasattr() method parameters.

The hasattr() method takes two parameters:

* **object** \- object name in which attribute has to be checked.   
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
Here the hasattr() method is checking whether the given string is present in the object.

## Rules of hasattr()

* It will return **True** if the given attribute is present in the object.  
* It will return **False** if the given attribute is not present in the object.

hasattr() is the same as getattr(), but the getattr() method will raise Attribute Error if the given attribute is not present in the object.