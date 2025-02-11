---
title: Python List insert()
description: In this tutorial, we will learn about the python insert() method.
date: 2025-01-18 23:28:25 +0800
categories: [Python List reference]
tags: [Python List reference]
image:
 path: /commons/Python List insert().png
 alt: Python List insert()
---

Syntax of python list insert():

```python
list.insert(index, element)

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
## insert() Parameters:

The inser() methods takes two parameters as arguments.

* **index** \- the index or position where the elements needs to be inserted.  
* **element** \- the element to be inserted in the list(can be integer, string , list or any python data types).


Lets check an example of insert() method.

```python
Example 1: How to insert element in the list?

nums = [5,2,4,6,1,9]

print("List before insert() method: ",nums)

nums.insert(5,10)

print("List after insert() method: ",nums)

```

The output will be as follow:

```python
List before insert() method:  [5, 2, 4, 6, 1, 9]
List after insert() method:  [5, 2, 4, 6, 1, 10, 9]
```

## Rules of list insert() method

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
* In insert() method it is compersuly to give index of the list to add the element.  
* insert() method will not return anything.  
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
* Python list index starts from 0 so insert() method will work accordingly.