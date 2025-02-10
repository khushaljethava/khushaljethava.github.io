---
title: Python getattr() Method
description: In this tutorial we will learn about python getattr() method and its uses.
date: 2025-01-03 22:15:55 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python getattr() Method.png
 alt: Python getattr() Method
---

## What is python getattr() method?

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
Python getattr() method is used to access the values of attributes of python objects. If a specified object has no attributes, it will return the default value provided to the method.

The syntax of python getattr() is:

```python
getattr(object, attribute, default)

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
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
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
Output:

```python
The age is: 6
The color is: White

```

## Rules of getattr() method

* It will only return the value of the attribute if it is found.  
* If the attribute is not present and the default value is not given AttributeError exception will occur.  
* It will return default if no named attribute is found.  