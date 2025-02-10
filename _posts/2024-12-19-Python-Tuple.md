---
title: Python Tuple
description: In this tutorial, we will learn about Python Tuple and all its methods.
date: 2024-12-19 10:19:00 +0800
categories: [Python]
tags: [python]
image:
  path: /commons/Python Tuple.png
  alt: Python Tuple
---

## What is a tuple in python?

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
A tuple in python is similar to the list in many ways. Like lists, tuples also contain the collection of the items of different data types, and values are separated with a comma (,) but enclosed within parentheses ().

A tuple is immutable, so it is a read-only data structure, and we can't modify the size and value of the items of a tuple.

A tuple can have any number of items, and they may be of different types (integer, float, list, string, etc.)

Let’s see some of the Python tuple examples below.  
Example:

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

## Nested Tuple

We can create a nested tuple by adding a bracket inside the bracket. 

Example:

```python
nested_tup = (1,2,3,("Four","Five",6),7,8)

print(nested_tup)
```

Output:

```python
(1, 2, 3, ('Four', 'Five', 6), 7, 8)
```

We can also add a list inside a tuple or add a tuple inside a list. 

Let us check examples of how we can add a list inside a tuple.

Example:

```python
pets = ('Dog','Cat',['Bird','Fish'],'Frog')

print(pets)

print(type(pets))
```

When we run this program, we will get the following result:

Output:

```python
('Dog', 'Cat', ['Bird', 'Fish'], 'Frog')
<class 'tuple'>
```

## Access Tuple Elements

We can access tuple elements by referring to the index number inside square brackets by positive and negative indexes.

### Positive Indexing

As we know python index starts from 0, so does it in the tuple.

Example 

```python
thistuple = ("apple", "banana", "cherry")
print(thistuple[1])
```

Output:

```python
banana
```

### Negative Indexing

Negative indexing means starting from the end like  \-1 refers to the last item, \-2 refers to the second-last item, etc.

```python
thistuple = ("apple", "banana", "cherry")
print(thistuple[-1])
```

Output:

```python
cherry
```

## Slicing of Tuples

We can slice the specific range of indexes by specifying from where to start and where to end the range. We can set range by using a colon: in between the two indexes.

Let's check an example of slicing tuples in python.

Example:

```python
thistuple = ("apple", "banana", "cherry", "orange", "kiwi", "melon", "mango")
print(thistuple[2:5])
```

Here, we will get the result as follow.

Output:

```python
('cherry', 'orange', 'kiwi')
```

As we can see, it is returning the values of index third, fourth and fifth because the tuple indexes start from 0\. That’s why it starts from index2 and ends at index 5, but it does not include 5 because the index has started from 0\.

Let us see some more examples of the slicing of tuples.

Example:

```python
thistuple = ("apple", "banana", "cherry", "orange", "kiwi", "melon", "mango")
print(thistuple[:4])
```

Output:

```python
('orange', 'kiwi', 'melon')
```

This example returns the items from index \-4 (included) to index \-1 (excluded)

We can also slice tuples using negative indexing also, let check out.

Example:

```python
thistuple = ("apple", "banana", "cherry", "orange", "kiwi", "melon", "mango")
print(thistuple[-4:-1])
```

When we run, we will get this result.

Output:

```python
('orange', 'kiwi', 'melon')
```

## Concatenation of Python Tuple

Concatenation to python tuples means to merge or combine two or more tuples into one. We can use the \+ operator to combine two tuples.

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
We can also multiple the elements in a tuple to itself for a given number of times using the \* operator.

Let's check an example of the python concatenation of tuples.

```python
tuple_1 = (1,2,3)

tuple_2 = (4,5,6)

print("Using + operator")
print(tuple_1 + tuple_2)

print("Using * Operator")
print(tuple_1 * 3)
```

The output will be as follow:

```python
Using + operator
(1, 2, 3, 4, 5, 6)
Using * Operator
(1, 2, 3, 1, 2, 3, 1, 2, 3)
```

## Deleting a Tuple elements 

As we learn that a tuple is immutable, we cannot change elements in a tuple, so also, we cannot delete the elements in a tuple, or we can delete an entire tuple together. 

Let we an example 

```python
my_tuple = ('P','Y','T','H','O','N')

print(my_tuple)

del my_tuple[1]
```

When we run the following program, we will get.

```python
('P', 'Y', 'T', 'H', 'O', 'N')
Traceback (most recent call last):
  File , line 5, in <module>
    del my_tuple[1]
TypeError: 'tuple' object doesn't support item deletion
```

But we can delete an entire tuple here.

```python
my_tuple = ('P','Y','T','H','O','N')

print(my_tuple)
del my_tuple
```

Output:

```python
Traceback (most recent call last):
  File .. .. .., line 6, in <module>
    print(my_tuple)
NameError: name 'my_tuple' is not defined
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
```

## Membership Test in Python Tuple

The membership test is used to find that whether the specific element is present in a tuple or not.

We can do a membership test using whether a conditional statement and also with **in** keyword to find specific element is present in a tuple or not.

Lets check an example:

```python
my_tuple = (1,2,3,4,5,6)
if 5 in my_tuple:
    print("Yes, it is present.")
```

The output will be as follow:

```python
Yes, it is present.
```

We can also do a membership test without any conditional statement just by using **in** keyword here.

Example 

```python
my_tuple = ('P','Y','T','H','O','N')
print('H' in my_tuple)
```

Output:

```python
True
```

## For loop in Python Tuple

We can use for loop to iterate through each item in a tuple.

```python
my_tuple = ("apple", "banana", "cherry")

for i in my_tuple:
    print(i)
```
When we run this program, we will get the following output:

```python
apple
banana
cherry
```

## Tuple Methods

Python has two built-in methods that you can use on tuples.

| Method | Description |
| :---- | :---- |
| count() | Returns the number of times a specified value occurs in a tuple |
| index() | Searches the tuple for a specified value and returns the position of where it was found |

