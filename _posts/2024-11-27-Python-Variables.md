---
title: Python Variable
description: In this tutorial, we will learn about python variables, data types, and their use cases.

date: 2024-11-27 11:33:00 +0800
categories: [Python]
tags: [python]
image:
  path: /commons/Python Variable.png
  alt: Python Variable
---


As we learn Keywords and identifiers in previous tutorials now, we will learn about how to use them using variables.

## Python Variable

Variables are used to store values in reserved memory locations. Variables are created at the moment when they are first declared at runtime. It does not need any keywords or any particular data type to declare it.  Variables are declared based on identifiers.

## Assigning the Variable 

Variables are assigned based on the data types. It will automatically assign a value to a variable when we use an equal sign (=) to the variable.

### Declaring and assigning value to a variable

Example 1: Declaring a single variable.

```python
software = "Python"
print(Software)
```

Output

```python
Python
```

As you can see, we have stored a string in a variable call software, and then we are printing the variable.

Example 2

```python
X = "Python" # X is a String
Y = 2        # Y is an Integer
Z = 3.14     # Z is a float
print(X)
print(Y)
print(Z)
```

Output

```python
Python
2
3.14
```

In the example, we are declaring string, Integer, and float to variables.

## Assigning Multiple Variables

We can assign multiple variables in different methods, just like assigning multiple variables in statements and multiple variables with multiple values.

### 

### Method 1 \# Multiple variables with a single value.

```python
x = y = z = 10
print(x)
print(y)
print(z)
```

Output

```python
10
10
10
```

Here we are assigned an int value in more than one variable in one statement.

### Method 2 \# Multiple variables and multiple values.

Example 1 :

```python
x , y , z =  10, 11, 12
print(x)
print(y)
print(z)
```

Output

```python 
10
11
12
```

Example 2:

```python
x ,y, z  = 2021 , 3.7  , "Python"

print(x)
print(y)
print(z)
```

Output

```python
2021
3.7
Python
```

In this example, we are assigning multiple values in multiple variables.

### Changing the value of a variable

We can change the value of the variables at the time of runtime when we reassign them.

```python
X = 9

print(X)

X = "Python"


print(X)
```

Output

```python
9
Python
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
As you change, see in the example first we are assigning the int value to the variable X, and then after that, we are reassigning variable X with a String, and this is how we can reuse the same variable multiple times.

### Casting of Variables

If you want to specify the data type of a variable, this can be done with casting.

Example

```python 
X = str(3)
Y = int(3)
Z = float(3)
print(X)
print(Y)
print(Z)
```

Output

```python
3
3
3.0
```

## Right Way to assign variable in Python

To assign a variable in python or any other language, we need to follow specific rules to declared variables as per data type.

Rule 1: A variable always starts with a letter or an underscore (\_).  
	Example  \_x1 \= "Pycharm" , \_1 \= 11  is allowed but 1x \= 2 is not allowed.

```python
1x = 2
_x1 = "Pycharm"
_1 = 11
```
Output

```python

File "<string>", line 1
    1x = 2
     ^
SyntaxError: invalid syntax
```

Rule 2: When we assign a string in a variable, it should be Single to Double quotes; they both are the same.

Example:

```python
X = "Khus"

Y = 'Khus'

print(X)
print(Y)
```
Output

```python
Khus
Khus
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
Rule 3: Python is a Case-Sensitive Programming language that means   
	X \= 3 and x \= "Python" is completely different.

Example  
	
```python
X = 3
# This both are different 
x =  "Python"
print(X)
print(x)
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
## del Function in Python

The Python del keyword is used to del objects like variables and functions m classes. We will see the del keyword in future tutorials as it is going to be used in all other python tutorials. In  
Python everything is an object, so the del keyword can also be used to delete tuple, lists, or parts of a list, etc.

Example   
	
```python
X = "Python"
del X
print(X)
```

Output 

```python
Traceback (most recent call last):
  File "Del_Keyword.py", line 4, in <module>
    print(X)
NameError: name 'X' is not defined
```

As you can see in the example, we have implemented a string variable, and then using the del keyword, we are deleting the variables. Then we are printing the same variable. As we have deleted the variable we got, the error with “X is not defined” means the Python interpreter could not find the variable.

## type() function in python

Python has a lot of built-in functions, and the type() is one of them.  
The type() function is used to get the type of the data type of that particular object.

Example 1:

```python
X = 1
print(type(X))
```

Output

```python
<class 'int'>
```

As we can see in the above example, we assign an integer value to a variable, and then we print that variable inside the type function. We are getting the output of that particular variable as data types.

Example 2:

```python
X = 1
Y = 3.7
Z = "Python"

print(type(X))
print(type(Y))
print(type(Z))
```

Output

```python
<class 'int'>
<class 'float'>
<class 'str'>
```

In this example, we are assigned an integer, float, and a string, then we are printing their type, and as we can see, we got the output of their types.

We can also check the type of all the objects and functions on python using the type() function. As an example, we will take the print function.

Example 

```python
print(type(print))
```

Output 

```python
<class 'builtin_function_or_method'>
```

### Tips for Python Variables 

1) Variable names should have a combination of letters in lowercase (a to z) or uppercase (A to Z) or digits (0 to 9\) or an underscore (\_).  
2) Create a name that makes sense. For example, computers make more sense than C.  
3) If you are creating a variable name having two words, use underscore to separate them.  
4) Use capital letters possible to declare a constant.  
5) Never use special symbols like \!, @, \#, $, %, etc.  
6) Do not start a variable name with a digit.  
7) Only use the del function if necessary.   
8) Try to practice type functions in all other python functions you learn in the future.



<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4181667199679058"
     crossorigin="anonymous"></script>