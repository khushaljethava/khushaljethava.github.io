---
title: Python pass function
description: In this tutorial, we will learn all about the python pass function.
date: 2024-12-16 12:13:00 +0800
categories: [Python]
tags: [python]
image:
  path: /commons/Python pass function.png
  alt: Python pass function 

---

## What is Python pass function 

Pass in python is used as a placeholder for future statements and code. Python pass function the null statement which does nothing in python. The null statement will return nothing or null when we execute a pass statement.

The pass statement is useful when you are dealing with very large code when you have to work on multiple conditional statements, loops, or in-class and custom functions.

Syntax

The syntax of the pass statement is:

```python
pass
```

Let see an example of a pass statement with if..else conditional statement.

```python
if 1 < 5:
    pass
else:
    print("End of if condition")
```

Output:

As we can see it's not giving any result when the given conditional is true but as we are using pass statement it is passing the flow to the next piece of code.


## Pass statement with for loop 

```python
for letter in 'Python': 
   if letter == 'h':
      pass
      print("This is pass block")
   print("Current Letter :", letter)
print("Good bye!")
```

When we execute the program we will get the output:

```python
Current Letter : P
Current Letter : y
Current Letter : t
This is pass block
Current Letter : h
Current Letter : o
Current Letter : n
Good bye!
```

As we can see we are printing letters using for loop and we have given the condition that if letter equal to h statement inside the if conditional should be executed and when the conditional get true we are calling pass statement and a print statement and as we can see python is skipping the pass statement and just print the given string inside the if condition.

## Pass statement with the while loop

As we know there are two loops in python, so just like for loop we can also use the same with while loop as follows.

Example of While loop with pass statement,

```python 
while range(1,5):  
	pass
```  
As we can see it not returning any output because we have use pass statement within the first statement inside the while loop.

## Pass statement with functions

We can use pass statements in custom functions also, you can learn more about functions in upcoming tutorials.

Example:

```python
def function_name:
	pass
```

## Pass statement with class

Just like a function, we can use a pass statement in class also.

```python
class class_name:
	pass
```

