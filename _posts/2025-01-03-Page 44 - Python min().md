---
title: Python min() Method
description: The min() method returns the item with the smallest value or the item with the smallest value in an iterable.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python min() Method.png
 alt: Python min() Method
---

The syntax of min() method:

There are two different syntaxes of min() that can be used in python.

```python
min(n1, n2, n3, *n,key)

```

<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 300,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
Or

```python
min(iterable,*iterable, key,default)

```

As you can see, there are different parameters for different syntax in the python min() method.

Let's check them one by one

## Python min() method with objects

It helps us to find the lowest value object between two or more objects. As we can see this syntax:

```python
min(n1,n2,n3,*n,key)

```

### min() parameters

* **n1** \- an object; can be a number, string, etc.  
* **n2** \- an object; can be a number, string, etc.  
* **n3**  \- an object; can be a number, string, etc.  
* **\*n (optional)** \- any number of objects.  
* **key (optional)** \-  key method where each argument is passed, and comparison is performed based on its return value

Let's check some examples of min() methods with objects.

### Example 1:How to find minimum value among given numbers?

```python
result = min(2,56,-2,72,-83)
print("The smallest number is:",result)

```

Output:

```python
The smallest number is: -83

```

### Example 2: How to find minimum value among given variables?

```python
num1 = 34
num2 = 2
num3 = -65
num4 = 92
num5 = -21

result = min(num1,num2,num3,num4,num5)
print("The smallest number is:",result)

```

Output:

```python
The smallest number is: -65

```

## min() method with iterable

It helps us to find the lowest value from an iterable. As we can see this syntax:

```python
min(iterable, *iterable, key,default)

```
<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 300,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>

<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 300,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
### min() parameters

* **iterable** \- an iterable that can be list, tuple, set, dictionary, etc.  
* **\*iterable** \- any number of iterables: can be more than one.  
* **key (optional)** \- key method where the iterables are passed and comparison is performed based on its return value  
* **default (optional)** \- a default value if the given iterable is empty.

### Example 3: Find smallest item from a list.

```python
numbers = [7,1,-6,2,8,10]
print("The smallest number is:",min(numbers))

```

The output will be as follows.

```python
The smallest number is: -6

```

## Rules of min() method

* If an empty iterator is passed without a default parameter it will raise a ValueError exception.  
* If the multiple iterators are passed, the smallest value item from the given iterators will return. 

If you want to learn about how to find the smallest or lowest value item, you can use the Python min() method

ADD examples of string and dictionary in future.

#