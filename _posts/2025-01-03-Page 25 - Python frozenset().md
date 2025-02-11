---
title: Python frozenset() Method
description: In this tutorial we will learn all about python frozenset() metod and its uses.
date: 2025-01-03 22:15:55 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python frozenset() Method.png
 alt: Python frozenset() Method
---

## What is python frozenset() Method?

The frozenset() method returns an immutable frozenset object like a regular set object but cannot be modified once declared. The frozenset() takes input as python iterable.

In Python, Frozenset is just like a normal python set object, but a python set is a mutable object. In the python set, we can modify each element and be added or removed, but in frozenset we cannot modify, add, or remove any element.

The syntax of frozenset() is:

```python
frozenset([iterable])

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
<script type="text/javascript" src="https://www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
## frozenset() Parameters

The frozenset() method takes only one parameter:

* **Iterable** (optional) \- the python iterable like a set, dictionary, tuple, etc., which contains elements.

Let’s check some examples of the python frozenset() method.

### Example 1: How to use frozenset() in python?

```python
# list of numbers
numbers = [1,2,3,4,5]

Fset = frozenset(numbers)

print(Fset)

# type of frozenset

print(type(Fset))

# Add a number to immutable frozenset

Fset.add(6)

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
<script type="text/javascript" src="https://www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
We will get the following output.

```python
frozenset({1, 2, 3, 4, 5})
<class 'frozenset'>
Traceback (most recent call last):
  File "", line 14, in <module>
    Fset.add(6)
AttributeError: 'frozenset' object has no attribute 'add'

```

As you can see in the above example, we are first creating a list of numbers and converting it into a frozenset. Also, you can see we are getting class frozenset when we check the type of the Fset. We are trying to add one more number to the Fset, but as we know, frozenset cannot modify it is showing as an error because there is no attribute to add or remove an element from python frozenset.

But there are different attributes available with frozenset().

## Frozenset Operations in Python

Five operations can be performed in frozenset, just like regular sets.

* copy  
* difference  
* intersection   
* symmetric\_difference   
* union   
  


Let see an example of how we can use operations in frozenset.

### Example 2: How to use Python frozenset operations.

```python
# Frozensets
# initialize A and B
A = frozenset([1, 2, 3, 4])
B = frozenset([3, 4, 5, 6])

# copying a frozenset
C = A.copy()  # Output: frozenset({1, 2, 3, 4})
print(C)

# union
print(A.union(B))  # Output: frozenset({1, 2, 3, 4, 5, 6})

# intersection
print(A.intersection(B))  # Output: frozenset({3, 4})

# difference
print(A.difference(B))  # Output: frozenset({1, 2})

# symmetric_difference
print(A.symmetric_difference(B))  # Output: frozenset({1, 2, 5, 6})

```

When we run the above program we will get the following output:

```python
frozenset({1, 2, 3, 4})
frozenset({1, 2, 3, 4, 5, 6})
frozenset({3, 4})
frozenset({1, 2})
frozenset({1, 2, 5, 6})

```

We can also use simple set operations like isdisjoint, issubset, and issuperset with the python frozenset.

### Example 3: Using python set operations with frozenset.

```python
# Frozensets
# initialize A, B and C
A = frozenset([1, 2, 3, 4])
B = frozenset([3, 4, 5, 6])
C = frozenset([5, 6])

# isdisjoint() method
print(A.isdisjoint(C))  # Output: True

# issubset() method
print(C.issubset(B))  # Output: True

# issuperset() method
print(B.issuperset(C))  # Output: True

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
<script type="text/javascript" src="https://www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
Output:

```python
True
True
True

```

## Rules of frozenset() 

* frozenset() only takes iterable as an argument.  
* frozenset() method returns an immutable frozenset which the iterable elements will initialize.  
* Empty frozenset can be declared bypassing the empty frozenset() method.