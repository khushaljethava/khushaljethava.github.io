---
title: Python Conditional Statement
description: In this tutorial, we will learn about python conditional statement like if statement python and python if-else statements, which will help users create decisions in a python program with different forms of if...elif…else statement.
date: 2024-12-05 10:42:00 +0800
categories: [Python]
tags: [python]
image:
  path: /commons/Python Conditional Statement.png
  alt: Python Conditional Statement

---

## What is a python if statement?

Python if statements are used to implement decision-making statements in the Python programming language.

if statement syntax:

```python
if <condition>:
	<statement>
```

As shown in the above syntax:

* First, we are declaring if statements.  
* We have to add the condition, and it is mandatory to add a semicolon: at the end of the condition.  
* Then we add a statement that will execute once the condition is True.  
* If the condition is evaluated as False, the statement under if statement will not execute.

We can use operators to evaluate a condition or use other objects to assess the condition.

* Equals: a \== b  
* Not Equals: a \!= b  
* Less than: a \< b  
* Less than or equal to a \<= b  
* Greater than: a \> b  
* Greater than or equal to a \>= b

The following code will only be executed when the if statement’s condition is evaluated as True.

Example:

```python
X = 23

if X < 30:
	print("The number is less than", X)

print("END")
```

**Output:**

```python
The number is less than 23
END
```

**Example:** 

```python
X = 31

if X < 30:
	print("The number is less than",  X)

print("END")
```

Output: 

```python
END
```

As we can see here value is greater than the condition, and as a result, the condition is evaluated as False, and the statement below did not execute.

Example: Python if Statement

```python
# If the number is positive, then print a message

num = 3
if num > 0:
    print(num, "is a positive number.")
print("This is always printed.")

num = -1
if num > 0:
    print(num, "is a positive number.")
print("This is also always printed.")


```

When we run the above program, we will get the following output:

```python
3 is a positive number
This is always printed.
This is also always printed.
```

In this example, we have num \> 0 as the test expression. So when the if condition is evaluated as True, only statements within the if condition will be executed.

When the variable num is equal to 3, the test expression is True, and statements inside the body are executed.

If the variable num is equal to \-1, the test expression is false, and statements inside the body are skipped, and the print() statement will fall outside of the if block. Hence, it is executed regardless of test expression.

## Python else if Statement

Syntax of python if-else statement.

```python
if <condition>:
	<statement of if>
else:
	<statement of else>
```

In the if-else in python, first, if condition will be evaluated and if the result is True, then statement of if will be executed, but if the condition is evaluated as false, then the else statement will be executed.

Let take an example of an if-else statement. 

```python
X = 34

if X < 30:
	print("The number is less than", X)
else:
print("The number is more than", X)

print("This Statement will always run.")
```

**Output:**

```python
The number is more than 34
This Statement will always run.
```

## Python if...elif Statement

Python elif statement used to add multiple expressions just like else if statement. 

<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 300,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
In simple English language, we can quote, "if the previous conditions were not true, then try this condition.”

Syntax of elif python.

```python
if <condition>:
	<statement of if>
elif: <condition>:
	<condition of elif>
```
### Example of elif statement:

```python
a = 33
b = 33
if b > a:
  print("b is greater than a")
elif a == b:
  print("a and b are equal")
```

The output of elif statement:

```python
a and b are equal
```

In the above example, a variable is equal to variable b. The first condition is not validated, but the second elif condition is True, so get the output as  "a and b are equal.”

Example of elif statement:

```python
Age = int(input("Enter your Age ?"))
if Age < 18:
    print("You are not adult")
elif Age > 18:
    print("You are adult")
```

The output of elif statement:

```python
Enter your Age? 24
You are adult
```

## Let add if..elif..else together.

Here we will implement if..elif..else together in one program.

Syntax of if..elif.else

```python
if <condition>:
	<statement of if>
elif: <condition>:
	<condition of elif>
else:
	<statement of else>
```

![][image1]

Example of if...elif...else

```python
Age = int(input("Enter your Age ?"))
if Age < 18:
    print("You are not adult")
elif Age > 18:
    print("You are adult")
else:
    print("Something went wrong")
```

**Output:**

```python
Enter your Age ? 11
You are not adult
```

Advance example of a conditional statement  
Let us say we are given a time, and we have to tell what phase of the day it is- (morning, noon, afternoon, evening, or night). We have to check if the given time against multiple ranges of time is lies within each of the 5 phases. Therefore, the following conditions apply:

1. **Morning**: 0600 to 1159  
2. **Noon**: 1200  
3. **Afternoon**: 1201 to 1700  
4. **Evening**: 1701 to 2000  
5. **Night**: 2000 to 0559

```python
time = int(input("Enter the Time:"))
 
if (time >= 600) and (time < 1200):
	print ("Morning");
elif (time == 1200):
	print ("Noon");
elif (time > 1200) and (time <= 1700):
	print ("Afternoon");
elif (time > 1700) and (time <= 2000):
	print ("Evening");
elif ((time > 2000) and (time < 2400)) or ((time >= 0) and (time < 600)):
	print ("Night");
else:
	print ("Invalid time!")
```

**Output:**

As we can see here, we are using **and** keyword and/**or** keyword, a logical operator, and combined conditional statements. 

## Python Nested if statements

In nested if statements, we can implement if statements within if statements.

Syntax

```python
if <condition>:
	if <condition>:
	<statement>
	else <condition>:
		<statement>
```

Example of nested if statement

```python
num = float(input("Enter a number: "))
if num >= 0:
    if num == 0:
        print("Zero")
    else:
        print("Positive number")
else:
    print("Negative number")
```

**Output:**

Enter a number: 25  
Positive number

In about example, we input a number to check if the number is positive or negative or zero. Then we print an appropriate message using a nested if statement.

## One-Line if Statements

In one line or shorthand if statements, we can implement conditional statements in one line only.  
Unlike usual if statements, they can be used in the same line. This technique is known as Ternary Operators or Conditional Expressions.

Syntax 

```python
if<condition>: <statement>
```
There can even be more than one \<statement\> on the same line, separated by semicolons:

```python
if<condition>: <statement_1>;<statement_2>;.........;<statement_n>
```

Example of one-line statements

```python
if a > b: print("a is greater than b")
```

Output:

<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 300,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
Example of if...else one-line statements

```python
a = 2
b = 330
print("A") if a > b else print("B")
```

Output:

<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 300,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
As we can see in the above example in the if...else statement, we are not using a semicolon :

Let us see an example of a nested one-line statement.

Example of Nested One Line Statement

```python
a = 330
b = 330
print("A") if a > b else print("=") if a == b else print("B")

```

Output:

```python
-
```

[image1]: <data:image/png;base64,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>



<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4181667199679058"
     crossorigin="anonymous"></script>