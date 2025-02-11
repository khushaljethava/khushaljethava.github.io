---
title: Python List extend()
description: We can only take any iterable as argument in extend() method.
date: 2025-01-18 23:28:25 +0800
categories: [Python List reference]
tags: [Python List reference]
image:
 path: /commons/Python List extend().png
 alt: Python List extend()
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
<script type="text/javascript" src="https://www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
In this tutorial, you will learn about the python list’s extend() method using some examples.

In exetend() method  you can add elements from other iterables to the end of the current list.

The syntax of extend() method is:

```python
list.extend(iterable)

```
## Python List extend()

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
We can only take any iterable as argument in extend() method.

Let see an example of python list’s extend() method.

**Example 1: How to use extend() method in python list?**

```python
first_list = [1,2,3,4,5]
second_list = ['six','seven','eight']

print(first_list)
print(second_list)

#using extend() method

first_list.extend(second_list)

print(first_list)

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
The output will be as follow.

```python
[1, 2, 3, 4, 5]
['six', 'seven', 'eight']
[1, 2, 3, 4, 5, 'six', 'seven', 'eight']

```

We can also add elements from other object like tuple, set, 

**Example  2: Using list extend() method with other iterables.**

```python
first_list = [1,2,3,4,5]
second_tuple = ('six','seven','eight')
third_set = {9,10,11}

print("This list is:",first_list)
print("The tuple look like:",second_tuple)
print("The set looks like :",third_set)

#using extend() method

first_list.extend(second_tuple)

print("List after adding tuple:", first_list)

first_list.extend(third_set)

print("Final list after adding set will be:",first_list)

```

**Output:**

```python
This list is: [1, 2, 3, 4, 5]
The tuple look like: ('six', 'seven', 'eight')
The set looks like : {9, 10, 11}
List after adding tuple: [1, 2, 3, 4, 5, 'six', 'seven', 'eight']
Final list after adding set will be: [1, 2, 3, 4, 5, 'six', 'seven', 'eight', 9, 10, 11]

```

## Rules of python list extend()

There is no such rule to implement extend() method but it takes only iterable as an argument.