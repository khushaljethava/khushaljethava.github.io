---
title: Python range() function
description: In this tutorial, we will learn about a fantastic function call range in python.
date: 2024-12-09 09:01:00 +0800
categories: [Python]
tags: [python]
image:
  path: /commons/Python range() function.png
  alt: Python range() function

---


## Python range() function

The Python range() function is used to generate a sequence of numbers. The sequence will start from 0 by default and increment by 1, and stops before a specified number.

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

* **start \-** is used to give an integer to start from which sequence of integer to be returned.  
* **stop** \- is used to given an integer to stop the sequence with the last number from the number given in stop like stop \- 1\.  
* **step** \- integer value which determines the increment between each integer in the sequence.


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
Let see a basic example of the range() function.

Example of range() function with only stop parameters

```python
x = range(5)	# Adding returned value of range function using stop parameters its like start=0,     stop=5, step=1

for i in x: 	# implementing for loop to print the sequence of the range function.

    print(i)	# printing the i variable from the loop
```

The output of the program.

```python
0
1
2
3
4
```
As we can see, based on the range function, it is printing the sequence, and as the python index starts from 0, it is only printing it till 4\.

Let's check the type of range() function.

```python
print(type(range(1)))
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
Output:

```python
<class 'range'>
```
Let's take an example of a python range() function with its all parameters.

```python
number = range(1,5,1)

for i in number:
    print(i)
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
The output of the following program.

```python
1
2
3
4
```

We can notice we have given the start parameter 1 in the range() function, so we are getting 1 as an index.

Let's do some changes to the above program.

```python
number = range(1,10,2)

for i in number:
    print(i)
```

Output:

```python
1
3
5
7
9
```

## **Reverse Range in Python range() function**

We have seen range function examples with increments and now let see how we can make a decrement sequence in the range() function.

We can do reverse range by taking negative value in step parameter.

Example to reverser range in python range() function.

```python
for i in range(15,1,-1):
    print(i)
```

The output of the following program.

```python
15
14
13
12
11
10
9
8
7
6
5
4
3
2
```

## Python range() function with While loop

As we have seen an example with for loop, we will see while loop example with range() function.

Example of while loop

```python
number = 1
while number in range(1,5):
    print("Python")
    number += 1
```

Output:

```python
Python
Python
Python
Python
```

## Python range function in the list

By using a list with a range() function we can directly generate a sequential list quickly.

Let's check one example.

```python
print(list(range(1,5))

print(typelist(range(1,5))
```

Output :

```python
[1, 2, 3, 4]
<class 'list'>
```

As we can see, we are using the list keyword and adding a range function as a parameter, and it giving us a list with the is number sequence, and then we are checking the type of the same function.


<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4181667199679058"
     crossorigin="anonymous"></script>