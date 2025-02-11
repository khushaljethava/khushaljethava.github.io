---
title: Python While Loop
description: In this tutorial, we are going to understand the while loop in python.
date: 2024-12-06 11:12:00 +0800
categories: [Python]
tags: [python]
image:
  path: /commons/Python While Loop.png
  alt: Python While Loop

---


## What is Python While Loop?

The while loop in python is used to execute a set of statements until the given test expression or condition is true. 

Syntax of python while loop.

```python
while test_condition:
	statements
```

As we can see in the above syntax, we are first using the while keyword to implement the while loop, and we are giving test conditions, and in the while loop, we are giving the body of while with some statements.

The loop will test the condition, and it will run statements in the body only if the giving condition is true, just like for loop while in python again checking the condition. Once the condition gets false it will exit from the loop.

![][image1]  
Example of Python while loop

```python
# Program to print the numbers until the given condition is true.


i = 1		# Declaring variable 

while i < 10:	# implementing while loop with 
	print(i)  # printing the variable
	i += 1	# Adding increment in i by +1
```

When we run the following program, we will get the below output:

```python
1
2
3
4
5
6
7
8
9
```

**Note**: remember to add increment in i, or else the loop will continue forever.

Same as numbers, we can also print strings inside a while loop.

Example of while loop using string.

```python
# Program will print the given string as long as the given condition is fulfilled as true.

i=1

while i < 5:
	print("Hello Python")
	i += 1
```

The output of the above program:

```python
Hello Python
Hello Python
Hello Python
Hello Python
```

As in python index starts from 0, it is only printing strings for 4 times only. Because in python calculations begin to like :

## Nested while loops

In nested while loop, we can add while loop within while loop as a body of while loop.

```python
while test_condition:
	while test_condtion:
		statements 
		statements
```

Let see an example of nested while loops.

```python
i=1
while i<=3 :
    print(i,"Outer loop")
    j=1
    while j<=3:
        print(j,"Inner loop")
        j+=1
    i+=1
```

When we execute this program, we will get the following result.

The output of nested while loop

```python
1 Outer loop
1 Inner loop
2 Inner loop
3 Inner loop
2 Outer loop
1 Inner loop
2 Inner loop
3 Inner loop
3 Outer loop
1 Inner loop
2 Inner loop
3 Inner loop
```

## While loop with else statement 

Using else statements in the while loop can run a set of code once when the given condition is no longer true.

Example of While loop with else statement.

```python
i = 1
while i < 6:
  print(i)
  i += 1
else:
  print("i is no longer less than 6")
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
The output of following the program.

```python
1
2
3
4
5
i is no longer less than 6
```

## 

## Loop Control Statements

Loop control statements mean a conditional statement as a body of a while loop. We can add multiple condition statements using a conditional statement based on the loop sequence of the loop.

Syntax:

```python
while test_condition:
	statements
	if condition:
	statements
```

Let see an example of the loop control statement:

```python
# Program will print the string as while loop sequence gets value 5 in 10 numbers.

number = 1
while number < 10:
	if number == 5:
		print("Here if conditional statement is executed")
	print(number)
	number += 1
print("End of the loop")
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
When we run this program, we will get the following output:

```python
1
2
3
4
Here if conditional statement is executed
5
6
7
8
9
End of the loop
```

In the code above program, we can see while loop executes the statements in between the while loop body and when every while loop is getting 5 as a value. It will go to if conditional statement, and the string will be executed once the value of the number is 5\.

## break Statement

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
With the break statement in the while loop, we can stop the while loop even after the given condition is true:

```python
# Program will stop the loop as soon as while loop sequence will get value 3

i = 1

while i < 6:
	print(i)
	if i == 3:
		break
	i += 1

```

Output:

```python
1
2
3
```

## continue Statement

The Python continue statement immediately terminates the current loop iteration.

```python
n = 5
while n > 0:
	n -= 1
	if n == 2:
		continue
	print(n)
print("Loop ended")
```

Output:

```python
4
3
1
0
Loop ended
```

## One-Line while Loops

As with an if statement, a while loop can be specified on one line. If there are multiple statements in the block that makes up the loop body, they can be separated by semicolons (;)

```python
while n > 0: n -= 1; print(n)
```

Output:

```python
4
3
2
1
0
```

## Infinite While Loops

As the name suggests, an infinite loop will continually execute statements in a while loop until the user stops manually, like we write a while loop that theoretically never ends.

Sound interesting. Let sees the example.

```python
i = True

while i == True:
    print("Infinite")
```

Same code we can write differently as follow.

```python
while True:
    print("Infinite")
```

Output:

```python
Infinite
Infinite
Infinite
Infinite
Infinite
Infinite
Infinite
Infinite
Infinite
Infinite
Infinite
Infinite
Infinite
Infinite
Infinite
Traceback (most recent call last):
  File "/home/Python/whileloop.py", line 4, in <module>
    print("Infinite")
KeyboardInterrupt

```

We are printing Infinite continuously until we stop using the Crt \+ X key using the keyboard and are also throwing an error.

[image1]: <data:image/png;base64,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>

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4181667199679058"
     crossorigin="anonymous"></script>