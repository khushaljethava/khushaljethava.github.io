---
title: Python Type Casting or Type Conversion
description: In this tutorial, we will learn about Python Type Casting by using python type conversion.



date: 2024-11-27 11:33:00 +0800
categories: [Python]
tags: [python]
image:
  path: /commons/Python Type Casting or Type Conversion.png
  alt: Python Data Types
---

To understand python typecasting, we need a basic understanding of data types(Link to Data Type page).

## What is Type Casting in python?

Typecasting is changing the data type of a variable, which can help day-to-day competitive programming.

In python, there are two types of Type conversion:

1) Implicit Type Conversion  
2) Explicit Type Conversion

Let us understand python typecast one by one.

## Implicit Type Conversion

When the python interpreter automatically changes the data type without programmer intervention, it is called Implicit type conversion. Object’s data type. 

## Let see a simple example of implicit type conversion in python.

Example:

```python
X = 2

print("The type of X variable is :" , type(X))

Y = 3.5

print("The type of Y variable is :" , type(Y))

X = X + Y
print(X)
print("After addition the type of X variable is : ", type(X)) 
```

When we execute the above program, we will get the following result.

Output:

```python 
The type of X variable is : <class 'int'>
The type of Y variable is : <class 'float'>
5.5
After addition the type of X variable is :  <class 'float'>
```

Here we are taking the X variable as Integer and the Y variable as a float. Then we are adding Y’s value, which is a float with Value of X, which is Integer when after the addition, we are getting output as 5.5 in a float. We can also see that after the addition, the data type of X is also changed to float from an integer automatically by the python interpreter; this is how Implicit type conversion works.

This type of conversion is also called UpCasting.

## Explicit Type Conversion

Unlike Implicit type conversion, in explicit type conversion, we have to manually convert the data type of an object Object’s data type. 

We can use the following predefined functions to perform explicit type conversion.

* **int()**  
* **float()**    
* **str()**   
* **bool()**  
* **complex()**  
* **list()**  
* **set()**  
* **tuple()**  
* **dict()**  
* **chr()**  
* **ord()**  
* **hex()**  
* **oct()**  
  


## int()

The int() function converts the base of any number or a string to an integer.

Let us check an example of the int() function.

```python
X = int(2)
print("The type of X variable is: ", type(X))

Y = 3.4
Y = int(Y)
print(Y)
print("The type of Y variable is: ", type(Y))


Z = "54"
Z = int(Z)
print("The type of Z variable is: ", type(Z))

print(int(True))

print(int(False))
```

The output will be as follows.

```python
The type of X variable is:  <class 'int'>
3
The type of Y variable is:  <class 'int'>
The type of Z variable is:  <class 'int'>
1
0
```

In the above program,

We are declaring variable X using the int() function.

We are declaring variable Y with a float. Then we convert it using the int() method from float to integer.

We are declaring variable Z with string, and then we are converting it to an integer.   
We convert the Boolean value to an integer which refers to True as 1 and false as 0\.

Note: 

1) We can only convert string if an only string has a base with 0-9. We cannot convert a string like A-Z to the integer using int()  
2) We cannot convert complex datatypes to an integer.

## Python float() 

This function is used to convert any data types of a float number.

For Example 

```python
X = float(2.1)
print("The type of X variable is: ", type(X))

X1 = float(1) 
print(X1)

Y = 31
Y = float(Y)
print(Y)
print("The type of Y variable is: ", type(Y))


Z = "3.7"
Z = float(Z)
print("The type of Z variable is: ", type(Z))

print(float(True))

print(float(False))
```

When we run the above code, we will get the following output:

The type of X variable is:  \<class 'float'\>

```python
1.0
31.0
The type of Y variable is:  <class 'float'>
The type of Z variable is:  <class 'float'>
1.0
0.0
```

Note: 

3) We can only convert string if the only string has a base with 0-9. We cannot convert a string like A-Z to the integer using float()  
4) We cannot convert complex data types to float.

## Python  str()

This function is used to convert data types like integer or float into a string.

```python
X = str(1)
Y = str(3.7)
Z = str(10+5j)
bool1 = str(True)
bool2 = str(False)

print("The type of variable X is :", type(X))
print("The type of variable Y is :", type(Y))
print("The type of variable Z is :", type(Z))
print("The type of variable bool1 is :", type(bool1))
print("The type of variable bool2 is :", type(bool2))
```

The output will be as follows.

```python
The type of variable X is : <class 'str'>
The type of variable Y is : <class 'str'>
The type of variable Z is : <class 'str'>
The type of variable bool1 is : <class 'str'>
The type of variable bool2 is : <class 'str'>
```

## Python  bool()

This function is used to convert any data type to a boolean data type easily.

Example:

```python
X = bool(0)
Y = bool(1)
Z = bool(3.7)
A = bool("Python")
B = bool("")
C = bool(-23)

print(X)
print(Y)
print(Z)
print(A)
print(B)
print(C)
```

Output

```python
False
True
True
True
False
True
```

With the help of the bool function, we can convert any type of data type into a boolean. The output will be \- For all values, it will produce True except for an empty String.

## Python complex()

This function is used to convert natural numbers to complex numbers. However, If we want to convert X and Y into complex numbers, X will be the real part, and Y will be the imaginary part.

Example:

```python
X = 2
Y = 5

Z = complex(X,Y)

print(Z)
print("The Type of Z variable is:", type(Z))

A = True
B = False
C = complex(A,B)
print(C)
print("The Type of C variable is:", type(C))
```

The output will be as follows.

```python
(2+5j)
The Type of Z variable is: <class 'complex'>
(1+0j)
The Type of C variable is: <class 'complex'>
```

## Python list()

This function is used to convert any data type into a list type.

Example:  
 
```python
my_tuple = (1,2,4,5)
my_set  = {'P','Y','T','H','O','N'}
my_string  = "HelloWorld"

my_tuple = list(my_tuple)
print(my_tuple)
print("The type of my_tuple is:", type(my_tuple))


my_set = list(my_set)
print(my_set)
print("The type of my_set is:", type(my_set))


my_string = list(my_string)
print(my_string)
print("The type of my_string is:", type(my_string))
```

Output:

```python
[1, 2, 4, 5]
The type of my_tuple is: <class 'list'>
['T', 'O', 'H', 'P', 'Y', 'N']
The type of my_set is: <class 'list'>
['H', 'e', 'l', 'l', 'o', 'W', 'o', 'r', 'l', 'd']
The type of my_string is: <class 'list'>
```

## Python set()

This function is used to convert any datatypes to a set.

Example:

```python
my_tuple = (1,2,4,5)
my_list  = ['P','Y','T','H','O','N']
my_string  = "HelloWorld"

my_tuple = set(my_tuple)
print(my_tuple)
print("The type of my_tuple is:", type(my_tuple))


my_list = set(my_list)
print(my_list)
print("The type of my_list is:", type(my_list))


my_string = set(my_string)
print(my_string)
print("The type of my_string is:", type(my_string))
```

The output will be as follows.

```python
{1, 2, 4, 5}
The type of my_tuple is: <class 'set'>
{'T', 'P', 'Y', 'N', 'O', 'H'}
The type of my_list is: <class 'set'>
{'d', 'e', 'W', 'l', 'o', 'r', 'H'}
The type of my_string is: <class 'set'>
```

## Python tuple()

This function is used to convert data types to a tuple.

Example

```python
my_list = [1,2,4,5]
my_set  = {'P','Y','T','H','O','N'}
my_string  = "HelloWorld"

my_list = tuple(my_list)
print(my_list)
print("The type of my_list is:", type(my_list))


my_set = tuple(my_set)
print(my_set)
print("The type of my_set is:", type(my_set))


my_string = tuple(my_string)
print(my_string)
print("The type of my_string is:", type(my_string))

```

The output will be as follows.

```python
(1, 2, 4, 5)
The type of my_list is: <class 'tuple'>
('P', 'H', 'T', 'N', 'Y', 'O')
The type of my_set is: <class 'tuple'>
('H', 'e', 'l', 'l', 'o', 'W', 'o', 'r', 'l', 'd')
The type of my_string is: <class 'tuple'>
```

## Python dict()

This function is used to convert a tuple with key and value of order into a dictionary.

```python
my_tup = (('a',1),('b',2),('c',3))
print(my_tup)

my_tup = dict(my_tup)

print(my_tup)

print("The type of my_tup is :", type(my_tup))
```

The output will be as follows.

```python
(('a', 1), ('b', 2), ('c', 3))
{'a': 1, 'b': 2, 'c': 3}
The type of my_tup is : <class 'dict'>

## Python chr() 

This function is used to convert numbers to their corresponding ASCII character.

```python
X = 65
Y = 97
Z = 33
print(chr(X))
print(chr(Y))
print(chr(Z))
```

The output will be as follows.

```python
A
a
!
```

## Python ord()

This function is used to convert a character to an integer.

```python
X = 'P'

print(ord(X))
```

Output:

```python
80
```

## Python hex()

This function is used to convert integers to hexadecimal strings.

Example:

```python
X = 80

print(hex(X))
```

Output:

```python
0x50
```

## Python oct()

This function is used to convert integers to octal strings.  
Example:

```python
X = 80

print(oct(X))
```

Output:

```python
0o120
```

## 

## 


<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4181667199679058"
     crossorigin="anonymous"></script>