---
title: Python Operators

description: This tutorial will learn about all the different types of python operators and their syntax and use them in real-time with examples.

date: 2024-12-02 2:55:00 +0800
categories: [Python]
tags: [python]
image:
  path: /commons/Python Operators.png
  alt: Python Operators

---


First, let's understand what exactly Operators are.

## What are Python Operators?

Python Operators are special symbols used to perform mathematical and logical operations and computations on values or variables.  

Values used by python operators are called the operand.  
	(Idle Example for Operators Image)

## Types of Python Operators

Python programming language supports seven types of operators.

* Arithmetic Operators  
* Comparison (Relational) Operators  
* Assignment Operators  
* Logical Operators  
* Bitwise Operators  
* Membership Operators  
<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
* Identity Operators


Let us study all the operators one by one.

## Python Arithmetic Operators

Arithmetic operators are used to doing mathematical calculations on values and variables.

| Operator | Description | Example |
| ----- | :---- | :---- |
| \+ Addition | An addition Operator is used to make the addition of two or more variables or values. | X \+ Y \= 2 1 \+ 1 \= 2 |
| \- Subtraction | Subtraction operator is used to subtracting two or more variables or values. | Y \- X \= 1 3 \- 1 \= 1 |
|  \* Multiplication | Multiplication operator is used to multiplying two or more variables or values. | X \* Y \= 4 2 \* 2 \= 4 |
| / Division | Division operator is used to divide two or more variables or values. | X / Y \= 2 4 / 2 \= 2 |
| % Modulus | The modulus operator is used to find the remainder of two or more variables or values. | X % Y  \= 1 10 % 3 \= 1 |
| \*\* Exponent | The exponent operator is used to find the power of the two or more variables or values. | X \*\* Y \= 64 2 \*\* 6 \= 64 |
| // Floor Division | The Floor Division is used to divide the first operand by the second. | X // Y \= 3 10 // 3 \= 3 |

Now let's take an example of all the arithmetic operators in one program.

```python
X = 10
Y = 2
Z = 6

# Operations with two values

# Addition
print(X + Y)

#Subtraction
print(X - Y)

#Multiplication
print(X * Y)

#Division
print(X / Y)

#Modulus
print(X % Y)

#Exponent
print(X ** Y)

#Floor Division
print(X // Y)

#Operations with three values

# Addition
print(X + Y + Z)

#Subtraction
print(X - Y - Z)

#Multiplication
print(X * Y * Z)

#Division
print(X / Y / Z)

#Modulus
print(X % Y % Z)

#Exponent
print(X ** Y ** Z)

#Floor Division
print(X // Y // Z)


```

Output:

```python
12
8
20
5.0
0
100
5
18
2
120
0.8333333333333334
0
10000000000000000000000000000000000000000000000000000000000000000
0
```

As we can see in the above example how we can use Arithmetic Operators on multiple variables and values

## Python Comparison or Relational Operators

Python Comparison or Relational operators are used to compare the value or variable. It will return True Or False as output based on the condition.

| Operator | Description | Example  |
<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
| :---- | :---- | :---- |
| \> | Greater Then: operator will return True when the left operand is greater than the right. | X \> Y  2 \> 3   |
| \< | Less Then: operator return True when left operand is less than the right. | X \< Y  3 \< 2  |
| \== | Equal To: will return True when both operands are equal. | X \== Y 3 \== 3 |
| \!= | Not Equal To: operator will return True when two operands are not equal. | X \!= Y 3 \!= 2 |
| \>= | Greater than or Equal To operator will return True when left operand if greater than right or equal to the right | X \>= Y 2 \>= 3 |
| \<= | Less Then Equal To Operator will return True when the left operand is less than or equal to the right operand. | X \<= Y 2 \<= 3 |

Now let take the example of Relational Operators.

```python
X = 10
Y = 2 

# Greater Than
print(X > Y )

#Less Than
print(X < Y )

#Equal To
print(X == Y)

#Not Equal To
print(X != Y)

#Greater than or Equal To
print(X >= Y)

#Less Than Equal To:
print(X <= Y)

```
Output:

```python
True
False
False
True
True
False
```

## Assignment Operators

Python Assignment Operators are used to assign values to variables:

| Operator | Example | Same AS |
| :---- | :---- | :---- |
| \= | X \= 5 | X \= 5 |
| \+= | X \+= 5 | X \= X \+ 5 |
| \-= | X \-= 5 | X \= X \- 5 |
| \*= | X \*= 5 | X \= X \* 5 |
| /= | X /= 5 | X \= X / 5 |
| %= | X %= 5 | X \= X % 5 |
| //= | X //= 5 | X \= X // 5 |
| \*\*= | X \*\*= 5 | X \= \*\* 5 |
| &= | X &= 5 | X \= & 5 |
| |= | X |= 5 | X \= X | 5 |
| ^= | X ^= 5 | X \= X ^ 5 |
| \>\>= | X \>\>= 5 | X \= X \>\> 3 |
| \<\<= | X \<\<= 5  | X \= X \<\< 5 |

## Python Logical Operators

Python logical operators are used for the conditional statement.

| Operator | Description | Example |
| :---- | :---- | :---- |
| AND | Return True when both statements are true | X \< 5 AND X \< 10 |
| OR | Return True when one of the statement is true | X \< 5 or X \< 5 |
| NOT | Return False if the result is not true | not(X \< 5 or X \< 10\) |

Example:

```python
X = True
Y = False

print(X and Y)

print(X or Y)

print(not Y)
```

Output:

```python
False
True
True
```

## Python Bitwise Operators

Same As Logical operators are used to comparing data, and it uses special symbols, but bitwise operators act on operands as binary digits. They operate bit by bit.  
For Example, 2 is 10 in binary form, and 111 is for 7\.

| Operator | Description | Example |
| :---- | :---- | :---- |
| & | Bitwise AND Operator: Return True when both statements are true | X \< 5 & X \< 10 |
| | | Bitwise OR Operator: Return True when one of the statement is true | X \< 5 | X \< 5 |
| \~ | Bitwise NOT Operator: Return False if the result is not true | \~X |
| ^ | Bitwise XOR operators: work with binary values and return one if one of the bits is 0 and the other bit is one, and if both the bits are 0 or 1, then it returns 0\. | X ^ Y |
| \<\< | Bitwise  Left Shift: Shift left by pushing zeros in from the right and let the leftmost bits fall off. | X \<\< Y |
| \>\> | Bitwise Right Shift: Shift right by pushing copies of the leftmost bit in from the left, and let the rightmost bits fall off | X \>\> Y |

Bitwise operators will return Boolean if we use Bitwise operator with other operators, and it will return numeric values if we only use a single bitwise operator. Let take an example of each.

Example 1:

```python
X = 2
Y = 7

# And Operator
print(X < 5 & X < 10)

# OR Operator
print(X < 5 | X < 5)

# Not Operator
print(X ~Y)

# XOR Operator
print(X < 5 ^ X < 10)

```

Output:

```python
False
False
-3
True
```

Example 2:  
Let's take X as 3, and binary will be 0011, and Y as 8 as 1000.

```python
X = 3
Y= 8

# & Operator
print(X & Y)

# | Operator
print(X | Y)

# ~ Operator
print(~X)

# ^ Operator
print(X ^ Y)

# >> Operator
print(X >> Y)

# << Operator
print(X << Y)

```

Output:

```python
0
11
-4
11
0
768
```

## Python Membership Operators

Python Membership operators are used to test if a sequence is present in an object or not.  
For example, if a value is present in a list, set, and other objects.

| Operator | Description | Example |
| :---- | :---- | :---- |
| in | Returns True if a specified value is present in the sequential object | X in Y |
<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
| not in  | Return True if a specified value is not present in the sequential object. | X not in Y |

Let see an example of a Python membership operator.

```python
X = 6 #Variable with integer value
Y  = 11 #Variable with integer value
Z =  [1,2,3,4,5,6,7,9] # Variable with List 

# in Operator
print(X in Z)

# not Operator

print(Y not in Z)
```

Output:

```python
True
True
```

## Python Identity Operators

Python identity operators are used to compare the objects, not if they are equal, but if they are the same object, with the same memory location.

| Operator | Description | Example |
| :---- | :---- | :---- |
| is | Returns True if both variables are the same object | X is Y |
| is not | Returns True if both variables are not the same object | X is Not Y |

Example:

```python
X = 3
Y = "Python"
Z = 21

print(X is Z)

print(Z is not X)

print(Y is X)
```

Output:

```python
False
True
False
```

### Tips for Beginners 

* Always remember single \= and double \== are entirely different. Single \= is used to assign value, and double \== is used to find if two values are equal.

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4181667199679058"
     crossorigin="anonymous"></script>