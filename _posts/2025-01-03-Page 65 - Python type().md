---
title: Python type()
description: The type() is a built-in function of python that returns the type of given object.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python type().png
 alt: Python type()
---

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