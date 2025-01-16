---
title: Python max()
description: The max() function returns the item with the largest value or the item with the largest value in an iterable.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python max().png
 alt: Python max()
---

The syntax of max() function:

There are two different syntaxes of max() that can be used in python.

```python
max(n1, n2, n3, *n,key)

```

Or

```python
max(iterable,*iterable, key,default)

```

As you can see, there are different parameters for different syntax in the python max() function.

Let's check them one by one

## max() function with objects

It helps us to find the highest value object between two or more objects. As we can see this syntax:

```python
max(n1,n2,n3,*n,key)

```

### max() parameters

* **n1** \- an object; can be a number, string, etc.  
* **n2** \- an object; can be a number, string, etc.  
* **n3**  \- an object; can be a number, string, etc.  
* **\*n (optional)** \- any number of objects.  
* **key (optional)** \-  key function where each argument is passed, and comparison is performed based on its return value

Let's check some examples of max() functions with objects.

### Example 1:How to find maximum value among, given numbers?

```python
result = max(2,56,-2,72,-83)
print("The largest number is:",result)

```

Output:

```python
The largest number is: 72

```

### Example 2: How to find maximum value among given variables?

```python
num1 = 34
num2 = 2
num3 = -65
num4 = 92
num5 = -21

result = max(num1,num2,num3,num4,num5)
print("The largest number is:",result)

```

Output:

```python
The largest number is: 92

```

## max() function with iterable

It helps us to find the highest value from an iterable. As we can see this syntax:

```python
max(iterable, *iterable, key,default)

```

### max() parameters

* **iterable** \- an iterable that can be list, tuple, set, dictionary, etc.  
* **\*iterable** \- any number of iterables: can be more than one.  
* **key (optional)** \- key function where the iterables are passed and comparison is performed based on its return value  
* **default (optional)** \- a default value if the given iterable is empty.

### Example 3: Find largest item from a list.

```python
numbers = [7,1,-6,2,8,10]
print("The largest number is:",max(numbers))

```
The output will be as follows.

```python
The largest number is: 10

```

## Rules of max() function

* If an empty iterator is passed without a default parameter, it will raise a ValueError exception.  
* If the multiple iterators are passed, the largest value item from the given iterators will return. 

If you want to learn about finding the smallest or lowest value item, you can use the Python min() function.