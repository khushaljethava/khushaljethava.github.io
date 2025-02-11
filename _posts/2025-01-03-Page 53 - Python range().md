---
title: Python range()
description: The Python range() function is used to generate a sequence of numbers. The sequence will start from 0 by default, increment by 1, and stop before a specified number.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python range().png
 alt: Python range()
---

Syntax 1

```python
range(stop)

```

Syntax 2 

```python
range(start, stop, step)

```

Based on the syntax, we can see the range is a keyword to implement the range function, and then in between two brackets () we have parameters like start, stop and steps let learn them in detail.

## Python range() parameters

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
* **start \-** is used to give an integer to start from which sequence of integer to be returned.  
* **stop** \- is used to given an integer to stop the sequence with the last number from the number given in stop like stop \- 1\.  
* **step** \- integer value which determines the increment between each integer in the sequence.


Let see a basic example of the range() function.

Example of range() function with only stop parameters

```python

x = range(5)	# Adding returned value of range function using stop parameters its like start=0,     stop=5, step=1

for i in x: 	# implementing for loop to print the sequence of the range function.

    print(i)	# printing the i variable from the loop

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
The output of the program.

```python
0
1
2
3
4

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
## Rules of range()

You can get more details about the Python range() function from here.