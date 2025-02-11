---
title: Python object() Method
description: The object() is a built-in method of python that returns an empty object that is the base for all the classes.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python object() Method.png
 alt: Python object() Method
---

<script type="text/javascript">
	atOptions = {
		'key' : '98858c4e91885e00ea9926beee01c03e',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
The syntax of object() method is:

```python
object()
```

## object() Method

The object() method doesn't take any parameter.

Let see an example of an object() method in python.

### Example 1: How to use object() method?

```python
test = object()

print(type(test))
print(dir(test))

```

Output:

```python
<class 'object'>
['__class__', '__delattr__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__']

```

### Example 2: How python get size of object?

In objects are store in pythin so to get the sixe of python object we are going to ose sys.getsizeof() function from the sys python moduel.

```python
import sys

# Create an object
my_list = [1, 2, 3, 4, 5]

# Get the size of the object
size = sys.getsizeof(my_list)

print(f"Size of my_list in bytes: {size} bytes")



```

Output:

```python
Size of my_list in bytes: 104 bytes

```

### Example 3: python convert object to string

<script type="text/javascript">
	atOptions = {
		'key' : '98858c4e91885e00ea9926beee01c03e',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
To convert an object to a string in python we can use python str() method.This function attempts to return a string representation of the object.

```python
my_object = 42
my_string = str(my_object)
print(my_string)

```

<script type="text/javascript">
	atOptions = {
		'key' : '98858c4e91885e00ea9926beee01c03e',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
The output will be as follow:

```python
42

```

### Example 4: list attributes of object python

```python
# Create an example object
class MyClass:
    def __init__(self, value):
        self.value = value

    def say_hello(self):
        print("Hello!")

my_object = MyClass(42)

# List attributes of the object
attributes = dir(my_object)

print(attributes)

```

Output:

```python
['__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', 'say_hello', 'value']

```

Here we have python print object attributes using object() method.

## Rules of the object()

* The object() method will only return an empty object.