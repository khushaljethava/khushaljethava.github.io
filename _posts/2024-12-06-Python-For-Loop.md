---
title: Python For Loop
description: In this tutorial, we will learn about the python loop. which is used to iterable or iterator to our python code.
date: 2024-12-06 10:26:00 +0800
categories: [Python]
tags: [python]
image:
  path: /commons/Python For Loop.png
  alt: Python For Loop

---

## What is a for loop in Python?

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
A for loops in python is used to iterate over a sequence, a list, a tuple, a dictionary, a set, or a string. With for loop, we can execute a particular set of statements one at each time.

Iterating over a sequence is called traversal.

python for loop syntax

```python
for variable in sequence:
	Statement of for 
```
Here, we are taking a variable with a value as an item inside the sequence on each iteration. Loop will continue until we reach the last item in the series. 

Let’s take an example of a simple for loops python.

```python
# Program to print all the items in a list

# List of Items

Items = [1,'Two', 3.1,"FOUR",5]

# iterate over the list
for i in Items:		# Assigning i as an variable
	print(i)		# Printing a variable 
```

The output of for loop

```python
1
Two
3.1
FOUR
5
```
We can also use a for loop with String using the following method.

Example of for loop using string.

```python
# Program to print letters in a string using for loop.

text = "Python"

for i in text:
	print(i)
```


The output of the above program.

```python
P
y
t
h
o
n
```

Example of the addition of the list using for loop

```python
# Program to find the sum of all numbers stored in a list

# List of numbers
numbers = [6, 5, 3, 8, 4, 2, 5, 4, 11]

# variable to store the sum
sum = 0

# iterate over the list
for val in numbers:
	sum = sum+val

print("The sum is", sum)
```

	

Output:

```python
The sum is 48
```

When we run this program, the loop will take each item in the list in the val variable and then make an addition with the variable sum until the sequence is completed.

## Nested for loop

We can also add multiple loops inside a loop. 

Syntax of nested for loop

```python
for variable1 in sequence:
	for variable1 in sequence:
	Statement of for
```

![][image1]

Let see an example of a nested loop.

```python
adj = ["red", "big", "tasty"]
fruits = ["apple", "banana", "cherry"]

for x in adj:
  for y in fruits:
    print(x, y)
```

The output of nested for loops python.

```python
red apple
red banana
red cherry
big apple
big banana
big cherry
tasty apple
tasty banana
tasty cherry
```

## for loop with else statement

We can also use an else statement in for loop just like if conditional statement. The else part is executed if the items in the sequence used in for loop exhausts.

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
Syntax of for loop with else

```python
for variable in sequence:
	Statement of for 
else:
	Statement of else
```

![][image2]

Example of for loop with else statement

```python
# Program will print the statement inside else statement whenever the for will be exited.

# List of numbers

numbers = [1,4,6,0,1]

for i in numbers:	#calling for loop by using i as an variable
	print("printing the number:", i)		# printing i variable
else:
	print("No items left, so else statement is executed")

```

When we run the program, we get the following output:

```python
printing the number: 1
printing the number: 4
printing the number: 6
printing the number : 0
printing the number: 1
No items left, so else statement is executed
```

As you can see, the program prints all the items in the list, and once the last item is printed and for loop has no sequence to execute, it will exit from the loop, and the else statements we executed.

## 

 

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
[image1]: <data:image/png;base64,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>

[image2]: <data:image/png;base64,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>


<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4181667199679058"
     crossorigin="anonymous"></script>