---
title: Python input() Method
description: In this tutorial, we will learn about python input() method and its uses with  examples.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python input() Method.png
 alt: Python input() Method
---

The python input() method allows users to take input and store the imputed value in a variable as a string.

The syntax of input() method is:

```python
input(prompt)

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
## Python input() Method Parameters

The input() method takes only one optional argument:

* **prompt (Optional)** \- a setting that represents a message before the input. (By default, it will take input as a string.

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
Let’s see the same example of the input() method in python.

### Example 1: How to use the input() method in python?

```python
# Taking input from a user without any message

user_Input = input()

print("The inputted value is:", user_Input)

```

Output:

```python
Python
The inputted value is: Python

```

### Example 2: Input() method with prompt message.

```python
# Taking input from the user with a message

user_Input = input("Enter anything:")

print("The inputted value is:", user_Input)
```

The output will be as follow:

```python
Enter anything: Python
The inputted value is: Python
```

In the above program, we can see that when we run the program is returning a prompt, and in the same line, we can input the value, and after that, it is storing it in the user\_Input variable.

The input() will automatically take input as a string, but we can use int() and float() to take input as in an integer and float. 

### Example 3: Taking input as integer and float in input() method.

```python
# Taking input in integer and float

user_Input = int(input("Enter anything:"))

print("The inputted value is:", user_Input)
print(type(user_Input))


user_Input = float(input("Enter anything:"))

print("The inputted value is:", user_Input)
print(type(user_Input))

```

The output will be as follows.

```python
Enter anything:25
The inputted value is: 25
<class 'int'>
Enter anything:25
The inputted value is: 25.0
<class 'float'>
```

This is how you can take input from users into different data types.

## Rules of input() method

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
* The input() method reads a line from the input (usually from the user), converts the line into a string by removing the trailing newline, and returns it.  
    
* If EOF is read, it raises an EOFError exception.