---
title: Python hash() Method
description: In the tutorial we will learn about the Python hash() method and its uses with examples.
date: 2025-01-03 22:15:55 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python hash() Method.png
 alt: Python hash() Method
---

## What is Python hash() method?

The hash() method in python will return the hash value of a specified object if it has one. It is used to encode the data into an unrecognizable integer value.

It can take an object.

The syntax of the hash() method is

```python
hash(object)

```

## Python hash() method Parameters

hash() method takes only one parameter:

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
* **object** \- The object whose hash value has to be returned. 

Let's check some examples of the hash() method in python.

### Example 1: How to use the hash() method in python?

```python
# hash for integer unchanged
print('Hash for 25 is:', hash(25))

# hash for decimal
print('Hash for 81.43 is:',hash(81.43))

# hash for string
print('Hash for Python is:', hash('Python'))

```

The output will be as follow:

```python
Hash for 25 is: 25
Hash for 81.43 is: 991512493961904209
Hash for Python is: 1403919086943600213

```

We can only use the hash() method to return hashed values only for immutable objects. We cannot use a mutable object like a list and dictionary, but we can use a tuple as an immutable object in python.

### Example 2: How to use a hash() method with python tuple?

```python
# initializing objects
# tuple are immutable
tuple_val = (1, 2, 3, 4, 5)

# Printing the hash values.
print ("The tuple hash value is: " + str(hash(tuple_val)))

```

The output will be as follow:

```python
The tuple hash value is: -5659871693760987716

```

Let's see what will happen when we use mutable objects with a hash() method.

### Example 3: Mutable object with the hash() method.

```python
# initializing objects
# list are mutable
list_val = [1, 2, 3, 4, 5]

# Printing the hash values.
print ("The list hash value is : " + str(hash(list_val)))

```

Output:

```python
Traceback (most recent call last):
  File "", line 6, in <module>
    print ("The list hash value is : " + str(hash(list_val)))
TypeError: unhashable type: 'list'
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
We can see that it has raised an error “unhashable type” because we cannot hash mutable objects. 

## Rules of hash() method

* The hash() method will only return the hash value of an object if it has one.  
* The hash() method will only work on immutable objects(integer, string float, tuple)

## FAQs

**How do you write a hash in Python?**

The python hash function or method can be written using hash() keywords and inside the brackets, we have to add a variable or an object to get the result.

**How do you write a hash function?**

The hash function in python can be written using hash(), and we and use any variable, object, string or other readable python objects with the hash function.

**What does hash() do in Python?**

The hash() will return a hashed or encoded value of the given object.

**What is syntax of hash in Python?**

We can use hash(object name) as the syntax of hash in python.

**What does hash do in python?**

The hash() method will encode the given object and return the hashed format of that object.

**How to use hash in python?**

It is very easy to use the python hash() method, we just need to call the hash() method with an object as the parameter.

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
**what is hash function in python?**

The hash function is a built-in python function that is used to encode the object in a hashed format.