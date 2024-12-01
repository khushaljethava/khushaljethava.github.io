---
title: Python Data Types
description: In all programming languages, data types are the essential concept. Variables use data types to store different types of data that do different things. Unlike other programming languages like C, C++, or JAVA, we do not need to declare data type keywords to declare a variable. In Python, we just need to declare the name of the variable and its value. 


date: 2024-11-27 11:33:00 +0800
categories: [Python]
tags: [python]
image:
  path: /commons/Python Data Types.png
  alt: Python Data Types
---

Python has the following built-in data types by default. 

![][image1]

As we can see in the above diagram, there are nine default python data types in python. All nine data types have different purposes.

1) ## Python Text or String Data types

A text or a string data type which can store a value like letters from a-z in the capital as well as in small, Integer values like 0-9 or a float value like 1.5, 3.7, 200.453, etc. and we can also use all the specials characters like @,$,%,&, \*. Generally, strings are represented by either single or double quotes.

### How to assign string data types.

To implement string, we need to follow the same steps as assigning a variable.

Example:

```python
X = "This is a String Data Type."
print(X)
```

Output

```python
This is a String Data Type.
```

Let take another example by using the type() function along with the string data type.

Example:

```python
X = "This is an example of a Type function."

print(X)

print(type(X))
```

Output

```python
This is an example of a Type function.
<class 'str'>
```

Learn advanced topics like string slicing, manipulation, and much more from here(Link).

2) ## Python Numeric Data Type

Python Numeric data types are used to store numeric values like 0-9, 10000, or like 500.34, 2.4, 0.5, etc.

Follow data types are included in Python Numeric data types:

1. int – holds signed integers of non-limited length.  
2. Long- holds long integers(exists in Python 2.x, deprecated in Python 3.x).  
3. Float- holds floating precision numbers, and it is accurate up to 15 decimal places.  
4. Complex- holds complex numbers.

## Python int

An int is a data type that stands for integers used to numeric values from 0-9.

Example :

```python
X = 4
Y = 11102144585


print(X)
print(Y)
print(type(X))
```

Output:

```python
4
11102144585
<class 'int'>
```

## Python float

This data type is used to store float values like a real number with floating-point representation—examples 1.2, 45.66, 30000.1.

Example:

```python
X = 3.7
print(X)
print(type(X))
```

Output:

```python
3.7
<class 'float'>
```
## Python Complex Keyword

As the name suggests, a complex number with a real and an imaginary part like  1+A3 and 7+34i. Unlike other programming languages such as Java or C++, Python can identify these complex numbers with values. Suppose we take an example as  2 \+ 4j where 2 is a real part and j is the imaginary part. 

Here are some examples.

```python
X = 2 + 4j

print(X)
print(type(X))
```

Output:

```python
(2+4j)
<class 'complex'>
```


 

## 3\) Python Sequence Data Type

Sequential data types are a few of the built-in data structures. Sequential data types are the same as arrays in other programming languages but with advanced features. This is the topic you will often use in your python journey.

## Python List

The list is used to store an ordered sequence of values in a single variable, or we can say the list is the collection of the items of different data types. It is a very flexible data type in Python. The list is like an array from the other programming language. 

The list is mutable so that we can change the value in the list at any time.

### How to Create a List 

As a list is a collection of the items, we need to separate all the values with a comma (,), and it should be enclosed in square brackets \[ \].

Example:  

```python
mylist= [1,2,3,4]

print(mylist)
```

Output:

```python
[1, 2, 3, 4]
```


We can add any value in the list, but if it is a string, it should be in a single quote (‘) or double quote (“).

Example:

```python
mylist = [1,'two', 3.5, 'four']

print(mylist)
```

Output:

```python
[1, 'two', 3.5, 'four']
```

Example:

```python
mylist = [1,'two', 3.5, 'four']
print(type(mylist))
```

Output:

```python
<class 'list'>

```

## Python Tuple

A tuple is similar to the list in many ways. Like lists, tuples also contain the collection of the items of different data types, and values are separated with a comma (,) but enclosed within parentheses ().

A tuple is immutable, so it is a read-only data structure, and we can't modify the size and value of the items of a tuple.

Let’s see a example of tuple:

```python
tup = (24 , "Hello", "World", 2021)

print(tup)
```
Output:

```python
(24, 'Hello', 'World', 2021)

```

Now let us check the type function with a tuple.

```python
tup = (24 , "Hello", "World", 2021)

print(type(tup))
```

Output

```python
<class 'tuple'>
```

## Python Dict

Python Dictionary is a built-in data structure, and it is also used to store sequential data but in an unordered collection of key and value pairs. Dictionary store values within the curly braces { } and separate with a comma (,).

As Python dictionaries store data in key values, it should be in the following format.

X: 21  
Key-value   
(Image here)

Example:

```python
mydict = {'X':2, 'Y':3 , 'Z':4}

print(mydict)
```

Output:

```python
{'X': 2, 'Y': 3, 'Z': 4}
```

Values in a dictionary can be of any data type and can be duplicated. Still, the keys can't be repeated, and we also cannot change the key as python is case sensitive, so dictionaries with the same keys as X and x will be treated distinctly.

Let us take another example of a python dictionary.

```python
House = { 'Door':2, 'Windows':4, 'Garden': 'Yes'}

print(House)

print(type(House))
```

Output:

```python
{'Door': 2, 'Windows': 4, 'Garden': 'Yes'}
<class 'dict'>
```

Python Dictionary is a very vast topic. We will learn it in an upcoming tutorial, or you can click here(Link).

## 5\) Python Set Data Type

Same as Dictionary, Set is also the unordered collection of the items. However, unlike dictionaries in Set, we are not using key-value pairs. In Set, we are just adding values. In Set, all the values are defined inside the curly braces { } and should be separated by comma (,). 

 Let see some examples of Set Data types.

Example 1 :

```python
Myset = { 1, 2, 3, 4, 5}

print(Myset)
```

Output:

```python
{1, 2, 3, 4, 5}

```

Set is Mutable, so we cannot change the set’s values once we assign it cannot be changed throughout the program.

Example 2 :

```python
Set_2 = {'A','B','C','D'}

print(Set_2)
```

Output:

```python
{'B', 'C', 'A', 'D'}

```

Note: As Set is a collection of unordered items, every time we run set, we will get different ordered output.  
Example 3:

```python
Set_2 = {'A','B','C','D'}

print(type(Set_2))
```

Output:

```python
<class 'set'>
```

## 6\) Python Boolean Datatype

In the Boolean data type, we can just assign two values which are True or False. In Boolean, equal to True is call truthy, and those equal to False are falsy. The first letter should be capital like “T” in True and “F” in False to assign a Boolean value. We do not need to use any single quote or double quote to use Boolean.

Example:

```python
X = True

Y = False

print(X)
print(Y)
```

Output:

```python
True
False
```

Example 2:

```python
X = True

Y = False

print(type(X))
print(type(Y))
```

Output:

```python
<class 'bool'>
<class 'bool'>
```

[image1]: <data:image/png;base64,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>